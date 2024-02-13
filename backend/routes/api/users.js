const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateLoginInput = require('../../validations/login');
const validateSignupInput = require('../../validations/signup'); // Correctly imported
const { differenceInYears, parseISO } = require('date-fns');
const Run = require('../../models/Run');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

// GET /api/users/search/:username
router.get('/search/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const runs = await Run.find({ author: user._id })
                          .sort({ createdAt: -1 });
    return res.json(runs);
  } catch (err) {
    next(err);
  }
});


router.post('/register', validateSignupInput, async (req, res, next) => {
  try {
    const { email, username, password, gender, dob, city, state, weight, height } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      // Return an error if user already exists
      return res.status(400).json({ message: "User already exists with given email or username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, hashedPassword, gender, dob, city, state, weight, height });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});


router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});

// Calculate age
router.get('/user/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate age from DOB
    const age = user.dob ? differenceInYears(new Date(), parseISO(user.dob)) : 'N/A';

    // Format user data for response
    const userData = {
      username: user.username || 'N/A',
      email: user.email || 'N/A',
      gender: user.gender || 'N/A',
      dob: user.dob ? user.dob.toISOString().split('T')[0] : 'N/A', // Format date
      city: user.city || 'N/A',
      state: user.state || 'N/A',
      weight: user.weight || 'N/A',
      height: user.height || 'N/A',
      age: age
      // Add any other fields you need
    };

    res.json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
