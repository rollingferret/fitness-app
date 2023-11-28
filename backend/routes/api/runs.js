const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Run = mongoose.model('Run');
const { requireUser } = require('../../config/passport');
const validateRunInput = require('../../validations/runs');

router.get('/', async (req, res) => {
  try {
    const runs = await Run.find()
                              .populate("author", "_id username")
                              .sort({ createdAt: -1 });
    return res.json(runs);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const runs = await Run.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
    return res.json(runs);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const run = await Run.findById(req.params.id)
                             .populate("author", "_id username");
    return res.json(run);
  }
  catch(err) {
    const error = new Error('Run not found');
    error.statusCode = 404;
    error.errors = { message: "No run found with that id" };
    return next(error);
  }
});


router.put('/:id', requireUser, validateRunInput, async (req, res, next) => {
  try {
    let run = await Run.findById(req.params.id);

    if (!run) {
      const error = new Error('Run not found');
      error.statusCode = 404;
      error.errors = { message: "No run found with that id" };
      return next(error);
    }

    if (run.author.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "User not authorized to update this run" };
      return next(error);
    }

    run = await Run.findByIdAndUpdate(req.params.id, req.body, { new: true })
                     .populate('author', '_id username');

    return res.json(run);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: "Run not found" });
    }

    if (run.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Run.findByIdAndRemove(req.params.id); 
    return res.status(200).json({ message: "Run deleted successfully" });
  } catch (err) {
    next(err);
  }
});


router.post('/', requireUser, validateRunInput, async (req, res, next) => {
  try {
    const newRun = new Run({
      text: req.body.text,
      author: req.user._id
    });

    let run = await newRun.save();
    run = await run.populate('author', '_id username');
    return res.json(run);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
