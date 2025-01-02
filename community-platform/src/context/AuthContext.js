import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', storedUser); 
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      console.log('User state set to:', userData);
      
      const storedOnlineStatus = localStorage.getItem('onlineStatus');
      if (storedOnlineStatus !== null) {
        setIsOnline(storedOnlineStatus === 'true');
      }
    }

    const handleOnlineStatusChange = (event) => {
      if (event.key === 'onlineStatus') {
        setIsOnline(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('storage', handleOnlineStatusChange);
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsOnline(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('onlineStatus', 'true');
    console.log('User logged in and stored in localStorage:', userData);
  };

  const logout = () => {
    localStorage.setItem('onlineStatus', 'false');
    setUser(null);
    setIsOnline(false);
    localStorage.removeItem('user');
    localStorage.removeItem('loggedInUserId');
  };

  const updateOnlineStatus = (status) => {
    setIsOnline(status);
    localStorage.setItem('onlineStatus', status.toString());

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'onlineStatus',
      newValue: status.toString()
    }));
    
    if (!status && user) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u => {
        if (u.userid === user.userid) {
          return {
            ...u,
            profile: {
              ...u.profile,
              privacy: {
                ...u.profile?.privacy,
                lastOnline: new Date().toISOString()
              }
            }
          };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'onlineStatus',
      newValue: status.toString()
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isOnline, 
      updateOnlineStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;