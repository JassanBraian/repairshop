import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductInquiry from './components/entities/product/baseProduct/ProductInquiry';
import Home from './screens/Home/Home';
import NavbarComp from './components/common/navbar/NavBarComp';
import Footer from './components/common/footer/Footer';
import OffCanvasComp from './components/common/offcanvas/OffCanvasComp';

function App() {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getProducts();
    getClients();
  }, []);

  const getProducts = async () => {
    try {
      const URL = process.env.REACT_APP_API_URL + "product";
      const req = await fetch(URL);
      const info = await req.json();
      if (req.status === 200) {
        setProducts(info.filter(product => !product.deleted));
      }
    } catch (error) {
      throw (error);
    }
  }

  const getClients = async () => {
    try {
      const URL = process.env.REACT_APP_API_URL + "client";
      const req = await fetch(URL);
      const info = await req.json();
      if (req.status === 200) {
        setClients(info.filter(client => !client.deleted));
      }
    } catch (error) {
      throw (error);
    }
  }

  return (
    <BrowserRouter>
      <NavbarComp />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home />
          }
        ></Route>
        <Route
          exact
          path="/products"
          element={
            <ProductInquiry
              clients={clients}
              products={products}
              getProducts={getProducts}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
