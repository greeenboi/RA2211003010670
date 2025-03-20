export interface UserMap {
  [key: string]: string;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
}

export interface Post {
  id: number;
  userid: number;
  content: string;
  image?: string;
  createdAt?: string;
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
  createdAt?: string;
}

// Sample data in the new format
export const usersMap: UserMap[] = [
  {
    "1": "John Doe",
    "10": "Jane Doe"
  }
];

export const posts: Post[] = [
  {
    id: 246,
    userid: 1,
    content: "post about ant",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699",
    createdAt: "2023-06-02T12:30:00Z"
  },
  {
    id: 247,
    userid: 10,
    content: "New collection dropping next week. Stay tuned!",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    createdAt: "2023-06-01T08:15:00Z"
  },
  {
    id: 248,
    userid: 1,
    content: "Just got my hands on the latest gaming console. Game night incoming!",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
    createdAt: "2023-05-30T15:45:00Z"
  },
  {
    id: 249,
    userid: 10,
    content: "Made this delicious pasta dish from scratch today!",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    createdAt: "2023-05-29T18:30:00Z"
  },
  {
    id: 250,
    userid: 1,
    content: "Just released a new open-source project. Check it out on GitHub!",
    createdAt: "2023-05-28T10:00:00Z"
  }
];

export const comments: Comment[] = [
  {
    id: 3893,
    postid: 246,
    content: "Old comment",
    createdAt: "2023-06-02T14:35:00Z"
  },
  {
    id: 3894,
    postid: 246,
    content: "The colors are amazing!",
    createdAt: "2023-06-02T15:12:00Z"
  },
  {
    id: 3895,
    postid: 247,
    content: "Can't wait to see it!",
    createdAt: "2023-06-01T09:45:00Z"
  },
  {
    id: 3896,
    postid: 248,
    content: "Sweet setup! What games are you planning to play?",
    createdAt: "2023-05-30T16:22:00Z"
  },
  {
    id: 3897,
    postid: 248,
    content: "Jealous! Mine hasn't arrived yet.",
    createdAt: "2023-05-30T17:05:00Z"
  },
  {
    id: 3898,
    postid: 248,
    content: "Let me know how it performs!",
    createdAt: "2023-05-30T18:30:00Z"
  },
  {
    id: 3899,
    postid: 249,
    content: "Looks amazing! Would love the recipe.",
    createdAt: "2023-05-29T19:15:00Z"
  },
  {
    id: 3900,
    postid: 250,
    content: "Great work! Already starring it.",
    createdAt: "2023-05-28T11:45:00Z"
  },
  {
    id: 3901,
    postid: 250,
    content: "Impressive documentation!",
    createdAt: "2023-05-28T12:30:00Z"
  }
];

// Helper functions to work with the new data structure
export function getUserName(userId: number): string {
  const userIdStr = userId.toString();
  for (const userMap of usersMap) {
    if (userMap[userIdStr]) {
      return userMap[userIdStr];
    }
  }
  return "Unknown User";
}

export function getUserById(userId: number): User {
  return {
    id: userId.toString(),
    name: getUserName(userId),
    username: `user${userId}`,
    avatar: `https://i.pravatar.cc/150?img=${userId % 70}`
  };
}

export function getPostComments(postId: number): Comment[] {
  return comments.filter(comment => comment.postid === postId);
}

export function getTrendingPosts(): Post[] {
  const postsWithCommentCount = posts.map(post => ({
    ...post,
    commentCount: getPostComments(post.id).length
  }));
  
  return [...postsWithCommentCount]
    .sort((a, b) => b.commentCount - a.commentCount);
}

export function getLatestPosts(): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}

export function getTopUsers(): User[] {
  // Since we don't have a real follower count, we'll just create some users
  // based on our user map for demonstration
  const topUsers: User[] = [];
  
  for (const userMap of usersMap) {
    for (const userId of Object.keys(userMap)) {
      topUsers.push({
        id: userId,
        name: userMap[userId],
        username: `user${userId}`,
        avatar: 'https://avatars.githubusercontent.com/u/118198968?v=4'
      });
    }
  }
  
  // Add a few more random users for the demo
  for (let i = 2; i <= 5; i++) {
    if (!topUsers.find(u => u.id === i.toString())) {
      topUsers.push({
        id: i.toString(),
        name: `User ${i}`,
        username: `user${i}`,
        avatar: `https://i.pravatar.cc/150?img=${i % 70}`
      });
    }
  }
  
  return topUsers;
}
