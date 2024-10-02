import React from 'react';

type ChatBubbleProps = {
  children: React.ReactNode;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ children }) => {
  return (
    <div className="relative w-full p-8 bg-[#ECEBD8] rounded-[20px]">
      {/* 말풍선 꼭지 부분 */}
      <div className="absolute top-[-10px] left-[-7px] w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-[#ecebd7] transform rotate-45"></div>
      {/* 말풍선 내용 (children으로 전달된 내용) */}
      <div className="text-[#453b35] font-dongle text-[2rem]">
        {children}
      </div>
    </div>
  );
};

export default ChatBubble;
