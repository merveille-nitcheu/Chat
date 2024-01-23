import React,{ useEffect, useState ,SetStateAction,Dispatch} from 'react'
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import red from '@mui/material/colors/red';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


import Box from '@mui/material/Box';

interface ChatMessage {
  userName: string;
  datePosted:string;
  content:string;
  likes:number|null;
  numComments:number|null;
      
}

interface ChatProps {
  chat: ChatMessage[];
  setChat: Dispatch<SetStateAction<ChatMessage[]>>;
  userName:string |null;

}

export default function MenuCard(props: ChatProps) {

  const navigate = useNavigate();

  
  useEffect(() => {
    if (props.userName) {
        const savedMessages = localStorage.getItem("Messages")
        if (savedMessages) {
            props.setChat(JSON.parse(savedMessages));
        }
    }
}, [props.userName]);

const handleLeaveChat = () => {
  localStorage.removeItem("Messages")
  localStorage.removeItem("Commentaire")
  localStorage.removeItem("userName")
  navigate("/");
  window.location.reload();
};

  return (
    <Card sx={{ maxWidth:600, ml:2 }}>

      
      

    <CardActionArea>
      <CardContent>
      <h1 className="ask" style={{ textDecoration: "underline"}}>Our Recents Questions </h1>

        
        {props.chat.filter((message) => message.userName !== props.userName).map((message, index) => 
              <Card
              sx={{ mx: 4,
                  my: 8,
                  /* backgroundColor: 'secondary.main', */
              }}
          >

              <CardHeader key={index}
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {message.userName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                        </IconButton>
                    }
                    title={message.userName}
                    subheader={`publié le ${message.datePosted}`}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {message.content?.toString()}
                        </Typography>
                    </CardContent>
                </Box>
                


                </Card>
             
            )}
           
      </CardContent>
    </CardActionArea>
  </Card>
  )
}
