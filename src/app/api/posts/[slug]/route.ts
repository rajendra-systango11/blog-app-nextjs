// app/api/posts/[slug]/route.ts
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const q = query(collection(db, 'posts'), where('slug', '==', params.slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = snapshot.docs[0].data();

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
