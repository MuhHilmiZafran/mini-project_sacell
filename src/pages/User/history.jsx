import React, { useContext, useEffect, useState } from 'react';
import CardHistory from '../../components/card/card-history';
import { TransactionContext } from '../../context/transaction-context';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserContext } from '../../context/auth-context';

const HistoryPage = () => {
  const { user } = useContext(UserContext);

  const [dataTransaction, setDataTransaction] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      if (user) {
        const transactionRef = collection(db, 'transactions');
        const querySnap = await getDocs(query(transactionRef, where('userId', '==', user.uid)));
        if (!querySnap.empty) {
          setDataTransaction(querySnap.docs.map((doc) => doc.data()));
        } else {
          setDataTransaction([]);
        }
      }
    };

    getTransaction();
  }, [user]);

  return (
    <div className="page">
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h5 className="d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-secondary">
              <span>History</span>
            </h5>
          </div>
          <div className="col-9">
            <div className="row d-flex flex-column">
              {dataTransaction?.map((transaction) => (
                <div className="col" key={transaction.transactionId}>
                  <CardHistory transactions={transaction} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
