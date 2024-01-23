import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuCard from './MenuCard';
import CardContainer from './CardContainer';
import SubmitForm from "./SubmitForm";

interface ChatMessage {
  userName: string;
  datePosted:string;
  content:string;
  likes:number|null;
  numComments:number|null;
      
}





export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string|"">("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [comment, setComment] = useState<ChatMessage[]>([]);
  const [Index, setIndex] = useState<number | null>(null);
  const [IndexComment, setIndexComment] = useState<number | null>(null);
  const userName = localStorage.getItem("userName")

  useEffect(() => {
    if (userName) {
      const savedMessages = localStorage.getItem("Messages")
      if (savedMessages) {
        setChat(JSON.parse(savedMessages));
      }
    }
  }, [userName]);




  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };



  return (
  

    <div className="forumPage">
      <div className="forumCol1">
        <div className="postForum">
          <h1 className="ask">Ask your Question or  <span className="ask" onClick={handleLeaveChat}>Logout </span> </h1> 
          <SubmitForm userName = {userName} chat={chat} setChat={setChat} message={message} setMessage={setMessage}  Index = {Index} IndexComment = {IndexComment} setIndex={setIndex}  setIndexComment={setIndexComment}/>
        </div>
        <CardContainer chat={chat} setChat={setChat} message={message} setMessage={setMessage}  setIndex={setIndex}  setIndexComment={setIndexComment} IndexComment = {IndexComment}  setComment={setComment} comment = {comment}/> 
      </div>
      <div className="forumCol2">
      <MenuCard userName = {userName} chat={chat} setChat={setChat}/>
        
      </div>
    </div>

  );
}
