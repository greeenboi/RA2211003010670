import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import {
  type Post,
  type Comment,
  getUserById,
  getPostComments,
} from '@/data/sample-data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 500));
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const user = getUserById(post.userid);

  useEffect(() => {
    setComments(getPostComments(post.id));
  }, [post.id]);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${user.username}`}
              className="font-medium hover:underline"
            >
              {user.username}
            </Link>
          </div>
        </div>
      </CardHeader>

      {post.image && (
        <div className="relative aspect-square w-full">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-center space-x-4 pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className="gap-1"
          >
            <Heart
              className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-1">
          <p className="font-medium">{likeCount} likes</p>
        </div>

        <div className="py-1">
          <span className="font-medium">{user.username}</span>{' '}
          <span>{post.content}</span>
        </div>

        {post.createdAt && (
          <div className="text-sm text-muted-foreground">
            {formatDate(post.createdAt)}
          </div>
        )}
      </CardContent>

      {showComments && comments.length > 0 && (
        <CardFooter className="flex flex-col items-start p-4 pt-0">
          <Separator className="my-2" />
          <div className="w-full space-y-2">
            {comments.map(comment => {
              const commentUser = getUserById(1); // Using default user for comments

              return (
                <div key={comment.id} className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={commentUser.avatar}
                      alt={commentUser.name}
                    />
                    <AvatarFallback>
                      {commentUser.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="break-words">
                      <span className="font-medium">
                        {commentUser.username}
                      </span>{' '}
                      <span>{comment.content}</span>
                    </div>
                    {comment.createdAt && (
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
