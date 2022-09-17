//REACT
import { createContext, useState, useEffect } from "react";

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
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((acc, el) => acc + el.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems])


    useEffect(() => {
        const newCartTotal = cartItems.reduce((acc, el) => acc + el.quantity * el.price , 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    }
    
    const value = {
        isCartOpen, 
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>
}