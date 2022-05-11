import { useReducer } from "react";
import ProductContext from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import { CREATE_PRODUCT } from "../../actions";

const ProductProvider = ({ children }) => {

    const initialProvider = {
        products: [],
        currentProduct: null
    };

    const [provider, dispatch] = useReducer(ProductReducer, initialProvider);

    const addProduct = (product) => dispatch({ type: CREATE_PRODUCT, payload: product });

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
