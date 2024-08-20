import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create Context
export const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) =>
{
    const [userId, setUserId] = useState(null);

    useEffect(() =>
    {
        const id = uuidv4();
        setUserId(id);
    }, []);

    return (
        <UserContext.Provider value={{ userId }}>
            {children}
        </UserContext.Provider>
    );
};