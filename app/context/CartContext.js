'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      }
      
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.selectedStorage === action.payload.selectedStorage &&
        item.selectedColor === action.payload.selectedColor
      )
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            item.selectedStorage === action.payload.selectedStorage &&
            item.selectedColor === action.payload.selectedColor
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.selectedStorage === action.payload.selectedStorage &&
            item.selectedColor === action.payload.selectedColor)
        )
      }
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && 
          item.selectedStorage === action.payload.selectedStorage &&
          item.selectedColor === action.payload.selectedColor
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
      
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  })

  // Load cart from sessionStorage on mount
  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem('cart')
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) })
      }
    } catch (error) {
      console.log('No saved cart found')
    }
  }, [])

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem('cart', JSON.stringify(state.items))
    } catch (error) {
      console.log('Could not save cart')
    }
  }, [state.items])

  const addToCart = (product, selectedStorage = null, selectedColor = null) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedStorage: selectedStorage || product.storage[0],
        selectedColor: selectedColor || product.colors[0],
        variant: product.variant
      }
    })
  }

  const removeFromCart = (id, selectedStorage, selectedColor) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id, selectedStorage, selectedColor }
    })
  }

  const updateQuantity = (id, selectedStorage, selectedColor, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedStorage, selectedColor)
      return
    }
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, selectedStorage, selectedColor, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}