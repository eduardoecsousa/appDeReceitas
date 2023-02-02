import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa os favoritos', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Se o cardFavorit renderiza a pagina details de meal', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const favoriteRecipe = {
      meals: {
        52771: [],
      },
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    const firstImg = '0-horizontal-image';
    expect(firstImg).toBeInTheDocument();
    userEvent.click(firstImg);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/52771');
    });
  });
  test('Se o cardFavorit renderiza a pagina details de Drink', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const favoriteRecipe = {
      meals: {
        178319: [],
      },
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    const firstImg = '0-horizontal-image';
    expect(firstImg).toBeInTheDocument();
    userEvent.click(firstImg);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
    test('Os botões de favoritar e compartilhar', () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 200, ok: true, json: jest.fn().mockResolvedValue(oneMeal),
      });
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => {
        history.push('/favorite-recipes');
      });
      const favoriteRecipe = {
        meals: {
          52771: [],
        },
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
      const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn');
      expect(btnFavorite).toBeInTheDocument();
      userEvent.click(btnFavorite);
      expect(btnFavorite).not.toBeInTheDocument();
    });
  });
});
