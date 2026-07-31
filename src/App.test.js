import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the products catalog and cart actions', () => {
  render(<App />);

  expect(screen.getByText(/Ateliê dos Mimos/i)).toBeInTheDocument();
  expect(screen.getByText(/Kit Dia dos Pais #013/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /adicionar/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: /enviar pedido para o whatsapp/i })).toBeInTheDocument();
});
