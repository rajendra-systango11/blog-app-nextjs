import { blogPosts } from '@/lib/posts';

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

  blogPosts.push(newPost);
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
