import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const emailTest = 'email@mail.com';

describe('Testa a tela de Profile', () => {
  it('Verifica se o Email é pego do local storage e é renderizado na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailProfile = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(emailProfile));
    act(() => {
      history.push('/profile');
    });
    const eleEmail = screen.getByTestId('profile-email');
    expect(eleEmail).toHaveTextContent('email@mail.com');
  });
  it('Verifica se ao cliclar no botão de "Favorite Recipes" a pagina é redirecionada para Favoritos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailProfile = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(emailProfile));
    act(() => {
      history.push('/profile');
    });
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(buttonFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verifica se ao cliclar no botão de "Done Recipes" a pagina é redirecionada para Receitas Feitas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailProfile = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(emailProfile));
    act(() => {
      history.push('/profile');
    });
    const buttonDone = screen.getByTestId('profile-done-btn');
    userEvent.click(buttonDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifica se ao cliclar no botão de "Logout" o localStorage é limpado e redirecionado para tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailProfile = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(emailProfile));
    act(() => {
      history.push('/profile');
    });
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
    expect(JSON.parse(localStorage.getItem('user'))).toBeNull();
    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toBeNull();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toBeNull();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toBeNull();
  });
});
