'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';

const Registration: FC = () => {
	const HOST = process.env.HOST;
	const router = useRouter();
	const { toast } = useToast();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirmation(event.target.value);
	};

	const handleLogin = () => {
		router.replace('/login');
	};

	const handleRegister = async () => {
		try {
			const user = {
				username,
				email,
				password,
				password_confirmation: passwordConfirmation,
			};
			const response = await axios.post(HOST + '/register', { user });
			console.log('User registered:', response.data);

			localStorage.setItem('token', response.data.token);

			router.push('/login');
			toast({
				title: 'Registration Successful',
				description: 'You have successfully registered. Please login.',
			});
		} catch (error) {
			console.error('Error registering user:', error);
		}
	};

	return (
		<div className='grid h-screen w-screen place-items-center'>
			<Card className='w-[400px]'>
				<CardHeader>
					<div className='flex flex-row items-center justify-between'>
						<div>
							<CardTitle>Registration Simpul Chat</CardTitle>
							<CardDescription>Realtime Chat Application</CardDescription>
						</div>
						<ModeToggle />
					</div>
				</CardHeader>
				<CardContent>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Username</Label>
							<Input value={username} onChange={handleUsernameChange} id='name' placeholder='Input your username' />
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Email</Label>
							<Input value={email} onChange={handleEmailChange} id='name' placeholder='Input your email' type='email' />
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='framework'>Password</Label>
							<Input value={password} onChange={handlePasswordChange} id='name' placeholder='Input your password' type='password' />
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='framework'>Confirm Password</Label>
							<Input value={passwordConfirmation} onChange={handlePasswordConfirmationChange} id='name' placeholder='Input your password again' type='password' />
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='link' onClick={handleLogin}>
						Login
					</Button>
					<Button onClick={handleRegister}>Register</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Registration;
