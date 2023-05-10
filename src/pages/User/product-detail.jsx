import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product-context';
import { useNavigate, useParams } from 'react-router';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState({
    productName: '',
    productCategory: '',
    productImage: '',
    additionalDescription: '',
    price: 0,
    amount: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await products.find((product) => product.id === productId);
      setDataProduct(product);
    };
    fetchProduct();
  }, [productId, products]);

  const handleClickBuy = (id) => {
    navigate(`/products/product-detail/${id}/checkout`);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="card shadow pt-2">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-6">
                <div className="white-box text-center">
                  <img src={dataProduct?.productImage} className="img-responsive" width={420} height={400} />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-6 d-flex flex-column">
                <h3 className="card-title">{dataProduct?.productName}</h3>
                <h6 className="card-subtitle">{dataProduct?.productCategory}</h6>

                <h4 className="box-title mt-5">Additional description</h4>
                <p>{dataProduct?.additionalDescription}</p>

                <h5 className="box-title mt-5">Stock: {dataProduct?.amount < 10 ? <span className="text-danger">{dataProduct?.amount}</span> : <span className="text-success">{dataProduct?.amount}</span>}</h5>

                <h2 className="price mt-5">Rp. {dataProduct?.price}</h2>

                <button className="btn btn-primary btn-rounded" onClick={() => handleClickBuy(productId)}>
                  Buy Now
                </button>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3 className="box-title mt-5">Product Info</h3>
                <div className="table-responsive">
                  <table className="table table-striped table-product">
                    <tbody>
                      <tr>
                        <td width="390">Product</td>
                        <td>{dataProduct?.productName}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{dataProduct?.productCategory}</td>
                      </tr>
                      <tr>
                        <td>Stock</td>
                        <td>{dataProduct?.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
