import { useContext } from 'react';
import { ProductContext } from '../../context/product-context';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

const ProductList = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate('/admin/add-product');
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div>
      <section className="tb-list-product position-relative">
        <div className="container">
          <div className="row d-flex flex-column">
            <div className="col">
              <div className="col d-flex justify-content-center">
                <h2>List Product</h2>
              </div>
            </div>
            <div className="col-4">
              <button className="btn btn-primary" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
            <div className="col">
              <table className="table table-striped w-100">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Category</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Product Image</th>
                    <th scope="col">Additional Description</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="tb-body">
                  {products.map((product) => (
                    <tr scope="row" key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.productName}</td>
                      <td>{product.productCategory}</td>
                      <td>{product.price}</td>

                      <td>
                        <img width={200} height={200} src={product.productImage} />
                      </td>
                      <td>{product.additionalDescription}</td>
                      <td>{product.amount}</td>

                      <td>
                        <div className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                          Delete
                        </div>
                        <div className="btn btn-success" onClick={() => handleEditProduct(product.id)}>
                          Edit
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
