
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
  User,
  Users,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for vendor messaging
const conversations = [
  {
    id: 1,
    name: 'Support Team',
    avatar: null,
    lastMessage: 'Your invoice #INV-2234 has been processed successfully.',
    time: '10:32 AM',
    unread: 1,
    online: true,
    isSupport: true
  },
  {
    id: 2,
    name: 'James Rodriguez',
    avatar: null,
    lastMessage: "I'm on my way to pick up the recycling materials.",
    time: 'Yesterday',
    unread: 0,
    online: true,
    isRider: true
  },
  {
    id: 3,
    name: 'Emily Johnson',
    avatar: null,
    lastMessage: 'Is the organic produce in stock this week?',
    time: 'Jul 10',
    unread: 2,
    online: false,
    isCustomer: true
  },
  {
    id: 4,
    name: 'Eco Suppliers Chat',
    avatar: null,
    lastMessage: 'Green Packaging Ltd: We have new biodegradable options available.',
    time: 'Jul 8',
    unread: 0,
    online: false,
    isGroup: true
  },
  {
    id: 5,
    name: 'Sustainability Team',
    avatar: null,
    lastMessage: 'Your recycling rate has increased by 5% this month!',
    time: 'Jul 5',
    unread: 0,
    online: false,
    isAdmin: true
  }
];

const messages = [
  {
    id: 1,
    senderId: 1,
    text: 'Hello! This is Cydex support team. How can we assist you today?',
    time: '10:00 AM',
    status: 'read'
  },
  {
    id: 2,
    senderId: 'me',
    text: "Hi, I'm having trouble with the recycling pickup schedule. It seems the dates aren't showing correctly in my dashboard.",
    time: '10:05 AM',
    status: 'read'
  },
  {
    id: 3,
    senderId: 1,
    text: "Let me check that for you right away. Could you please share a screenshot of what you're seeing?",
    time: '10:07 AM',
    status: 'read'
  },
  {
    id: 4,
    senderId: 'me',
    text: "I've just sent the screenshot via email to support@cydex.com",
    time: '10:10 AM',
    status: 'read'
  },
  {
    id: 5,
    senderId: 1,
    text: "Thank you for sending that. I can see the issue - it looks like there was a timezone setting that needed adjustment. I've fixed it from our end.",
    time: '10:15 AM',
    status: 'read'
  },
  {
    id: 6,
    senderId: 1,
    text: "Could you please refresh your dashboard and let me know if the pickup dates are displaying correctly now?",
    time: '10:16 AM',
    status: 'read'
  },
  {
    id: 7,
    senderId: 'me',
    text: "Perfect! It's working correctly now. Thank you for the quick fix!",
    time: '10:20 AM',
    status: 'read'
  },
  {
    id: 8,
    senderId: 1,
    text: "Your invoice #INV-2234 has been processed successfully. You should receive payment within 1-3 business days.",
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
          <AvatarFallback>VN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const MessagesPage = () => {
  const isMobile = useIsMobile();
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
    <DashboardLayout userRole="vendor">
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
                <TabsTrigger value="customers">Customers</TabsTrigger>
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
                                : conversation.isAdmin
                                  ? 'AD'
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
                          {conversation.isCustomer && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Customer</Badge>
                          )}
                          {conversation.isGroup && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Group</Badge>
                          )}
                          {conversation.isAdmin && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Admin</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <Button className="w-full bg-primary hover:bg-primary-hover text-black">
                <Users className="mr-2 h-4 w-4" />
                Create Group Chat
              </Button>
            </div>
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
                        : selectedConversation.isAdmin
                          ? 'AD'
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
                    {selectedConversation.isRider && (
                      <Badge variant="outline" className="text-xs py-0 px-1 h-5 ml-2">Rider</Badge>
                    )}
                    {selectedConversation.isCustomer && (
                      <Badge variant="outline" className="text-xs py-0 px-1 h-5 ml-2">Customer</Badge>
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
