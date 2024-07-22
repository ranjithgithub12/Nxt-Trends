import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isCodSelected, setIsCodSelected] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = event => {
    const {value} = event.target
    setPaymentMethod(value)
    setIsCodSelected(value === 'Cash On Delivery')
  }

  const handleConfirmOrder = () => {
    if (isCodSelected) {
      setOrderPlaced(true)
    }
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <div>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-button d-sm-none">
                      Checkout
                    </button>
                  }
                >
                  {close => (
                    <div className="popup-container">
                      {orderPlaced ? (
                        <p className="success-message">
                          Your order has been placed successfully
                        </p>
                      ) : (
                        <>
                          <h2>Select Payment Method</h2>
                          <ul className="unorder-list-of-popup">
                            <li className="list-of-popup">
                              <input
                                type="radio"
                                id="card"
                                name="payment"
                                value="Card"
                                onChange={handlePaymentChange}
                                disabled
                              />
                              <label htmlFor="card">Card</label>
                            </li>
                            <li className="list-of-popup">
                              <input
                                type="radio"
                                id="netBanking"
                                name="payment"
                                value="Net Banking"
                                onChange={handlePaymentChange}
                                disabled
                              />
                              <label htmlFor="netBanking">Net Banking</label>
                            </li>
                            <li className="list-of-popup">
                              <input
                                type="radio"
                                id="upi"
                                name="payment"
                                value="UPI"
                                onChange={handlePaymentChange}
                                disabled
                              />
                              <label htmlFor="upi">UPI</label>
                            </li>
                            <li className="list-of-popup">
                              <input
                                type="radio"
                                id="wallet"
                                name="payment"
                                value="Wallet"
                                onChange={handlePaymentChange}
                                disabled
                              />
                              <label htmlFor="wallet">Wallet</label>
                            </li>
                            <li className="list-of-popup">
                              <input
                                type="radio"
                                id="cod"
                                name="payment"
                                value="Cash On Delivery"
                                onChange={handlePaymentChange}
                              />
                              <label htmlFor="cod">Cash On Delivery</label>
                            </li>
                          </ul>
                          <div className="summary-container">
                            <p>{cartList.length} Items</p>
                            <p>Total: Rs {total}/-</p>
                          </div>
                          <button
                            type="button"
                            className="confirm-order-button"
                            onClick={handleConfirmOrder}
                            disabled={!isCodSelected}
                          >
                            Confirm Order
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
