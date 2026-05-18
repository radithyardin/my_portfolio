import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import SectionLabel from "../components/SectionLabel";
import { useChat } from "../lib/useChat";

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function Message({ msg, isOwn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 mb-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-sans text-[0.6rem] font-medium"
        style={{
          background: `${msg.color}22`,
          border: `1px solid ${msg.color}44`,
          color: msg.color,
        }}
      >
        {msg.username?.slice(0, 2).toUpperCase()}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[72%] ${isOwn ? "items-end" : "items-start"} flex flex-col gap-1`}
      >
        {!isOwn && (
          <span
            className="font-sans text-[0.62rem] tracking-wide"
            style={{ color: msg.color, opacity: 0.85 }}
          >
            {msg.username}
          </span>
        )}
        <div
          className="font-sans text-[0.85rem] font-light leading-relaxed px-4 py-2.5 rounded-2xl"
          style={{
            background: isOwn
              ? "rgba(245,242,237,0.12)"
              : "rgba(245,242,237,0.06)",
            border: isOwn
              ? "1px solid rgba(245,242,237,0.18)"
              : "1px solid rgba(245,242,237,0.1)",
            borderBottomRightRadius: isOwn ? 4 : undefined,
            borderBottomLeftRadius: !isOwn ? 4 : undefined,
            color: isOwn ? "rgba(245,242,237,0.9)" : "rgba(245,242,237,0.72)",
          }}
        >
          {msg.text}
        </div>
        <span className="font-sans text-[0.58rem] text-cream/25 px-1">
          {formatTime(msg.createdAt || msg.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

export default function ChatRoom() {
  const { messages, sendMessage, connected, loading, myUsername, myColor } =
    useChat();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <SectionWrapper id="chat" alt>
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <SectionLabel
          number="07"
          title={<span style={{ fontFamily: "vt323" }}>Chat Room</span>}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-light text-cream/50 text-[0.9rem] leading-relaxed mb-10 max-w-lg"
        >
          Hai! Tinggalkan pesan, sapa siapa pun yang sedang berkunjung, atau
          tanyakan sesuatu. Chat ini realtime dan terbuka untuk semua
          pengunjung.
        </motion.p>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(245,242,237,0.04)",
            border: "1px solid rgba(245,242,237,0.1)",
            maxWidth: 680,
          }}
        >
          {/* Chat header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(245,242,237,0.07)" }}
          >
            <div className="flex items-center gap-3">
              {/* Live indicator */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: connected ? "#7ecf8e" : "#e88e8e",
                    animation: connected
                      ? "pulseDot 2.5s ease-in-out infinite"
                      : "none",
                  }}
                />
                <span className="font-sans text-[0.7rem] text-cream/45 uppercase tracking-widest">
                  {connected ? "Live" : "Connecting..."}
                </span>
              </div>
              <span className="text-cream/20">·</span>
              <span className="font-sans text-[0.7rem] text-cream/35">
                {messages.length} pesan
              </span>
            </div>

            {/* My identity */}
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-sans text-[0.55rem]"
                style={{
                  background: `${myColor}22`,
                  border: `1px solid ${myColor}55`,
                  color: myColor,
                }}
              >
                {myUsername.slice(0, 2).toUpperCase()}
              </div>
              <span
                className="font-sans text-[0.7rem]"
                style={{ color: myColor }}
              >
                {myUsername}
              </span>
              <span className="font-sans text-[0.62rem] text-cream/25">
                (kamu)
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div
            className="overflow-y-auto px-5 py-5"
            style={{
              height: 320,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(245,242,237,0.1) transparent",
            }}
          >
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 rounded-full"
                    style={{
                      border: "2px solid rgba(245,242,237,0.1)",
                      borderTopColor: "rgba(245,242,237,0.4)",
                    }}
                  />
                  <span className="font-sans text-[0.72rem] text-cream/28">
                    Menghubungkan...
                  </span>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-3">
                <span className="text-3xl opacity-40">💬</span>
                <p className="font-sans text-[0.78rem] text-cream/28 text-center">
                  Belum ada pesan. Jadilah yang pertama!
                </p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <Message
                    key={msg.id}
                    msg={msg}
                    isOwn={msg.username === myUsername}
                  />
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="px-4 py-4"
            style={{ borderTop: "1px solid rgba(245,242,237,0.07)" }}
          >
            {!connected && (
              <div
                className="mb-3 px-4 py-2 rounded-xl text-center font-sans text-[0.72rem] text-cream/40"
                style={{
                  background: "rgba(245,242,237,0.04)",
                  border: "1px solid rgba(245,242,237,0.08)",
                }}
              >
                ⚠️ Perlu setup Firebase — lihat file{" "}
                <code className="text-cream/60">src/lib/firebase.js</code>
              </div>
            )}
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tulis pesan... (Enter untuk kirim)"
                rows={1}
                disabled={!connected}
                className="flex-1 resize-none font-sans text-[0.85rem] text-cream/80 placeholder:text-cream/25 bg-transparent outline-none leading-relaxed"
                style={{
                  background: "rgba(245,242,237,0.06)",
                  border: "1px solid rgba(245,242,237,0.12)",
                  borderRadius: 14,
                  padding: "10px 14px",
                  cursor: connected ? "text" : "not-allowed",
                  opacity: connected ? 1 : 0.5,
                  maxHeight: 100,
                  scrollbarWidth: "none",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 100) + "px";
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || !connected}
                className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-none"
                style={{
                  background:
                    input.trim() && connected
                      ? "rgba(245,242,237,0.15)"
                      : "rgba(245,242,237,0.05)",
                  border: "1px solid rgba(245,242,237,0.15)",
                  opacity: input.trim() && connected ? 1 : 0.4,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.5 8L3 2.5L5.5 8L3 13.5L13.5 8Z"
                    fill="rgba(245,242,237,0.8)"
                  />
                </svg>
              </motion.button>
            </div>
            <p className="font-sans text-[0.6rem] text-cream/20 mt-2 px-1">
              Shift+Enter untuk baris baru · Username kamu:{" "}
              <span style={{ color: myColor }}>{myUsername}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
