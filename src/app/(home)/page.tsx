import Topnav from '@/componentUtils/Topnav';

export default async function Home() {
  return (
    <div className='flex min-h-screen flex-col justify-between  overflow-visible'>
      <Topnav />
      <main>Hello World</main>
    </div>
  );
}
