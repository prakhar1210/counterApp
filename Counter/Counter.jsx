// CountdownTimer.js
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [targetDate, setTargetDate] = useState('');
    const [countdown, setCountdown] = useState(null);

    const startCountdown = () => {
        // Calculate the time remaining
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If the countdown has finished, clear it
        if (distance < 0) {
            clearInterval(countdown);
            setCountdown(null);
            return;
        }

        // Update the countdown display
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setTargetDate(new Date(value).getTime());
    };

    const handleStartClick = () => {
        if (countdown) clearInterval(countdown);
        setCountdown(setInterval(startCountdown, 1000));
    };

    const handleCancelClick = () => {
        clearInterval(countdown);
        setCountdown(null);
    };

    useEffect(() => {
        return () => {
            clearInterval(countdown);
        };
    }, [countdown]);

    return (
        <div>
            <input type="datetime-local" value={targetDate} onChange={handleInputChange} />
            <button onClick={handleStartClick}>Start Countdown</button>
            <button onClick={handleCancelClick}>Cancel Countdown</button>
            <div>{countdown}</div>
        </div>
    );
};

export default CountdownTimer;
