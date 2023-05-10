import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product-context';
import { useNavigate, useParams } from 'react-router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { UserContext } from '../../context/auth-context';
import { CategoryContext } from '../../context/category-context';

const FormEditProduct = () => {
  const { products, updateProduct } = useContext(ProductContext);
  const { productId } = useParams();
  const [imageFile, setImageFile] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { categories } = useContext(CategoryContext);
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
      if (product && product.productImage) {
        setImageFile(product.productImage);
      }

      setIsLoading(false);
    };
    fetchProduct();
  }, [productId, products]);

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    if (id === 'productImage') {
      const file = event.target.files[0];
      if (file) {
        setImageFile(file);
      }
    } else {
      setDataProduct({
        ...dataProduct,
        [id]: value,
        productImage: dataProduct?.productImage,
      });
    }
  };

  const addImageProduct = async () => {
    if (typeof imageFile === 'string') {
      return imageFile;
    } else if (imageFile instanceof File) {
      const metadata = {
        contentType: 'image/jpeg',
      };

      const fileName = new Date().getTime() + imageFile.name;

      const productImageStorageRef = ref(storage, 'product/' + fileName);
      await uploadBytesResumable(productImageStorageRef, imageFile, metadata);
      const imageURL = await getDownloadURL(productImageStorageRef);
      setImageFile(imageURL);

      return imageURL;
    } else {
      return dataProduct?.productImage;
    }
  };

  const handleOnClickCancel = () => {
    navigate('/admin/products');
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    // setErrorMessage('');
    if (imageFile) {
      const imageUrl = await addImageProduct();

      const newDataProduct = {
        ...dataProduct,
        productImage: imageUrl,
      };

      await updateProduct(productId, newDataProduct);
    } else {
      const newDataProduct = {
        ...dataProduct,
      };

      await updateProduct(productId, newDataProduct);
    }
  };

  return (
    <div className="container-fluid">
      {isLoading ? (
        <div>Loding.....</div>
      ) : (
        <div>
          <h2>Edit Product</h2>
          <div className="container">
            <div className="row">
              <div className="col">
                {imageFile && typeof imageFile === 'object' && imageFile instanceof File ? (
                  <img src={URL.createObjectURL(imageFile)} alt="" style={{ width: 300, height: 300 }} />
                ) : (
                  <img src={imageFile || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" style={{ width: 300, height: 300 }} />
                )}
              </div>
              <div className="col">
                <form action="#" method="#" onSubmit={handleUpdateProduct} className="row g-3 needs-validation d-flex w-100 flex-column align-content-center justify-content-center">
                  <div className="col position-relative">
                    <label htmlFor="pname" className="form-label">
                      Product Name
                    </label>
                    <br />
                    <input type="text" className="form-control" id="productName" name="productName" value={dataProduct?.productName} onChange={handleInputChange} />
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
                    <input className="form-control" type="file" name="productImage" id="productImage" onChange={handleInputChange} />
                  </div>

                  <div className="col position-relative">
                    <label className="form-label" htmlFor="pdesc">
                      Additional Description
                    </label>
                    <br />
                    <textarea className="form-control" name="additionalDescription" id="additionalDescription" rows={5} value={dataProduct?.additionalDescription} onChange={handleInputChange} />
                  </div>
                  <div className="col position-relative w-100">
                    <label className="form-label" htmlFor="price">
                      Product Price
                    </label>
                    <br />
                    <input className="form-control" type="number" name="price" id="price" placeholder=" $ 1" size={5} value={dataProduct?.price} onChange={handleInputChange} />
                  </div>
                  <div className="col position-relative w-100">
                    <label className="form-label" htmlFor="amount">
                      Product amount
                    </label>
                    <br />
                    <input className="form-control" type="number" name="amount" id="amount" placeholder="1" size={5} value={dataProduct?.amount} onChange={handleInputChange} />
                  </div>

                  <div className="col-md-12 position-relative d-flex align-item-center justify-content-center">
                    <button className="btn btn-primary w-100 d-flex align-item-center justify-content-center" type="submit" name="submit" id="submit-btn">
                      Edit Product
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
      )}
    </div>
  );
};

export default FormEditProduct;
