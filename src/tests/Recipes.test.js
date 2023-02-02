import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testa as paginas de receitas', () => {
  it('Verifica se é rederizado as 12 primeiras receitas Meals', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const load = screen.getByTestId('loading');
    await waitForElementToBeRemoved(load);
    for (let i = 0; i <= 11; i += 1) {
      expect(screen.getByTestId(`${i}-card-name`)).toBeInTheDocument();
    }
  });
  it('Verifica se é rederizado as 12 primeiras receitas Drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const load = screen.getByTestId('loading');
    await waitForElementToBeRemoved(load);
    for (let i = 0; i <= 11; i += 1) {
      expect(screen.getByTestId(`${i}-card-name`)).toBeInTheDocument();
    }
  });
  it('Verifica se é os botões de filtro estão presentes na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const categorys = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const load = screen.getByTestId('loading');
    await waitForElementToBeRemoved(load);
    categorys
      .forEach((category) => expect(screen.getByTestId(`${category}-category-filter`))
        .toBeInTheDocument());
  });
  it('Verifica se ao clicar em um Card a pagina é redirecionada para detalhes da receita', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const load = screen.getByTestId('loading');
    await waitForElementToBeRemoved(load);
    const cardDrinks = screen.getByTestId('0-recipe-card');
    userEvent.click(cardDrinks);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
  it('Verifica se ao clicar em um Card a pagina é redirecionada para detalhes da receita', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const load = screen.getByTestId('loading');
    await waitForElementToBeRemoved(load);
    const buttonFilter = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(buttonFilter);
    const primatyReceitas = screen.getByTestId('0-card-name');
    expect(primatyReceitas).toHaveTextContent('GG');
    const buttonFilterAll = screen.getByTestId('All-category-filter');
    userEvent.click(buttonFilterAll);
  });
});
