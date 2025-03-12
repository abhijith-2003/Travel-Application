import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Initial state with a full booking object
    const [booking, setBooking] = useState({
        userId: user ? user._id : '',
        userEmail: user ? user.email : '',
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ""
    });

    const handleChange = e => {
        const { id, value } = e.target;
        if (id === 'guestSize' && value < 1) {
            return;
        }
        setBooking(prev => ({ ...prev, [id]: value }));
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    // Handle booking submission
    const handleClick = async (e) => {
        e.preventDefault();

        // Early return if the user is not logged in
        if (!user || !user._id) {
            return alert('Please Sign in');
        }

        // Ensure that the fullName is filled before submitting
        if (!booking.fullName || !booking.phone || !booking.bookAt) {
            return alert('Please fill in all required fields');
        }

        try {
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(booking),
            });
            const result = await res.json();

            if (!res.ok) {
                alert(result.message || "Failed to book the tour");
                return;
            }

            navigate("/thank-you");
        } catch (err) {
            alert('Something went wrong: ' + err.message);
        }
    };

    // Get current date to set as the minimum date in the date input
    const currentDate = new Date().toISOString().split('T')[0]; // Format it as YYYY-MM-DD

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>${price}<span>/per person</span></h3>
                <span className="tour__rating d-flex align-items-center gap-1">
                    <i className="ri-star-fill"></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            {/* ============ booking form =========== */}
            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder='Full Name'
                            id='fullName'
                            required
                            value={booking.fullName} 
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder='Mobile Number'
                            id='phone'
                            required
                            value={booking.phone} 
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            id='bookAt'
                            required
                            value={booking.bookAt} 
                            onChange={handleChange}
                            min={currentDate} // Set the minimum date to today
                        />
                        <input
                            type="number"
                            placeholder='Guest'
                            id='guestSize'
                            required
                            value={booking.guestSize}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button className='btn primary__btn w-100 mt-4' type="submit">Book Now</Button>
                </Form>
            </div>
            {/* ======== booking end ======= */}

            {/* ========= booking bottom ========= */}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className='d-flex align-items-center gap-1'>${price}<i className="ri-close-line"></i>1 person</h5>
                        <span>${price}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Service charge</h5>
                        <span>${serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>${totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    );
};

export default Booking;
