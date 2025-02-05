const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then((result) => {
    console.log(`recipe added: ${result.title}`);
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach((item) => console.log(`recipe for ${item.title} inserted successfully`));
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new:true })
  })
  .then((result) => {
    console.log(`The recipe ${result.title} is updated`);
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log(`The recipe ${result.title} is deleted`);
    return mongoose.connection.close();
  })
  .then(() => console.log(`connection closed`))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
