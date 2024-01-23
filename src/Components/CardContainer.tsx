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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DeleteOutline, Edit, IndeterminateCheckBox } from "@mui/icons-material";


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
    Index: number | null;
    setMessage: React.Dispatch<React.SetStateAction<string | "">>
    setIndex: React.Dispatch<React.SetStateAction<number | null>>
    setIndexComment: React.Dispatch<React.SetStateAction<number | null>>
    comment: ChatMessage[];
    setComment: React.Dispatch<React.SetStateAction<ChatMessage[]>>;

}






export default function CardContainer(props: ChatProps) {
    const [expanded, setExpanded] = React.useState(false);
    const [expandedUpdate, setExpandedUpdate] = React.useState(false);
    const [commentaire, setCommentaire] = useState<string | "">("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const [messageUpdated, setMessageUpdated] = useState<string | "">("");




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

    const handleExpandClickUpdate = (index: number) => {
        setExpandedUpdate(!expandedUpdate);
        props.setIndex(index);
        if (props.message!==null) {
            const updatedChat = [...props.chat];
        const chatToUpdate = updatedChat[index];
            
            setMessageUpdated(chatToUpdate.content)
        }
        
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
    const addComment = (index: number) => {
        const newChat = [...props.chat];
        const chatToAddComment = newChat[index];

        if (chatToAddComment) {
            const newCommentaire: ChatMessage = {
                userName: userName || "",
                datePosted: new Date().toLocaleString(),
                likes: null,
                content: commentaire,
                numComments: null

            };

            if (chatToAddComment.numComments === null) {
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
        const updatedChat = [...props.chat];
        const chatToUpdate = updatedChat[index];

        console.log(props.message)
        if (props.message!==null) {
            
            chatToUpdate.content = messageUpdated;
           
            chatToUpdate.datePosted = new Date().toLocaleString();
            props.setChat(updatedChat);
            props.setIndex(null);

            localStorage.setItem("Messages", JSON.stringify(updatedChat));
            props.setMessage("");
            setExpandedUpdate(false);

        }

    };
    const handleCommentMessage = (index: number) => {
        const chatToComment = props.chat[index];
        const loggedInUserName = userName;
        props.setIndexComment(index);




    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndex(index)
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedIndex(null)
    };

    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="menu-appbar"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div>
                <MenuItem onClick={() => handleExpandClickUpdate(selectedIndex ?? 0)}>
                    <IconButton aria-label="share">
                        <Edit color="primary" />
                    </IconButton>
                    Modifier
                </MenuItem>
                <MenuItem onClick={() => handleDeleteMessage(selectedIndex ?? 0)}>
                    <IconButton aria-label="share">
                        <DeleteOutline color="primary" />
                    </IconButton>
                    Supprimer
                </MenuItem>
            </div>
        </Menu>
    );

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
                        <>

                            {message.userName === userName ? (
                                <>

                                    <IconButton
                                        aria-label="settings"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={(event) => handleMenuOpen(event, index)}
                                        color="inherit"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    {renderMenu}
                                </>
                            ) : <></>}

                        </>

                    }
                    title={message.userName}
                    subheader={`publié le ${message.datePosted}`}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary">
                            {message.content?.toString()}
                        </Typography>
                    </CardContent>
                </Box>

                <CardActions disableSpacing>

                    <IconButton aria-label="like" type="submit">
                        <Badge badgeContent={message.likes} color="primary" onClick={() => like(index)}>
                            <FavoriteBorderOutlinedIcon color="primary" />
                        </Badge>
                    </IconButton>


                    <IconButton aria-label="comment" onClick={() => handleExpandClick(index)}>
                        <Badge badgeContent={message.numComments} color="primary">
                            <ChatBubbleOutlineOutlinedIcon color="primary" />
                        </Badge>
                    </IconButton>




                </CardActions>

                
                    <Collapse in={expandedUpdate} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Modifier le Message:</Typography>
                            <div style={{ display: "flex" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    variant="filled"
                                    id="message"
                                    label="Modifier votre mesage"
                                    name="message"
                                    autoFocus
                                    value={messageUpdated}
                                    onChange={(e) => setMessageUpdated(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => handleUpdateMessage(index)}

                                    endIcon={<SendIcon />}
                                    type="submit"
                                    sx={{ mx: 2, px: 5, my: 2 }}
                                >
                                    Modifier

                                </Button>

                            </div>

                        </CardContent>
                    </Collapse> 

                {index === props.IndexComment ?
                    (<Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Comments:</Typography>
                            <div style={{ display: "flex" }}>
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
                                    sx={{ mx: 2, px: 5, my: 2 }}
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
