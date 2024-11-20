import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Tuzo</h1>
        <p>Your One-Stop Shop for Everything</p>
        <Link to="/products" className="cta-button">
          Shop Now
        </Link>
      </div>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.images[0].url} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <Link to={`/product/${product._id}`} className="view-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {/* Add your categories here */}
          <Link to="/products?category=electronics" className="category-card">
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
          </Link>
          <Link to="/products?category=fashion" className="category-card">
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
          </Link>
          <Link to="/products?category=home" className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home & Living</h3>
          </Link>
          <Link to="/products?category=books" className="category-card">
            <div className="category-icon">📚</div>
            <h3>Books</h3>
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% secure payment</p>
        </div>
        <div className="feature">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Dedicated support</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
