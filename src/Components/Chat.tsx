import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,
  MDBInputGroup,
  MDBTextArea, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle
} from "mdb-react-ui-kit";

interface ChatMessage {
  userName: string;
  text: string;
}



export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [Index, setIndex] = useState<number | null>(null);
  const [IndexComment, setIndexComment] = useState<number | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [comment, setComment] = useState<ChatMessage[]>([])
  const userName = localStorage.getItem("userName")


  useEffect(() => {
    if (userName) {
      const savedMessages = localStorage.getItem("Messages")
      if (savedMessages) {
        setChat(JSON.parse(savedMessages));
      }
    }
  }, [userName]);


  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && userName) {
      if (Index !== null) {
        // Mettre à jour le texte du message existant
        const updatedChat = [...chat];
        updatedChat[Index].text = message;
        setChat(updatedChat);
        setIndex(null);
        setMessage("");
        localStorage.setItem("Messages", JSON.stringify(updatedChat));
      } else if (IndexComment !== null) {
        const chatToComment = chat[IndexComment];

        const NewComment: ChatMessage = {
          userName: `${userName} a régi sur le post "${chatToComment.text}" de ${chatToComment.userName}` || "",
          text: message,
        };
        setChat((prevChat) => [...prevChat, NewComment]);
        setMessage("");
        localStorage.setItem("Messages", JSON.stringify([...chat, NewComment]));

      } else {

        // Envoyer un nouveau message
        const newChat: ChatMessage = {
          userName: userName || "",
          text: message,
        };
        setChat((prevChat) => [...prevChat, newChat]);
        setMessage("");
        localStorage.setItem("Messages", JSON.stringify([...chat, newChat]));

      }
    }

  };


  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };

  const handleDeleteMessage = (index: number) => {
    const chatToDelete = chat[index];
    const loggedInUserName = userName;

    if (chatToDelete.userName === loggedInUserName) {
      const NewChat = [...chat];
      NewChat.splice(index, 1);
      setChat(NewChat);
      localStorage.setItem("Messages", JSON.stringify(NewChat));
    }
  };



  const handleUpdateMessage = (index: number) => {
    const chatToUpdate = chat[index];
    const loggedInUserName = userName;

    if (chatToUpdate.userName === loggedInUserName) {
      setIndex(index);
      setMessage(chatToUpdate.text);
    }
  };
  const handleCommentMessage = (index: number) => {
    const chatToComment = chat[index];
    const loggedInUserName = userName;
    setIndexComment(index);




  };

  return (
    <MDBContainer fluid className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="10" xl="7">
          <MDBCard>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3"
              style={{ borderTop: "4px solid #ffa900" }}
            >
              <h5 className="mb-0">Application de messagerie</h5>
              <div className="d-flex flex-row align-items-center">
                <MDBBtn
                  className="mx-3"
                  color="warning"
                  style={{ width: "150px" }}
                  onClick={handleLeaveChat}
                >
                  Quitter
                </MDBBtn>
                <MDBIcon
                  fas
                  icon="times"
                  size="xs"
                  className="me-3 text-muted"
                />
              </div>
            </MDBCardHeader>
            <form onSubmit={handleSendMessage}>
              <MDBCardBody style={{ backgroundColor: "#eee" }}>
                {chat
                  // .filter((message) => message.userName === userName)
                  .map((message, index) =>

                    <React.Fragment key={index}>
                      <div className="d-flex justify-content-between">
                        <p className="small mb-1">{message.userName}</p>
                      </div>
                      <MDBDropdown group className='shadow-0'>
                        <div className="d-flex flex-row justify-content-start">
                          <p
                            className="small p-2 ms-3 mb-3 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                          >
                            {message.text}
                            <MDBDropdownToggle color='link' size='sm'></MDBDropdownToggle>
                          </p>

                        </div>

                        <MDBDropdownMenu>
                          {message.userName === userName ? (
                            <React.Fragment>
                              <MDBDropdownItem
                                link
                                onClick={() => handleDeleteMessage(index)}
                              >
                                Supprimer
                              </MDBDropdownItem>
                              <MDBDropdownItem link onClick={() => handleUpdateMessage(index)}
                              >Modifier</MDBDropdownItem>
                            </React.Fragment>

                          ) : <></>}

                          <MDBDropdownItem link onClick={() => handleCommentMessage(index)}>Commenter</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>

                    </React.Fragment>

                  )}
              </MDBCardBody>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <MDBInputGroup className="d-flex mb-0">
                  <MDBTextArea
                    label="Ecrivez quelque chose"
                    name="message"
                    value={message}
                    rows={3}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <MDBBtn color="warning" style={{ width: "25%" }}>
                    {IndexComment !== null ? "Commenter" : "Envoyer"}
                  </MDBBtn>
                </MDBInputGroup>
              </MDBCardFooter>
            </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
