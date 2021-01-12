import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function ForgotPassword(props) {

  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const {resetPassword} = useAuth();
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setError('');
      setMessage('');
			setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions')
    } catch (error) {
			setError('Failed to reset password!')
			console.log('Failed to reset password',error);
    }
    setLoading(false);
  }

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Reset password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/login">Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Neeed an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
}

export default ForgotPassword;
