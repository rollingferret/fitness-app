const mongoose = require("mongoose");
const { mongoURI: db } = require('../backend/config/keys.js');
const User = require('../backend/models/User.js');
const Run = require('../backend/models/Run.js');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_RUNS = 30;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

// Create runs
const runs = [];

for (let i = 0; i < NUM_SEED_RUNS; i++) {
  runs.push(
    new Run ({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
    })
  )
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    // console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
// console.log("Resetting db and seeding users and runs...");

User.collection.drop()
                .then(() => Run.collection.drop())
                .then(() => User.insertMany(users))
                .then(() => Run.insertMany(runs))
                .then(() => {
                    // console.log("Done!");
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
}
