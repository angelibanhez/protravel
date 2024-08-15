import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false });

export default function Page() {
  return (
    <div>
      <Sidebar />
      {/* Rest of your content */}
    </div>
    
  );
}
