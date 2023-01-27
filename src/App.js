import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Header from './components/Header';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route
          exact
          path="/meals/:id"
          // render={ (props) => <SearchBar { ...props } /> }
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/drinks/:id"
          // render={ (props) => <RecipeDetails { ...props } /> }
          component={ RecipeDetails }
        />
        <Route exact path="/meals/:id-da-receita/in-progress" component={ Profile } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
