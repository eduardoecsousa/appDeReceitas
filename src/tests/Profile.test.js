import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de Profile', () => {
  it('', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailProfile = { email: 'email@mail.com' };
    localStorage.setItem('user', JSON.stringify(emailProfile));
    act(() => {
      history.push('/profile');
    });
    const eleEmail = screen.getByTestId('profile-email');
    expect(eleEmail).toHaveTextContent('email@mail.com');
  });
});
