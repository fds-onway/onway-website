import { useEffect, useState } from 'react';
import { getToken } from './auth';
import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  // add other fields as needed
}

export async function fetchUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await api.get<User>('/auth/me');
    return res.data;
  } catch {
    return null;
  }
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  return user;
}
