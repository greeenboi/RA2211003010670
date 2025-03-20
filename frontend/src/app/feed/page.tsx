'use client';

import { useState, useEffect } from 'react';
import { getLatestPosts, type Post } from '@/data/sample-data';
import { PostCard } from '@/components/post/post-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setLoading(true);

    setTimeout(() => {
      setPosts(getLatestPosts());
      setLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setPosts(getLatestPosts());
      setRefreshing(false);
    }, 1000);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reload once only
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Latest Feed</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
          />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The latest posts, sorted by post ID.
          </p>
        </CardContent>
      </Card>

      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: only option..
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
        : posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
