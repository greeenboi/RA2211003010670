'use client';

import { useState, useEffect } from 'react';
import {
  getTrendingPosts,
  type Post,
  getPostComments,
} from '@/data/sample-data';
import { PostCard } from '@/components/post/post-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrendingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      setTimeout(() => {
        setPosts(getTrendingPosts());
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Trending Posts</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Most Discussed Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            These posts are generating the most conversations right now, sorted
            by number of comments.
          </p>
        </CardContent>
      </Card>

      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine 🐸
              <Card key={index} className="mb-6">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </CardHeader>
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))
        : posts.map(post => (
            <div key={post.id} className="mb-1">
              <div className="mb-2 text-xs text-muted-foreground">
                {getPostComments(post.id).length} comments
              </div>
              <PostCard post={post} />
            </div>
          ))}
    </div>
  );
}
