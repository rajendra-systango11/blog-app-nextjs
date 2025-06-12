'use client'
import { blogPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata ({params}:Props){
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound(); // triggers 404 page
  }
return {
    title:post.title,
    description: post.excerpt
}

}

export default function BlogPostPage({ params }: Props) {
    const [post, setPost] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await fetch(`/api/posts/${params.slug}`);
        const data = await res.json();
        console.log(data)
        setPost(data);
      };
      fetchPosts();
    }, []);

  if (!post) {
    notFound(); // triggers 404 page
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{post?.date}</p>
      <p className="text-gray-700">{post?.excerpt}</p>

      <div className="mt-6 text-blue-600">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
