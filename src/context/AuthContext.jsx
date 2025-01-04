'use client'
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/Constants';

// Create the Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to log out user
  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/auth');  // Redirect to login page
  }, [router]);

  // Function to refresh the access token
  const refreshAccessToken = useCallback(async () => {
    try {
      const savedRefreshToken = localStorage.getItem('refreshToken');
      if (!savedRefreshToken) {
        logout();
        return;
      }

      const response = await fetch(`${BASE_URL}/api/token/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: savedRefreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access);
        localStorage.setItem('accessToken', data.access);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  }, [logout]);

  // Function to verify token validity
  const verifyToken = useCallback(async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/token/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  }, []);

  // Effect to check authentication on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      const savedAccessToken = localStorage.getItem('accessToken');
      const savedRefreshToken = localStorage.getItem('refreshToken');

      if (savedAccessToken && savedRefreshToken) {
        setAccessToken(savedAccessToken);
        setRefreshToken(savedRefreshToken);

        const isValid = await verifyToken(savedAccessToken);
        if (!isValid) {
          await refreshAccessToken();
        }
      } else {
        logout();
      }

      setLoading(false);
    };

    initializeAuth();
  }, [refreshAccessToken, verifyToken, logout]);

  // Effect to refresh token periodically before expiration (every 14 minutes if logged in)
  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); // Refresh every 14 minutes

    return () => clearInterval(interval);
  }, [refreshToken, refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
