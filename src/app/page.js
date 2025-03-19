"use client";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

const NAME = "Angus";

export default function Page() {
  const messages = useQuery(api.chat.getMessages);
  // TODO: Add mutation hook here.
  const sendMessage = useMutation(api.chat.sendMessage);

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <div>
      <section className="chat">
        <header>
          <h1>Convex Chat</h1>
          <p>
            Connected as <strong>{NAME}</strong>
          </p>
        </header>
        {messages?.map((message) => (
          <article
            key={message._id}
            className={message.user === NAME ? "message-mine" : ""}
          >
            <div>{message.user}</div>

            <p>{message.body}</p>
          </article>
        ))}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await sendMessage({ user: NAME, body: newMessageText });

            setNewMessageText("");
          }}
        >
          <input
            value={newMessageText}
            onChange={async (e) => {
              const text = e.target.value;
              setNewMessageText(text);
            }}
            placeholder="Write a message…"
            autoFocus
          />
          <button type="submit" disabled={!newMessageText}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
