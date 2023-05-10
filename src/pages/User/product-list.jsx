import { useContext, useEffect, useState } from 'react';
import CardProduct from '../../components/card/card-product';
import { ProductContext } from '../../context/product-context';
import { CategoryContext } from '../../context/category-context';
import { useParams } from 'react-router';

const ProductListUser = () => {
  const { products } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [dataProduct, SetDataProducts] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      if (categoryId) {
        const category = await categories.find((category) => category.id === categoryId);
        setSearchCategory(category?.categoryName);
      } else {
        setSearchCategory('');
      }
    };
    getCategories();
  }, [categories, searchCategory, categoryId]);

  useEffect(() => {
    const getSearchProducts = async () => {
      if (searchTerm !== '' && searchCategory !== '') {
        const searchProducts = await products.filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase()) && product.productCategory.toLowerCase().includes(searchCategory.toLowerCase()));
        SetDataProducts(searchProducts);
      } else if (searchTerm !== '') {
        const searchProducts = await products.filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
        SetDataProducts(searchProducts);
      } else if (searchCategory !== '') {
        const searchProducts = await products.filter((product) => product.productCategory.toLowerCase().includes(searchCategory.toLowerCase()));
        SetDataProducts(searchProducts);
      } else {
        SetDataProducts(products);
      }
    };

    getSearchProducts();
  }, [products, searchTerm, searchCategory]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!dataProduct)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div className="product-list">
      <div className="container d-flex flex-column justify-content-center">
        <section className="search-bar py-2">
          <div className="container px-0">
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" name="search" placeholder="Search product name..." value={searchTerm} onChange={handleSearchInput} />
              </div>
            </div>
          </div>
        </section>
        <div className="row">
          {dataProduct?.map((product) => (
            <div className=" col-lg-3 col-md-6 text-align-left mb-4" key={product.id}>
              <CardProduct id={product.id} name={product.productName} category={product.productCategory} image={product.productImage} price={product.price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListUser;
