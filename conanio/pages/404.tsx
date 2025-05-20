import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiConan } from 'react-icons/si';
import { LuPackageSearch } from 'react-icons/lu';

import { ConanKitchenHeader, ConanFooter } from '@/components';

export default function NotFound() {
  const pathname = usePathname();
  const [isRecipePath, setIsRecipePath] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/center/recipes')) {
      setIsRecipePath(true);
    }
  }, [pathname]);

  const buttonHref = isRecipePath ? '/center' : '/';
  const buttonText = isRecipePath ? 'Return to ConanCenter' : 'Return to the Conan home';

  return (
    <div className="not-found-light-bg text-light d-flex flex-column min-vh-100">
      <ConanKitchenHeader />

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

        <Link href={buttonHref} className="btn conan-blue-gradient-bg btn-lg mt-3 d-flex align-items-center">
          {buttonText}
          {isRecipePath ? (
            <LuPackageSearch className="ms-2" />
          ) : (
            <SiConan className="ms-2" />
          )}
        </Link>
      </main>

      <ConanFooter />
    </div>
  );
}
