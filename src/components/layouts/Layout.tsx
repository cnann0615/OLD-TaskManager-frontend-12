// components/Layout.tsx
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="bg-blue-500 text-white text-lg py-4 px-8 font-bold">
        Todo Manager
      </header><div className="m-20">{children}</div>
    </>
    )
};

export default Layout;
