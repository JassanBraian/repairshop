import { GET_CLIENTS } from "../../actions";

export function ClientReducer(provider, action) {
    switch (action.type) {
        case GET_CLIENTS:
            return {
                ...provider,
                clients: action.payload.filter(client => !client.deleted)
            }

        default:
            return provider;
    }
};

export default ClientReducer;