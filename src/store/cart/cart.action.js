import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer";

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


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartItems);
}

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartItems);
}
