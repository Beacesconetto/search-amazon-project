import React from 'react';
import './ProductList.css';

interface ProductsProps {
  products: ProductList[];  
}

interface ProductList {
  name: string;
  image: string;
  link: string;
  price: string;
}

const ProductList: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product: ProductList, index: number) => (
        <div className="product-item" key={index}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p><strong>Preço:</strong> {product.price}</p>
          <a href={product.link} className="product-button" target="_blank" rel="noopener noreferrer">
            Clique aqui
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
