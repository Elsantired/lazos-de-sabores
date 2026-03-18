import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Nosotros from '@/components/Nosotros';
import ArroyoCabral from '@/components/ArroyoCabral';
import Productos from '@/components/Productos';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import AuthModal from '@/components/AuthModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Nosotros />
      <ArroyoCabral />
      <Productos />
      <Contacto />
      <Footer />
      <CartSidebar />
      <AuthModal />
      <FloatingWhatsApp />
    </main>
  );
}
