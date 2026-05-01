import { GetServerSideProps } from 'next';
import { getSiteOrigin } from '@/service';

function host(origin: string): string {
  try {
    return new URL(origin).host;
  } catch {
    return 'conan.io';
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = getSiteOrigin();
  const h = host(origin);
  const body = `# Conan (${h})

Open-source C/C++ package manager. Docs: https://docs.conan.io/2/

This host includes a **Conan Center** UI. For recipe URLs, JSON-LD, and popular recipes here: ${origin}/center/llms.txt

- [Blog](https://blog.conan.io/)
- [Conan Audit](https://audit.conan.io/)
`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(body);
  res.end();
  return { props: {} };
};

const LlmsTxtPage = () => null;

export default LlmsTxtPage;
