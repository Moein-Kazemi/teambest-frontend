// these above chat write by caht gpt for users to chat together these code conncet to ./socket/socket.ts in backend

/*

'use client';

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messagesEndRef = useRef(null);

  // اتصال به سرور
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // دریافت پیام‌های قبلی
  useEffect(() => {
    if (!socket) return;

    socket.on('previous-messages', (oldMessages) => {
      setMessages(oldMessages);
    });

    // دریافت پیام جدید
    socket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // حذف پیام
    socket.on('message-deleted', (messageId) => {
      setMessages((prev) => prev.filter((_, index) => 
        index < 50 - (50 - messages.length) // یا روش بهتر
      ));
    });

    return () => {
      socket.off('previous-messages');
      socket.off('receive-message');
      socket.off('message-deleted');
    };
  }, [socket]);

  // درخواست پیام‌های قبلی بعد از ورود
  useEffect(() => {
    if (socket && isLoggedIn) {
      socket.emit('load-messages');
    }
  }, [socket, isLoggedIn]);

  // اسکرول به پایین
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ارسال پیام
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      username: username,
      message: newMessage,
      time: new Date().toLocaleTimeString('fa-IR')
    };

    socket.emit('send-message', messageData);
    setNewMessage('');
  };

  // ورود کاربر
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  // اگر کاربر وارد نشده
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ورود به چت</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام خود را وارد کنید"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            ورود
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        // هدر ها 
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-xl font-bold">چت عمومی تیم بست</h1>
          <p className="text-sm">خوش آمدید، {username}</p>
        </div>

        //  لیست پیام‌ها 
        <div className="h-96 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.username === username ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.username === username
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-xs font-bold mb-1">{msg.username}</p>
                <p>{msg.message}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {msg.time || new Date(msg.createdAt).toLocaleTimeString('fa-IR')}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        //  فرم ارسال پیام 
        <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}

*/
