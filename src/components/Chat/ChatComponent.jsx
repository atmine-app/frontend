import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth"; // Import your auth provider
import { useParams } from "react-router-dom";
import userService from "../../services/userService";
import "./ChatComponent.css";

export default function ChatComponent() {
  const chatboxEl = useRef();
  const { user } = useAuth();
  const { otherUserId } = useParams();
  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [recipient, setRecipient] = useState(null);

  const getRecipient = async () => {
    try {
      const response = await userService.getOtherUser(otherUserId);
      setRecipient(response);
    } catch (error) {
      console.error("Error fetching recipient:", error);
    }
  };

  useEffect(() => {
    getRecipient();
    // eslint-disable-next-line
  }, [otherUserId]);

  useEffect(() => {
    console.log("recipient:", recipient);
  }, [recipient]);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded && user && recipient) {
      const currentUser = new Talk.User({
        id: user._id,
        name: user.username,
        email: user.email,
        photoUrl: user.photoUrl,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const otherUser = new Talk.User({
        id: recipient._id,
        name: recipient.username,
        email: recipient.email,
        photoUrl: recipient.photoUrl,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tDg75EBd",
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded, user, recipient]);

  return (
    <span>
      <div
        className="inbox-container"
        style={{
          height: "92vh",
          width: "100%",
          margin: "30px 0 0 0",
          padding: "0 0 0 0",
        }}
        ref={chatboxEl}
      >
        Loading...
      </div>
    </span>
  );
  // <div ref={chatboxEl} className="chat-container"/>;
}
