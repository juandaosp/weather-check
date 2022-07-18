import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../firebase";
import { Row, Container, Col, Form, Button, Alert } from "react-bootstrap";
import "./Reset.scss"

function Reset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const sendPassword = async () => {
    let passwordSend = await sendPasswordReset(email);
    if(passwordSend?.error) {
      setError(passwordSend.message);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <Container className="reset-password">
      <Row className="reset-password__header">
        <Col>
          <h1>Reset your password</h1>
        </Col>
      </Row>
      { error && 
      <Row className="reset-password__error">
        <Col>
        <Alert variant="danger">
        { error }
        </Alert>
        </Col>
      </Row>
      }
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={() => sendPassword(email)}>
                Reset your password
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="reset-password__login">
        <Col>
          <a href="/login">Already have an account?</a>
        </Col>
      </Row>
    </Container>
  );
}
export default Reset;