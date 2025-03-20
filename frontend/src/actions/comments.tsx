'use client';

import { toast } from 'sonner';
import type { Comment } from '@/data/sample-data';
import { CONFIG } from '@/lib/config';

const API_BASE_URL = CONFIG.api.base_url;

export async function fetchPostComments(postId: number): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : `Failed to fetch comments for post ${postId}`;
    toast.error(errorMessage);
    return [];
  }
}
