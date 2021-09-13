import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import RecipesList from "./components/recipes-list.component";
import EditRecipe from "./components/edit-recipes.component"
import CreateRecipe from "./components/create-recipe.component"
import CreateUser from "./components/create-user.component"


function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/' exact component={RecipesList} />
      <Route path='/edit/:id' component={EditRecipe} />
      <Route path='/create' component={CreateRecipe} />
      <Route path='/user' component={CreateUser} />
    </Router>
  );
}

export default App;
