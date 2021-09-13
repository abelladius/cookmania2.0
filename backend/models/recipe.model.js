const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    prep: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;