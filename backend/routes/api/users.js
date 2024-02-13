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
  // Check to make sure no one has already registered with the proposed email or username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    dob: req.body.dob,
    city: req.body.city,
    state: req.body.state,
    weight: req.body.weight,
    height: req.body.height
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user)); // <-- Correct continuation
      }
      catch(err) {
        next(err);
      }
    })
  });
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
