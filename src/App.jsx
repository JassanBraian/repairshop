import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductInquiry from './components/entities/product/baseProduct/ProductInquiry';
import Home from './screens/Home/Home';
import NavbarComp from './components/common/navbar/NavBarComp';
import Footer from './components/common/footer/Footer';
import { Stack } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();

  }, []);

  const getProducts = async () => {
    try {
      const URL = process.env.REACT_APP_API_URL + "product";
      const req = await fetch(URL);
      const info = await req.json();
      if (req.status === 200) {
        setProducts(info);
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
            <ProductInquiry products={products} />
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
