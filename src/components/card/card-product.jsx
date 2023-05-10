import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const CardProduct = ({ id, name, category, price, image }) => {
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate(`/products/product-detail/${id}/checkout`);
  };

  return (
    <div className="card shadow bg-white h-100 w-100">
      <img src={image} className="card-img-top" alt="..." />
      <div className="container py-2">
        <small>
          <p className="text-muted">{category}</p>
        </small>
        <h5 className="card-title text-truncate fw-bold">{name}</h5>
        <p className="price">Rp. {price}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link className="nav-link" to={`/products/product-detail/${id}`}>
            See Detail...
          </Link>
          <button className="btn btn-primary" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
