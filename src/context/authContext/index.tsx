/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable  consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import firebaseClient from '@/lib/modules/firebaseClient';

const AuthContext = createContext({});

interface User {
  email: string;
  photoUrl: string;
  uid: string;
}

export const AuthProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseClient
      .auth()
      .onAuthStateChanged(async (userDetails) => {
        // console.log(user);

        if (userDetails) {
          try {
            setIsLoggedIn(true);
            setUser({
              email: userDetails?.email ?? '',
              photoUrl: userDetails?.photoURL ?? '',
              uid: userDetails.uid,
            });

            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
        }
      });
    return unsubscribe;
  }, []);

  const login = async () => {
    const googleProvider = new firebaseClient.auth.GoogleAuthProvider();
    firebaseClient
      .auth()
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        console.log(result.user);
        setIsLoggedIn(true);
        setUser({
          email: result.user?.email ?? '',
          photoUrl: result.user?.photoURL ?? '',
          uid: result.user?.uid ?? '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = async () => {
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log('error while sign out', error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ login, logOut, isLoggedIn, user, loading }}
      {...props}
    />
  );
};

export const useAuth = () => useContext(AuthContext);
