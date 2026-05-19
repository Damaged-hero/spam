import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const SUPABASE_URL = 'https://stnfwdfqgehljywccpuu.supabase.co/rest/v1/shop_items';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bmZ3ZGZxZ2VobGp5d2NjcHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNDk5MDEsImV4cCI6MjA5NDcyNTkwMX0.8EHEdDT2yVDLgf35IVARvmdDkwr-dq6o_racnIEGFG4';

const CATEGORIES = [
  'All', 'CPUs', 'GPUs', 'Motherboards', 'RAM', 'Storage',
  'Cooling', 'Cases', 'PSUs', 'Monitors', 'Keyboards',
  'Mice', 'Audio', 'Networking', 'Capture Cards', 'Accessories'
];

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('default');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(
          `${SUPABASE_URL}?is_active=eq.true&select=*`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // filtering
  let filtered = products.filter(p =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );
  filtered = filtered.filter(p => p.price <= maxPrice);
  if (inStockOnly) filtered = filtered.filter(p => p.stock_quantity > 0);

  // sorting
  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating')     filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === 'name')       filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products, descriptions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-6">

        {/* Filter pane */}
        <div className="w-56 shrink-0 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-fit sticky top-6">

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1 max-h-64 overflow-y-auto">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 border-none cursor-pointer
                      ${selectedCategory === cat
                        ? 'bg-blue-500 text-white'
                        : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price range */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Max Price: <span className="text-blue-500">${maxPrice}</span>
            </h3>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$0</span>
              <span>$5000</span>
            </div>
          </div>

          {/* In stock */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Availability</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="accent-blue-500 w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">In stock only</span>
            </label>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Reset filters */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              setMaxPrice(5000);
              setSortBy('default');
              setSearch('');
              setInStockOnly(false);
            }}
            className="mt-6 w-full py-2 text-sm text-red-500 hover:text-red-600 bg-transparent border border-red-300 dark:border-red-700 rounded-lg cursor-pointer transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>

        {/* Product grid */}
        <div className="flex-1">

          {/* Results count */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {loading ? 'Loading...' : `${filtered.length} products found`}
          </p>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">⚠️ {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg border-none cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-500 dark:text-gray-400">No products match your filters.</p>
            </div>
          )}

          {/* Products */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Shop;
