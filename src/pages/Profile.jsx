import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTile } from '../redux/actions';
import Footer from '../components/Footer';
import ButtonGeneric from '../components/ButtonGeneric';

function Profile({ dispatch }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    console.log('a');
    dispatch(changeTile('Profile'));
    setEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <p data-testid="profile-email">{email}</p>
      <ButtonGeneric id="profile-done-btn" name="Done Recipes" />
      <ButtonGeneric id="profile-favorite-btn" name="Favorite Recipes" />
      <ButtonGeneric id="profile-logout-btn" name="Logout" />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Profile);
