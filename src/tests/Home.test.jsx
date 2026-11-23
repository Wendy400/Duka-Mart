import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';

// Home calls useProductContext() but the import is commented out in the source.
// We mock the module so the hook resolves, and control the data it returns.
const mockContext = vi.hoisted(() => ({
  products: [],
  brands: [],
}));

vi.mock('../context/ProductContext.jsx', () => ({
  useProductContext: () => mockContext,
}));

// The source references useProductContext without importing it, so expose it
// globally for the component to find at runtime.
globalThis.useProductContext = () => mockContext;

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Home page', () => {
  beforeEach(() => {
    mockContext.products = [];
    mockContext.brands = [];
  });

  it('renders the hero heading with the brand name', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { level: 1, name: /welcome to duka mart/i })
    ).toBeInTheDocument();
  });

  it('renders the hero description text', () => {
    renderHome();
    expect(
      screen.getByText(/your control center for dukamart online store/i)
    ).toBeInTheDocument();
  });

  it('renders the "Manage products" and "Add a product" links', () => {
    renderHome();
    expect(
      screen.getByRole('link', { name: /manage products/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /add a product/i })
    ).toBeInTheDocument();
  });

  it('shows the products count from context', () => {
    mockContext.products = [{ id: 1 }, { id: 2 }, { id: 3 }];
    renderHome();
    const stat = screen.getByText('Products').closest('.admin-hero-stat');
    expect(stat).toHaveTextContent('3');
  });

  it('shows the total stock from context', () => {
    mockContext.products = [{ id: 1, stock: 5 }, { id: 2, stock: 7 }];
    renderHome();
    const stat = screen.getByText('Total Stock').closest('.admin-hero-stat');
    expect(stat).toHaveTextContent('12');
  });

  it('shows zero counts when context is empty', () => {
    renderHome();
    const productsStat = screen.getByText('Products').closest('.admin-hero-stat');
    const stockStat = screen.getByText('Total Stock').closest('.admin-hero-stat');
    expect(productsStat).toHaveTextContent('0');
    expect(stockStat).toHaveTextContent('0');
  });

  it('renders the features section heading', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { level: 2, name: /what you can do here/i })
    ).toBeInTheDocument();
  });

  it('renders one feature card per FEATURES entry', () => {
    const { container } = renderHome();
    expect(container.querySelectorAll('.admin-feature')).toHaveLength(4);
  });
});
