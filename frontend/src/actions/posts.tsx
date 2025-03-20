'use client';

import { toast } from 'sonner';
import type { Post } from '@/data/sample-data';
import { CONFIG } from '@/lib/config';

const API_BASE_URL = CONFIG.api.base_url;

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
    toast.error(errorMessage);
    return [];
  }
}

export async function fetchPostById(postId: number): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Failed to fetch post ${postId}`;
    toast.error(errorMessage);
    return null;
  }
}


export async function fetchTrendingPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trending posts: ${response.status}`);
    }
    
    const posts = await response.json();

    return posts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch trending posts';
    toast.error(errorMessage);
    return [];
  }
}
