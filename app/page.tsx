"use client";

import { useState } from "react";
import Meteors from "@/components/magucui/meteors";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full bg-gray-900 text-white p-4 text-center">
      Built by Rudy |
      <a href="https://twitter.com/wimnr9745" className="mx-2 underline">Twitter</a> |
      <a href="https://github.com/whyismynamerudy" className="mx-2 underline">Github</a> |
      <a href="https://whyismynamerudy.tech" className="mx-2 underline">Website</a>
    </footer>
  );
};


export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    if (validateEmail(email)) {
      setError("");
      sendWelcomeEmail(email);
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const sendWelcomeEmail = async (email: string) => {
    try {
      const response = await fetch("https://voyager-backend.vercel.app/send/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        alert("Message sent successfully!");
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("An error occurred while sending the email.");
    }
  };

  return (
    <main className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-white font-sans">
      <Meteors number={30} />
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-8 text-center font-mono italic text-neutral-700 z-10">VOYAGER</h1>
      <h5 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center mb-8 text-neutral-700 z-10 top-0">Find internships the moment they&apos;re posted.</h5>
      <div className="flex items-center z-10 space-x-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 border border-white rounded-md focus:outline-none focus:border-opacity-0 text-gray-800"
        />
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-white text-purple-500 rounded-md uppercase tracking-wider font-semibold hover:bg-purple-100 focus:outline-none focus:bg-purple-100"
        >
          Submit
        </button>
      </div>
      {error && <p className="text-red-500 z-10">{error}</p>}
      <Footer />
    </main>
  );
}

