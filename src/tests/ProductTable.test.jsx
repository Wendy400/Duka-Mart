import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ProductTable from "../components/ProductTable";
import "@testing-library/jest-dom";

const products = [
  {
    id: 1,
    name: "Wireless Active Noise-Cancelling Headphones",
    sku: "DM-ELC-01",
    category: "Electronics",
    price: 12500,
    description: "Bluetooth headphones",
    image: "https://example.com/headphones.jpg",
    stock: 18,
  },
  {
    id: 2,
    name: "GaN 65W Fast Charging Wall Adapter",
    sku: "DM-ELC-02",
    category: "Electronics",
    price: 3850,
    description: "Fast charging adapter",
    image: "https://example.com/charger.jpg",
    stock: 25,
  },
  {
    id: 3,
    name: "Handcrafted Nairobi Leather Chelsea Boots",
    sku: "DM-FTW-01",
    category: "Footwear",
    price: 8400,
    description: "Leather boots",
    image: "https://example.com/boots.jpg",
    stock: 7,
  },
  {
    id: 4,
    name: "Heavyweight Organic Cotton Crewneck Tee",
    sku: "DM-CLT-01",
    category: "Clothing",
    price: 2200,
    description: "Cotton t-shirt",
    image: "https://example.com/shirt.jpg",
    stock: 30,
  },
  {
    id: 5,
    name: "Acacia Wood & Brushed Brass Spice Grinder",
    sku: "DM-KIT-02",
    category: "Home & Kitchen",
    price: 4940,
    description: "Wooden spice grinder",
    image: "https://example.com/grinder.jpg",
    stock: 0,
  },
  {
    id: 6,
    name: "Handwoven Kiondo Sisal & Leather Tote",
    sku: "DM-BAG-01",
    category: "Bags",
    price: 7020,
    description: "Handwoven tote bag",
    image: "https://example.com/bag.jpg",
    stock: 5,
  },
];

describe("ProductTable", () => {
  test("displays all products when the page loads", () => {
    render(<ProductTable products={products} />);

    expect(
      screen.getByText("Wireless Active Noise-Cancelling Headphones")
    ).toBeInTheDocument();

    expect(
      screen.getByText("GaN 65W Fast Charging Wall Adapter")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Handcrafted Nairobi Leather Chelsea Boots")
    ).toBeInTheDocument();

    expect(screen.getByText("Showing 6 of 6 products")).toBeInTheDocument();
  });

  test("searches for a product by name", () => {
    render(<ProductTable products={products} />);

    const searchInput = screen.getByPlaceholderText(
      "Search by product name or SKU..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Headphones" },
    });

    expect(
      screen.getByText("Wireless Active Noise-Cancelling Headphones")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("GaN 65W Fast Charging Wall Adapter")
    ).not.toBeInTheDocument();
  });

  test("searches for a product by SKU", () => {
    render(<ProductTable products={products} />);

    const searchInput = screen.getByPlaceholderText(
      "Search by product name or SKU..."
    );

    fireEvent.change(searchInput, {
      target: { value: "DM-ELC-02" },
    });

    expect(
      screen.getByText("GaN 65W Fast Charging Wall Adapter")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Wireless Active Noise-Cancelling Headphones")
    ).not.toBeInTheDocument();
  });

  test("searches without considering uppercase or lowercase letters", () => {
    render(<ProductTable products={products} />);

    const searchInput = screen.getByPlaceholderText(
      "Search by product name or SKU..."
    );

    fireEvent.change(searchInput, {
      target: { value: "HEADPHONES" },
    });

    expect(
      screen.getByText("Wireless Active Noise-Cancelling Headphones")
    ).toBeInTheDocument();
  });

  test("filters products by category", () => {
    render(<ProductTable products={products} />);

    const categorySelect = screen.getByLabelText("Filter by category");

    fireEvent.change(categorySelect, {
      target: { value: "Clothing" },
    });

    expect(
      screen.getByText("Heavyweight Organic Cotton Crewneck Tee")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Wireless Active Noise-Cancelling Headphones")
    ).not.toBeInTheDocument();

    expect(screen.getByText("Showing 1 of 6 products")).toBeInTheDocument();
  });

  test("combines search and category filtering", () => {
    render(<ProductTable products={products} />);

    const searchInput = screen.getByPlaceholderText(
      "Search by product name or SKU..."
    );

    const categorySelect = screen.getByLabelText("Filter by category");

    fireEvent.change(searchInput, {
      target: { value: "Leather" },
    });

    fireEvent.change(categorySelect, {
      target: { value: "Footwear" },
    });

    expect(
      screen.getByText("Handcrafted Nairobi Leather Chelsea Boots")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Handwoven Kiondo Sisal & Leather Tote")
    ).not.toBeInTheDocument();
  });

  test("displays a message when no products match the search", () => {
    render(<ProductTable products={products} />);

    const searchInput = screen.getByPlaceholderText(
      "Search by product name or SKU..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Unknown Product" },
    });

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  test("clears the search when the Clear button is clicked", () => {
    render(<ProductTable products={products} />);

    const searchInput = screen.getByPlaceholderText(
      "Search by product name or SKU..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Headphones" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));

    expect(searchInput).toHaveValue("");

    expect(
      screen.getByText("GaN 65W Fast Charging Wall Adapter")
    ).toBeInTheDocument();
  });

  test("displays out of stock for products with zero stock", () => {
    render(<ProductTable products={products} />);

    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });
});