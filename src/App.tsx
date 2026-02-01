import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import { useAuthStore } from "./stores/useAuthStore";
import SplashScreen from "./components/common/SplashScreen";
import PageLoader from "./components/common/PageLoader";
import ChatWidget from "./components/chat/ChatWidget";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthCallback from "./pages/auth/AuthCallback";
import Cart from "./pages/cart/Cart";
import WishlistPage from "./pages/wishlist/WishlistPage";
import AccountPage from "./pages/account/AccountPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import CancellationsPage from "./pages/cancellations/CancellationsPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import CategoryPage from "./pages/category/CategoryPage";
import FlashSalesPage from "./pages/flashsales/FlashSalesPage";
import BestSellingPage from "./pages/bestselling/BestSellingPage";
import OurProductsPage from "./pages/ourproducts/OurProductsPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import CheckoutPage from "./pages/checkout/CheckOutPage";
import OrderSuccessPage from "./pages/checkout/OrderSuccessPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import FAQ from "./pages/legal/FAQ";
import TermsOfUse from "./pages/legal/TermsOfUse";

function App() {
  const { checkSession } = useAuthStore();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (showSplash) return;

    const id = requestAnimationFrame(() => {
      setIsPageLoading(true);
    });

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timer);
    };
  }, [location.pathname, showSplash]);

  return (
    <>
      {/* Splash Screen - Shows once on initial load */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Page Loader - Shows on route changes */}
      <PageLoader isLoading={isPageLoading} />
      {/* Chat Widget - Available on all pages */}
      {!showSplash && <ChatWidget />}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/cancellations" element={<CancellationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/flash-sales" element={<FlashSalesPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/our-products" element={<OurProductsPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Route>

        {/* Auth routes without MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
