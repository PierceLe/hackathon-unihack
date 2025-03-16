"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Settings } from "lucide-react"
import ChatMessage from "@/components/ui/chatbox"
import PinkButton from "@/components/ui/setting"
import { Button } from "@/components/ui/mainButton"


// Define message type
type Message = {
  id: string
  sender: string
  text: string
  isUser: boolean
  avatar: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "John",
      text: "Hi there! I'm John, an AI assistant. How can I help you today?",
      isUser: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      sender: "Ethan",
      text: "Hello! I'm Ethan, another AI assistant with expertise in creative thinking.",
      isUser: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      sender: "You",
      text: "Hi John and Ethan! I need help brainstorming ideas for my new project.",
      isUser: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      isUser: true,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate AI response (alternating between John and Ethan)
    setTimeout(() => {
      const aiSender = messages.length % 2 === 0 ? "John" : "Ethan"
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: aiSender,
        text: `This is a response from ${aiSender} to your message.`,
        isUser: false,
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

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
            CHATBOX
          </h1>
          
        </div>

        {/* Right button */}
        <div className="z-10 ml-auto">
          <Button navigateTo="/homepage">
            <p className="text-secondary text-[36px]">
                Back
            </p>
          </Button>
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
          <button onClick={handleSendMessage} className="p-4 text-purple-800 hover:text-purple-600 transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

