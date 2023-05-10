import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product-context';
import { useNavigate } from 'react-router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { serverTimestamp } from 'firebase/firestore';
import { CategoryContext } from '../../context/category-context';

const FormAddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const [imageFile, setImageFile] = useState('');
  //   const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState({
    productName: '',
    productCategory: '',
    productImage: '',
    additionalDescription: '',
    price: 0,
    amount: 0,
  });

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setDataProduct({
      ...dataProduct,
      [id]: value,
    });
  };

  const addImageProduct = async () => {
    if (imageFile) {
      const metadata = {
        contentType: 'image/jpeg',
      };

      const fileName = new Date().getTime() + imageFile.name;

      const productImageStorageRef = ref(storage, 'product/' + fileName);
      await uploadBytesResumable(productImageStorageRef, imageFile, metadata);
      const imageURL = getDownloadURL(productImageStorageRef);

      return imageURL;
    }
  };

  const handleOnClickCancel = () => {
    navigate('/admin/products');
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    // setErrorMessage('');
    const imageUrl = await addImageProduct();

    const newDataProduct = {
      ...dataProduct,
      productImage: imageUrl,
    };

    addProduct(newDataProduct);
    navigate('/admin');
  };

  return (
    <div className="container-fluid">
      <h2>Add Product</h2>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={imageFile ? URL.createObjectURL(imageFile) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" style={{ width: 300, height: 300 }} />
          </div>
          <div className="col">
            <form action="#" method="#" onSubmit={handleAddProduct} className="row g-3 needs-validation d-flex w-100 flex-column align-content-center justify-content-center">
              <div className="col position-relative">
                <label htmlFor="pname" className="form-label">
                  Product Name
                </label>
                <br />
                <input type="text" className="form-control" id="productName" name="productName" onChange={handleInputChange} />
              </div>
              <div className="col position-relative">
                <label htmlFor="pcategory" className="form-label">
                  Product Category
                </label>
                <br />
                <select className="form-control" name="productCategory" id="productCategory" onChange={handleInputChange}>
                  <option disabled="" defaultValue={''}></option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col position-relative">
                <label htmlFor="img-product" className="form-label">
                  Image of Product
                </label>
                <input className="form-control" type="file" name="productImage" id="productImage" onChange={(e) => setImageFile(e.target.files[0])} />
              </div>

              <div className="col position-relative">
                <label className="form-label" htmlFor="pdesc">
                  Additional Description
                </label>
                <br />
                <textarea className="form-control" name="additionalDescription" id="additionalDescription" rows={5} defaultValue={''} onChange={handleInputChange} />
              </div>
              <div className="col position-relative w-100">
                <label className="form-label" htmlFor="price">
                  Product Price
                </label>
                <br />
                <input className="form-control" type="number" name="price" id="price" placeholder=" $ 1" size={5} onChange={handleInputChange} />
              </div>
              <div className="col position-relative w-100">
                <label className="form-label" htmlFor="amount">
                  Product amount
                </label>
                <br />
                <input className="form-control" type="number" name="amount" id="amount" placeholder="1" size={5} onChange={handleInputChange} />
              </div>

              <div className="col-md-12 position-relative d-flex align-item-center justify-content-center">
                <button className="btn btn-primary w-100 d-flex align-item-center justify-content-center" type="submit" name="submit" id="submit-btn">
                  Add Product
                </button>
                <button className="btn btn-danger w-100 d-flex align-item-center justify-content-center" onClick={handleOnClickCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
