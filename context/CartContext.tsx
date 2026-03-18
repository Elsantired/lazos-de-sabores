'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Variante } from '@/data/catalog';

export interface CartItem {
  id: string;
  catId: string;
  nombre: string;
  img: string;
  variante: Variante;
  cantidad: number;
  sabor?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cantidad'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lzs_carrito');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('lzs_carrito', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'cantidad'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...item, cantidad: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, cantidad: i.cantidad + delta } : i)
      .filter(i => i.cantidad > 0)
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.variante.precio * i.cantidad, 0);
  const count = items.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
