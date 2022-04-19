import Head from 'next/head';
import * as React from 'react';
import Header from './Header';
import classNames from 'classnames';
import Footer from './Footer';
import CustomToast from 'components/CustomToast';
import Hero from 'components/Hero';
import { useRouter } from 'next/router';

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className, ...props }: ILayoutProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>LlamaPay</title>
        <meta
          name="description"
          content="LlamaPay is a multi-chain protocol that allows you to automate transactions and stream them by the second. The recipients can withdraw these funds at any time. This eliminates the need for manual transactions."
        />
      </Head>
      <Header />
      {router.pathname === '/' && <Hero />}
      <main className={classNames('flex-1 px-2 pb-8 md:px-[30px] lg:px-[60px] xl:px-[120px]', className)} {...props}>
        {children}
      </main>
      <Footer />
      <CustomToast />
    </>
  );
}
