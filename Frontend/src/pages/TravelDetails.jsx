import React, { useEffect, useRef, useState, useContext } from 'react';
import "../styles/travel-details.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Form, ListGroup } from 'reactstrap';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter';
import useFetch from './../hooks/useFetch.js'
import { BASE_URL } from './../utils/config.js';
import { AuthContext } from './../context/AuthContext.js'

const TravelDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext)
  // Fetch data from the API
  const { data: tour, error, loading } = useFetch(`${BASE_URL}/tours/${id}`);

  // Ensure that tour and reviews are available
  const reviews = tour?.reviews || [];

  const { photo, title, desc, price, address, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Handle review submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please Sign in')
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating
      }

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      })

      const result = await res.json()
      if (!res.ok){
        return alert(result.message);
      }
      alert(result.message);
    } catch (err) {
      alert(err.message)
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])

  return (
    <>
      <section>
        <Container>
          {
            loading && <h4 className='text-center pt-5'>Loading...</h4>
          }
          {
            error && <h4 className='text-center pt-5'>{error}</h4>
          }
          {
            !loading &&
            !error &&
            <Row>
              <Col lg="8">
                <Card className="tour__card">
                  <CardImg top width="100%" src={photo} alt={title} />
                  <CardBody>
                    <CardTitle tag="h2">{title}</CardTitle>
                    <div className="d-flex align-items-center gap-1">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}
                      </span>

                      <div className="mx-2">
                        <span>
                          <i className="ri-map-pin-user-fill"></i>{address}
                        </span>
                      </div>
                    </div>

                    <div className="tour__extra-details mt-2">
                      <span><i className="ri-map-pin-2-line"></i>{city}</span>
                      <span><i className="ri-money-dollar-circle-line"></i>${price}/per person</span>
                      <span><i className="ri-map-pin-time-line"></i>{distance}k/m</span>
                      <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                    </div>

                    <CardText className="mt-4">
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </CardText>
                  </CardBody>
                </Card>

                {/* Tour reviews section */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>1 <i className="ri-star-s-fill"></i></span>
                      <span onClick={() => setTourRating(2)}>2 <i className="ri-star-s-fill"></i></span>
                      <span onClick={() => setTourRating(3)}>3 <i className="ri-star-s-fill"></i></span>
                      <span onClick={() => setTourRating(4)}>4 <i className="ri-star-s-fill"></i></span>
                      <span onClick={() => setTourRating(5)}>5 <i className="ri-star-s-fill"></i></span>
                    </div>

                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder="Comment your review" required />
                      <button className="btn primary__btn text-white" type="submit">Submit</button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews.map((review) => (
                      <div className="review__item" key={review.id}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5>{review.username}</h5>
                            <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                          </div>
                          <h6>{review.reviewText}</h6>                      </div>
                        <span className="d-flex align-items-center">
                          {review.rating} <i className="ri-star-s-fill"></i>
                        </span>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          }
        </Container>
      </section>
      <Newsletter />
    </>
  );
};
export default TravelDetails