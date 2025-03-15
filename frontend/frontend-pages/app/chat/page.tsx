"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { teamMembers } from "@/data/team-member";
import { SelectedMember } from "@/types";
import { API_BASE_URL, AI_API_URL, getAccessToken } from "@/lib/constants";
import { toast } from "react-hot-toast";
import ChatMessage from "@/components/ui/chatbox"
import PinkButton from "@/components/ui/setting"
import { Button } from "@/components/ui/mainButton"

type Message = {
  id: string;
  sender: string;
  text: string;
  isUser: boolean;
  avatar: string;
  isTyping?: boolean; // Thêm thuộc tính để theo dõi trạng thái gõ
};

async function saveChatLogs(
  chatLogs: { model_id?: string; message_content: string }[]
) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("No access token found");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/chat-logs/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        chatLogs,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save chat logs");
    }
  } catch (error) {
    console.error("Error saving chat logs:", error);
  }
}

async function fetchBotResponse(
  modelId: string,
  ques: string
): Promise<string> {
  try {
    const response = await fetch(`${AI_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelId,
        ques,
      }),
    });

    const data = await response.json();
    if (data.status === "success") {
      return data.response;
    }
    return "Sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Oops! Something went wrong.";
  }
}

async function fetchChatHistory() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("No access token found");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/chat-logs/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch chat history");
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}

async function deleteChatHistory() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("No access token found");
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/chat-logs/my`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      toast.success("Delete chat history successfully");
    } else {
      toast.error("Failed to delete chat history");
    }
    return true;
  } catch (error) {
    console.error("Error deleting chat history:", error);
    return false;
  }
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      if (selected) {
        const selectedIds = selected.split(",");
        const members = teamMembers.filter((m) => selectedIds.includes(m.id));
        setSelectedMembers(members);
      }

      const history = await fetchChatHistory();
      const mappedMessages = history.map((log: any) => {
        if (log.model_id) {
          const bot = teamMembers.find((m) => m.id === log.model_id);
          return {
            id: log.id,
            sender: bot?.name || "Unknown Bot",
            text: log.message_content,
            isUser: false,
            avatar: bot?.avatarUrl || "/placeholder.svg?height=40&width=40",
            createdAt: log?.timestamp,
          };
        }
        return {
          id: log.id,
          sender: "You",
          text: log.message_content,
          isUser: true,
          avatar: "/placeholder.svg?height=40&width=40",
          createdAt: log?.timestamp,
        };
      });
      console.log(mappedMessages);
      setMessages(
        mappedMessages?.sort(
          (a: { createdAt: Date }, b: { createdAt: Date }) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    };

    loadInitialData();
  }, [selected]);

  // Get selected team members
  useEffect(() => {
    if (selected) {
      const selectedIds = selected.split(",");
      const members = teamMembers.filter((m) => selectedIds.includes(m.id));
      setSelectedMembers(members);
    }
  }, [selected]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeMessage = (message: Message, fullText: string) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id
              ? { ...msg, text: fullText.slice(0, currentIndex + 1) }
              : msg
          )
        );
        currentIndex++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id ? { ...msg, isTyping: false } : msg
          )
        );
      }
    }, 35); // Điều chỉnh tốc độ gõ (50ms mỗi ký tự)
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      isUser: true,
      avatar: "/placeholder.svg?height=40&width=40",
    };

    setMessages((prev) => [...prev, userMessage]);

    await saveChatLogs([{ message_content: newMessage }]);
    setNewMessage("");

    const botResponses: { model_id: string; message_content: string }[] = [];
    // Send request to all 5 selected bots
    const botPromises = selectedMembers.slice(0, 5).map(async (member) => {
      const responseText = await fetchBotResponse(member.modelId, newMessage);
      const botMessage: Message = {
        id: `${member.id}-${Date.now()}`,
        sender: member.name,
        text: "",
        isUser: false,
        avatar: member.avatarUrl || "/placeholder.svg?height=40&width=40",
        isTyping: true,
      };

      // Thêm message với text rỗng trước
      setMessages((prev) => [...prev, botMessage]);
      // Bắt đầu hiệu ứng gõ
      typeMessage(botMessage, responseText);

      botResponses.push({
        model_id: member.id,
        message_content: responseText,
      });

      return botMessage;
    });

    Promise.all(botPromises).then(async () => {
      if (botResponses.length > 0) {
        await saveChatLogs(botResponses);
      }
    });
  };

  const handleDeleteHistory = async () => {
    const success = await deleteChatHistory();
    if (success) {
      setMessages([]); // Xóa toàn bộ messages trên UI
    }
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

        <Button className="absolute top-1/2 right-4 transform -translate-y-1/2" navigateTo="/text-page/vote">
          <div className="text-secondary text-[40px]">Let's vote!</div>
        </Button>

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
            // isTyping={message.isTyping} // Truyền thêm prop để component ChatMessage có thể hiển thị hiệu ứng nếu cần
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-end p-4">
        <button
          onClick={handleDeleteHistory}
          className="ml-auto p-2 text-red-600 hover:text-red-800 transition-colors"
          title="Delete chat history"
        >
          <Trash2 size={24} />
        </button>
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
