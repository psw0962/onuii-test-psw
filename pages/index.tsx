import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  return <div onClick={() => router.push('/enrollment')}>하이</div>;
};

export default Home;
