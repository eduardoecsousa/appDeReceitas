import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { changeTile } from '../redux/actions';
import '../css/Login.css';
import logo from '../images/imagens/logo-recipes.png';
import tomato from '../images/imagens/tomato.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(changeTile('Login'));
  }

  validateButton = () => {
    const { email, password } = this.state;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const minLength = 6;
    const validPassword = password.length >= minLength;
    const isValid = validEmail && validPassword;
    return isValid;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const isDisabled = this.validateButton();
    this.setState({
      [name]: value,
      isButtonDisabled: !isDisabled,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    const user = { email };
    localStorage.user = JSON.stringify(user);
    history.push('/meals');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <section>
        <div id="purple-backgound" className="text-center">
          <img src={ logo } alt="logo" />
        </div>
        <div id="img-tomato">
          <img src={ tomato } alt="tomate" />
        </div>
        <div className="container">
          <div className="text-center text-uppercase mb-4">
            <h3>Login</h3>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              variant="warning"
              className="text-white"
              data-testid="login-submit-btn"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
            >
              ENTER
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
