'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SiConan } from "react-icons/si";

export default function NotFound() {
  const pathname = usePathname() || '';
  const isRecipePath = pathname.startsWith('/center/recipes');

  return (
    <div className="not-found-light-bg text-light d-flex flex-column min-vh-100">
      <header className="bg-white py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <Link href="/" className="col-6 col-lg-4 d-block">
            <img alt="Conan C++ Package Manager" className="header-logo" style={{maxHeight: "83px"}} src="/conan-logo.png"></img>
          </Link>
        </div>
      </header>

      <main className="container text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h2 className="display-4 text-black fw-bold mb-3">
          404 – {isRecipePath ? 'Missing Package!' : 'Page Not Found'}
        </h2>

        {isRecipePath ? (
          <>
            <p className="lead mb-3">
              This Conan package couldn't be found. Maybe it was never uploaded? 🔍
            </p>
          </>
        ) : (
          <p className="lead text-black mb-3">The page you're looking for doesn't exist.</p>
        )}

            <a href="/" className="btn conan-blue-gradient-bg btn-lg mt-3">
            <SiConan className="me-2" />
            Return to the Conan home
            </a>
      </main>

      <footer className="bg-black text-white text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} Conan C/C++ Package Manager —{' '}
        <a href="/" className="text-white text-decoration-underline">conan.io</a>
      </footer>
    </div>
  );
}
