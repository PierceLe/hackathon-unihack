"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ui/chatbox";
import PinkButton from "@/components/ui/setting";
import { useSearchParams } from "next/navigation";
import { teamMembers } from "@/data/team-member";
import { SelectedMember } from "@/types";

type Message = {
  id: string;
  sender: string;
  text: string;
  isUser: boolean;
  avatar: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected"); // Lấy chuỗi "1,2,3,4,5"
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lấy danh sách thành viên đã chọn
  useEffect(() => {
    if (selected) {
      const selectedIds = selected.split(",");
      const members = teamMembers.filter((m) => selectedIds.includes(m.id));
      setSelectedMembers(members);

      // Khởi tạo 5 tin nhắn chào từ bot và 1 tin nhắn từ người dùng
      const initialMessages: Message[] = members.map((member, index) => ({
        id: `bot-${index}-${Date.now()}`,
        sender: member.name,
        text: `Hi! I'm ${member.name}, your ${member.position}. Ready to assist you!`,
        isUser: false,
        avatar: member.avatarUrl || "/placeholder.svg?height=40&width=40",
      }));

      initialMessages.push({
        id: `user-${Date.now()}`,
        sender: "You",
        text: "Hello everyone! Looking forward to working with you.",
        isUser: true,
        avatar: "/placeholder.svg?height=40&width=40",
      });

      setMessages(initialMessages);
    }
  }, [selected]);

  // Tự động thêm tin nhắn ngẫu nhiên mỗi 1 giây
  useEffect(() => {
    if (selectedMembers.length === 0) return;

    const interval = setInterval(() => {
      const randomMember =
        selectedMembers[Math.floor(Math.random() * selectedMembers.length)];
      const randomMessage: Message = {
        id: `random-${Date.now()}`,
        sender: randomMember.name,
        text: `Hey, just chiming in! I'm ${randomMember.name}, your ${randomMember.position}.`,
        isUser: false,
        avatar: randomMember.avatarUrl || "/placeholder.svg?height=40&width=40",
      };
      setMessages((prev) => [...prev, randomMessage]);
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, [selectedMembers]);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      isUser: true,
      avatar: "/placeholder.svg?height=40&width=40",
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const randomMember =
        selectedMembers[Math.floor(Math.random() * selectedMembers.length)];
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: randomMember?.name || "AI",
        text: `Hi! I'm ${randomMember?.name || "AI"}, your ${
          randomMember?.position || "assistant"
        }. How can I assist you with: "${userMessage.text}"?`,
        isUser: false,
        avatar:
          randomMember?.avatarUrl || "/placeholder.svg?height=40&width=40",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Header */}
      <header className="relative flex p-4 border-b">
        {/* Left button */}
        <div className="z-10">
          <PinkButton imageSrc="/settings.png" />
        </div>

        {/* Centered title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full">
          <h1 className="text-4xl font-anton font-bold text-secondary tracking-wider">
            FINDING THE IDEA
          </h1>
        </div>
      </header>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            sender={message.sender}
            text={message.text}
            isUser={message.isUser}
            avatar={message.avatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4">
        <div className="flex items-center bg-yellow-100 rounded-full shadow-md">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-6 py-4 outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="p-4 text-purple-800 hover:text-purple-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
