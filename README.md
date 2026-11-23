# DukaMart – Inventory Management Dashboard

DukaMart is a React-based inventory management dashboard designed to help users manage products efficiently. It provides a simple interface for viewing, adding, editing, deleting, and organising product records.

The application uses React for the frontend and JSON Server as a lightweight backend for storing and managing product data.

## Features

- **Dashboard:** Provides an overview of the inventory, including product statistics.
- **View Products:** Displays products in an organised table with their details.
- **Add Products:** Allows users to add new products to the inventory.
- **Edit Products:** Enables users to update existing product information.
- **Delete Products:** Allows users to remove products from the inventory.
- **Search Products:** Search for products using their names or SKUs.
- **Category Filtering:** Filter products according to their categories.
- **Stock Monitoring:** Displays stock status, including in-stock, low-stock, and out-of-stock products.
- **Dark and Light Mode:** Allows users to switch between themes.
- **Responsive Design:** Provides layouts that adapt to different screen sizes.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Building the user interface and reusable components |
| JavaScript | Application logic and interactivity |
| Tailwind CSS | Styling and responsive layouts |
| CSS | Custom styling and theme management |
| React Router DOM | Navigation between application pages |
| Context API | Sharing product and theme state across components |
| JSON Server | Simulating a REST API for product data |
| Vite | Development server and build tool |

## Project Structure

```text
duka-mart/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── CategoryFilter.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductRow.jsx
│   │   ├── ProductTable.jsx
|   |   ├── SearchBar.jsx
|   |   ├── SideBar.jsx     
│   │   └── ThemeToggle.jsx
│   │
│   ├── context/
│   │   ├── ProductContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── AddProducts.jsx
│   │   └── EditProducts.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── db.json
├── package.json
└── README.md
```

### Folder and File Responsibilities

**1. components/**

Contains reusable UI components used throughout the application.

- `ProductForm.jsx` – Form used to add new products and edit existing ones.
- `SearchBar.jsx` – Allows users to search for products by name or SKU.
- `CategoryFilter.jsx` – Filters products by category.
- `SideBar.jsx` – Provides navigation between application pages.
- `ThemeToggle.jsx` – Controls switching between light and dark themes.
- `ProductTable.jsx` – Displays product records in a structured table.
- `ProductRow.jsx` – Renders an individual product row, including its details and actions.
- `NavBar.jsx` – Provides the application's navigation bar.

**2. context/**

Contains React Context providers for shared application state.

- `ProductContext.jsx` – Manages product data and CRUD operations.
- `ThemeContext.jsx` – Manages the current theme and theme switching.

**3. pages/**

Contains the main application pages.

- `Home.jsx` – Dashboard overview and inventory statistics.
- `Products.jsx` – Displays and manages the product inventory.
- `AddProducts.jsx` – Handles adding new products.
- `EditProducts.jsx` – Handles updating existing products.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone 
```

**2. Navigate into the project directory**

```bash
cd duka-mart
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the JSON Server**

```bash
npm run server
```

JSON Server runs at:

```text
http://localhost:3001
```

The products endpoint is:

```text
http://localhost:3001/products
```

**5. Start the React development server**

Open another terminal in the project directory and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Product Data Structure

Products are stored in `db.json`.

Each product follows this structure:

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "sku": "DM-ELC-01",
  "category": "Electronics",
  "price": 12500,
  "description": "Wireless headphones with noise cancellation.",
  "image": "https://example.com/headphones.jpg",
  "stock": 15
}
```

## Application Architecture

DukaMart uses React Context API to share data between components.

**Product management flow:**

1. `ProductContext` fetches product data from JSON Server.
2. The product data is stored in shared React state.
3. Components access the data through `useProductContext()`.
4. Users can add, edit, or delete products.
5. Changes are sent to JSON Server using HTTP requests.
6. React state is updated to reflect the changes in the interface.

**Theme management flow:**

1. `ThemeContext` stores the current theme.
2. `ThemeToggle` calls the theme switching function.
3. The selected theme is applied to the application wrapper.
4. CSS theme variables control the appearance of the application.

## CRUD Operations

DukaMart supports the four fundamental CRUD operations:

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Create | POST | `/products` |
| Read | GET | `/products` |
| Update | PATCH | `/products/:id` |
| Delete | DELETE | `/products/:id` |

## Future Improvements

- Add user authentication and role-based access.
- Implement product image uploads.
- Add inventory transaction history.
- Introduce sales and inventory reports.
- Add stock adjustment notifications.
- Connect to a production database and backend API.


## Learning Objectives

This project demonstrates practical application of:

- React components and props.
- React Hooks, including `useState`, `useEffect`, and `useContext`.
- React Router for navigation.
- Context API for global state management.
- CRUD operations and REST API integration.
- Form handling and validation.
- Array methods such as `map()`, `filter()`, `find()`, and `reduce()`.
- Responsive UI development.
- CSS variables and theme management.

---

