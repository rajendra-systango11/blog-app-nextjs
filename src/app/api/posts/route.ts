import { db } from '@/lib/firebase';
import { blogPosts } from '@/lib/posts';
import { addDoc, collection } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const newPost = await req.json();

  if (!newPost.title || !newPost.slug || !newPost.date || !newPost.excerpt) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
    });
  }

  const exists = blogPosts.some((post) => post.slug === newPost.slug);
  if (exists) {
    return new Response(JSON.stringify({ error: 'Post already exists' }), {
      status: 409,
    });
  }
 

  revalidatePath('/'); // 🔁 revalidate homepage
  revalidatePath(`/blog/${newPost.slug}`); // 🔁 prefetch new blog route
     await addDoc(collection(db, "posts"), newPost);
     
   return new Response(JSON.stringify({ success: true, post: newPost }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET() {
  return new Response(JSON.stringify(blogPosts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
