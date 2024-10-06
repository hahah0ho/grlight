import React from 'react';

type ChatBubbleProps = {
  children: React.ReactNode;
  mirrored?: boolean; // 말풍선을 반대로 뒤집을지 여부
  backgroundColor?: string; // 말풍선의 배경색
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ children, mirrored = false, backgroundColor = '#ECEBD8' }) => {
  return (
    <div className={`relative w-full p-8 ${mirrored ? 'text-right' : 'text-left'} `}>
      {/* 말풍선 내용 */}
      <div className={`inline-block relative p-4 rounded-[20px]`} style={{ backgroundColor }}>
        {/* 말풍선 꼭지 부분 */}
        {mirrored ? (
          // 말풍선이 오른쪽일 때 (유저 메시지)
          <div className="absolute top-[-10px] right-[-7px] w-0 h-0 border-t-[20px] border-t-transparent border-l-[20px] border-l-[#ecebd7] transform rotate-45"></div>
        ) : (
          // 말풍선이 왼쪽일 때 (봇 메시지)
          <div className="absolute top-[-10px] left-[-7px] w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-[#ecebd7] transform rotate-45"></div>
        )}

        {/* 말풍선 내용 */}
        <div className="text-[#453b35] font-dongle text-[1.125rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;

