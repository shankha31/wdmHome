
import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from 'react-avatar';
import io from "socket.io-client";

import {
  MainContainer,
  MessageInput,
  MessageHeader
} from "@minchat/react-chat-ui";
import { MessageList, } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import url from "../../../globalUrl";
// const url2 = "http://localhost:5550";
const url2 = "https://wdmchat.onrender.com"

const socket = io.connect(url2);
const Message = () => {
  const [contacts, setContacts] = useState([]);
  const [to, setTo] = useState(null);
  const [dataSource, setDataSource] = useState([])
  const user = JSON.parse(localStorage.getItem("userData"));

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${url}/chatUsers`);
      console.log(response);
      let c= response.data.filter((contact) => contact.id !== user.chatUserId);
      setContacts(c);
    } catch (error) {
      console.log(error);
    }
  
  }

  const sendMessage = async (message) => {
    try {
      const response = await axios.post(`${url}/messages/create`, {
        from_user: user.chatUserId,
        to_user: to,
        content: message
      });
      console.log(response);

      const newMessage = {
        position: 'left',
        type: 'text',
        text: message,
        date: new Date(),
      }
      const data = {
        from_user: user.chatUserId,
        to_user: to,
        content: message,
        date: new Date()
      }
      await socket.emit("send_message", data)
      setDataSource([...dataSource, newMessage]);
    } catch (error) {
      console.log(error);
    }
  }


  const loadMessages = async (to) => {
   try {
      const response = await axios.post(`${url}/messages`, {
        from_user: user.chatUserId,
        to_user: to
      });
      console.log(response);
      const messages = response.data.map((msg) => {
        return {
          position: msg.from_user === user.chatUserId ? 'left' : 'right',
          type: 'text',
          text: msg.content,
          date: new Date(msg.created_at)
        }
      })
      setDataSource(messages);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const handleReceivedMessage = (data) => {
      console.log('recieve',data);
      if(data.to_user===user.chatUserId){
        // setDataSource([...dataSource, {
        //   position: 'right',
        //   type: 'text',
        //   title: 'Him',
        //   titleColor: 'blue',
        //   text: data.message,
        //   date: new Date(),
        // }])
        setDataSource(prev=>[...prev,{
          position: 'right',
          type: 'text',
          title: data.name,
          titleColor: 'blue',
          text: data.content,
          date: new Date(),
        }])
      }
      console.log('recieve',data);
    };

    socket.on("recieve_message", handleReceivedMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("recieve_message", handleReceivedMessage);
    };
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);
  
  return (
    <div className="mainCont">
      <div
         style={{
          display: "flex",
          height: "100vh",
        }}>
          <div style={{
            width: "35%",
            height: "90vh",
            border: "1px solid #ccc",
            marginTop: "70px",
            overflowY: "scroll",
          }}>
            {contacts.map((contact, index) => {
              return (
                <div id={index} style={{ width: '90%', borderBottom: '1px solid #ccc', height: '10%', padding: "10px 0 0 10px", cursor: 'pointer' }}
                onClick={()=>{
                  loadMessages(contact.id)
                  setTo(contact.id)}}
                >
                  <Avatar name={contact.user?.name} size="50" round={true} />
                  <span style={{ marginLeft: '10px' }}>{contact.user?.name}</span>
                </div>
              )
            })}


          </div>
          <div style={{
            width: "65%",
            height: "80vh",
            border: "1px solid #ccc",
            overflowY: "scroll",
            padding: "10px",
            paddingTop: "70px",

          }}

          >
            <MainContainer style={{ height: '100%', width: '99%' }}>
              {/* <MessageHeader /> */}

              <div id="chat-box" style={{ height: "100%", overflow: "scroll", width: "100%" }}>
                {!to?<h1 style={{textAlign:"center"}}>Select a user to chat</h1>:<>
                <MessageList
                  dataSource={dataSource}
                />
                <MessageInput onSendMessage={async strng => {
                   sendMessage(strng)
                }} placeholder="Type message here" />
                </>}
                
              </div>

            </MainContainer>
          </div>

          </div>
    </div>
  );
};

export default Message;
