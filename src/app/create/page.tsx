'use client';

import { useState } from 'react';

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    date: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 💡 Simple required field validation
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.date) {
      setStatus('error');
      return;
    }

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.status === 409) {
      setStatus('duplicate');
    } else if (res.ok) {
      setStatus('success');
      setFormData({ title: '', slug: '', excerpt: '', date: '' }); // reset form
    } else {
      setStatus('error');
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>

      {status === 'success' && <p className="text-green-600 mb-2">✅ Post created!</p>}
      {status === 'duplicate' && <p className="text-red-600 mb-2">⚠️ Slug already exists.</p>}
      {status === 'error' && <p className="text-red-600 mb-2">❌ All fields required or an error occurred.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (e.g. my-post-title)"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="excerpt"
          placeholder="Short description"
          value={formData.excerpt}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </main>
  );
}
