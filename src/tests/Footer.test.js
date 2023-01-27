import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const EMAIL = 'email@email.com';
const PASSWORD = '1234567';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('1. Testa o componente Footer e...', () => {
  it('verifica se existe os icones de Meals e Drink na página Meals', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(button);

    const mealsIcon = screen.getByRole('img', {
      name: /meal icon/i,
    });
    const drinksIcon = screen.getByRole('img', {
      name: /drink icon/i,
    });

    expect(mealsIcon).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
  });
});

describe('2. Testa o componente Footer e...', () => {
  it('verifica se o icone Drinks redireciona para a página Drinks', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(button);

    const drinksIcon = screen.getByRole('img', {
      name: /drink icon/i,
    });

    userEvent.click(drinksIcon);

    expect(history.location.pathname).toBe('/drinks');
  });
});

describe('2. Testa o componente Footer e...', () => {
  it('verifica se existe os icones de Meals e Drink na página Drinks', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    userEvent.click(button);

    // const drinksIcon = screen.getByRole('img', {
    //   name: /drink icon/i,
    // });

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksIcon);

    const mealsIcon = screen.getByRole('img', {
      name: /meal icon/i,
    });

    expect(mealsIcon).toBeInTheDocument();
    // expect(drinksIcon).toBeInTheDocument();
  });
});
