import React from 'react';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Router from '../../router/Router';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation(); 

  const hideHeaderFooterRoutes = ['/login', '/register'];


  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeaderFooter && <Header />} 
      <Router />
      {!shouldHideHeaderFooter && <Footer />} 
    </div>
  );
};

export default Layout;
