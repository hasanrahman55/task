import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import store from '@/src/store/store';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('login');

  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        setInitialRoute('task-list');
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  if (loading) {
    // Return a loading indicator or splash screen while checking session
    // return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <Stack initialRouteName={initialRoute} />
    </Provider>
  );
}
