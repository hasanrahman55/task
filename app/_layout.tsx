import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { Stack, useRouter } from 'expo-router';
import store from '@/src/store/store';
import { ActivityIndicator, View } from 'react-native';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // Track if layout is mounted
  const router = useRouter();

  useEffect(() => {
    // Set isMounted to true when the component mounts
    setIsMounted(true);

    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');

        if (userSession) {
          // If the user is logged in, navigate to the task-list page
          console.log("User is logged in, navigating to task-list");
          router.replace('/task-list'); // Use replace to prevent going back
        } else {
          // If not logged in, navigate to the login page
          console.log("User not logged in, navigating to login");
          router.replace('/login'); // Use replace to prevent going back
        }
      } catch (error) {
        console.error("Failed to check user session:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only check user session if the component is mounted
    if (isMounted) {
      checkUserSession();
    }

    // Cleanup function to reset isMounted on unmount
    return () => setIsMounted(false);
  }, [isMounted, router]);

  if (loading) {
    // Return a loading indicator while the session is being checked
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
