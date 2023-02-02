import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const START_RECIPE = 'start-recipe-btn';

describe('Testa a tela de Recipe Details', () => {
  it('Verifica se caso a receita de comida ja tenha sido iniciada o botão ficara "Continue Recipe"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    act(() => {
      history.push('/meals/52771');
    });
    const buttonStartRecipe = screen.getByTestId(START_RECIPE);
    await waitFor(() => expect(buttonStartRecipe).toHaveTextContent('Continue Recipe'), { timeout: 3000 });
  });
  it('Verifica se caso a receita de drink ja tenha sido iniciada o botão ficara "Continue Recipe"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    const inProgressRecipes = {
      drinks: {
        178319: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    act(() => {
      history.push('/drinks/178319');
    });
    const buttonStartRecipe = screen.getByTestId(START_RECIPE);
    await waitFor(() => expect(buttonStartRecipe).toHaveTextContent('Continue Recipe'), { timeout: 3000 });
  });
  it('Verifica se ao clicar em "Start Recipe" a pagina é redirecionanda para recipeInProgress', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks/178319');
    });
    const buttonStartRecipe = screen.getByTestId(START_RECIPE);
    await waitFor(() => expect(buttonStartRecipe).toHaveTextContent('Start Recipe'), { timeout: 3000 });
    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/drinks/undefined/in-progress');
  });
  it('Verifica se ao clicar em "Start Recipe" a pagina é redirecionanda para recipeInProgress', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52771');
    });
    const buttonStartRecipe = screen.getByTestId(START_RECIPE);
    await waitFor(() => expect(buttonStartRecipe).toHaveTextContent('Start Recipe'), { timeout: 3000 });
    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/meals/undefined/in-progress');
  });
});
