'use client'
import Link from 'next/link';
import { BlogPost } from '@/lib/posts';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      console.log(data)
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">My Blog</h1>

      <ul className="space-y-6">
        {posts.map((post: { slug: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; excerpt: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={post.slug} className="border-b pb-4">
            <h2 className="text-2xl font-semibold text-blue-700">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="text-gray-700 mt-1">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
