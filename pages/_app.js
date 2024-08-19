import NotificationModal from '@/components/NotificationModal';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <NotificationModal />
    </>
  );
}
