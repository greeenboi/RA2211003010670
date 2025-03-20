'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/data/sample-data';
import { fetchTopUsers } from '@/actions/users';
import { UserCard } from '@/components/user/user-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { getTopUsers } from '@/data/sample-data';

export default function TopUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const topUsers = await fetchTopUsers();
        if (!topUsers || !Array.isArray(topUsers) || topUsers.length === 0) {
          const sampleUsers = getTopUsers();
          setUsers(sampleUsers || []);
          toast.info("Using sample user data");
        } else {
          setUsers(topUsers);
        }
      } catch (error) {
        // Fall back moment
        const sampleUsers = getTopUsers();
        setUsers(sampleUsers || []); // idk why but this needs to be an array
        toast.warning("Failed to load top users, using sample data instead");
        console.error("Error loading top users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const renderUsers = () => {
    if (!Array.isArray(users)) {
      console.error("Users is not an array:", users);
      return null;
    }
    return users.map(user => <UserCard key={user.id} user={user} />);
  };

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
        {loading
          ? Array(5)
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
          : renderUsers()}
      </div>
    </div>
  );
}
