import React, { useState } from "react";
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
  MDBTextArea,
} from "mdb-react-ui-kit";

interface Chat {
  userName: string;
  text: string;
}

export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [Chat, setChat] = useState<Chat[]>([]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      const newChat: Chat = {
        userName: localStorage.getItem("userName") || "",
        text: message,
      };
      setChat([...Chat, newChat]);
      setMessage("");
      console.log({ userName: localStorage.getItem("userName"), message });
    }
  };

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
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
                {Chat.map((message) =>
                  message.userName === localStorage.getItem("userName") ? (
                    <>
                      <div className="d-flex justify-content-end">
                        <p className="small mb-1">{message.userName}</p>
                      </div>
                      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                        <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                          {message.text}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between">
                        <p className="small mb-1">{message.userName}</p>
                      </div>
                      <div className="d-flex flex-row justify-content-start">
                        <p
                          className="small p-2 ms-3 mb-3 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          {message.text}
                        </p>
                      </div>
                    </>
                  )
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
                  <MDBBtn color="warning" style={{ width: "15%" }}>
                    Envoyer
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
