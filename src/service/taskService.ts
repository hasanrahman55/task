// src/services/taskService.ts
import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const tasksCollection = collection(db, 'tasks');

export const addTaskToFirestore = async (task: any) => {
  await addDoc(tasksCollection, task);
};

export const fetchTasksForUser = async (userId: string) => {
  const q = query(tasksCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
