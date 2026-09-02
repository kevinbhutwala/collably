import { redirect } from 'next/navigation';

// /signup → redirect to the registration choice page
export default function SignupPage() {
  redirect('/register');
}
