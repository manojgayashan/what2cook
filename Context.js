import React, { createContext, useState, useEffect, useMemo } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import COLORS from "./src/constants/colors";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [homeUrl, setHomeUrl] = useState('https://dhabione.com/');
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      offlineAccess: false,
    });

    const subscriber = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber;
  }, [initializing]);

  const handleAuthError = (error) => {
    setAuthError(error?.message || 'Authentication failed.');
    throw error;
  };

  const signInWithEmail = async (email, password) => {
    try {
      setAuthError(null);
      return await auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signUpWithEmail = async ({ email, password, displayName, photoURI }) => {
    try {
      setAuthError(null);
      const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);
      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: displayName.trim(),
          photoURL: photoURI,
        });
      }
      return userCredential;
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return await auth().signInWithCredential(googleCredential);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signOut = async () => {
    try {
      setAuthError(null);
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      handleAuthError(error);
    }
  };

  const contextValue = useMemo(
    () => ({
      homeUrl,
      setHomeUrl,
      user,
      initializing,
      authError,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [homeUrl, user, initializing, authError]
  );

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={contextValue}
      >

        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.whiteMain} />
        {children}
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};