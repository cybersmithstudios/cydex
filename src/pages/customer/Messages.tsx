
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Search,
  Send,
  PaperclipIcon,
  Phone,
  Video,
  Info,
  MoreVertical,
  CheckCheck,
  Clock,
  User
} from 'lucide-react';

// Mock data
const conversations = [
  {
    id: 1,
    name: 'Support Team',
    avatar: null,
    lastMessage: 'Your order #ORD-1234 has been delivered successfully!',
    time: '10:32 AM',
    unread: 2,
    online: true,
    isSupport: true
  },
  {
    id: 2,
    name: 'John Rider',
    avatar: null,
    lastMessage: 'I am on my way with your delivery.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    isRider: true
  },
  {
    id: 3,
    name: 'Eco Grocery Store',
    avatar: null,
    lastMessage: "Thank you for your order! We've added a free sample.",
    time: 'Jul 10',
    unread: 0,
    online: true,
    isVendor: true
  },
  {
    id: 4,
    name: 'Maria Johnson',
    avatar: null,
    lastMessage: 'Hey, can you share that sustainable products list?',
    time: 'Jul 8',
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: 'Green Initiative Group',
    avatar: null,
    lastMessage: 'Join our recycling event this weekend!',
    time: 'Jul 5',
    unread: 0,
    online: false,
    isGroup: true
  }
];

const messages = [
  {
    id: 1,
    senderId: 1,
    text: 'Hello! How can we help you today?',
    time: '10:00 AM',
    status: 'read'
  },
  {
    id: 2,
    senderId: 'me',
    text: "Hi, I'm wondering about the status of my order #ORD-1234",
    time: '10:05 AM',
    status: 'read'
  },
  {
    id: 3,
    senderId: 1,
    text: 'Let me check that for you right away.',
    time: '10:07 AM',
    status: 'read'
  },
  {
    id: 4,
    senderId: 1,
    text: 'I can see that your order has been processed and is now with our delivery rider. It should arrive within the next 20 minutes.',
    time: '10:10 AM',
    status: 'read'
  },
  {
    id: 5,
    senderId: 'me',
    text: "That's great news! Thank you for the update.",
    time: '10:12 AM',
    status: 'read'
  },
  {
    id: 6,
    senderId: 1,
    text: "You're welcome! Is there anything else you'd like to know about your order?",
    time: '10:15 AM',
    status: 'read'
  },
  {
    id: 7,
    senderId: 'me',
    text: "No, that's all I needed. Have a great day!",
    time: '10:16 AM',
    status: 'read'
  },
  {
    id: 8,
    senderId: 1,
    text: 'Your order #ORD-1234 has been delivered successfully! Please let us know if everything arrived as expected.',
    time: '10:32 AM',
    status: 'delivered'
  }
];

const MessageBubble = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
          <AvatarFallback className="bg-primary-light text-primary">ST</AvatarFallback>
        </Avatar>
      )}
      
      <div className="max-w-[80%] md:max-w-[70%]">
        <div
          className={`p-3 rounded-lg ${
            isCurrentUser
              ? 'bg-primary text-black'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <div className={`flex items-center mt-1 text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
          <span>{message.time}</span>
          {isCurrentUser && (
            <span className="ml-1">
              {message.status === 'read' ? (
                <CheckCheck className="h-3 w-3 text-blue-500" />
              ) : message.status === 'delivered' ? (
                <CheckCheck className="h-3 w-3 text-gray-500" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageInput);
    
    // Clear input after sending
    setMessageInput('');
  };
  
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userRole="customer">
      <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col">
        <div className="flex flex-col md:flex-row h-full">
          {/* Conversations List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full px-2 pt-2">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <ScrollArea className="flex-grow">
              <div className="p-2 space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id
                        ? 'bg-primary-light'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {conversation.isSupport 
                              ? 'ST' 
                              : conversation.isRider 
                                ? 'JR'
                                : conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium line-clamp-1">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-1">
                          <p 
                            className={`text-sm line-clamp-1 ${
                              conversation.unread ? 'font-medium' : 'text-gray-500'
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                          
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-primary text-black">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-1 mt-1">
                          {conversation.isSupport && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Support</Badge>
                          )}
                          {conversation.isRider && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Rider</Badge>
                          )}
                          {conversation.isVendor && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Vendor</Badge>
                          )}
                          {conversation.isGroup && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Group</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col h-full border-t md:border-t-0">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedConversation.isSupport 
                      ? 'ST' 
                      : selectedConversation.isRider 
                        ? 'JR'
                        : selectedConversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="ml-3">
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 flex items-center">
                      {selectedConversation.online ? (
                        <>
                          <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
                          Online
                        </>
                      ) : (
                        'Offline'
                      )}
                    </span>
                    
                    {selectedConversation.isSupport && (
                      <Badge variant="outline" className="text-xs py-0 px-1 h-5 ml-2">Support</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-1">
                {messages.map((message) => (
                  <MessageBubble 
                    key={message.id}
                    message={message}
                    isCurrentUser={message.senderId === 'me'}
                  />
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow"
                />
                
                <Button type="submit" className="flex-shrink-0 bg-primary hover:bg-primary-hover text-black">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
