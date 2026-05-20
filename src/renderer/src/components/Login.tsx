// src/renderer/src/components/Login.tsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../App.css';

interface LoginProps {
    show: boolean;
    onHide: () => void;
}

export default function Login(props: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);  

    const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        const jsonData = JSON.stringify({ username, password });  
        alert(jsonData)
        try {
            // This relies on the preload script exposing window.api
            const result = await window.api.login(jsonData);
            console.log('Login Result:', result); 

            if (result && result.success) {
                setMessage("Login successful!");
                alert("Success");
                props.onHide(); 
            } else {
                setMessage(result.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login request failed:", error);
            setMessage(error.message);
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isDisabled}>
                        Submit
                    </Button>
                </Form>
                {message && <p className="mt-3">{message}</p>}
            </Modal.Body>
        </Modal>
    );
}
