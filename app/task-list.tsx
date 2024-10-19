// app/task-list.tsx
import React, { useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksForUser } from '../src/service/taskService';
import { setTasks } from '../src/store/taskSlice';
import { RootState } from '../src/store/store';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout } from '../src/store/authSlice';

export default function TaskListScreen() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      if (user) {
        const fetchedTasks = await fetchTasksForUser(user.uid);
        dispatch(setTasks(fetchedTasks));
      }
    };
    loadTasks();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    router.push('/login');
  };

  return (
    <View>
      <Button title="Add Task" onPress={() => router.push('/add-task')} />
      <Button title="Logout" onPress={handleLogout} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
