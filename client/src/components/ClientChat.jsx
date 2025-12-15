import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  increment
} from "firebase/firestore";
import { db } from "../firebase";

export default function ClientChat({ userId, trainerId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const chatId = `${userId}_${trainerId}`;
  const chatDocRef = doc(db, "chats", chatId);

  // receive messages
  useEffect(() => {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, [chatId]);

  // scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Add message
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: userId,
      text: message,
      timestamp: serverTimestamp(),
    });

    // Create chat doc if not exist & increment unread count
    await setDoc(
      chatDocRef,
      { unreadCount: increment(1) },
      { merge: true }
    );

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 p-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md flex flex-col h-[90vh]">
        <div className="bg-green-500 text-white text-center py-3 rounded-t-xl font-semibold text-lg">
          Chat with Trainer
        </div>

        <div className="px-4 py-2 text-gray-700 text-sm bg-green-200 border-b border-green-200">
          Hello! You can chat with your trainer here. Ask questions, share updates, and get guidance.
        </div>

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
                ${msg.senderId === userId
                  ? "bg-green-500 text-white ml-auto rounded-br-sm"
                  : "bg-green-100 text-gray-800 mr-auto rounded-bl-sm"
                }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

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
