'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Text from './components/text';
import Header from './components/header';
import Message from './components/message';
import { Card } from '@/components/ui/card';

const Chat: FC = () => {
	const HOST = process.env.HOST;

	const router = useRouter();

	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState('');

	useEffect(() => {
		const fetchMessages = async () => {
			const token = localStorage.getItem('token');
			try {
				const response = await axios.get(HOST + '/chat_messages', { headers: { token: token } });
				setMessages(response.data);
			} catch (error) {
				console.error('Error fetching messages:', error);
				toast({
					title: 'Error',
					description: 'Error fetching messages | Unauthorized',
					variant: 'destructive',
				});
				router.replace('/login');
			}
		};

		fetchMessages();

		const pusher = new Pusher('52230eba9e5e9ec46b5c', {
			cluster: 'ap1',
		});

		const channel = pusher.subscribe('chat');
		channel.bind('new-message', (data: any) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		return () => {
			pusher.unsubscribe('chat');
		};
	}, [HOST, router]);

	const handleSendMessage = async () => {
		const token = localStorage.getItem('token');
		try {
			await axios.post(HOST + '/chat_messages', { content: newMessage }, { headers: { token: token } });
			setNewMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	return (
		<div className='flex flex-col items-center justify-between w-screen h-screen'>
			<Card className='h-screen w-full max-w-[650px] flex flex-col p-5 rounded-none border-none justify-between'>
				<Header />
				<Message messages={messages} />
				<Text newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
			</Card>
		</div>
	);
};

export default Chat;
