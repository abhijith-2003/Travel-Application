import React from 'react'
import './footer.css'
import {Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap';
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Quick_links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/travel',
    display:'Travel'
  },
];
const Quick_links2=[
  {
    path:'',
    display:'Gallery'
  },
  {
    path:'/login',
    display:'Login'
  },
  {
    path:'/register',
    display:'Register'
  },
];

const Footer = () => {


  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg="3">
          <div className="logo">
            <img src={logo} alt="" />
            <p>Experience unforgettable moments with our expert tour management services. we ensure every detail is taken care of, so you can focus on enjoying the journey. Let us handle the planning while you create memories that last a lifetime.</p>
            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <Link to='#'><i class="ri-youtube-line"></i></Link>
              </span>
              <span>
              <Link to='#'><i class="ri-github-fill"></i></Link>
              </span>
             <span> <Link to='#'><i class="ri-facebook-circle-line"></i></Link></span>
              <span><Link to='#'><i class="ri-instagram-line"></i></Link></span>
            </div>
          </div>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Discover</h5>
          <ListGroup className="footer__quick-links">
            {Quick_links2.map((item,index)=>(
              <ListGroupItem key={index} className={'ps-0 border-0'}>
                <Link to ={item.path}>{item.display}</Link>
              </ListGroupItem>
            ))}
          </ListGroup>
          </Col>
          <Col lg='3'><h5 className="footer__link-title">Quick Link</h5>
          <ListGroup className="footer__quick-links">
            {Quick_links.map((item,index)=>(
              <ListGroupItem key={index} className={'ps-0 border-0'}>
                <Link to ={item.path}>{item.display}</Link>
              </ListGroupItem>
            ))}
          </ListGroup></Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Contact</h5>
          <ListGroup className="footer__quick-links">
              <ListGroupItem className={'ps-0 border-0 d-flex align-items-center gap-3'}>
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i class="ri-map-pin-line"></i></span>
                  Address:
                </h6>
                <p className='mb-0'>Palakkad, Kerala, 678601</p>
              </ListGroupItem>
              <ListGroupItem className={'ps-0 border-0 d-flex align-items-center gap-3'}>
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i class="ri-mail-line"></i></span>
                  Email:
                </h6>
                <p className='mb-0'>tourmanagement@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className={'ps-0 border-0 d-flex align-items-center gap-3'}>
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i class="ri-phone-fill"></i></span>
                  Phone:
                </h6>
                <Col lg="12"className='mb-0'>04922-234567, 9876543210</Col>
              </ListGroupItem>
          </ListGroup>
          </Col>

          <Col lg='12' className='text-center mt-4'>
          <p className='copyright'>@Copyright, All Right Received</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
