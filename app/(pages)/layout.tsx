
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
             <div className={"min-h-screen"}>
                {children}
             </div>

  )
}
