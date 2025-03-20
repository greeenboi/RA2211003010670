"use client";

import { useState, useEffect } from "react";
import { getLatestPosts, type Post, getTopUsers, type User } from "@/data/sample-data";
import { PostCard } from "@/components/post/post-card";
import { UserCard } from "@/components/user/user-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      
      setTimeout(() => {
        setPosts(getLatestPosts().slice(0, 3)); // Just show the first few posts on home
        setTopUsers(getTopUsers().slice(0, 3));
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between pb-6 md:hidden">
        <h1 className="text-2xl font-bold">Social App</h1>
        <ModeToggle />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest Posts</h2>
            <Link href="/feed">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: sussy baka
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
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Users</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: sussy baka
                    <div key={index} className="flex items-center space-x-2 py-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))
              ) : (
                <>
                  {topUsers.map((user) => (
                    <UserCard key={user.id} user={user} compact />
                  ))}
                  <div className="mt-2 text-center">
                    <Link href="/top-users">
                      <Button variant="outline" size="sm" className="w-full">
                        View all users
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">#photography</p>
                  <span className="text-xs text-muted-foreground">3.5k posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">#technology</p>
                  <span className="text-xs text-muted-foreground">2.1k posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">#food</p>
                  <span className="text-xs text-muted-foreground">1.8k posts</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/trending">
                  <Button variant="outline" size="sm" className="w-full">
                    Explore trending
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
