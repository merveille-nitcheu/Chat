import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import createTheme from '@mui/material/styles/createTheme';
import red from '@mui/material/colors/red';
// import blue from '@mui/material/colors/blue';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Chat from "./Chat";
import { DeleteOutline, Edit } from "@mui/icons-material";


interface ChatMessage {
    userName: string;
    datePosted: string;
    content: string;
    likes: number | null;
    numComments: number | null;


}

interface ChatProps {
    chat: ChatMessage[];
    setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    message: string | null;
    IndexComment: number | null;
    setMessage: React.Dispatch<React.SetStateAction<string | "">>
    setIndex: React.Dispatch<React.SetStateAction<number | null>>
    setIndexComment: React.Dispatch<React.SetStateAction<number | null>>
    comment: ChatMessage[];
    setComment: React.Dispatch<React.SetStateAction<ChatMessage[]>>;

}




const ExpandMore = styled((props: { expand: boolean; onClick: () => void }) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function CardContainer(props: ChatProps) {
    const [expanded, setExpanded] = React.useState(false);
    const [commentaire, setCommentaire] = useState<string|"">("");




    const userName = localStorage.getItem("userName")



    useEffect(() => {
        if (userName) {
            const savedMessages = localStorage.getItem("Messages")
            const savedCommentaires = localStorage.getItem("Commentaire")
            if (savedMessages && savedCommentaires) {
                props.setChat(JSON.parse(savedMessages));
                props.setComment(JSON.parse(savedCommentaires));
            }
        }
        console.log(props.comment)
    }, [userName]);
    


    const handleExpandClick = (index: number) => {
        setExpanded(!expanded);
        props.setIndexComment(index);
    };

    // To add a new like
    const like = (index: number) => {

        const newChat = [...props.chat];
        const chatToLike = newChat[index];

        if (chatToLike) {
            if (chatToLike.likes === null) {
                chatToLike.likes = 1;
            } else {
                chatToLike.likes += 1;
            }
        }
        props.setChat(newChat);
        localStorage.setItem("Messages", JSON.stringify(newChat));


    };
    // To add a new comment
    const addComment = (index:number) => {
        const newChat = [...props.chat];
    const chatToAddComment = newChat[index];

    if (chatToAddComment) {
        const newCommentaire: ChatMessage = {
            userName: userName || "",
            datePosted :new Date().toLocaleString(),
            likes:null,
            content: commentaire,
            numComments:null

          };

          if (chatToAddComment.numComments=== null) {
            chatToAddComment.numComments = 1;
        } else {
            chatToAddComment.numComments += 1;
        }

        props.setChat(newChat);
        props.setComment(prevComment => [...prevComment, newCommentaire]);
        localStorage.setItem("Messages", JSON.stringify(newChat));
        localStorage.setItem("Commentaire", JSON.stringify([...(props.comment), newCommentaire]));
        setCommentaire("")
        console.log(props.comment)
    }
   

    };
    const handleDeleteMessage = (index: number) => {
        const chatToDelete = props.chat[index];
        const loggedInUserName = userName;

        if (chatToDelete.userName === loggedInUserName) {
            const NewChat = [...props.chat];
            NewChat.splice(index, 1);
            props.setChat(NewChat);
            localStorage.setItem("Messages", JSON.stringify(NewChat));
        }
    };



    const handleUpdateMessage = (index: number) => {
        const chatToUpdate = props.chat[index];
        const loggedInUserName = userName;

        if (chatToUpdate.userName === loggedInUserName) {
            props.setIndex(index);
            props.setMessage(chatToUpdate.content);
        }
    };
    const handleCommentMessage = (index: number) => {
        const chatToComment = props.chat[index];
        const loggedInUserName = userName;
        props.setIndexComment(index);




    };

    return (
        <div className="forumCards">
            {props.chat.map((message, index) => <Card
                sx={{
                    maxWidth: 800,
                    mx: 4,
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
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={message.userName}
                    subheader={`publié le ${message.datePosted}`}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {/* <CardMedia
  
          component="img"
          height="150"
          image={img2}
          alt="Paella dish"
          sx={{ m: 0.5 }}
        /> */}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {message.content.toString()}
                        </Typography>
                    </CardContent>
                </Box>

                <CardActions disableSpacing>

                    <IconButton aria-label="like" type="submit">
                        <Badge badgeContent={message.likes} color="primary" onClick={() => like(index)}>
                            <FavoriteBorderOutlinedIcon color="primary" />
                        </Badge>
                    </IconButton>


                    {/* <IconButton aria-label="like">
              <FavoriteIcon color="primary" />
            </IconButton> */}

                    <IconButton aria-label="comment" onClick={() => handleExpandClick(index)}>
                        <Badge badgeContent={message.numComments} color="primary">
                            <ChatBubbleOutlineOutlinedIcon color="primary" />
                        </Badge>
                    </IconButton>
                    {message.userName === userName ? (
                        <>
                            <IconButton aria-label="share" onClick={() => handleUpdateMessage(index)}>
                                <Edit color="primary" />
                            </IconButton>
                            <IconButton aria-label="share" onClick={() => handleDeleteMessage(index)}>
                                <DeleteOutline color="primary" />
                            </IconButton>    </>
                    ) : <></>}



                </CardActions>

                {index === props.IndexComment ?
                    (<Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Comments:</Typography>
                            <div style={{display:"flex"}}> 
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="filled"
                                id="comment"
                                label="laisser un comment"
                                name="comment"
                                autoFocus
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={() => addComment(index)}
                               
                                endIcon={<SendIcon />}
                                type="submit"
                                sx={{ mx: 2,px:5 ,my:2}}
                            >
                                Commenter

                            </Button>

                            </div>
                            {message.numComments ? (
            <div>
                {Array.isArray(props.comment) && props.comment?.map((comment, commentIndex) => (
                    <>
                    <CardHeader key={index}
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {comment.userName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={comment.userName}
                    subheader={`publié le ${comment.datePosted}`}
                />
                    <p key={commentIndex}>{comment.content}</p>
                    </>
                    
                ))}
            </div>
        ) : (
            <p style={{ marginBlock: "10px" }}>There are no comments to display!</p>
        )}
                        </CardContent>
                    </Collapse>) : <></>}
            </Card>)}
        </div>
    );
}
