import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.filter(eachProduct => eachProduct.id === id)
    if (product[0].quantity === 1) {
      this.removeCartItem(id)
    } else {
      const updatedList = cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          const updatedQuantity = eachProduct.quantity - 1
          return {
            ...eachProduct,
            quantity: updatedQuantity,
          }
        }
        return {
          ...eachProduct,
        }
      })
      this.setState({cartList: [...updatedList]})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachProduct => {
      if (eachProduct.id === id) {
        const updatedQuantity = eachProduct.quantity + 1
        return {
          ...eachProduct,
          quantity: updatedQuantity,
        }
      }
      return {
        ...eachProduct,
      }
    })
    this.setState({cartList: [...updatedList]})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    const productExist = cartList.find(eachProduct => eachProduct.id === id)
    if (productExist) {
      this.incrementCartItemQuantity(id)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachProduct => eachProduct.id !== id)
    this.setState({cartList: [...updatedList]})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
