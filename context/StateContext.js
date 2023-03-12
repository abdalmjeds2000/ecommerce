import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;

  const incQty = () => {
    setQty(prev => prev + 1);
  }
  const decQty = () => {
    setQty(prev => {
      if(prev - 1 < 1) return 1;
      return prev - 1;
    });
  }

  const onAdd = (product, quantity) => {
    setTotalPrice(prev => prev + product.price * quantity);
    setTotalQuantities(prev => prev + quantity);
    setQty(1);

    const checkProductInCard = cartItems.find(item => item?._id === product._id);
    if(checkProductInCard) {
      const updateCartItems = cartItems.map(cartProduct => {
        if(cartProduct?._id === product?._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        return cartProduct
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  }
  const onRemove = (product) => {
    const newCartItems = cartItems.filter(item => item._id !== product._id);
    setCartItems(newCartItems);
    setTotalPrice(prev => prev - product.price * product.quantity);
    setTotalQuantities(prev => prev - product.quantity);
    toast.success(`${product.name} deleted from the cart.`);
  }
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find(item => item?._id === id);
    if(value === "inc") {
      const newCartItems = cartItems.map(item => {
        if(item?._id === id) item = { ...foundProduct, quantity: foundProduct.quantity + 1 };
        return {...item};
      });
      setCartItems(newCartItems);
      setTotalPrice(prev => prev + foundProduct.price);
      setTotalQuantities(prev => prev + 1);
    } else if(value === "dec") {
      if(foundProduct.quantity > 1) {
        const newCartItems = cartItems.map(item => {
          if(item?._id === id) item = { ...foundProduct, quantity: foundProduct.quantity - 1 };
          return {...item};
        });
        setCartItems(newCartItems);
        setTotalPrice(prev => prev - foundProduct.price);
        setTotalQuantities(prev => prev - 1);
      }
    }
  }

  return (
    <Context.Provider value={{
      showCart, setShowCart,
      cartItems, setCartItems,
      totalPrice, setTotalPrice,
      totalQuantities, setTotalQuantities,
      qty, 
      incQty, 
      decQty,
      onAdd,
      toggleCartItemQuantity,
      onRemove
    }}>
      {children}
    </Context.Provider>
  )
}


export const useStateContext = () => useContext(Context);