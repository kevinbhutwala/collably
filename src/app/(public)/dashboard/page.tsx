import { redirect } from 'next/navigation';

// /dashboard → redirect to the authenticated app dashboard
export default function DashboardPage() {
  redirect('/app/dashboard');
}
