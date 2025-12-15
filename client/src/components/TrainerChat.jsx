import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";

export default function TrainerChat({ userId, trainerId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // unique chat id
  const chatId = `${userId}_${trainerId}`;

  // receive messages (real-time)
  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [chatId]);

  // reset unread count when trainer opens chat
  useEffect(() => {
  const resetUnreadCount = async () => {
    const chatDocRef = doc(db, "chats", chatId);
    try {
      await setDoc(chatDocRef, { unreadCount: 0 }, { merge: true });
    } catch (err) {
      console.log(err);
    }
  };
  resetUnreadCount();
}, [chatId]);


  // auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: trainerId,
      text: message,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 p-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md flex flex-col h-[90vh]">

        {/* Header */}
        <div className="bg-green-500 text-white text-center py-3 rounded-t-xl font-semibold text-lg">
          Chat with Client
        </div>

        {/* Welcome Content */}
        <div className="px-4 py-2 text-gray-700 text-sm bg-green-200 border-b border-green-200">
          Hello! Messages from your client will appear here. You can reply and guide them.
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm mt-5">
              No messages yet. Say hi! 
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm 
                ${msg.senderId === trainerId
                  ? "bg-green-500 text-white ml-auto rounded-br-sm"
                  : "bg-green-100 text-gray-800 mr-auto rounded-bl-sm"
                }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-3 bg-green-200 rounded-b-xl">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2 rounded-full outline-none text-sm focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
