// app/login.tsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../src/store/authSlice';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
   console.log('login page');
   
  }, [])
  

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({ uid: userCredential.user.uid, email: userCredential.user.email! }));
       // Save session to AsyncStorage after successful sign-up
       await AsyncStorage.setItem('userSession', JSON.stringify(userCredential));
      router.push('/task-list');
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => router.push('/sign-up')} />
    </View>
  );
}
