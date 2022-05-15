import { useEffect, useReducer } from "react";
import ProductContext from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import { CREATE_PRODUCT } from "../../actions";

const ProductProvider = ({ children }) => {

    const  initialProvider  = {
        products: getProducts(),
        currentProduct: null
    };

    const [provider, dispatch] = useReducer(ProductReducer, initialProvider);

    const addProduct = (product) => dispatch({ type: CREATE_PRODUCT, payload: product });

    const getProducts = async () => {
        try {
            const URL = process.env.REACT_APP_API_URL + "product";
            const req = await fetch(URL);
            const info = await req.json();
            if (req.status === 200) {
                return info.filter(product => !product.deleted);
            }
        } catch (error) {
            throw (error);
        }
    }

    return (
        <ProductContext.Provider value={{
            ...provider,
            addProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
};

export default ProductProvider;
