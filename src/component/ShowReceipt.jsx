import React, { Component } from "react";
import "../styles/ShowReceipt.css";

class ShowReceipt extends Component {
  dateToTime = purchaseDate => {
    // Create variable currentDate
    // Create variable receiptDate - a date created with the purchaseDate key of the receipt json
    // Variable difference calculates difference in time (milliseconds) between two dates
    // Variable days changes time in milliseconds to days
    // Return 28 - the days to be used to find out the time to expiry on each receipt
    let currentDate = new Date();
    let receiptDate = new Date(purchaseDate);
    let difference = currentDate.getTime() - receiptDate.getTime();
    let days = Math.round(difference / 1000 / 60 / 60 / 24);
    return 28 - days;
  };

  render() {
    const receipt = this.props.receipt;
    const items = receipt.items;
    const daysToExpiry = this.dateToTime(receipt.purchaseDate);

    return (
      <div className="full-receipt">
        <div className="receipt-elements vendor">{receipt.vendor}</div>
        <div
          className={
            daysToExpiry > 8
              ? "receipt-age-green"
              : daysToExpiry > 0
              ? "receipt-age-blue"
              : "receipt-age-red"
          }
        >
          {daysToExpiry > 0 ? `Expiry in: ${daysToExpiry} days` : "EXPIRED"}
        </div>
        <div className="store-info-section">
          <div className="receipt-elements space-between">
            <div>{receipt.storeName}</div>
            <div>{receipt.storePhoneNo}</div>
          </div>
          <div className="receipt-elements space-between">
            <div className="date-time">
              <div>{receipt.purchaseDate}</div>
              <div>{receipt.purchaseTime}</div>
            </div>
            <ul className="receipt-elements location">
              <li>{receipt.storeLocation.company}</li>
              <li>{receipt.storeLocation.road}</li>
              <li>{receipt.storeLocation.town}</li>
              <li>{receipt.storeLocation.postcode}</li>
            </ul>
          </div>
          <div className="receipt-elements space-between vat-number">
            <div>VAT Number:</div>
            <div>{receipt.vatNumber}</div>
          </div>
        </div>
        <div className="total-costs-section">
          {items.map((item, i) => {
            return (
              <div className="receipt-elements each-item" key={i}>
                <div className="space-between">
                  <div>{item.title}</div>
                  <div>£{item.price}</div>
                </div>
                <div className="return-period">
                  Return Period: {item.returnPeriod} days
                </div>
              </div>
            );
          })}
          <div className="receipt-elements space-between total-price">
            <div>BALANCE DUE:</div>
            <div>£{receipt.totalPrice}</div>
          </div>
          <div className="receipt-elements space-between tender-type">
            <div>{receipt.tenderType}:</div>
            <div>£{receipt.amountTendered}</div>
          </div>
          <div className="receipt-elements space-between change">
            <div>CHANGE:</div>
            <div>£{receipt.change}</div>
          </div>
          <div className="receipt-elements space-between auth-code">
            <div>AUTH Code:</div>
            <div>{receipt.authorisationCode}</div>
          </div>
          <div className="receipt-elements space-between vat">
            <div>VAT (20%):</div>
            <div>£{receipt.vatValue}</div>
          </div>
        </div>
        <div className="receipt-elements space-between receipt-app-id">
          <div>{receipt.app}</div>
          <div>#{receipt.id}</div>
        </div>
        <div className="delete-receipt-btn">
          <button
            onClick={() =>
              this.props.deleteReceipt(this.props.receiptId, this.props.vendor)
            }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default ShowReceipt;
