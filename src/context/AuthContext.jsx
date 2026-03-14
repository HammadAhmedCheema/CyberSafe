import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const fetchProfile = async (sessionUser) => {
            try {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', sessionUser.id)
                    .single();
                
                if (error) {
                    console.error("Profile fetch error:", error);
                    return sessionUser;
                }
                return { ...sessionUser, ...profile };
            } catch (err) {
                console.error("Profile fetch catch:", err);
                return sessionUser;
            }
        };

        const initAuth = async () => {
            try {
                setLoading(true);
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    const fullUser = await fetchProfile(session.user);
                    setUser(fullUser);
                }
            } catch (err) {
                console.error("Auth init error:", err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setProfileLoading(true);
                // When logging in or session changes, fetch the latest profile
                const fullUser = await fetchProfile(session.user);
                setUser(fullUser);
                setProfileLoading(false);
            } else {
                setUser(null);
                setProfileLoading(false);
            }
            // Ensure loading is false after state changes
            setLoading(false);
        });

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        setProfileLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('auth-handler', {
                body: { action: 'login', email, password }
            });

            if (error) throw error;
            if (data && data.error) throw new Error(data.error);

            // Fetch profile first to have it ready
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

            const { error: sessionError } = await supabase.auth.setSession({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token
            });

            if (sessionError) throw sessionError;
            
            const fullUser = { ...data.user, ...profile };
            setUser(fullUser);
            return fullUser;
        } finally {
            setProfileLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setProfileLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('auth-handler', {
                body: { action: 'signup', name, email: email.trim(), password }
            });

            if (error) throw error;
            if (data && data.error) throw new Error(data.error);

            // Profiles are usually created via trigger, but let's wait a moment or fetch
            // In our case, the trigger might be slow, so we fetch with retry or just return
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

            const { error: sessionError } = await supabase.auth.setSession({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token
            });

            if (sessionError) throw sessionError;
            
            const fullUser = { ...data.user, ...profile };
            setUser(fullUser);
            return fullUser;
        } finally {
            setProfileLoading(false);
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (err) {
            console.error("Signout error:", err);
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        profileLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {(!loading) && children}
        </AuthContext.Provider>
    );
};
