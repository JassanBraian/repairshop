import { useReducer } from "react";
import ProductContext from "./ProductContext";
import { GET_PRODUCTS } from '../../actions';
import ProductReducer from "./ProductReducer";

const ProductProvider = ({ children }) => {

    const initialProvider = {
        products: []
    };

    const [provider, dispatch] = useReducer(ProductReducer, initialProvider);

    const getProducts = async () => {
        try {
            const URL = process.env.REACT_APP_API_URL + "product";
            const req = await fetch(URL);
            const info = await req.json();
            req.status === 200
                && dispatch({ type: GET_PRODUCTS, payload: info });
        } catch (error) {
            throw (error);
        }
    }

    return (
        <ProductContext.Provider value={{
            ...provider,
            getProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;