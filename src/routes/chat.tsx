import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/chat')({
  component: ChatComponent,
})

// Dummy Data
const MOCK_FRIENDS = [
  {
    id: 1,
    name: 'Alice Cooper',
    status: 'online',
    avatar: 'A',
    lastMessage: 'See you tomorrow!',
    time: '10:30 AM',
  },
  {
    id: 2,
    name: 'Bob Smith',
    status: 'offline',
    avatar: 'B',
    lastMessage: 'Can you send the file?',
    time: 'Yesterday',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    status: 'busy',
    avatar: 'C',
    lastMessage: 'Meeting in 5 mins',
    time: 'Yesterday',
  },
  {
    id: 4,
    name: 'Diana Prince',
    status: 'online',
    avatar: 'D',
    lastMessage: 'Great work on the dashboard!',
    time: 'Mon',
  },
  {
    id: 5,
    name: 'Ethan Hunt',
    status: 'offline',
    avatar: 'E',
    lastMessage: 'Mission accomplished.',
    time: 'Sun',
  },
]

const MOCK_FILES = [
  { id: 1, name: 'Project_Specs.pdf', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'Dashboard_Mockup.png', size: '1.2 MB', type: 'IMG' },
  { id: 3, name: 'Q4_Report.docx', size: '850 KB', type: 'DOC' },
  { id: 4, name: 'Meeting_Notes.txt', size: '12 KB', type: 'TXT' },
]

const MOCK_MESSAGES = [
  {
    id: 1,
    sender: 'Alice Cooper',
    text: 'Hey there! How is the new dashboard coming along?',
    isMe: false,
    time: '10:15 AM',
  },
  {
    id: 2,
    sender: 'Me',
    text: 'It is going great! Just adding the chat feature now.',
    isMe: true,
    time: '10:18 AM',
  },
  {
    id: 3,
    sender: 'Alice Cooper',
    text: 'That sounds awesome. Can not wait to see it!',
    isMe: false,
    time: '10:20 AM',
  },
  {
    id: 4,
    sender: 'Me',
    text: 'I will deploy a preview link shortly.',
    isMe: true,
    time: '10:22 AM',
  },
  {
    id: 5,
    sender: 'Alice Cooper',
    text: 'Perfect. See you tomorrow!',
    isMe: false,
    time: '10:30 AM',
  },
]

function ChatComponent() {
  const [selectedFriend, setSelectedFriend] = useState(MOCK_FRIENDS[0])
  const [showRightPanel, setShowRightPanel] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6 max-w-[1600px] mx-auto overflow-hidden">
      {/* LEFT COLUMN: Friends List */}
      <section
        className="w-80 min-w-[300px] flex flex-col bg-bg-secondary border border-border rounded-xl overflow-hidden max-lg:w-20 max-lg:min-w-[80px] transition-all"
        aria-label="Friends list"
      >
        {/* Header/Search */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary mb-4 max-lg:hidden">
            Messages
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-bg-primary border border-border rounded-lg py-2 pl-9 pr-4 text-sm text-text-primary focus:outline-accent max-lg:hidden"
              aria-label="Search friends"
            />
            <svg
              className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {MOCK_FRIENDS.map((friend) => (
            <button
              key={friend.id}
              onClick={() => setSelectedFriend(friend)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left group
                ${selectedFriend.id === friend.id ? 'bg-accent/10' : 'hover:bg-bg-hover'}
              `}
            >
              <div className="relative shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                   bg-linear-to-br from-accent to-accent-hover`}
                >
                  {friend.avatar}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-bg-secondary
                  ${
                    friend.status === 'online'
                      ? 'bg-success'
                      : friend.status === 'busy'
                        ? 'bg-danger'
                        : 'bg-gray-400'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0 max-lg:hidden">
                <div className="flex justify-between items-baseline">
                  <span
                    className={`text-sm font-semibold truncate
                    ${selectedFriend.id === friend.id ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}
                  `}
                  >
                    {friend.name}
                  </span>
                  <span className="text-xs text-text-muted shrink-0 ml-2">
                    {friend.time}
                  </span>
                </div>
                <p className="text-xs text-text-muted truncate mt-0.5">
                  {friend.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* MIDDLE COLUMN: Chat Area */}
      <section
        className="flex-1 flex flex-col bg-bg-secondary border border-border rounded-xl overflow-hidden min-w-0"
        aria-label={`Chat with ${selectedFriend.name}`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex justify-between items-center bg-bg-secondary/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                bg-linear-to-br from-accent to-accent-hover`}
            >
              {selectedFriend.avatar}
            </div>
            <div>
              <h3 className="font-bold text-text-primary">
                {selectedFriend.name}
              </h3>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Online
              </p>
            </div>
          </div>

          {/* Mobile Toggle for Right Panel */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:bg-bg-hover rounded-lg"
            onClick={() => setShowRightPanel(!showRightPanel)}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-tertiary/30">
          {MOCK_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 shadow-sm
                ${
                  msg.isMe
                    ? 'bg-accent text-white rounded-tr-none'
                    : 'bg-bg-secondary border border-border text-text-primary rounded-tl-none'
                }
              `}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right opacity-70`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-bg-secondary">
          <form
            className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setMessage('')
            }}
          >
            <button
              type="button"
              className="p-2 text-text-muted hover:text-accent transition-colors rounded-lg hover:bg-bg-hover"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-bg-primary border border-border rounded-xl px-4 py-2 text-sm focus:outline-accent"
            />
            <button
              type="submit"
              className="p-2 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* RIGHT COLUMN: Files List */}
      <section
        className={`w-72 min-w-[280px] bg-bg-secondary border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-300
          ${showRightPanel ? 'translate-x-0' : 'translate-x-full absolute right-0 opacity-0 pointer-events-none lg:static lg:opacity-100 lg:pointer-events-auto lg:translate-x-0'}
          max-lg:fixed max-lg:right-0 max-lg:top-20 max-lg:bottom-4 max-lg:z-20 max-lg:shadow-xl
        `}
        aria-label="Shared files"
      >
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-text-primary">Shared Files</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {MOCK_FILES.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-bg-hover transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-muted group-hover:text-accent transition-colors">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {file.size} • {file.type}
                  </p>
                </div>
                <button className="text-text-muted hover:text-accent">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border bg-bg-tertiary/30">
          <button className="w-full py-2 text-sm text-accent hover:text-accent-hover font-medium">
            View All Files
          </button>
        </div>
      </section>
    </div>
  )
}
