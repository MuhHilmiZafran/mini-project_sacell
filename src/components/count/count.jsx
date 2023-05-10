import React, { useState } from 'react';

const CountQuantity = ({ onChange, value }) => {
  const [quantity, setQuantity] = useState(value);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (onChange) {
        onChange(quantity - 1);
      }
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    if (value) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setQuantity(newValue || 0);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="quantity-count">
      <div className="container d-flex justify-content-center align-items-center text-center">
        <div className="row">
          <div className="col">
            <button type="button" className="btn  btn-outline-danger" onClick={decreaseQuantity}>
              -
            </button>
          </div>
          <div className="col">
            <input type="number" className="form-control" value={quantity} onChange={handleInputChange} />
          </div>
          <div className="col">
            <button type="button" className="btn  btn-outline-primary" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountQuantity;
