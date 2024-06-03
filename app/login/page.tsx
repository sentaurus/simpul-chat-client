'use client';

import React, { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ModeToggle } from '@/components/mode-toggle';

const Login: FC = () => {
	const HOST = process.env.HOST;
	const router = useRouter();
	const { toast } = useToast();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleNavigate = () => {
		router.replace('/registration');
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				HOST + '/login',
				{
					email,
					password,
				},
				{
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				},
			);
			console.log('User logged in:', response.data);

			localStorage.setItem('token', response.data.token);

			router.push('/chat');
			toast({
				title: 'Login Successful',
				description: 'You have successfully logged in. Welcome.',
			});
		} catch (error) {
			console.error('Error logging in user:', error);
			const err = error as unknown as { response?: { data?: { errors?: string } } };
			toast({
				title: 'Login Failed',
				description: err?.response?.data?.errors,
			});
		}
	};

	return (
		<div className='grid h-screen w-screen place-items-center bg-transparent'>
			<Card className='w-[400px]'>
				<CardHeader>
					<div className='flex flex-row items-center justify-between'>
						<div>
							<CardTitle>Simpul Chat</CardTitle>
							<CardDescription>Realtime Chat Application</CardDescription>
						</div>
						<ModeToggle />
					</div>
				</CardHeader>
				<CardContent>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Email</Label>
							<Input value={email} onChange={handleEmailChange} id='name' placeholder='Input your email' />
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='framework'>Password</Label>
							<Input value={password} onChange={handlePasswordChange} type='password' id='name' placeholder='Input your password' />
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button onClick={handleNavigate} variant='link'>
						Registration
					</Button>
					<Button onClick={handleLogin}>Login</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
