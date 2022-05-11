import { CREATE_PRODUCT } from "../../actions";

export function ProductReducer(provider, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...provider,
                products: [...provider.products, action.payload]
            };

        default:
            return provider;
    }
}