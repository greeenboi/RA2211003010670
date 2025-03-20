"use client";

import { useState, useEffect } from "react";
import { getTrendingPosts, type Post } from "@/data/sample-data";
import { PostCard } from "@/components/post/post-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
          <CardTitle>Popular Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">#photography</Badge>
            <Badge variant="secondary">#technology</Badge>
            <Badge variant="secondary">#food</Badge>
            <Badge variant="secondary">#travel</Badge>
            <Badge variant="secondary">#gaming</Badge>
          </div>
          <p className="mt-4 text-muted-foreground">
            These posts are generating the most conversations right now.
          </p>
        </CardContent>
      </Card>
      
      {loading ? (
        Array(3)
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
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
