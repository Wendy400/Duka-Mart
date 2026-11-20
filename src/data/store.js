// Persistent product store — localStorage-backed, seeded from the static catalog.
// No backend required: the admin portal reads/writes through this module so
// add / edit / delete changes persist across reloads and stay in sync live.
import { SEED_PRODUCTS } from "./seedProducts.js";

const STORAGE_KEY = "dukamart.products.v1";
const EVENT = "dukamart:products-changed";

const isBrowser = typeof window !== "undefined";

function readJSON(key, fallback) {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT));
}

// Next numeric id, one past the current max.
function nextId(products) {
  const max = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
  return max + 1;
}

function normalize(product) {
  return {
    id: product.id,
    name: String(product.name || "").trim(),
    sku: String(product.sku || "").trim(),
    category: String(product.category || "").trim(),
    price: Number(product.price) || 0,
    description: String(product.description || "").trim(),
    image: String(product.image || "").trim(),
    stock: Number(product.stock) || 0,
  };
}

export function getProducts() {
  const stored = readJSON(STORAGE_KEY, null);
  if (stored && stored.length) return stored;
  // First run: seed from the static catalog and persist it.
  const seeded = SEED_PRODUCTS.map(normalize);
  writeJSON(STORAGE_KEY, seeded);
  return seeded;
}

export function saveProducts(products) {
  writeJSON(STORAGE_KEY, products);
}

export function getProduct(id) {
  return getProducts().find((p) => String(p.id) === String(id)) || null;
}

export function addProduct(product) {
  const products = getProducts();
  const created = normalize({ ...product, id: nextId(products) });
  const next = [...products, created];
  saveProducts(next);
  return created;
}

export function updateProduct(id, patch) {
  const next = getProducts().map((p) =>
    String(p.id) === String(id) ? normalize({ ...p, ...patch, id: p.id }) : p
  );
  saveProducts(next);
  return next;
}

export function deleteProduct(id) {
  const next = getProducts().filter((p) => String(p.id) !== String(id));
  saveProducts(next);
  return next;
}

// Subscribe to store changes (same tab via custom event, other tabs via storage).
export function subscribe(callback) {
  if (!isBrowser) return () => {};
  const onLocal = () => callback(getProducts());
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) callback(getProducts());
  };
  window.addEventListener(EVENT, onLocal);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onLocal);
    window.removeEventListener("storage", onStorage);
  };
}
