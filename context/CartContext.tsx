'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Variante, buscarVariante } from '@/data/catalog';
import { reproducirSonidoAgregado } from '@/lib/sound';

export interface CartItem {
  id: string;
  catId: string;
  productoId: string;
  varianteIdx: number;
  nombre: string;
  img: string;
  variante: Variante;
  cantidad: number;
  sabor?: string;
}

// Refresca nombre/imagen/variante contra el catálogo vigente, para que un
// carrito guardado en el navegador no arrastre precios o pesos viejos.
function rehidratar(item: CartItem): CartItem | null {
  const actual = buscarVariante(item.productoId, item.varianteIdx);
  if (!actual) return null;
  const img = item.sabor && actual.categoria.saboresImgs?.[item.sabor]
    ? actual.categoria.saboresImgs[item.sabor]
    : actual.producto.img;
  return { ...item, catId: actual.categoria.id, nombre: actual.producto.nombre, img, variante: actual.variante };
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
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const subtotalItem = (i: CartItem) =>
  i.variante.precio * (i.variante.pesoAprox ?? 1) * i.cantidad;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lzs_carrito');
    if (saved) {
      const parsed: CartItem[] = JSON.parse(saved);
      const vigentes = parsed.map(rehidratar).filter((i): i is CartItem => i !== null);
      setItems(vigentes);
    }
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
    reproducirSonidoAgregado();
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, cantidad: i.cantidad + delta } : i)
      .filter(i => i.cantidad > 0)
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + subtotalItem(i), 0);
  const count = items.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen, isCheckoutOpen, setIsCheckoutOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
