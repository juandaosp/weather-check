import "./Login.scss"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword } from "../../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);
  return (
    <Container className="login">
      <Row className="login__header">
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
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

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={() => logInWithEmailAndPassword(email, password)}>
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="login__register-link">
        <Col>
          <a href="/register">Do you need to sign up?</a>
        </Col>
      </Row>
      <Row className="login__forget-password">
        <Col>
          <a href="/reset-password">Did you forget your password?</a>
        </Col>
      </Row>
    </Container>
  )

}

export default Login