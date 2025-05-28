interface ChatBubbleProps {
  isUser: boolean;
  children: React.ReactNode;
}

const ChatBubble = ({ isUser, children }: ChatBubbleProps) => {
  return (
    <div
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'} relative `}
    >
      <div className="max-w-2xl"> {children}</div>
    </div>
  );
};

export default ChatBubble;
