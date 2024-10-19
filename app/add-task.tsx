// app/add-task.tsx
import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToFirestore } from '../src/service/taskService';
import { addTask } from '../src/store/taskSlice';
import { RootState } from '../src/store/store';
import { useRouter } from 'expo-router';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddTask = async () => {
    if (user) {
      const task = { title, userId: user.uid };
      await addTaskToFirestore(task);
      dispatch(addTask(task));
      router.push('/task-list');
    }
  };

  return (
    <View>
      <TextInput placeholder="Title" onChangeText={setTitle} value={title} />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}
