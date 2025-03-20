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
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
}

// Sample data in the specified format
export const usersMap: UserMap[] = [
  {
    '1': 'John Doe',
    '10': 'Jane Doe',
  },
];

export const posts: Post[] = [
  {
    id: 246,
    userid: 1,
    content: 'post about ant',
  },
  {
    id: 247,
    userid: 10,
    content: 'New collection dropping next week. Stay tuned!',
  },
  {
    id: 248,
    userid: 1,
    content:
      'Just got my hands on the latest gaming console. Game night incoming!',
  },
  {
    id: 249,
    userid: 10,
    content: 'Made this delicious pasta dish from scratch today!',
  },
  {
    id: 250,
    userid: 1,
    content: 'Just released a new open-source project. Check it out on GitHub!',
  },
];

export const comments: Comment[] = [
  {
    id: 3893,
    postid: 246,
    content: 'Old comment',
  },
  {
    id: 3894,
    postid: 246,
    content: 'The colors are amazing!',
  },
  {
    id: 3895,
    postid: 247,
    content: "Can't wait to see it!",
  },
  {
    id: 3896,
    postid: 248,
    content: 'Sweet setup! What games are you planning to play?',
  },
  {
    id: 3897,
    postid: 248,
    content: "Jealous! Mine hasn't arrived yet.",
  },
  {
    id: 3898,
    postid: 248,
    content: 'Let me know how it performs!',
  },
  {
    id: 3899,
    postid: 249,
    content: 'Looks amazing! Would love the recipe.',
  },
  {
    id: 3900,
    postid: 250,
    content: 'Great work! Already starring it.',
  },
  {
    id: 3901,
    postid: 250,
    content: 'Impressive documentation!',
  },
];

interface PostWithComments extends Post {
  commentCount: number;
}

// gae ass username
// prob shouldnt say that ~~
export function getUserName(userId: number): string {
  const userIdStr = userId.toString();
  for (const userMap of usersMap) {
    if (userMap[userIdStr]) {
      return userMap[userIdStr];
    }
  }
  return 'Unknown User';
}

export function getUserById(userId: number): User {
  return {
    id: userId.toString(),
    name: getUserName(userId),
    username: `user${userId}`,
    avatar: `https://i.pravatar.cc/150?img=${userId % 70}`,
  };
}

export function getPostComments(postId: number): Comment[] {
  return comments.filter(comment => comment.postid === postId);
}

export function getTrendingPosts(): Post[] {
  const postsWithCommentCount = posts.map(post => ({
    ...post,
    commentCount: getPostComments(post.id).length,
  })) as PostWithComments[];

  return [...postsWithCommentCount].sort(
    (a, b) => b.commentCount - a.commentCount
  );
}

export function getLatestPosts(): Post[] {
  // Without createdAt, we'll just return in reverse order (assuming newer posts have higher IDs)
  return [...posts].sort((a, b) => b.id - a.id);
}

export function getTopUsers(): User[] {
  // Create users based on our user map
  const topUsers: User[] = [];

  for (const userMap of usersMap) {
    for (const userId of Object.keys(userMap)) {
      topUsers.push({
        id: userId,
        name: userMap[userId],
        username: `user${userId}`,
        avatar: 'https://avatars.githubusercontent.com/u/118198968?v=4',
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
        avatar: `https://i.pravatar.cc/150?img=${i % 70}`,
      });
    }
  }

  return topUsers;
}
