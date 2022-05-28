import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductInquiry from './components/entities/product/baseProduct/ProductInquiry';
import Home from './screens/Home/Home';
import NavbarComp from './components/common/navbar/NavBarComp';
import Footer from './components/common/footer/Footer';
import ProductProvider from './context/product/ProductProvider';
import ClientProvider from './context/client/ClientProvider';

function App() {

  return (
    <ProductProvider>
      <ClientProvider>
        <Router>
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
                <ProductInquiry />
              }
            ></Route>
          </Routes>
          <Footer />
        </Router>
      </ClientProvider>
    </ProductProvider>
  );
}

export default App;
