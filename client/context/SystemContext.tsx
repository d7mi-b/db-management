import React, { Context, createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";

interface SystemState {
    system: string | null;
    isConnected: boolean;
}

type SystemAction = 
    | { type: "CONNECT"; payload: string }
    | { type: "DISCONNECT" };

interface SystemContextProps extends SystemState {
    dispatch: Dispatch<SystemAction>;
}

export const SystemContext = createContext<SystemContextProps | null>(null);

export const systemReducer = (state: SystemState, action: SystemAction): SystemState => {
    switch (action.type) {
        case "CONNECT":
            return {
                system: action.payload,
                isConnected: true
            }
        case "DISCONNECT":
            return {
                system: null,
                isConnected: false
            }
        default:
            return state;
    }
}

export const SystemContextProvider = ({ children }) => {
    const [state, dispatch]: [SystemState, Dispatch<SystemAction>] = useReducer(systemReducer, {
        system: null,
        isConnected: false
    });

    console.log("SystemContent state: ", state);

    useEffect(() => {
        const system = localStorage.getItem('system');

        if (system) {
            dispatch({
                type: "CONNECT",
                payload: system
            })
        }
    }, []);

    return (
        <SystemContext.Provider value={{...state, dispatch}}>
            {children}
        </SystemContext.Provider>
    )
}