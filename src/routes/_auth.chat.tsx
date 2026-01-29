import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useMemo, useEffect } from 'react';
import { z } from 'zod';

// Search Params Schema
const chatSearchSchema = z.object({
      chatId: z.number().optional()
});

export const Route = createFileRoute('/_auth/chat')({
      validateSearch: search => chatSearchSchema.parse(search),
      component: ChatComponent
});

// Types
interface Message {
      id: number;
      text: string;
      time: string;
      isMe: boolean;
      sender: string;
}

interface Friend {
      id: number;
      time: string;
      name: string;
      avatar: string;
      lastMessage: string;
      status: 'online' | 'offline' | 'busy';
}

// Dummy Data
const MOCK_FRIENDS: Friend[] = [
      {
            id: 1,
            name: 'Alice Cooper',
            status: 'online',
            avatar: 'A',
            lastMessage: 'See you tomorrow!',
            time: '10:30 AM'
      },
      {
            id: 2,
            name: 'Bob Smith',
            status: 'offline',
            avatar: 'B',
            lastMessage: 'Can you send the file?',
            time: 'Yesterday'
      },
      {
            id: 3,
            name: 'Charlie Brown',
            status: 'busy',
            avatar: 'C',
            lastMessage: 'Meeting in 5 mins',
            time: 'Yesterday'
      },
      {
            id: 4,
            name: 'Diana Prince',
            status: 'online',
            avatar: 'D',
            lastMessage: 'Great work on the dashboard!',
            time: 'Mon'
      },
      {
            id: 5,
            name: 'Ethan Hunt',
            status: 'offline',
            avatar: 'E',
            lastMessage: 'Mission accomplished.',
            time: 'Sun'
      }
];

const MOCK_FILES = [
      { id: 1, name: 'Project_Specs.pdf', size: '2.4 MB', type: 'PDF' },
      { id: 2, name: 'Dashboard_Mockup.png', size: '1.2 MB', type: 'IMG' },
      { id: 3, name: 'Q4_Report.docx', size: '850 KB', type: 'DOC' },
      { id: 4, name: 'Meeting_Notes.txt', size: '12 KB', type: 'TXT' }
];

const MOCK_MESSAGES_BY_ID: Record<number, Message[]> = {
      1: [
            {
                  id: 1,
                  sender: 'Alice Cooper',
                  text: 'Hey there! How is the new dashboard coming along?',
                  isMe: false,
                  time: '10:15 AM'
            },
            {
                  id: 2,
                  sender: 'Me',
                  text: 'It is going great! Just adding the chat feature now.',
                  isMe: true,
                  time: '10:18 AM'
            },
            {
                  id: 3,
                  sender: 'Alice Cooper',
                  text: 'That sounds awesome. Can not wait to see it!',
                  isMe: false,
                  time: '10:20 AM'
            },
            {
                  id: 4,
                  sender: 'Me',
                  text: 'I will deploy a preview link shortly.',
                  isMe: true,
                  time: '10:22 AM'
            },
            {
                  id: 5,
                  sender: 'Alice Cooper',
                  text: 'Perfect. See you tomorrow!',
                  isMe: false,
                  time: '10:30 AM'
            }
      ],
      2: [
            {
                  id: 1,
                  sender: 'Bob Smith',
                  text: 'Hi, do you have the latest design files?',
                  isMe: false,
                  time: 'Yesterday'
            },
            { id: 2, sender: 'Me', text: 'Yes, let me upload them here.', isMe: true, time: 'Yesterday' },
            {
                  id: 3,
                  sender: 'Bob Smith',
                  text: 'Thanks! I need them for the client meeting.',
                  isMe: false,
                  time: 'Yesterday'
            }
      ]
};

