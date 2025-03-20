"use client";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

export default function Page() {
  const messages = useQuery(api.chat.getMessages);
  const sendMessage = useMutation(api.chat.sendMessage);
  const [newMessageText, setNewMessageText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <div className="flex justify-center items-center">
      <section className="chat p-4 w-1/2 bg-green-900">
        <header>
          <h1 className="text-3xl text-center">Convex Chat</h1>
        </header>
        {messages?.map((message) => (
          <div
            key={message._id}
            className={
              message.user === name
                ? "flex flex-col p-3 items-start"
                : "flex flex-col p-3 items-end"
            }
          >
            <article
              className={
                message.user === name
                  ? "border border-gray-200 bg-red-900 flex flex-col gap-2 p-2 w-40 rounded-full text-center"
                  : "border border-gray-200 bg-blue-800 flex flex-col gap-2 p-2 w-40 rounded-full text-center"
              }
            >
              <div>{message.user}</div>
              <p>{message.body}</p>
            </article>
          </div>
        ))}
        <div className="text-3xl">
          <div className="name-input-container">
            <label htmlFor="nameInput">Your Name: </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              className="bg-gray-600 w-2/3"
            />
          </div>
          <p>
            Connected as <strong>{name}</strong>
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (name.trim() === "") return;
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
              className="bg-gray-600  w-2/3"
            />
            <button
              type="submit"
              disabled={!newMessageText || !name.trim()}
              className="pl-2"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
