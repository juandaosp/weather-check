import "./Register.scss"
import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useNavigate();

  const register = async () => {
    if (!name) alert("Please enter name");
    let register =  await registerWithEmailAndPassword(name, email, password);
    if (register.error) {
      setErrorMessage(register.message);
    } else {
      history("/dashboard", {replace: true});
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {history("/dashboard", {replace: true})};
  }, [user, loading, history]);

  return (
    <Container className="register">
      <Row className="register__header">
        <Col>
          <h1>Sign Up</h1>
        </Col>
      </Row>
      { errorMessage && 
      <Row className="register__error">
        <Col>
        <Alert variant="danger">
        { errorMessage }
        </Alert>
        </Col>
      </Row>
      }
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
              <Form.Text className="text-muted">
                We"ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={ register }>
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="register__login-link">
          <Col>
            <Link to="/">Already have an account?</Link>
          </Col>
        </Row>
    </Container>
  )
}

export default Register