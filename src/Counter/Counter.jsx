// import React, { useState, useEffect } from 'react';
// import Style from '../Counter/Counter.module.css';
// import { Card, CardContent, Typography, Button } from '@mui/material';

// const DayCard = ({ days }) => (
//     <Card variant="outlined">
//         <CardContent>
//             <Typography variant="h4" component="div">
//                 {days}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//                 Days
//             </Typography>
//         </CardContent>
//     </Card>
// );

// const HourCard = ({ hours }) => (
//     <Card variant="outlined">
//         <CardContent>
//             <Typography variant="h4" component="div">
//                 {hours}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//                 Hours
//             </Typography>
//         </CardContent>
//     </Card>
// );

// const MinuteCard = ({ minutes }) => (
//     <Card variant="outlined">
//         <CardContent>
//             <Typography variant="h4" component="div">
//                 {minutes}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//                 Minutes
//             </Typography>
//         </CardContent>
//     </Card>
// );

// const SecondCard = ({ seconds }) => (
//     <Card variant="outlined">
//         <CardContent>
//             <Typography variant="h4" component="div">
//                 {seconds}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//                 Seconds
//             </Typography>
//         </CardContent>
//     </Card>
// );

// const CountdownTimer = () => {
//     const [targetDate, setTargetDate] = useState('');
//     const [countdown, setCountdown] = useState('');
//     const [countdownInterval, setCountdownInterval] = useState('');

//     const calculateCountdown = () => {
//         const now = new Date().getTime();
//         const distance = targetDate - now;

//         if (distance < 0) {
//             clearInterval(countdownInterval);
//             setCountdown('Countdown expired');
//             return;
//         }

//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     };

//     const handleInputChange = (event) => {
//         const { value } = event.target;
//         setTargetDate(new Date(value).getTime());
//     };

//     const handleStartClick = () => {
//         calculateCountdown(); // Calculate countdown immediately after start
//         setCountdownInterval(setInterval(calculateCountdown, 1000)); // Set interval for updating countdown
//     };

//     const handleCancelClick = () => {
//         clearInterval(countdownInterval);
//         setCountdown('');
//     };

//     useEffect(() => {
//         return () => clearInterval(countdownInterval); // Cleanup interval on unmount
//     }, []);

//     return (
//         <div className={Style.container}>
//             <div className={Style.input}>
//                 <input type="datetime-local" value={targetDate} onChange={handleInputChange} />
//             </div>
//             <div className={Style.start}>
//                 <button onClick={handleStartClick}>Start Countdown</button>

//                 {/* <div className={Style.stop}> */}
//                 <button onClick={handleCancelClick}>Cancel Countdown</button>
//             </div>
//             {/* </div> */}
//             <div>{countdown}</div>
//         </div>

//     );
// };

// export default CountdownTimer;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from "./Counter.module.css";
import 'animate.css';
const CountdownTimer = () => {
    const [targetDate, setTargetDate] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [countdown, setCountdown] = useState({
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0',
    });
    const [countdownInterval, setCountdownInterval] = useState(null);

    const calculateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            setCountdown({
                days: 'Countdown expired',
                hours: '0',
                minutes: '0',
                seconds: '0',
            });
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days: days.toString(), hours: hours.toString(), minutes: minutes.toString(), seconds: seconds.toString() });
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setTargetDate(new Date(value).getTime());
        setSelectedDateTime(value);
    };

    const handleStartClick = () => {
        calculateCountdown(); // Calculate countdown immediately after start
        const interval = setInterval(calculateCountdown, 1000); // Set interval for updating countdown
        setCountdownInterval(interval);
    };

    const handleStopClick = () => {
        clearInterval(countdownInterval);
        setCountdownInterval(null);
        setCountdown({
            days: '0',
            hours: '0',
            minutes: '0',
            seconds: '0',
        });
    };

    useEffect(() => {
        return () => clearInterval(countdownInterval); // Cleanup interval on unmount or interval change
    }, [countdownInterval]);

    return (
        // style={{ display: 'flex', gap: '20px' }}
        <div className={styles.mainContainer}>
            <div className={styles.dateContainer}>
                <input
                    type="datetime-local"
                    value={targetDate}
                    onChange={handleInputChange}
                    style={{ minWidth: '100px', borderRadius: "8px" }}
                />

                <div style={{ display: "flex" }}>
                    <Button onClick={handleStartClick} variant="contained" color="primary" style={{ marginRight: '20px', width: '100%' }}>
                        Start Countdown
                    </Button>
                    <Button onClick={handleStopClick} variant="contained" color="secondary" style={{ gap: '20px', width: '100%' }}>
                        Stop Countdown
                    </Button>
                </div>

            </div>
            <div>
                <h2>{selectedDateTime}</h2>
            </div>
            <div className={styles.cardContainer} >
                <Card variant="outlined" style={{ opacity: 0.8, borderRadius: '8px' }}>
                    <CardContent>
                        <Typography variant="h4" component="div" style={{ color: '#000' }}>
                            {countdown.days}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" style={{ color: '#000' }}>
                            Days
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" style={{ opacity: 0.8, borderRadius: '8px' }}>
                    <CardContent>
                        <Typography variant="h4" component="div" style={{ color: '#000' }}>
                            {countdown.hours}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" style={{ color: '#000' }}>
                            Hours
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" style={{ opacity: 0.8, borderRadius: '8px' }}>
                    <CardContent>
                        <Typography variant="h4" component="div" style={{ color: '#000' }}>
                            {countdown.minutes}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" style={{ color: '#000' }}>
                            Minutes
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" style={{ opacity: 0.8, borderRadius: '8px' }}>
                    <CardContent>
                        <Typography variant="h4" component="div" style={{ color: '#000' }}>
                            {countdown.seconds}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" style={{ color: '#000' }}>
                            Seconds
                        </Typography>
                    </CardContent>
                </Card>
            </div>


        </div>
    );
};

export default CountdownTimer;

