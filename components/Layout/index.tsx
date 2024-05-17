import React from 'react'
import Header from './Header';
import Footer from './Footer';

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  return (
    <>
        <Header/>
            <main className="py-20 mx-auto max-w-7xl px-6">{children}</main>
        <Footer/>
    </>
  )
}

export default Layout