import React, { useContext, useState } from "react";
import '../../Styles/Newsletter.css'

const GHSContext = React.createContext();

export const useGHStContext = () => {
    return useContext(GHSContext);
};


export function GHSProvider({ children }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <GHSContext.Provider
            value={{
                modalOpen,
                setModalOpen
            }}
        >
            {children}
        </GHSContext.Provider>

    );
}