import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
} from "mdb-react-ui-kit";

export default function Login() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('');
    
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      localStorage.setItem('userName', userName);
      navigate('/chat');
    };
  return (
    <MDBContainer fluid className="py-5">
      <MDBRow
        className="d-flex justify-content-center"
        style={{ marginBlock: "200px" }}
      >
        <MDBCol md="7" lg="7" xl="4">
          <MDBCard>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3"
              style={{ borderTop: "4px solid #ffa900" }}
            >
              <h5 className="mb-0">Se connecter pour acceder au chat</h5>
              <div className="d-flex flex-row align-items-center">
                <MDBIcon
                  fas
                  icon="times"
                  size="xs"
                  className="me-3 text-muted"
                />
              </div>
            </MDBCardHeader>
            <form onSubmit = {handleSubmit}>
            <MDBCardBody style={{ backgroundColor: "#eee" }}>
              <MDBInput
                wrapperClass="mb-4"
                label="userName"
                id="form1"
                type="text"
                name="userName"
                size="lg"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </MDBCardBody>
            <MDBCardFooter className="text-muted d-flex justify-content-center align-items-center p-3">
              <MDBBtn color="warning" style={{ width: "40%" }} size="lg">
                Envoyer
              </MDBBtn>
            </MDBCardFooter>

            </form>

            
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
