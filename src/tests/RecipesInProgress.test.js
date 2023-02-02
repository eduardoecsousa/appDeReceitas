import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';

const urlMeal = '/meals/52771/in-progress';
const urlDrink = 'drinks/178319/in-progress';
const recipePhoto = 'recipe-photo';
const finishRecipe = 'finish-recipe-btn';

describe('Testanto a pagina de Receita inProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => Promise.resolve({
      status: 200,
      ok: true,
      json: async () => {
        if (
          url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
      || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
      || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
        ) {
          return Promise.resolve(oneMeal);
        }

        if (
          url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
        ) {
          return Promise.resolve(oneDrink);
        }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
          return Promise.resolve(oneDrinkId15997);
        }

        return Promise.reject(new Error('Invalid url'));
      },
    }));
  });
  test('Verifica se todos os componentes são rederizados na em mealInProgress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(urlMeal);
    });
    // expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId(finishRecipe)).toBeInTheDocument();
  });
  test('Verifica se todos os componentes são rederizados na em DrinkInProgress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(urlDrink);
    });
    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId(finishRecipe)).toBeInTheDocument();
  });
  test('Verifica se os CheckBox são renderizados em mealInProgress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(urlMeal);
    });
    // expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());
    const numberIndex = [0, 1, 2, 3, 4, 5, 6, 7];
    numberIndex.forEach((numIndex) => (
      expect(screen.getByTestId(`${numIndex}-ingredient-step`)).toBeInTheDocument()));
  });
  test('Verifica se os CheckBox são renderizados em DrinkInProgress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(urlDrink);
    });
    // expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());
    const numberIndex = [0, 1, 2];
    numberIndex.forEach((numIndex) => (
      expect(screen.getByTestId(`${numIndex}-ingredient-step`)).toBeInTheDocument()));
  });
  test('Verifica se depois de seleciona todos os checkbox o botão é liberado mealInProgress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(urlMeal);
    });
    // expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());
    const numberIndex = [0, 1, 2, 3, 4, 5, 6, 7];
    numberIndex.forEach((numIndex) => {
      const checkbox = screen.getByTestId(`${numIndex}-ingredient-step`);
      userEvent.click(checkbox);
    });
    const buttonFinishRecipe = screen.getByTestId(finishRecipe);
    expect(buttonFinishRecipe).not.toBeDisabled();
    userEvent.click(buttonFinishRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Verifica se depois de seleciona todos os checkbox o botão é liberado DrinkInProgress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(urlDrink);
    });
    // expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());
    const numberIndex = [0, 1, 2];
    numberIndex.forEach((numIndex) => {
      const checkbox = screen.getByTestId(`${numIndex}-ingredient-step`);
      userEvent.click(checkbox);
    });
    const buttonFinishRecipe = screen.getByTestId(finishRecipe);
    expect(buttonFinishRecipe).not.toBeDisabled();
    userEvent.click(buttonFinishRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
