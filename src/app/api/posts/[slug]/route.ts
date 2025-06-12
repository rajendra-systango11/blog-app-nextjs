import { blogPosts } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET(_:Request, {params}:{params:{slug:string}}) {
  const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
