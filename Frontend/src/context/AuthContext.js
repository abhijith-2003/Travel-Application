import { createContext, useEffect, useReducer } from 'react';

const initial_state = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            // Save user to localStorage immediately on login success
            localStorage.setItem('user', JSON.stringify(action.payload)); 
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "REGISTER_SUCCESS":
            return {
                user: null,
                loading: false,
                error: null,
            };
        case "LOGOUT":
            // Remove user from localStorage on logout
            localStorage.removeItem('user'); 
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_state);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
