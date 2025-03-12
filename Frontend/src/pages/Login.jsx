import React, { useState, useContext, useEffect } from 'react'
import "../styles/login.css"
import { Row, Container, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { BASE_URL } from './../utils/config'
import { AuthContext } from './../context/AuthContext'


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); 
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.message); 
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
      } else {
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        navigate('/'); 
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className="m-auto p-5 my-4">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                {error && <p className="error-message">{error}</p>} 

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      required 
                      id="email" 
                      onChange={handleChange} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      required 
                      id="password" 
                      onChange={handleChange} 
                    />
                  </FormGroup>
                  <Button 
                    className="btn secondary__btn auth__btn" 
                    type="submit" 
                    disabled={isLoading} 
                  >
                    {isLoading ? 'Logging In...' : 'Login'}
                  </Button>
                </Form>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
