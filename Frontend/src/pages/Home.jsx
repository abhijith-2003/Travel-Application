import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from './../shared/Subtitle'
import worldImg from './../assets/images/world.png'
import experienceImg from './../assets/images/experience.png'

import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/serviceList';
import FeaturedTourList from '../components/Featured-tour/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Know Before You Go'} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
                <p>Traveling is an adventure that opens our minds, offering new experiences, cultures, and memories. It's more than just a journey it's a chance to explore the unknown and grow through discovery. Whether near or far, every trip has the power to transform us.</p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt=""  autoPlay loop muted playsInline preload="auto"  />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className="services__subtitle">
                <Subtitle subtitle={ 'what we serve'}/></h5>
              <h2 className="service__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
            <Subtitle subtitle={'Explore'}/>
            <div className="featured__tour-title">Our featured tours</div>
            </Col>
            <FeaturedTourList/>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6">
            <div className="experience__content">
              <Subtitle subtitle={"Experience"}/>
              <h2>
                With our all experience <br />we will serve you
              </h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.  <br />Libero similique ipsam aliquid eligendi </p>
            </div>

            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Successful trip</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular clients</h6>
              </div>
              <div className="counter__box">
                <span>15</span>
                <h6>Years experience</h6>
              </div>
            </div>
            </Col>
            <Col lg='6'>
            <div className="experience__img">
              <img src={experienceImg} alt="" />
              </div>
              </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <Subtitle subtitle={'Gallery'}/>
            <h2 className="gallery__title">Visit our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
            <MasonryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
            <Subtitle subtitle={'Fans love'}/>
            <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
          <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  )
}

export default Home;
