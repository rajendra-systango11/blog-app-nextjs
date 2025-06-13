import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Manage your dashboard.</p>
      <Link href='/dashboard/login' >go login modal </Link>
      {/* Add your settings form or components here */}
    </div>
  );
}