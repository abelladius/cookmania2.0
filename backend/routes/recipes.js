const router = require('express').Router()
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const prep = req.body.prep;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date)

    const newRecipe = new Recipe({
        username,
        title,
        ingredients,
        prep,
        duration,
        date,
    })

    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => err.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('Recipe deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.username = req.body.username;
            recipe.title = req.body.title;
            recipe.ingredients = req.body.ingredients;
            recipe.prep = req.body.prep;
            recipe.duration = Number(req.body.duration);
            recipe.date = Date.parse(req.body.date)

            recipe.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;