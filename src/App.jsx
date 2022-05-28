import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductInquiry from './components/entities/product/baseProduct/ProductInquiry';
import Home from './screens/Home/Home';
import NavbarComp from './components/common/navbar/NavBarComp';
import Footer from './components/common/footer/Footer';
import OffCanvasComp from './components/common/offcanvas/OffCanvasComp';
import ProductProvider from './context/product/ProductProvider';

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const URL = process.env.REACT_APP_API_URL + "client";
      const req = await fetch(URL);
      const info = await req.json();
      if (req.status === 200) {
        setClients(info.filter(client => !client.deleted));
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <Router>
      <ProductProvider>
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
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </ProductProvider>
    </Router>
  );
}

export default App;
