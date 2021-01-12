import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Signup(props) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

  const {signup} = useAuth();
  const handleSubmit = async e => {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('');
			setLoading(true);
			console.log(emailRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
			setError('Failed to create an account!')
			console.log('Failed to create an account',error);
    }
    setLoading(false);
  }

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{/* {JSON.stringify(currentUser.email)} */}
          {error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>

						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>

						<Form.Group id="password-confirm">
							<Form.Label>Pass word Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Sign up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log in</Link>
			</div>
		</>
	);
}

export default Signup;
