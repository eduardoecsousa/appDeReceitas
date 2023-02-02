import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const name = '0-horizontal-name';
const name1 = '1-horizontal-name';

describe('Testa a tela Done Recipes', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  beforeEach(() => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    act(() => {
      history.push('/done-recipes');
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Verifica se todos os elementos estão na tela', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    const allTextId = screen.getAllByTestId('1-horizontal-top-text');
    expect(allTextId[0]).toBeInTheDocument();
    expect(allTextId[1]).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de compartilhar aparece o texto "Link Copied!" e se a URL é compiada para o clipboard ', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const buttonComp = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(buttonComp);
    const eleCopied = screen.getByTestId('link-copied');
    expect(eleCopied).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
  test('Verifica ao clicar ao clicar no fitro de Meals ficara so uma receita e a outra sumira', () => {
    const buttonFilterMeals = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(buttonFilterMeals);
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.getByTestId(name)).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.queryByTestId(name1)).not.toBeInTheDocument();
  });
  test('Verifica ao clicar ao clicar no fitro de Drinks ficara so uma receita e a outra sumira', () => {
    const buttonFilterDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(buttonFilterDrinks);
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.getByTestId(name)).toHaveTextContent('Aquamarine');
    expect(screen.queryByTestId(name1)).not.toBeInTheDocument();
    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.queryByTestId(name1)).toBeInTheDocument();
  });
});
