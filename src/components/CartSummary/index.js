import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const itemsCount = cartList.length

      let total = 0
      cartList.forEach(product => {
        total += product.price * product.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1 className="total">
            Order Total:<span className="total-price"> Rs {total}/-</span>
          </h1>
          <p>{itemsCount} Items in Cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
