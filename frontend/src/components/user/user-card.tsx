import Link from "next/link";
import type { User } from "@/data/sample-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserCardProps {
  user: User;
  compact?: boolean;
}

export function UserCard({ user, compact = false }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const followers = Math.floor(Math.random() * 10000); // Random follower count for demonstration
  const following = Math.floor(Math.random() * 1000); // Random following count for demonstration

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/profile/${user.username}`} className="font-medium hover:underline">
              {user.username}
            </Link>
            <p className="text-xs text-muted-foreground">{followers.toLocaleString()} followers</p>
          </div>
        </div>
        <Button 
          variant={isFollowing ? "outline" : "default"} 
          size="sm"
          onClick={toggleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Link href={`/profile/${user.username}`} className="text-lg font-medium hover:underline">
              {user.name}
            </Link>
            <p className="text-muted-foreground">@{user.username}</p>
            <div className="mt-2 flex gap-4">
              <p className="text-sm">
                <span className="font-medium">{followers.toLocaleString()}</span> followers
              </p>
              <p className="text-sm">
                <span className="font-medium">{following.toLocaleString()}</span> following
              </p>
            </div>
          </div>
          <Button 
            variant={isFollowing ? "outline" : "default"}
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
