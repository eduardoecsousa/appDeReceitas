/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import appLogo from '../images/appLogo.svg';
import recipesApp from '../images/recipesApp.svg';
import SearchIcon from '../images/searchIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Header.css';

function Header({ titlePage }) {
  const [search, setSearch] = useState(false);

  const titleNoSearch = ['Favorite Recipes', 'Profile', 'Done Recipes'];
  const verification = titleNoSearch.some((title) => title === titlePage);
  return (
    <div>
      <nav className="navbar bg-warning">
        <div className="container">

          <img alt="appLogoImg" src={ appLogo } />
          <img id="recipesApp" alt="RecipesApp" src={ recipesApp } />

          <div>
            <Link className="navbar-brand" to="/profile">
              <img
                src={ ProfileIcon }
                alt="icon-profile"
                data-testid="profile-top-btn"
              />
            </Link>

            <button
              type="button"
              className="btn"
              onClick={ () => { setSearch(!search); } }
            >
              <img
                src={ SearchIcon }
                alt="icon-search"
                data-testid="search-top-btn"
              />
            </button>
          </div>
        </div>
      </nav>
      <div className="header-title">
        <img src={ mealIcon } alt="mealIcon" />
        <h1
          data-testid="page-title"
          className="navbar-brand mb-0 h1 "
        >
          {titlePage}
        </h1>
      </div>
      {!verification && (
        <div>
          <SearchBar search={ search } />
        </div>
      )}
    </div>

  );
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  titlePage: state.title.title,
});

export default connect(mapStateToProps)(Header);
