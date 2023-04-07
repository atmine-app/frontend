import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Talk from "talkjs";

export default function InboxComponent() {
    const inboxContainer = useRef();
    const { user } = useAuth();
    const [talkLoaded, setTalkLoaded] = useState(false);
  
    useEffect(() => {
      Talk.ready.then(() => setTalkLoaded(true));
  
      if (talkLoaded && user) {
        const currentUser = new Talk.User({
          id: user._id,
          name: user.username,
          email: user.email,
          photoUrl: user.photoUrl,
          welcomeMessage: "Hello!",
          role: "default",
        });
  
        const session = new Talk.Session({
          appId: "tDg75EBd",
          me: currentUser,
        });
  
        const inbox = session.createInbox();
        inbox.mount(inboxContainer.current);
  
        return () => session.destroy();
      }
    }, [talkLoaded, user]);
  
    return(<span>
        <div style={{height: "85vh",
        width: '100%',
        margin: '30px 0 0 0',
      }} ref={inboxContainer}>Loading...</div>
    </span>);;
  }
  