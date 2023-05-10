import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TransactionContext } from '../../context/transaction-context';
import { doc, getDoc, query, where } from 'firebase/firestore';
import { db, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const TransactionPage = () => {
  const { transactionId } = useParams();
  const { updateTransaction } = useContext(TransactionContext);

  const [imageFile, setImageFile] = useState(null);

  const [dataTransaction, setDataTransaction] = useState({});

  useEffect(() => {
    const getTransaction = async () => {
      const transactionRef = doc(db, 'transactions', transactionId);
      const docSnap = await getDoc(transactionRef);
      if (docSnap.exists()) {
        setDataTransaction(docSnap.data());
      } else {
        setDataTransaction({});
      }
    };
    getTransaction();
  }, []);

  const addImageConfirmTransaction = async () => {
    if (imageFile) {
      const metadata = {
        contentType: 'image/jpeg',
      };

      const fileName = new Date().getTime() + imageFile.name;

      const productImageStorageRef = ref(storage, 'transaction/' + fileName);
      await uploadBytesResumable(productImageStorageRef, imageFile, metadata);
      const imageURL = getDownloadURL(productImageStorageRef);

      return imageURL;
    }
  };

  const handleSubmitConfirmation = async (e) => {
    e.preventDefault();
    const imageUrl = await addImageConfirmTransaction();

    const newDataTransaction = {
      transactionImage: imageUrl,
    };

    updateTransaction(transactionId, newDataTransaction);
  };

  return (
    <div className="transaction-page">
      <div className="container">
        <div className="card text-center">
          <div className="card-body">
            <h2>Payment</h2>
            <p>Please confirm payment on this page. Make sure that the transfer slip entered is correct.</p>

            <div className="card py-2 ">
              <h5 className="card-title">Total Price</h5>
              {dataTransaction && <p className="price">Rp. {dataTransaction?.totalPrice}</p>}
            </div>
            <div className="card-body">
              <p>Please input the transfer slip on below.</p>
              <form onSubmit={handleSubmitConfirmation}>
                <input type="file" className="form-control" onChange={(e) => setImageFile(e.target.files[0])} />
                <button type="submit" className="btn btn-primary mt-2">
                  Konfirmasi Pembayaran
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
