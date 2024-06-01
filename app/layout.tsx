import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import React, { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import background from '@/assets/image.jpg';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Simpul Chat APP',
	description: 'Chat App',
};

type Props = {
	children: ReactNode;
};

const RootLayout: FC<Props> = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen font-sans antialiased', fontSans.variable)} style={{ backgroundImage: `url(${background.src})`, backgroundSize: 300 }}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>

				<Toaster />
			</body>
		</html>
	);
};

export default RootLayout;
