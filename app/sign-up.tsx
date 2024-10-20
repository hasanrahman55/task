// app/sign-up.tsx
import React, { useState } from 'react';
import { TextInput, Button, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../src/store/authSlice';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(login({ uid: userCredential.user.uid, email: userCredential.user.email! }));
       // Save session to AsyncStorage after successful login
       await AsyncStorage.setItem('userSession', JSON.stringify(userCredential));
      router.push('/task-list');
    } catch (error) {
      Alert.alert("Sign-up Error", error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Go to Login" onPress={() => router.push('/login')} />
    </View>
  );
}
