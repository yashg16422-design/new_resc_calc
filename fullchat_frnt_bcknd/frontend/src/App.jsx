// // import { useState, useRef, useEffect } from "react";
// // import axios from "axios";

// // export default function App() {
// //   const [messages, setMessages] = useState([
// //     { type: "bot", text: "Hello! I can help you check rainwater recharge feasibility." }
// //   ]);
// //   const [inputs, setInputs] = useState({ area: "", rainfall: "",avlarea:"",groundwater:"",runoff:"" });
// //   const [step, setStep] = useState(1);
// //   const [loading, setLoading] = useState(false);

// //   const chatEndRef = useRef(null);

// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, loading]);

// //   const appendMessage = (type, text) => setMessages(prev => [...prev, { type, text }]);

// //   const handleInputChange = (e) => {
// //     setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const callBackend = async (endpoint, data) => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.post(`http://localhost:5000/${endpoint}`, data);
// //       setLoading(false);
// //       return res.data;
// //     } catch (err) {
// //       setLoading(false);
// //       return { error: "Error fetching data" };
// //     }
// //   };

// //   const handleFeasibility = async () => {
// //     appendMessage("user", `Area: ${inputs.area} sqm, Rainfall: ${inputs.rainfall} mm, AvlArea: ${inputs.avlarea}, groundwater: ${inputs.groundwater || "N/A"},Runoff: ${inputs.runoff}`);
// //     const res = await callBackend("api/feasibility", inputs);
// //     appendMessage("bot", res.result);
// //     setStep(2);
// //   };

// //   const handleCost = async () => {
// //     appendMessage("user", "Yes, show me the cost estimate.");
// //     const res = await callBackend("api/cost", inputs);
// //     appendMessage("bot", `Estimated Cost: ${res.cost}`);
// //     setStep(3);
// //   };

// //   const handleMaintenance = async () => {
// //     appendMessage("user", "Please show maintenance cost.");
// //     const res = await callBackend("api/maintenance", inputs);
// //     appendMessage("bot", `Estimated Maintenance: ${res.maintenance}`);
// //     setStep(4);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
// //       <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Rainwater Recharge Assistant</h1>

// //       <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 flex flex-col overflow-y-auto" style={{ minHeight: "500px" }}>
// //         {messages.map((msg, idx) => (
// //           <div key={idx} className={`flex mb-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// //             {msg.type === "bot" && (
// //               <div className="flex items-start">
// //                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2">B</div>
// //                 <div className="bg-gray-200 text-gray-800 p-3 rounded-xl max-w-xs break-words">{msg.text}</div>
// //               </div>
// //             )}
// //             {msg.type === "user" && (
// //               <div className="flex items-end">
// //                 <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs break-words">{msg.text}</div>
// //                 <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold ml-2">U</div>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //         {loading && <div className="text-center text-gray-500">⏳ Loading...</div>}
// //         <div ref={chatEndRef}></div>
// //       </div>

// //       <div className="w-full max-w-md mt-4">
// //         {step === 1 && (
// //           <div className="flex flex-col gap-2">
// //             <input name="area" type="number" placeholder="Plot Area (sqm)" value={inputs.area} onChange={handleInputChange} className="p-2 border rounded"/>
// //             <input name="rainfall" type="number" placeholder="Annual Rainfall (mm)" value={inputs.rainfall} onChange={handleInputChange} className="p-2 border rounded"/>
// //             <input name="avlarea" type="number" placeholder="Location" value={inputs.avlarea} onChange={handleInputChange} className="p-2 border rounded"/>
// //             <input name="groundwater" type="number" placeholder="Soil Type (optional)" value={inputs.groundwater} onChange={handleInputChange} className="p-2 border rounded"/>
// //             <input name="runoff" type="number" placeholder="Soil Type (optional)" value={inputs.runoff} onChange={handleInputChange} className="p-2 border rounded"/>

// //             <button onClick={handleFeasibility} className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Check Feasibility</button>
// //           </div>
// //         )}

// //         {step === 2 && (
// //           <button onClick={handleCost} className="mt-2 bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">Get Cost Estimate</button>
// //         )}

// //         {step === 3 && (
// //           <button onClick={handleMaintenance} className="mt-2 bg-teal-500 text-white p-2 rounded w-full hover:bg-teal-600">Get Maintenance Cost</button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useRef } from 'react';

// // --- Helper Components ---

// // Icon for the send button and other UI elements
// const PaperPlaneIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-45 -mt-px">
//     <path d="M22 2 11 13" />
//     <path d="m22 2-7 20-4-9-9-4 20-7z" />
//   </svg>
// );

// // Icon for the bot's avatar
// const BotIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
//         <path d="M12 8V4H8" />
//         <rect width="16" height="12" x="4" y="8" rx="2" />
//         <path d="M2 14h2" />
//         <path d="M20 14h2" />
//         <path d="M15 13v2" />
//         <path d="M9 13v2" />
//     </svg>
// );

// // Icon for the user's avatar
// const UserIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//     </svg>
// );


// // --- Main Application Component ---

