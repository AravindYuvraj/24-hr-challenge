// src/app/page.tsx (Simplified for testing)
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Welcome to SkillSwap (Simplified Test Page)</h1>
      <p>If you are seeing this, the basic page rendering for the root route is working.</p>
      <div style={{ marginTop: '20px' }}>
        <Link href="/explore" style={{ marginRight: '10px', color: 'blue' }}>
          Go to Explore Page
        </Link>
        <Link href="/auth/login" style={{ color: 'blue' }}>
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}
