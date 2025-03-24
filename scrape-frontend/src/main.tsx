import './style.css';
import { useState } from 'react';
import ReactDOM from 'react-dom/client'; 
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

const App = () => {
  console.log('ALO')
  const [products, setProducts] = useState<any[]>([]);

  const handleSearch = async (keyword: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app">
      <h1>Scraper Products</h1>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={products} />
    </div>
  );
};

const rootElement = document.getElementById('app') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
