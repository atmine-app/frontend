import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';

function MyChatComponent({ otherUser }) {
  const chatboxEl = useRef();
    const {currentUser} = useAuth()
    console.log('currentUser', currentUser)
  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  function getTalkjsUser(user) {
    return new Talk.User({
      id: user,
      name: user.name,
      email: user.email,
      photoUrl: user.avatarUrl || "https://demo.talkjs.com/img/sebastian.jpg",
      welcomeMessage: "Hey there! How can I help you?",
      role: "default",
    });
  }
  

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      // Use your App ID from TalkJS
      const appId = 'tDg75EBd';

      // Create TalkJS-compatible users
      const talkjsCurrentUser = getTalkjsUser(currentUser);
      const talkjsOtherUser = getTalkjsUser(otherUser);

      const session = new Talk.Session({
        appId: appId,
        me: talkjsCurrentUser,
      });

      const conversationId = Talk.oneOnOneId(talkjsCurrentUser, talkjsOtherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(talkjsCurrentUser);
      conversation.setParticipant(talkjsOtherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded, currentUser, otherUser]);

  return <div ref={chatboxEl} />;
}

export default MyChatComponent;
