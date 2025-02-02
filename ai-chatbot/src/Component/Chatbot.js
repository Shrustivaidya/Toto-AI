import { useState } from "react";
import axios from "axios";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_KEY = '';
  console.log(API_KEY);


  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: "Bearer" + "API",
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message;
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatbox}>
        {messages.map((msg, index) => (
          <p key={index} style={msg.role === "user" ? styles.user : styles.bot}>
            <strong>{msg.role === "user" ? "You:" : "Bot:"}</strong> {msg.content}
          </p>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  chatbox: {
    height: "300px",
    overflowY: "auto",
    padding: "10px",
  },
  user: {
    textAlign: "right",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "5px",
  },
  bot: {
    textAlign: "left",
    backgroundColor: "#ddd",
    color: "#000",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "5px",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    marginLeft: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Chatbot;
