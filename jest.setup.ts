import '@testing-library/jest-dom';
import router from 'next-router-mock';

jest.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => router.pathname,
}));