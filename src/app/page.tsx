import { Paginator } from '@/components/Paginator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  justify-center p-4">
      <Paginator count={1000} limit={100} currentIndex={1}></Paginator>
    </main>
  );
}
