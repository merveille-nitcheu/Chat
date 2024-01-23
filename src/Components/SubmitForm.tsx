import React, { useEffect, useState ,SetStateAction,Dispatch} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


interface ChatMessage { 
  userName: string;
  datePosted: string;
  content: string;
  likes:number|null;
  numComments: number|null;

}

interface ChatProps {
  chat: ChatMessage[];
  setChat: Dispatch<SetStateAction<ChatMessage[]>>;
  message: string | "";
  userName:string |null;
  Index:number|null;
  IndexComment:number|null;
  setMessage: Dispatch<SetStateAction<string | "">>
  setIndex: Dispatch<SetStateAction<number | null>>
  setIndexComment: Dispatch<SetStateAction<number | null>>

}


export default function SubmitForm(props: ChatProps) {

      // To add a new post
      const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.message!==null && props.userName) {
          if (props.Index !== null) {
            // Mettre à jour le texte du message existant 
            const updatedChat = [...props.chat];
            updatedChat[props.Index].content = props.message;
            updatedChat[props.Index].datePosted = new Date().toLocaleString();
            props.setChat(updatedChat);
            props.setIndex(null);
           
            localStorage.setItem("Messages", JSON.stringify(updatedChat));
            props.setMessage("");
          // } else if (props.IndexComment !== null) {
          //   const chatToComment = props.chat[props.IndexComment];
    
          //   const NewComment: ChatMessage = {
          //     userName: props.userName || "",
          //     datePosted :new Date().toLocaleString(),
          //     likes:null,
          //     content: props.message,
          //     numComments:null
          //   };
          //   props.setChat((prevChat) => [...prevChat, NewComment]);
            
          //   localStorage.setItem("Messages", JSON.stringify([...props.chat, NewComment]));
          //   props.setMessage("");
    
          } else {
    
            // Envoyer un nouveau message
            const newChat: ChatMessage = {
              userName: props.userName || "",
              datePosted :new Date().toLocaleString(),
              likes:null,
              content: props.message,
              numComments:null

            };
           
            props.setChat((prevChat) => [...prevChat, newChat]);
            
            localStorage.setItem("Messages", JSON.stringify([...props.chat, newChat]));
            props.setMessage("");
    
          }
        }
    
      };


  return (
    <>
      <form onSubmit={handleSendMessage} className="askQuestionForm">
        <TextField
          id="filled-multiline-static"
          label="Ask a Question"
          multiline
          rows={4}
          value={props.message}
          variant="filled"
          fullWidth
          sx={{ maxWidth: 740, mx: 4 }}
          name="message"
          onChange={(e) => props.setMessage(e.target.value)}
        />
        {/*  <input type="submit" /> */}
        <div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
            sx={{ mx: 4, my: 2 }}
          >
            {props.Index!==null ? "Mettre à jour" : "Envoyer"}
            
          </Button>
        </div>
      </form>
    </>
  )
}
