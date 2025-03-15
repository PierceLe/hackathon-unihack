import Avatar from "./avatar1";

type ChatMessageProps = {
  sender: string;
  text: string;
  isUser: boolean;
  avatar: string;
};

export default function ChatMessage({
  sender,
  text,
  isUser,
  avatar,
}: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        isUser ? "flex-row-reverse" : "flex-row"
      } items-start gap-3`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-12 h-12 bg-purple-200 shadow-md">
          <img src={avatar || "/placeholder.svg"} alt={`${sender}'s avatar`} />
        </Avatar>
      </div>

      {/* Message content */}
      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-[70%]`}
      >
        {/* Sender name */}
        <span
          className={`text-lg text-purple-800 mb-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {sender}
        </span>

        {/* Message bubble */}
        <div className="bg-yellow-100 rounded-3xl px-6 py-4 shadow-md">
          <p className="text-gray-800 break-words">{text}</p>
        </div>
      </div>
    </div>
  );
}