// export default function App() {
//   const [step, setStep] = useState('input'); // 'input' or 'chat'
//   const [queries, setQueries] = useState(Array(5).fill(''));
//   const [messages, setMessages] =useState([]);
//   const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
//   const [isBotTyping, setIsBotTyping] = useState(false);
//   const chatEndRef = useRef(null);

//   const handleQueryChange = (index, value) => {
//     const newQueries = [...queries];
//     newQueries[index] = value;
//     setQueries(newQueries);
//   };

//   const areAllQueriesFilled = queries.every(q => q.trim() !== '');

//   const handleStartChat = (e) => {
//     e.preventDefault();
//     if (areAllQueriesFilled) {
//       setStep('chat');
//       setMessages([
//         { sender: 'bot', text: "Hello! I'm ready to answer your questions. Click the button below to start." }
//       ]);
//     }
//   };

//   // This is the placeholder for your LLM logic
//   const getBotResponse = async (query) => {
//     // --- YOUR LLM LOGIC GOES HERE ---
//     // Replace this promise with your actual API call or logic.
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(`This is a simulated demo response to your query: "${query}"`);
//       }, 1500); // Simulate network delay
//     });
//   };

//   const handleAskNextQuestion = async () => {
//     if (currentQueryIndex >= queries.length) return;

//     const userQuery = queries[currentQueryIndex];
    
//     // Add user's question to chat
//     setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
//     setIsBotTyping(true);

//     // Get response from your logic
//     const botResponse = await getBotResponse(userQuery);
    
//     setIsBotTyping(false);
    
//     // Add bot's response to chat
//     setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
//     setCurrentQueryIndex(prev => prev + 1);
//   };

//   useEffect(() => {
//     // Scroll to the latest message
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isBotTyping]);


//   // Render the Query Input Form
//   const renderInputForm = () => (
//     <div className="w-full max-w-2xl mx-auto">
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
//             <h1 className="text-4xl font-bold text-white text-center mb-2">Query Setup</h1>
//             <p className="text-slate-300 text-center mb-8">Enter 5 questions you'd like to ask the chatbot.</p>
//             <form onSubmit={handleStartChat} className="space-y-4">
//                 {queries.map((query, index) => (
//                     <div key={index}>
//                         <label htmlFor={`query-${index}`} className="block text-sm font-medium text-slate-200 mb-1">
//                             Question {index + 1}
//                         </label>
//                         <input
//                             id={`query-${index}`}
//                             type="text"
//                             value={query}
//                             onChange={(e) => handleQueryChange(index, e.target.value)}
//                             placeholder={`Enter your question here...`}
//                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 outline-none"
//                             required
//                         />
//                     </div>
//                 ))}
//                 <button
//                     type="submit"
//                     disabled={!areAllQueriesFilled}
//                     className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
//                 >
//                     Start Chat
//                     <PaperPlaneIcon />
//                 </button>
//             </form>
//         </div>
//     </div>
//   );

//   // Render the Chatbot Interface
//   const renderChatInterface = () => (
//     <div className="w-full max-w-2xl h-[80vh] mx-auto flex flex-col">
//         <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl shadow-2xl border-x border-t border-white/20 p-4 text-center">
//             <h1 className="text-2xl font-bold text-white">Chatbot Demo</h1>
//         </div>
//         <div className="flex-1 bg-slate-900/50 p-6 overflow-y-auto space-y-6">
//             {messages.map((msg, index) => (
//                 <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                     {msg.sender === 'bot' && (
//                         <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
//                             <BotIcon />
//                         </div>
//                     )}
//                     <div className={`max-w-md md:max-w-lg p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
//                         <p>{msg.text}</p>
//                     </div>
//                      {msg.sender === 'user' && (
//                         <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
//                             <UserIcon />
//                         </div>
//                     )}
//                 </div>
//             ))}
//             {isBotTyping && (
//                  <div className="flex items-end gap-3 justify-start">
//                     <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
//                         <BotIcon />
//                     </div>
//                     <div className="bg-slate-700 text-slate-200 rounded-2xl rounded-bl-none p-4">
//                         <div className="flex items-center justify-center space-x-1">
//                             <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//                             <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                             <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div ref={chatEndRef} />
//         </div>
//         <div className="bg-white/10 backdrop-blur-lg rounded-b-2xl shadow-2xl border-x border-b border-white/20 p-4">
//             {currentQueryIndex < queries.length ? (
//                 <button
//                     onClick={handleAskNextQuestion}
//                     disabled={isBotTyping}
//                     className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
//                 >
//                     {isBotTyping ? 'Thinking...' : `Ask Question #${currentQueryIndex + 1}`}
//                 </button>
//             ) : (
//                 <p className="text-center text-slate-300 font-medium">You have asked all your questions.</p>
//             )}
//         </div>
//     </div>
//   );

//   return (
//     <main className="bg-slate-900 font-sans min-h-screen flex items-center justify-center p-4 bg-grid">
//        <style>{`.bg-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }`}</style>
//       {step === 'input' ? renderInputForm() : renderChatInterface()}
//     </main>
//   );
// }
