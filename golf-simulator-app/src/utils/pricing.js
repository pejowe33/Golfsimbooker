const NON_PEAK_HOURS_RATE = 50;
const PEAK_HOURS_RATE = 60;
const MEMBER_HOUR_RATE = 40;
const UNUSED_MEMBER_HOUR_RATE = 45;

const NON_PEAK_START = 10; // 10 AM
const NON_PEAK_END = 17; // 5 PM
const PEAK_START = 17; // 5 PM
const PEAK_END_WEEKDAY = 22; // 10 PM
const PEAK_END_FRIDAY = 24; // Midnight
const PEAK_END_SATURDAY = 24; // Midnight
const PEAK_END_SUNDAY = 22; // 10 PM

const MAX_BAYS = 5;
const MAX_BOOKING_HOURS = 4;
const MIN_BOOKING_HOURS = 1;

const calculateBookingCost = (startTime, endTime, dayOfWeek, numberOfBays, isMember) => {
    const totalHours = (endTime - startTime) / 60; // Convert minutes to hours
    if (totalHours < MIN_BOOKING_HOURS || totalHours > MAX_BOOKING_HOURS) {
        throw new Error("Booking must be between 1 and 4 hours.");
    }

    let cost = 0;
    for (let hour = startTime; hour < endTime; hour += 60) {
        const hourRate = getHourlyRate(hour, dayOfWeek, isMember);
        cost += hourRate * numberOfBays;
    }

    return cost;
};

const getHourlyRate = (hour, dayOfWeek, isMember) => {
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0; // Saturday or Sunday
    if (isMember && hour < NON_PEAK_END) {
        return MEMBER_HOUR_RATE;
    }
    if (isWeekend) {
        return PEAK_HOURS_RATE;
    }
    if (hour >= NON_PEAK_START && hour < NON_PEAK_END) {
        return NON_PEAK_HOURS_RATE;
    }
    return PEAK_HOURS_RATE;
};

const isBookingAvailable = (bookings, startTime, endTime, numberOfBays) => {
    const overlappingBookings = bookings.filter(booking => {
        return (booking.startTime < endTime && booking.endTime > startTime) && 
               (booking.numberOfBays + numberOfBays <= MAX_BAYS);
    });
    return overlappingBookings.length < MAX_BAYS;
};

export { calculateBookingCost, isBookingAvailable };