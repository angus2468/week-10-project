"use client";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

export default function Page() {
  const messages = useQuery(api.chat.getMessages);
  const sendMessage = useMutation(api.chat.sendMessage);
  const [newMessageText, setNewMessageText] = useState("");
  const [name, setName] = useState("Angus"); // Default name, but now it can be changed

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <div>
      <section className="chat p-4">
        <header>
          <h1 className="text-3xl">Convex Chat</h1>
          <div className="name-input-container">
            <label htmlFor="nameInput">Your Name: </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <p>
            Connected as <strong>{name}</strong>
          </p>
        </header>
        {messages?.map((message) => (
          <div key={message._id} className="flex flex-col p-3">
            <article
              className={
                message.user === name
                  ? "border border-gray-200 bg-red-900 flex flex-col gap-2 p-2"
                  : "border border-gray-200 bg-blue-800 flex flex-col gap-2 p-2"
              }
            >
              <div>{message.user}</div>
              <p>{message.body}</p>
            </article>
          </div>
        ))}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (name.trim() === "") return; // Prevent sending messages without a name
            await sendMessage({ user: name, body: newMessageText });
            setNewMessageText("");
          }}
        >
          <input
            value={newMessageText}
            onChange={(e) => {
              const text = e.target.value;
              setNewMessageText(text);
            }}
            placeholder="Write a message…"
            autoFocus
          />
          <button type="submit" disabled={!newMessageText || !name.trim()}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
