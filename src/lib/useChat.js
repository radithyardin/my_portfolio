import { useState, useEffect, useRef } from 'react'
import { ref, push, onValue, serverTimestamp, query, limitToLast, off } from 'firebase/database'
import { db } from './firebase'

const MAX_MESSAGES = 50

// Simpan nama user di session
function getUsername() {
  let name = sessionStorage.getItem('chat_username')
  if (!name) {
    const adjectives = ['Swift', 'Bold', 'Calm', 'Keen', 'Wise', 'Bright', 'Cool', 'Rare']
    const nouns = ['Fox', 'Wave', 'Star', 'Mind', 'Code', 'Node', 'Byte', 'Loop']
    name = adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)]
    sessionStorage.setItem('chat_username', name)
  }
  return name
}

// Generate warna konsisten per username
function getUserColor(name) {
  const colors = ['#7ecf8e','#c4d4e8','#e8dcc4','#ddc4e8','#e8c4c4','#c8e8c4','#c4c8e8','#e8c4d4']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

export function useChat() {
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const username = useRef(getUsername())
  const color = useRef(getUserColor(username.current))

  useEffect(() => {
    const msgRef = query(ref(db, 'portfolio_chat/messages'), limitToLast(MAX_MESSAGES))

    const unsub = onValue(
      msgRef,
      (snap) => {
        const data = snap.val()
        if (data) {
          const list = Object.entries(data).map(([id, msg]) => ({ id, ...msg }))
          setMessages(list)
        } else {
          setMessages([])
        }
        setConnected(true)
        setLoading(false)
      },
      (error) => {
        console.error('Firebase error:', error)
        setConnected(false)
        setLoading(false)
      }
    )

    return () => off(msgRef)
  }, [])

  const sendMessage = async (text) => {
    if (!text.trim() || !connected) return
    try {
      await push(ref(db, 'portfolio_chat/messages'), {
        text: text.trim(),
        username: username.current,
        color: color.current,
        timestamp: serverTimestamp(),
        createdAt: Date.now(),
      })
    } catch (err) {
      console.error('Send error:', err)
    }
  }

  return {
    messages,
    sendMessage,
    connected,
    loading,
    myUsername: username.current,
    myColor: color.current,
  }
}
