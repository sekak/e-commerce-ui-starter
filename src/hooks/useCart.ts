import { useState, useCallback } from 'react';
import { CartItemsList } from '@/types';

export const useCart = (initialItems: CartItemsList = []) => {
  const [cartItems, setCartItems] = useState<CartItemsList>(initialItems);

  const addToCart = useCallback((item: CartItemsList[0]) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        cartItem => 
          cartItem.id === item.id && 
          cartItem.selectedColor === item.selectedColor && 
          cartItem.selectedSize === item.selectedSize
      );

      if (existingItemIndex > -1) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += item.quantity;
        return newItems;
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: number, selectedColor: string, selectedSize: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
    ));
  }, []);

  const updateQuantity = useCallback((id: number, selectedColor: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedColor, selectedSize);
      return;
    }

    setCartItems(prev => prev.map(item => 
      item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
        ? { ...item, quantity }
        : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };
};
