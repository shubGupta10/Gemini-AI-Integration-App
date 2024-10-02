import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const App = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [isResponseFetched, setIsResponseFetched] = useState(false);
  const [userResponse, setUserResponse] = useState('');

  const fetchUserResponse = async () => {
    if (userQuestion) {
      try {
        const response = await axios.post("http://localhost:5000/api/content", {
          question: userQuestion, 
        });
        setIsResponseFetched(true);
        setUserResponse(response.data.result);
      } catch (error) {
        console.error("Error fetching the response:", error);
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Gemini AI Integration App</h1>
      <h2 className="text-lg font-semibold mb-2">Ask your question:</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={fetchUserResponse}
        className="w-full bg-black text-white py-2 rounded hover:bg-black transition"
      >
        Ask
      </button>
  
      <div className="mt-4">
        {isResponseFetched ? (
          <div className="p-4 border border-gray-200 rounded bg-gray-100">
            <h3 className="font-semibold">Response:</h3>
            <ReactMarkdown>{userResponse}</ReactMarkdown> 
          </div>
        ) : (
          <p className="text-gray-500">No response yet. Ask a question!</p>
        )}
      </div>
    </div>
  );
  
};

export default App;
