import Link from 'next/link'

import { ConanKitchenHeader, ConanFooter } from '@/components';
import { usePathname } from 'next/navigation';
import { SiConan } from 'react-icons/si';

export default function NotFound() {
  const pathname = usePathname() || '';
  const isRecipePath = pathname.startsWith('/center/recipes');

  return (
    <div className="not-found-light-bg text-light d-flex flex-column min-vh-100">
      <ConanKitchenHeader/>

      <main className="container text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h2 className="display-4 text-black fw-bold mb-3">
          404 – {isRecipePath ? 'Missing Package!' : 'Page Not Found'}
        </h2>

        {isRecipePath ? (
          <p className="lead text-black mb-3">
            This Conan package couldn&rsquo;t be found. Maybe it was never uploaded? 🔍
          </p>
        ) : (
          <p className="lead text-black mb-3">
            The page you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
        )}

        <Link href="/" className="btn conan-blue-gradient-bg btn-lg mt-3">
          <SiConan className="me-2" />
          Return to the Conan home
        </Link>
      </main>

      <ConanFooter/>
    </div>
  );
}
