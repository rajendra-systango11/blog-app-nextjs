import { blogPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
