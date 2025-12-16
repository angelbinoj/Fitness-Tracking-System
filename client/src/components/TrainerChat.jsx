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

export default function TrainerChat({ userId, trainerId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const chatId = `${userId}_${trainerId}`;

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );

    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [chatId]);

  // ✅ mark unread messages as read (ESSENTIAL)
  useEffect(() => {
    const markRead = async () => {
      const snap = await getDocs(
        collection(db, "chats", chatId, "messages")
      );

      snap.docs.forEach(d => {
        const data = d.data();
        if (data.senderId === userId && data.seenByTrainer === false) {
          updateDoc(d.ref, { seenByTrainer: true });
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
      senderId: trainerId,
      text: message,
      timestamp: serverTimestamp(),
      seenByTrainer: true,
      seenByClient: false
    });

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-xl shadow flex flex-col h-[90vh]">

        <div className="bg-green-500 text-white text-center py-3 font-semibold">
          Chat with Client
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`mb-2 px-4 py-2 rounded-xl text-sm max-w-[70%]
                ${msg.senderId === trainerId
                  ? "bg-green-500 text-white ml-auto"
                  : "bg-green-100 text-black"
                }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-green-200 flex gap-2">
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
