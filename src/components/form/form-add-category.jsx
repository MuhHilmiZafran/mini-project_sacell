import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product-context';
import { useNavigate } from 'react-router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { serverTimestamp } from 'firebase/firestore';
import { CategoryContext } from '../../context/category-context';

const FormAddCategory = () => {
  const { addCategory } = useContext(CategoryContext);
  const [imageFile, setImageFile] = useState('');
  const navigate = useNavigate();

  const [dataCategory, setDataCategory] = useState({
    categoryName: '',
    categoryImage: '',
  });

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setDataCategory({
      ...dataCategory,
      [id]: value,
    });
  };

  const addImageCategory = async () => {
    if (imageFile) {
      console.log(imageFile);

      const metadata = {
        contentType: 'image/jpeg',
      };

      const fileName = new Date().getTime() + imageFile.name;

      const categoryImageStorageRef = ref(storage, 'category/' + fileName);
      await uploadBytesResumable(categoryImageStorageRef, imageFile, metadata);
      const imageURL = getDownloadURL(categoryImageStorageRef);

      return imageURL;
    } else {
      return 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    // setErrorMessage('');
    const imageUrl = await addImageCategory();

    const newdataCategory = {
      ...dataCategory,
      categoryImage: imageUrl,
    };

    await addCategory(newdataCategory);
    navigate('/admin/category');
  };

  return (
    <div className="container-fluid">
      <h5>Add Product</h5>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={imageFile ? URL.createObjectURL(imageFile) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" style={{ width: 300, height: 300 }} />
          </div>
          <div className="col">
            <form action="#" method="#" onSubmit={handleAddCategory} className="row g-3 needs-validation d-flex w-100 flex-column align-content-center justify-content-center">
              <div className="col position-relative">
                <label htmlFor="pname" className="form-label">
                  Category Name
                </label>
                <br />
                <input type="text" className="form-control" id="categoryName" name="categoryName" onChange={handleInputChange} />
              </div>

              <div className="col position-relative">
                <label htmlFor="img-product" className="form-label">
                  Image of Product
                </label>
                <input className="form-control" type="file" name="productImage" id="productImage" onChange={(e) => setImageFile(e.target.files[0])} />
              </div>

              <div className="col-md-12 position-relative d-flex align-item-center justify-content-center">
                <button className="btn btn-primary w-100 d-flex align-item-center justify-content-center" type="submit" name="submit" id="submit-btn">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddCategory;
