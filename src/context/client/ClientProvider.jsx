import { useReducer, useEffect } from "react";
import ClientContext from './ClientContext';
import { GET_CLIENTS } from "../../actions";
import ClientReducer from './ClientReducer';

const ClientProvider = ({ children }) => {

    useEffect(() => {
        getClients();
    }, []);

    const initialProvider = {
        clients: []
    }

    const [provider, dispatch] = useReducer(ClientReducer, initialProvider);

    const getClients = async () => {
        try {
            const URL = process.env.REACT_APP_API_URL + "client";
            const req = await fetch(URL);
            const info = await req.json();
            req.status === 200
                && dispatch({ type: GET_CLIENTS, payload: info });
        } catch (error) {
            throw error;
        }
    }

    return (
        <ClientContext.Provider value={{
            ...provider,
            getClients
        }}>
            {children}
        </ClientContext.Provider>
    );
};

export default ClientProvider;