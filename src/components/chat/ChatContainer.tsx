import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import ChatHistory from "./ChatHistory";
import { Message } from "../../store/chat/types";
import { SystemState } from "../../store/system/types";
import ChatUsername from "./ChatUsername";
import ChatInput from "./ChatInput";
import socketIO from "socket.io-client";
import { sendMessage } from "../../socket/send";
import { receiveMessage } from "../../store/chat/actions";

interface Props {
  messages: Message[];
  system: SystemState;
  receiveMessage: typeof receiveMessage;
}

const ChatContainer = ({ messages, system, receiveMessage }: Props) => {
  const [socket, setSocket] = useState<SocketIOClient.Emitter>();

  useEffect(() => {
    const s = socketIO("localhost:4000");
    setSocket(s);
    s.on("chat", function(data: any) {
      receiveMessage({
        user: data.user,
        message: data.message,
        timestamp: data.timestamp
      });
    });
  }, []);

  if (system.username.length === 0) {
    return <ChatUsername />;
  }

  if (socket === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ChatHistory />
      <ChatInput socket={socket} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  messages: state.chat.messages,
  system: state.system
});

const mapDispatchToProps = {
  receiveMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
