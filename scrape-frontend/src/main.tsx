import './style.css';
import { useState } from 'react';
import ReactDOM from 'react-dom/client'; 
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import { FaSpinner } from 'react-icons/fa'; // <- novo

const App = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Scraper Products</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="loading-icon">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

const rootElement = document.getElementById('app') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
