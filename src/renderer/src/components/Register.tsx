// #Register.tsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../App.css';

interface RegisterProps {
    show: boolean;
    onHide: () => void;
}

export default function Register(props: RegisterProps) {
    const [firsntame, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header className='bg-warning' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Account Registration
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                  <div className='row'>
                     <div className='col'>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" required onChange={e => setFirstname(e.target.value)} placeholder="Firstname" />
                      </Form.Group>
                     </div>
                     <div className='col'>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" required onChange={e => setLastname(e.target.value)} placeholder="Lastname" />
                      </Form.Group>
                     </div>
                   </div>
                   <div className='row'>
                     <div className='col'>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" required onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                      </Form.Group>
                     </div>
                     <div className='col'>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" required onChange={e => setMobile(e.target.value)} placeholder="Mobile No." />
                      </Form.Group>
                     </div>
                   </div>
                   <div className='row'>
                    <div className='col'>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" required onChange={e => setUsername(e.target.value)} placeholder="Username" />
                      </Form.Group>
                    </div>
                    <div className='col'>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" required onChange={e => setPassword(e.target.value)} placeholder="Password" />
                      </Form.Group>
                    </div>
                    </div>                    
                    <Button type='submit' className='bg-warning' variant="warning">register</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-100 text-center fsize-10'>{message}</div>
            </Modal.Footer>
        </Modal>
    );
}
