import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

afterEach(() => {
  jest.restoreAllMocks();
});

const SEARCH_TOP = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Header', () => {
  test('Testa se renderiza apenas ao clickar no botão', async () => {
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

    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(execSearchBtn);

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });
  test('Se ao retornar um objeto vazio renderiza o alert', () => {
    const emptyObject = { meals: null };
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, ok: true, json: jest.fn().mockResolvedValue(emptyObject),
    });
    window.alert = jest.fn();

    // global.fetch = jest.fn().getMockImplementation(fetch);

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchTopBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchTopBtn);

    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(ingredientSearch);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(execSearchBtn);

    expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});
