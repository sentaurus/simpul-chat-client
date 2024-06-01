import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import React, { FC } from 'react';

interface Props {
	newMessage: string;
	setNewMessage: (value: string) => void;
	handleSendMessage: () => void;
}
const Text: FC<Props> = (Props) => {
	const { newMessage, setNewMessage, handleSendMessage } = Props;

	return (
		<div className=' flex flex-row w-full max-w-[600px]'>
			<Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
			<Button onClick={handleSendMessage} className='ml-2'>
				<PaperPlaneIcon />
			</Button>
		</div>
	);
};

export default Text;
