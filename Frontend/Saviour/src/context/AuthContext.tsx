import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getDisplayNameFromEmail = (email: string): string => {
    if (!email) return 'User';
    const username = email.split('@')[0];
    const parts = username.split(/[._-]/).filter(Boolean);
    if (parts.length > 0) {
        const first = parts[0];
        return first.charAt(0).toUpperCase() + first.slice(1);
    }
    return username.charAt(0).toUpperCase() + username.slice(1);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('saviour_user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('saviour_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('saviour_user');
        }
    }, [user]);

    const login = (userData: User) => {
        const displayName = userData.name || getDisplayNameFromEmail(userData.email);
        const fullUser = { ...userData, name: displayName };
        setUser(fullUser);
        localStorage.setItem('saviour_user', JSON.stringify(fullUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('saviour_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
