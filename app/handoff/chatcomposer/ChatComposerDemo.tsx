"use client";

import { useState } from "react";
import type { JSX } from "react";
import { ChatComposer } from "@/src/components/ChatComposer";

/** Demo: el texto se borra al enviar; el botón de emojis solo se marca (el panel de emojis es del SubasChat). */
export default function ChatComposerDemo(): JSX.Element {
  const [text, setText] = useState("");
  const [emojis, setEmojis] = useState(false);
  return <div style={{ width: 311, background: "#fff", borderRadius: 8 }}>
    <ChatComposer label="Mensaje para KLM8RT" value={text} onChange={setText} canSend={!!text.trim()} onSend={() => setText("")}
      emojiOpen={emojis} onEmoji={() => setEmojis((v) => !v)} onImage={() => {}} />
  </div>;
}
