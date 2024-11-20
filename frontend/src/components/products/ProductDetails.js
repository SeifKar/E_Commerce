import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../slices/productSlice';
import { addToCart } from '../../slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="main-image">
          <img
            src={product.images[selectedImage].url}
            alt={product.name}
          />
        </div>
        <div className="image-thumbnails">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${product.name} ${index + 1}`}
              className={selectedImage === index ? 'selected' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="rating">
          <span>Rating: {product.rating}</span>
          <span>({product.numReviews} reviews)</span>
        </div>
        <div className="price">${product.price}</div>
        <p className="description">{product.description}</p>

        <div className="stock-status">
          Status:{' '}
          <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {product.stock > 0 && (
          <div className="add-to-cart">
            <div className="quantity">
              <label>Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(Math.min(product.stock, 5)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div className="product-reviews">
        <h2>Reviews</h2>
        {product.reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <div className="reviews-list">
            {product.reviews.map((review) => (
              <div key={review._id} className="review">
                <div className="review-header">
                  <span className="reviewer">{review.name}</span>
                  <span className="rating">{review.rating} stars</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
