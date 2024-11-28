import React, { useContext } from "react"
import { SystemContext } from "../context/SystemContext"

export const useSystemContext = () => {
    const context = useContext(SystemContext);

    if (!context) {
        throw new Error("useSystemContext must be used within a SystemContextProvider");
    }

    return context;
}