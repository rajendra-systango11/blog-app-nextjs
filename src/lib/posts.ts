export type BlogPost = {
  id?:string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-nextjs',
    excerpt: 'A beginner-friendly guide to learning Next.js from scratch.',
    date: '2025-06-01',
  },
  {
  id: '2',
    title: 'Deploying Your Next.js App',
    slug: 'deploy-nextjs-vercel',
    excerpt: 'Step-by-step process to deploy your Next.js app on Vercel.',
    date: '2025-06-05',
  },
]; 