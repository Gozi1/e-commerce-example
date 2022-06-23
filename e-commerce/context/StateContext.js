import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { auth, logInWithEmailAndPassword,registerWithEmailAndPassword,logout,db } from "../Lib/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from 'next/router'


const Context = createContext()
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    const [user, loading, error] = useAuthState(auth);
    

    let foundProduct;
    let index;
    const login =async(email,password)=>{
      await logInWithEmailAndPassword(email,password)
      return  
    }
    const signUp =async(email,password)=>{
      await registerWithEmailAndPassword(email,password)
      await logInWithEmailAndPassword(email,password)
      return
      
    }
    
   
    const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find((item) => item._id === product._id);
      
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      
      if(checkProductInCart) {
        const updatedCartItems = cartItems.map((cartProduct) => {
          if(cartProduct._id === product._id) return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        })
  
        setCartItems(updatedCartItems);
      } else {
        product.quantity = quantity;
        
        setCartItems([...cartItems, { ...product }]);
      }
  
      toast.success(`${qty} ${product.name} added to the cart.`);
    } 
  
    const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);
  
      setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
    }
  
    const toggleCartItemQuanitity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id)
      index = cartItems.findIndex((product) => product._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id)
      let updatedCartItem;
      let updatedCartItems;
      
      if(value === 'inc') {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
        updatedCartItem = {
          ...foundProduct,
          quantity: foundProduct.quantity +1
       }
        updatedCartItems = [...cartItems];
        updatedCartItems[index] = updatedCartItem
        setCartItems([...updatedCartItems])
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if(value === 'dec') {
        if (foundProduct.quantity > 1) {
          updatedCartItem = {
            ...foundProduct,
            quantity: foundProduct.quantity -1
        }
          updatedCartItems = [...cartItems];
          updatedCartItems[index] = updatedCartItem
          setCartItems([...updatedCartItems])
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
      }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        })
      }
      return (
        <Context.Provider
        value={{
          showCart,
          setShowCart,
          cartItems,
          totalPrice,
          totalQuantities,
          qty,
          incQty,
          decQty,
          onAdd,
          toggleCartItemQuanitity,
          onRemove,
          setCartItems,
          setTotalPrice,
          setTotalQuantities,
          login,
          signUp,
          logout,
          user
        }}
            >
              {children}
            </Context.Provider>
          )
        }
        
        export const useStateContext = () => useContext(Context);