function ChatComponent() {
      const navigate = useNavigate({ from: Route.fullPath });
      const search = Route.useSearch();
      const activeChatId = search.chatId;

      const getStatusColor = (status: Friend['status']) => {
            switch (status) {
                  case 'online':
                        return 'text-success';
                  case 'busy':
                        return 'text-danger';
                  case 'offline':
                        return 'text-text-muted';
            }
      };

      const getStatusDotColor = (status: Friend['status']) => {
            switch (status) {
                  case 'online':
                        return 'bg-success';
                  case 'busy':
                        return 'bg-danger';
                  case 'offline':
                        return 'bg-gray-400';
            }
      };

      const [showRightPanel, setShowRightPanel] = useState<boolean>(true);
      const [message, setMessage] = useState<string>('');

      const selectedFriend = useMemo(() => {
            return MOCK_FRIENDS.find(f => f.id === activeChatId) || MOCK_FRIENDS[0];
      }, [activeChatId]);

      const currentMessages = useMemo(() => {
            return MOCK_MESSAGES_BY_ID[selectedFriend.id] || [];
      }, [selectedFriend.id]);

      useEffect(() => {
            if (!activeChatId) {
                  navigate({ search: { chatId: MOCK_FRIENDS[0].id }, replace: true });
            }
      }, [activeChatId, navigate]);

      const handleFriendClick = (friendId: number) => {
            navigate({ search: { chatId: friendId } });
      };

      const handleSendMessage = (e: React.FormEvent) => {
            e.preventDefault();
            if (!message.trim()) return;
            setMessage('');
      };

      return (
            <div className="h-[calc(100vh-120px)] flex gap-6 max-w-[1600px] mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                  {/* LEFT COLUMN: Friends List */}
                  <section
                        className="w-80 min-w-[300px] flex flex-col bg-bg-secondary border border-border rounded-[2.5rem] overflow-hidden max-lg:w-20 max-lg:min-w-[80px] transition-all shadow-sm"
                        aria-label="Friends list"
                  >
                        <div className="p-6 border-b border-border/50">
                              <h2 className="text-xl font-black text-text-primary mb-4 max-lg:hidden tracking-tight">
                                    Messages
                              </h2>
                              <div className="relative">
                                    <input
                                          type="text"
                                          placeholder="Search..."
                                          className="w-full bg-bg-primary border border-border rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold focus:outline-accent max-lg:hidden placeholder:text-text-muted"
                                    />
                                    <svg
                                          className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="3"
                                    >
                                          <circle cx="11" cy="11" r="8" />
                                          <path d="M21 21l-4.35-4.35" />
                                    </svg>
                              </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                              {MOCK_FRIENDS.map(friend => (
                                    <button
                                          key={friend.id}
                                          onClick={() => handleFriendClick(friend.id)}
                                          className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all text-left group
                                                ${selectedFriend.id === friend.id ? 'bg-accent/10 shadow-[inset_0_0_0_1.5px_rgba(99,102,241,0.2)]' : 'hover:bg-bg-hover active:scale-[0.98]'}
                                          `}
                                    >
                                          <div className="relative shrink-0">
                                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm bg-linear-to-br from-accent to-accent-hover shadow-lg shadow-accent/20 transition-transform group-hover:scale-105">
                                                      {friend.avatar}
                                                </div>
                                                <span
                                                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[3px] border-bg-secondary ${getStatusDotColor(friend.status)} shadow-sm`}
                                                />
                                          </div>
                                          <div className="flex-1 min-w-0 max-lg:hidden">
                                                <div className="flex justify-between items-baseline">
                                                      <span className="text-sm font-black text-text-primary truncate">
                                                            {friend.name}
                                                      </span>
                                                      <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                                                            {friend.time}
                                                      </span>
                                                </div>
                                                <p className="text-xs text-text-secondary truncate mt-0.5 font-medium">
                                                      {friend.lastMessage}
                                                </p>
                                          </div>
                                    </button>
                              ))}
                        </div>
                  </section>

                  {/* MIDDLE COLUMN: Chat Area */}
                  <section
                        className="flex-1 flex flex-col bg-bg-secondary border border-border rounded-[2.5rem] overflow-hidden min-w-0 shadow-sm"
                        aria-label={`Chat with ${selectedFriend.name}`}
                  >
                        {/* Chat Header */}
                        <div className="p-6 border-b border-border/50 flex justify-between items-center bg-bg-secondary/50 backdrop-blur-md z-10">
                              <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm bg-linear-to-br from-accent to-accent-hover shadow-lg shadow-accent/20">
                                          {selectedFriend.avatar}
                                    </div>
                                    <div>
                                          <h3 className="text-lg font-black text-text-primary tracking-tight">
                                                {selectedFriend.name}
                                          </h3>
                                          <p
                                                className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${getStatusColor(selectedFriend.status)}`}
                                          >
                                                <span
                                                      className={`w-2 h-2 rounded-full ${getStatusDotColor(selectedFriend.status)} ${selectedFriend.status === 'online' ? 'animate-pulse' : ''}`}
                                                />
                                                {selectedFriend.status}
                                          </p>
                                    </div>
                              </div>
                              <button
                                    className="p-3 text-text-secondary hover:bg-bg-hover rounded-2xl transition-all active:scale-90"
                                    onClick={() => setShowRightPanel(!showRightPanel)}
                              >
                                    <svg
                                          className="w-6 h-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                    >
                                          <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                              </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-bg-primary/30 custom-scrollbar">
                              {currentMessages.length > 0 ? (
                                    currentMessages.map(msg => (
                                          <div
                                                key={msg.id}
                                                className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
                                          >
                                                <div
                                                      className={`max-w-[75%] rounded-[2rem] p-5 shadow-sm group
                                                      ${msg.isMe ? 'bg-accent text-white rounded-tr-none shadow-accent/10' : 'bg-bg-secondary border border-border text-text-primary rounded-tl-none hover:border-accent/30'}
                                                `}
                                                >
                                                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                                      <p
                                                            className={`text-[10px] font-black uppercase tracking-widest mt-2 opacity-60`}
                                                      >
                                                            {msg.time}
                                                      </p>
                                                </div>
                                          </div>
                                    ))
                              ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4">
                                          <div className="w-20 h-20 rounded-3xl bg-bg-primary flex items-center justify-center">
                                                <svg
                                                      className="w-10 h-10 opacity-20"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                          </div>
                                          <p className="font-bold text-sm tracking-widest uppercase">
                                                Start Conversation
                                          </p>
                                    </div>
                              )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-border/50 bg-bg-secondary/50 backdrop-blur-md">
                              <form
                                    className="flex gap-4 items-center bg-bg-primary rounded-[2rem] p-2 pr-2 shadow-inner border border-border/50"
                                    onSubmit={handleSendMessage}
                              >
                                    <button
                                          type="button"
                                          className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-accent hover:bg-bg-hover rounded-2xl transition-all"
                                    >
                                          <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                          >
                                                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                          </svg>
                                    </button>
                                    <input
                                          type="text"
                                          value={message}
                                          onChange={e => setMessage(e.target.value)}
                                          placeholder="Enter your message..."
                                          className="flex-1 bg-transparent px-2 py-3 text-sm font-bold focus:outline-none placeholder:text-text-muted"
                                    />
                                    <button
                                          type="submit"
                                          className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 active:scale-90"
                                    >
                                          <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                          >
                                                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                          </svg>
                                    </button>
                              </form>
                        </div>
                  </section>

                  {/* RIGHT COLUMN: Files Area */}
                  <section
                        className={`w-80 min-w-[300px] bg-bg-secondary border border-border rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-500 shadow-sm
                              ${showRightPanel ? 'translate-x-0' : 'translate-x-[110%] absolute right-0 pointer-events-none lg:static lg:translate-x-0 lg:opacity-0 lg:w-0 lg:min-w-0'}
                        `}
                        aria-label="Shared files"
                  >
                        <div className="p-6 border-b border-border/50">
                              <h2 className="text-xl font-black text-text-primary tracking-tight">Vault</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                              {MOCK_FILES.map(file => (
                                    <div
                                          key={file.id}
                                          className="flex items-center gap-4 p-4 rounded-3xl bg-bg-primary/50 border border-transparent hover:border-accent/20 hover:bg-bg-secondary transition-all group cursor-pointer shadow-xs"
                                    >
                                          <div className="w-12 h-12 rounded-2xl bg-bg-secondary flex items-center justify-center text-text-muted group-hover:text-accent group-hover:bg-accent/5 transition-all">
                                                <svg
                                                      className="w-6 h-6"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      strokeWidth="2"
                                                >
                                                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                                <p className="text-sm font-black text-text-primary truncate">
                                                      {file.name}
                                                </p>
                                                <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                                                      {file.size} • {file.type}
                                                </p>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        <div className="p-6 border-t border-border/50 bg-bg-primary/30">
                              <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent-hover transition-all bg-accent/5 rounded-2xl">
                                    Browse All Assets
                              </button>
                        </div>
                  </section>
            </div>
      );
}
