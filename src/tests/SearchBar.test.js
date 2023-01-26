// import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Header', () => {
  test('Testa se rendiriza todos os elementos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    // const searchInput = screen.getByTestId('search-input');

    // expect(searchInput).toBeInTheDocument();
  });
});
