import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function AccountReset() {
    const [cedula, setCedula] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar la cédula y procesarla
        navigate('/password-send');
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
                            marginBottom: '20px'
                        }}>Recuperación de Cuenta</h2>
                        <h3 style={{ 
                            fontSize: '19px',
                            color: '#f7f6f6',
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>¿Olvidaste tu cuenta? <br />No te preocupes.</h3>
                        <h4 style={{ 
                            fontSize: '19px',
                            color: '#f7f6f6',
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>Ingresa a continuación tu número de cédula</h4>
                        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Form.Group controlId="cedulaInput" style={{ marginBottom: '15px', width: '100%' }}>
                                <Form.Control
                                    type="text"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    placeholder="Número de cédula"
                                    style={{ 
                                        width: '100%',
                                        maxWidth: '300px',
                                        padding: '10px',
                                        marginBottom: '15px',
                                        border: '2px solid #167603',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        color: '#333'
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
                                    width: '48%',
                                    padding: '12px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    background: 'linear-gradient(45deg, rgb(2, 113, 17), #256c0b)',
                                    color: '#fff'
                                }}>Recuperar Usuarios</Button>
                                <Button type="button" onClick={handleCancel} style={{ 
                                    width: '48%',
                                    padding: '12px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    backgroundColor: '#931600',
                                    color: '#fff'
                                }}>Cancelar</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountReset;
