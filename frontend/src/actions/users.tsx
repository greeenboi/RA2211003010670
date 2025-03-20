'use client';

import { toast } from 'sonner';
import type { Post, User } from '@/data/sample-data';
import { CONFIG } from '@/lib/config';

const API_BASE_URL = CONFIG.api.base_url;

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/all`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';
    toast.error(errorMessage);
    return [];
  }
}

export async function fetchUserPosts(userId: string | number): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user posts: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Failed to fetch posts for user ${userId}`;
    toast.error(errorMessage);
    return [];
  }
}

export async function fetchUserById(userId: string | number): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Failed to fetch user ${userId}`;
    toast.error(errorMessage);
    return null;
  }
}


export async function fetchTopUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    
    if (!response.ok) {
      const allUsersResponse = await fetch(`${API_BASE_URL}/users`);
      
      if (!allUsersResponse.ok) {
        throw new Error(`Failed to fetch top users: ${allUsersResponse.status}`);
      }
      
      const allUsers = await allUsersResponse.json();
      return allUsers;
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch top users';
    toast.error(errorMessage);
    return [];
  }
}
