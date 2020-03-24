import {
  ChatActionTypes,
  DELETE_MESSAGE,
  Message,
  RECEIVE_MESSAGE
} from "./types";

export function receiveMessage(newMessage: Message): ChatActionTypes {
  return {
    type: RECEIVE_MESSAGE,
    payload: newMessage
  };
}

export function deleteMessage(timestamp: number): ChatActionTypes {
  return {
    type: DELETE_MESSAGE,
    meta: { timestamp }
  };
}
