//REACT
import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(el => el.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map(el => {
            if(el.id === productToAdd.id){
                return {...el, quantity: el.quantity + 1};
            }
            return el;
        })
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(el => el.id === productToRemove.id);
    if(existingCartItem.quantity !== 1){
        return cartItems.map(el => {
            if(el.id === productToRemove.id){
                return {...el, quantity: el.quantity - 1};
            }
            return el;
        })
    }
    return cartItems.filter(el => el.id !== productToRemove.id);
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(el => el.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {


    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, cartCount, cartTotal, isCartOpen } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((acc, el) => acc + el.quantity , 0);
        const newCartTotal = newCartItems.reduce((acc, el) => acc + el.quantity * el.price , 0);
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, 
            payload: { 
                cartItems: newCartItems ,
                cartTotal: newCartTotal,
                cartCount: newCartCount,
            }
        })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = clearCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload: bool
        })
    }
    
    const value = {
        isCartOpen, 
        cartCount,
        cartTotal,
        cartItems,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };

    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>
}