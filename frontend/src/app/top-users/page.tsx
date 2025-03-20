"use client";

import { useState, useEffect } from "react";
import { getTopUsers, type User } from "@/data/sample-data";
import { UserCard } from "@/components/user/user-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      
      setTimeout(() => {
        setUsers(getTopUsers());
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Top Users</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Most Popular Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            These are the most followed creators on our platform.
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {loading ? (
          Array(5)
            .fill(0)
            .map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: my only option brotha
            <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>
    </div>
  );
}
