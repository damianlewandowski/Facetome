import { Message } from "../store/chat/types";

export function sendMessage(socket: SocketIOClient.Emitter, message: Message) {
  socket.emit("chat", message);
}
