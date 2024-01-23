import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuCard from './MenuCard';
import CardContainer from './CardContainer';
import SubmitForm from "./SubmitForm";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


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
        <div className="postForum"><Card
                sx={{
              
                    mx: 4,
                    my: 15,
                }}
            >
               
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    
                    <CardContent style={{textAlign:'center'}}>
                    <h1 className="ask">Ask your Question  </h1> 
                    </CardContent>
                </Box>


            </Card>

          <SubmitForm userName = {userName} chat={chat} setChat={setChat} message={message} setMessage={setMessage}  Index = {Index} IndexComment = {IndexComment} setIndex={setIndex}  setIndexComment={setIndexComment}/>
        </div>
        <CardContainer chat={chat} setChat={setChat} message={message} setMessage={setMessage}  setIndex={setIndex}  Index = {Index} setIndexComment={setIndexComment} IndexComment = {IndexComment}  setComment={setComment} comment = {comment}/> 
      </div>
      <div className="forumCol2">
      <div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleLeaveChat}
            sx={{ ml: 60,mb:5}}>
            Logout
            
          </Button>
        </div>
      
      <MenuCard userName = {userName} chat={chat} setChat={setChat}/>
        
      </div>
    </div>

  );
}
