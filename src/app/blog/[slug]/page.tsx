import { blogPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async  function generateMetadata({ params }: Props) {
  const res = await fetch(`/api/posts/${params.slug}`);
  const post = await res.json();
  if (!post) notFound();

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default  async function BlogPostPage({ params }: Props) {
   const res = await fetch(`/api/posts/${params.slug}`);
  const post = await res.json();
  if (!post) notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{post.date}</p>
      <p className="text-gray-700">{post.excerpt}</p>

      <div className="mt-6 text-blue-600">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
