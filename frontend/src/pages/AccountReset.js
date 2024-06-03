import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';

function AccountReset() {
    const [cedula, setCedula] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/fb/usuario/recovery-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cedula: cedula.trim() }), // Asegurarse de que la cédula esté en el formato correcto
            });

            if (response.ok) {
                const data = await response.json();
                setEmail(data.email);
                setMessage(`Correo de recuperación enviado a: ${data.email}`);
            } else {
                setMessage('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            setMessage('Error de conexión. Inténtalo de nuevo.');
        }

        setLoading(false);
    };

    const handleCancel = () => {
        navigate('/login');
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="6">
                    <div style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        maxWidth: '400px',
                        margin: 'auto',
                        padding: '40px',
                        border: '3px solid #167603',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(47, 134, 166, 0.4)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        minHeight: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '25px'
                    }}>
                        <h2 style={{ 
                            fontSize: '28px',
                            color: '#ffffff',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>Recuperación de Cuenta</h2>
                        <h3 style={{ 
                            fontSize: '19px',
                            color: '#f7f6f6',
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>¿Olvidaste tu cuenta? <br />¡No te preocupes!</h3>
                        <h4 style={{ 
                            fontSize: '19px',
                            color: '#f7f6f6',
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>Por favor, ingresa tú número de cédula para recuperar tú cuenta</h4>
                        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Form.Group controlId="cedulaInput" style={{ marginBottom: '15px', width: '100%' }}>
                                <Form.Control
                                    type="text"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    placeholder="Número de cédula"
                                    style={{ 
                                        width: '100%',
                                        maxWidth: '317px',
                                        padding: '10px',
                                        marginBottom: '15px',
                                        border: '2px solid #167603',
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                        color: '#333',
                                    }}
                                    required
                                />
                            </Form.Group>
                            <div style={{ 
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Button type="submit" style={{ 
                                    width: '60%',
                                    height: '30%',
                                    marginRight: '5px',
                                    padding: '12px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    background: 'green',
                                    color: '#fff'
                                }}>
                                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Recuperar Cuenta'}
                                </Button>
                                <Button type="button" onClick={handleCancel} style={{ 
                                    width: '40%',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}>Cancelar</Button>
                            </div>
                        </Form>
                        {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'} style={{ marginTop: '20px' }}>{message}</Alert>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountReset;
