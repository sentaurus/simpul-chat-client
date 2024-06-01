import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExitIcon } from '@radix-ui/react-icons';
import React, { FC } from 'react';

const Header: FC = () => {
	const handleLogout = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};
	return (
		<Card className=' flex flex-row justify-between items-center w-full max-w-[600px] p-5'>
			<h1 className=' font-bold'>Chat Room</h1>
			<div className='flex flex-row gap-4'>
				<ModeToggle />
				<Button onClick={handleLogout} size='icon' variant='outline'>
					<ExitIcon />
				</Button>
			</div>
		</Card>
	);
};

export default Header;
