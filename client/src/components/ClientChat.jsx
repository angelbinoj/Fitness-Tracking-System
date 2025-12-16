import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";

export default function ClientChat({ userId, trainerId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const chatId = `${userId}_${trainerId}`;

  // receive messages
  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  // mark trainer messages as read
  useEffect(() => {
    const markRead = async () => {
      const snap = await getDocs(
        collection(db, "chats", chatId, "messages")
      );

      snap.docs.forEach(d => {
        const data = d.data();
        if (data.senderId !== userId && data.seenByClient === false) {
          updateDoc(d.ref, { seenByClient: true });
        }
      });
    };

    markRead();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: userId,
      text: message,
      timestamp: serverTimestamp(),
      seenByClient: true,
      seenByTrainer: false
    });

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 p-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md flex flex-col h-[90vh]">

        <div className="bg-green-500 text-white text-center py-3 rounded-t-xl font-semibold">
          Chat with Trainer
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
                ${msg.senderId === userId
                  ? "bg-green-500 text-white ml-auto"
                  : "bg-green-100 text-gray-800"
                }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 p-3 bg-green-200">
          <input
            className="flex-1 px-4 py-2 rounded-full"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
