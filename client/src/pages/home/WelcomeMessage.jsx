import React from 'react';
import { FaCommentDots, FaUsers } from 'react-icons/fa';

const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-800 text-gray-300 p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-purple-400 mb-4 flex items-center justify-center">
          Welcome to Gup Shup! <FaCommentDots className="inline-block ml-3 text-xl" />
        </h1>
        <p className="text-lg text-gray-500">
          Connect with friends, family, and colleagues seamlessly.
        </p>
      </div>
      <div className="rounded-lg shadow-lg bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md p-10 max-w-md w-full">
        <div className="mb-6">
          <FaUsers className="mx-auto text-purple-500 text-5xl mb-4" />
          <p className="text-xl font-semibold text-gray-400 mb-3">
            <span className="text-purple-400 mr-2">💬</span> Select a user to start chatting
          </p>
          <p className="text-sm text-gray-500">
            Browse your contacts on the left sidebar. Click a name to begin your conversation.
          </p>
        </div>
        {/* You could add a subtle animation or illustration here */}
        <div className="mt-6">
          <p className="text-gray-600 text-sm italic">
            Enjoy connecting! 😊
          </p>
        </div>
      </div>
      {/* Optional: Add a subtle background graphic or pattern */}
    </div>
  );
};

export default WelcomeMessage;