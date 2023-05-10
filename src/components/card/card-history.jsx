import React from 'react';

const CardHistory = ({ transactions }) => {
  return (
    <div className="card">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
              <div className="row d-block d-sm-flex text-sm-center text-sm-left">
                <div className="col mr-3 mr-sm-4" href="#">
                  <img src={transactions?.productImage} alt="Product" width={200} height={200} />
                </div>
                <div className="col text-left">
                  <h3 className="card-title font-weight-semibold border-0 pb-0">{transactions?.productName}</h3>
                  <p className="font-size-sm">
                    <span className="text-muted mr-2">Category: </span>
                    {transactions?.productCategory}
                  </p>
                  <p className="font-size-sm">
                    <span className="text-muted mr-2">Quantitiy: </span>
                    {transactions?.quantity}
                  </p>
                  <p className="font-size-lg text-primary pt-2">
                    Normal Price: <span className="price">Rp. {transactions?.price}</span>
                  </p>
                  <p className="font-size-lg text-primary pt-2">
                    Total Price: <span className="price">Rp. {transactions?.totalPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
