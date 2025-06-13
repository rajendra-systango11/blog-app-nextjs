'use client';

export default function LoginModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-xl">
        <h2 className="text-lg font-bold">Login</h2>
        {/* Same login form */}
        <form className="mt-4">
          <input type="text" placeholder="Username" className="border p-2 block mb-2 w-full" />
          <input type="password" placeholder="Password" className="border p-2 block mb-4 w-full" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
