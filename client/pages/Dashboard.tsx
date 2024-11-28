import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useSystemContext } from "../hooks/useSystemContext";

const Dashboard = () => {
    const { dispatch } = useSystemContext();

    const disconnect = useQuery(
        ['system'],
        async () => {
            return await fetch('/system/disconnect').then(response => response.json());
        },
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if (disconnect.data) {
            localStorage.removeItem('system');
            dispatch({ type: "DISCONNECT" })
            console.log(disconnect.data);
        }
    }, [disconnect.data]);

    return (
        <div>
            Dashboard
            <section>
                <button onClick={() => disconnect.refetch()}>Disconnect</button>
            </section>
        </div>
    );
};

export default Dashboard;