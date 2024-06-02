'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DotIcon } from '@radix-ui/react-icons';
import React, { FC, useEffect, useRef } from 'react';

interface Props {
	messages: any[];
}

export const Message: FC<Props> = (Props) => {
	const { messages } = Props;

	const scrollRef = useRef<HTMLDivElement>(null);

	const formatDate = (date: string) => {
		const d = new Date(date);
		return d.toLocaleString('id-ID', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
	};

	const formatAvatar = (name: string) => {
		return name[0].toUpperCase();
	};

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div ref={scrollRef} className='my-2 max-w-[600px] h-full overflow-y-auto'>
			{messages.length > 0 ? (
				messages.map((message: any, index: number) => (
					<div key={index} className='my-2 w-full px-7'>
						<div className='flex flex-row'>
							<Avatar className='mr-3'>
								<AvatarFallback>{formatAvatar(message.user.username)}</AvatarFallback>
							</Avatar>
							<Card className='p-3 w-full'>
								<p className='text-sm font-light'>{message.content}</p>
								<Separator className='my-1' />
								<div className='flex flex-row items-center justify-end'>
									<p className='text-xs font-bold'>{message.user.username}</p>
									<DotIcon color='gray' />
									<p className='font-extralight text-xs'>{formatDate(message.created_at)}</p>
								</div>
							</Card>
						</div>
					</div>
				))
			) : (
				<div className='w-full text-center'>No messages</div>
			)}
		</div>
	);
};

export default Message;
