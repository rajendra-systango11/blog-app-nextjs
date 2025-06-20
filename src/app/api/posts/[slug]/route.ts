import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  {
  params,
}: {
  params: Promise<{ slug: string }>;
}

) {
     const { slug } = await params;

    try {
    const q = query(collection(db, 'posts'), where('slug', '==', slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = snapshot.docs[0].data();

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
