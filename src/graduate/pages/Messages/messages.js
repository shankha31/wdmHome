
import React, { useState, useRef, useEffect } from "react";


import "./messages.css"
import {chats} from "../../data";



const Message = () => {
  const fileInputRef = useRef(null);
  const [activee, setActivee] = useState(0);
  const [messages, setMessages] = useState([]);
  const [activemessage, setActivemessage] = useState("");
  const [input, setInput] = useState("");
  const [change, setChange] = useState("Renuka  ");
  const [searchMessages, setSearchMessages] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const onChangeInput = (event) => {
    setInput(event.target.value);
    setSelectedEmoji(event.target.value);
  };




  const handleActivee = (id, name) => {
    setActivee(id);
    setChange(name);
    setActivemessage(name);
  };

  const handleSend = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (input.trim() !== "") {
      const updatedMessage = [
        ...messages,
        { user: activemessage, text: `${input.trim()}` },
      ];
      localStorage.setItem("activemessage", JSON.stringify(updatedMessage));
      setMessages(updatedMessage);
      setInput("");
      setSelectedEmoji("");
     
    }
  };

  const handleSearchChanges = (event) => {
    setSearchMessages(event?.target.value);
  };

  const searchedMessages = chats.filter((mess) =>
    mess.name.toLowerCase().includes(searchMessages.toLowerCase())
  );

  return (
    <div className="mainCont">
      <div className="messageCont">
        <div className="messageSubCont">
          <div className="messaging">
            <div className="userCont">

                <p className="messageName">Messaging</p>

            </div>
            <div>
              <hr className="divider" />
              <div>
                  <input
                   type="text"
                    placeholder="Search messages"
                    onChange={handleSearchChanges}
                    value={searchMessages}
                    className="inputStyless"
                />
              </div>
                <hr className="divider" />
                <div className="chatListCont">
                  {searchedMessages.map((eachChat) => (
                    <div
                      key={eachChat.id}
                      style={activee === eachChat.id ? { background: "#24222066", color: "#fff" } : {}}
                      onClick={() => handleActivee(eachChat.id, eachChat.name)}
                    >
                      <div className="nameContainer">
                      <div className="imagcont">
                          <img
                          src={eachChat.img}
                          className="imagestyle"
                          alt="image"
                          />
                        <div className="chatdesccont1">
                          <p className="messageName">{eachChat.name}</p>
                          
                        </div>
                      </div>
                      <div className="desc">
                        {new Date().toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              
            </div>
          </div>
          <div className="chatCont">
            <div>
              <div className="descHeader">
                <div>
                  <p className="messageName">{change}</p>
                  <p className="messageSubName">
                    typing...
                  </p>
                </div>
                
              </div>
              <hr className="divider"  />
              <div className="chatDescCont" ref={chatRef}>
                {messages.map((eachmess, index) => (
                  <div
                    key={index}
                    // classame={{
                    //   margin: "15px",
                    //   ...eachmess.user === activemessage
                    //     ?"sendcont"
                    //     : "incomecont",
                    // }}
                    className={eachmess.user === activemessage ? "sendcont" : "incomecont"}
                  >
                  <div>
                    {eachmess.user === activemessage ? (
                      <p style={{display:"flex",justifyContent:"space-between"}}>  {eachmess.text}
                        {eachmess.user === activemessage && (
                          <div className="typo">
                            
                            {new Date().toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </div>
                        )}
                      </p>
                    ) : (
                      <div style={{display:"flex",alignItems:"center"}}>
                      <p className="textt">{eachmess.text}</p>
                      <div className="typo">
                            
                            {new Date().toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </div>
                          </div>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
           
            <div>
            
              <div className="textfeildCont">
                <textarea
                  type="text"
                  placeholder= "Write a message"
                  className="chatInputStyles"
                  onChange={onChangeInput}
                  value={input}
                  onKeyDown={handleSend}
                />
              </div>
               <div className="sendBtnCont">
               <button  className="sendBtn" onClick={sendMessage}>Send</button>
            
               </div>
                 
             
            </div>
          </div>
        </div>
        <input type="file" ref={fileInputRef} className="inputfile" />
      </div>
    </div>
  );
};

export default Message;
