import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const urlFavorites = '/favorite-recipes';
const favoriteRecipe = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Testa os favoritos', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Se o cardFavorite renderiza a pagina details de meal', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    act(() => {
      history.push(urlFavorites);
    });
    const firstImg = screen.getByTestId('0-horizontal-image');
    expect(firstImg).toBeInTheDocument();
    userEvent.click(firstImg);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
  test('Se o cardFavorite renderiza a pagina details de Drink', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    act(() => {
      history.push(urlFavorites);
    });
    const firstImg = screen.getByTestId('1-horizontal-image');
    expect(firstImg).toBeInTheDocument();
    userEvent.click(firstImg);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
  test('Os botões de favoritar e compartilhar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    act(() => {
      history.push(urlFavorites);
    });
    const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    userEvent.click(btnFavorite);
    expect(btnFavorite).not.toBeInTheDocument();
  });
});
