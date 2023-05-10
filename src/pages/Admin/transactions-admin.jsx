import { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../../context/transaction-context';

import { serverTimestamp } from 'firebase/firestore';

const TransactionList = () => {
  const { transactions, updateTransaction } = useContext(TransactionContext);

  const handleOnProcess = async (id) => {
    const newDataTransaction = {
      process: 'On Process',
      updatedAt: serverTimestamp(),
    };

    await updateTransaction(id, newDataTransaction);
  };

  const handleReject = async (id) => {
    const newDataTransaction = {
      process: 'Reject',
      updatedAt: serverTimestamp(),
    };

    await updateTransaction(id, newDataTransaction);
  };

  return (
    <div>
      <section className="tb-list-Transaction position-relative">
        <div className="container">
          <div className="row d-flex flex-column">
            <div className="col">
              <div className="col d-flex justify-content-center">
                <h2>List Transaction</h2>
              </div>
            </div>

            <div className="col">
              <table className="table table-striped w-100">
                <thead>
                  <tr>
                    <th scope="col">ID Transaction</th>
                    <th scope="col">ID Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Category</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Transfer Split</th>
                    <th scope="col">Proses</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="tb-body">
                  {transactions?.map((transaction) => (
                    <tr scope="row" key={transaction.transactionId}>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.id}</td>
                      <td>{transaction.productName}</td>
                      <td>{transaction.productCategory}</td>
                      <td>{transaction.price}</td>
                      <td>{transaction.quantity}</td>
                      <td>{transaction.totalPrice}</td>

                      <td>
                        <img width={100} height={100} src={transaction.transactionImage} />
                      </td>
                      <td>{transaction.process}</td>

                      <td>
                        {' '}
                        <div className="btn btn-outline-success mb-2" onClick={() => handleOnProcess(transaction.transactionId)}>
                          On Process
                        </div>
                        <div className="btn btn-danger" onClick={() => handleReject(transaction.transactionId)}>
                          Reject
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

export default TransactionList;
