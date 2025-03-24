import React from 'react';
import './ProductList.css';

import imageNotFound from '../assets/image-not-found.png';

interface ProductsProps {
  products: ProductList[];
}

interface ProductList {
  name: string;
  image: string;
  link: string;
  price: string;
  rating?: string;
  totalReviews?: string;
}

const ProductList: React.FC<ProductsProps> = ({ products }) => {
  const formatarPreco = (preco: string): string => {
    const match = preco.match(/(\d+),(\d{2})/);
    if (match) {
      return preco.replace(/(\d+),(\d{2})\d*/, '$1,$2');
    }
    return preco;
  };

  return (
    <div className="product-list">
      {products.map((product: ProductList, index: number) => {
        const nota = product.rating?.replace(',', '.') || '0';
        const notaFloat = parseFloat(nota);
        const estrelasCheias = Math.round(notaFloat);

        return (
          <div className="product-item" key={index}>
            <img
              src={!product.image.includes('data:image') ? product.image : imageNotFound}
              alt={product.name || 'Image not found'}
            />
            <h3>{product.name}</h3>

            <div className='header-product'>
              <p>
                <div>{formatarPreco(product.price.replace('% OFF', ''))}</div>
              </p>

              {product.rating && product.totalReviews && (
                <div className="product-stars">
                  <div className="stars">
                    {'★'.repeat(estrelasCheias)}
                    {'☆'.repeat(5 - estrelasCheias)}
                    <p className='quantity-avaliation'>({product.totalReviews || '0'})</p>
                  </div>
                </div>
              )}
            </div>

            <a
              href={product.link}
              className="product-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clique aqui
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
