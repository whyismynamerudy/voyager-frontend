"use client";

import { useState, useEffect } from "react";
import Meteors from "@/components/magucui/meteors";
import axios from "axios";

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
  const [websites, setWebsites] = useState<string[]>([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get("https://voyager-backend.vercel.app/send/get-all-websites");
        setWebsites(response.data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };

    fetchWebsites();
  }, []);

  const event = ({ action, category, label, value }: any) => { 
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  const handleButtonClick = () => {

    event({
      action: 'submit_email',
      category: 'submission',
      label: 'Submitted email to be notified',
      value: 'Email Submitted',
    });

    if (validateEmail(email)) {
      setError("");
      sendWelcomeEmail(email);

      event({
        action: 'accept_email',
        category: 'submission',
        label: 'Email accepted by backend',
        value: 'Email Accepted',
      });

    } else {
      setError("Please enter a valid email address.");
      event({
        action: 'deny_email',
        category: 'submission',
        label: 'Email denied by backend',
        value: 'Email Denied',
      });
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
        body: new URLSearchParams({ email })
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
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-white font-sans">
      <Meteors number={30} />
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-8 text-center font-mono italic text-neutral-700 z-10">VOYAGER</h1>
      <h5 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center mb-8 text-neutral-700 z-10 top-0">Find jobs you care about.</h5>
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
      <div className="mt-8 z-10 w-full max-w-4xl">
        <h3 className="text-xl mb-4 text-neutral-700 text-center">Currently Tracking: </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {websites.map((website, index) => (
            <div key={index} className="bg-white text-gray-800 p-4 rounded-md shadow-md justify-center text-center">
              {website}
            </div>
          ))}
        </div>
      </ div>
      <Footer />
    </main>
  );
}

