import { BlogPost } from '@/lib/posts';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function Home() {
  // Fetch and map posts with type safety
  const snapshot = await getDocs(collection(db, 'posts'));
  const posts: BlogPost[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
    };
  });

  if (posts.length === 0) {
    return <p className="text-red-500">No posts found</p>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">My Blog</h1>

      <ul className="space-y-6">
        {posts.map((post) => (
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
