import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BlogPost } from "@/lib/posts"; // adjust if needed

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const snapshot = await getDocs(
    query(collection(db, "posts"), where("slug", "==", slug))
  );

  if (snapshot.empty) notFound();

  const post = snapshot.docs[0].data() as BlogPost;

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const snapshot = await getDocs(
    query(collection(db, "posts"), where("slug", "==", slug))
  );

  if (snapshot.empty) notFound();

  const post = snapshot.docs[0].data() as BlogPost;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{post.date}</p>
      <p className="text-gray-700">{post.excerpt}</p>
      <Image
        src={"/img.webp"}
        alt={post.title}
        width={500}
        height={300}
      />
      <div className="mt-6 text-blue-600">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
