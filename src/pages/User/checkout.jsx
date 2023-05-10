import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product-context';
import { UserContext } from '../../context/auth-context';
import { useNavigate, useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import CountQuantity from '../../components/count/count';
import { TransactionContext } from '../../context/transaction-context';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const { products, updateProduct } = useContext(ProductContext);
  const { addTransaction } = useContext(TransactionContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const userRef = doc(db, 'users', user?.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setDataUser(docSnap.data());
        }
      }
    };

    getUser();
  }, [user?.uid, user]);

  const [dataProduct, setDataProduct] = useState({
    productName: '',
    productCategory: '',
    productImage: '',
    additionalDescription: '',
    price: 0,
    amount: 0,
  });

  useEffect(() => {
    const getProduct = async () => {
      const product = await products.find((product) => product.id === productId);

      if (quantity) {
        setDataProduct({
          ...product,
          quantity: quantity,
          totalPrice: product?.price * quantity,
        });
      } else {
        setDataProduct(product);
      }
    };
    getProduct();
  }, [productId, products, quantity]);

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setDataUser({
      ...dataUser,
      [id]: value,
    });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
  };

  const handleClickPurchase = () => {
    const transactionId = uuidv4();
    const newTransaction = {
      userId: user?.uid,
      transactionId: transactionId,
      ...dataProduct,
    };
    const newDataProduct = {
      productName: dataProduct?.productName,
      productCategory: dataProduct?.productCategory,
      productImage: dataProduct?.productImage,
      additionalDescription: dataProduct?.additionalDescription,
      price: dataProduct.price,
      amount: dataProduct?.amount - quantity,
    };
    updateProduct(productId, newDataProduct);
    addTransaction(transactionId, newTransaction);
    navigate(`/products/product-detail/${productId}/checkout/transaction/${transactionId}`);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h2>Checkout</h2>
        <div className="card">
          <div className="row ">
            <div className="col-8">
              <div className="card-body">
                <h3 className="card-title">Profile</h3>
                <form onSubmit={handleEditUser}>
                  <div className="form-group my-2">
                    <label htmlFor="text">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="email" value={dataUser.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" value={dataUser.username} onChange={handleInputChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="address">Address</label>
                    <textarea className="form-control" id="address" placeholder="Address" value={dataUser.address} onChange={handleInputChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" placeholder="08xxxxxxxxxx" value={dataUser.phone} onChange={handleInputChange} />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-4">
              <div className="card-body">
                <div className="card shadow bg-white">
                  <img src={dataProduct?.productImage} className="card-img-top" alt="..." />
                  <div className="container py-2">
                    <p className="text-muted">{dataProduct?.productCategory}</p>
                    <h5 className="card-title text-truncate fw-bold">{dataProduct?.productName}</h5>
                    <p className="price">Rp. {dataProduct?.price}</p>
                    <p>Qty: </p>
                    <CountQuantity onChange={setQuantity} value={quantity} />
                    <div className="d-flex justify-content-between">
                      <p>Total Price: </p>
                      {dataProduct?.totalPrice ? <p>Rp. {dataProduct?.totalPrice}</p> : <p>Rp. {dataProduct?.price}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid my-2 px-0">
          <button className="btn btn-primary w-100" onClick={handleClickPurchase}>
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
