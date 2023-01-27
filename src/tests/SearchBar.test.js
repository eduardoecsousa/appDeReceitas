import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrinkId15997';

afterEach(() => {
  jest.restoreAllMocks();
});

const SEARCH_TOP = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH = 'exec-search-btn';

describe('Header', () => {
  test('Testa se renderiza apenas ao clickar no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    const profileTopBtn = screen.getByTestId(SEARCH_TOP);

    expect(profileTopBtn).toBeInTheDocument();
    userEvent.click(profileTopBtn);

    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
  });
  test('Se ao procurar com o radio de \'first-Letter\' com mais de uma letra no input renderiza o alert', () => {
    window.alert = jest.fn();
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchTopBtn = screen.getByTestId(SEARCH_TOP);

    userEvent.click(searchTopBtn);

    const firstLetter = screen.getByTestId('first-letter-search-radio');

    expect(firstLetter).toBeInTheDocument();

    userEvent.click(firstLetter);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'aaaaaaaa');

    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    userEvent.click(execSearchBtn);

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });
  test('Se ao realizar a requisição com a radio first-Letter', async () => {
    window.alert = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    const searchTopBtn = screen.getByTestId(SEARCH_TOP);

    userEvent.click(searchTopBtn);

    const firstLetter = screen.getByTestId('first-letter-search-radio');

    expect(firstLetter).toBeInTheDocument();

    userEvent.click(firstLetter);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'a');

    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });
  test('Se ao retornar um objeto vazio renderiza o alert', async () => {
    const emptyObject = { meals: null };
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(emptyObject),
    });
    window.alert = jest.fn();

    const { history } = renderWithRouterAndRedux(<App />);

    await act(() => {
      history.push('/meals');
    });

    const searchTopBtn = screen.getByTestId(SEARCH_TOP);

    userEvent.click(searchTopBtn);

    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    userEvent.click(ingredientSearch);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(execSearchBtn);

    await waitFor(() => expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });
  test('Se ao receber uma receita renderiza a pagina de detalhes', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(oneMeal),
    });
    window.alert = jest.fn();

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchTopBtn = screen.getByTestId(SEARCH_TOP);

    userEvent.click(searchTopBtn);

    const nameSearch = screen.getByTestId('name-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    userEvent.click(nameSearch);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
});
