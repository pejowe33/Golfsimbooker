# Golf Simulator Venue Web Application

Welcome to the Golf Simulator Venue Web Application! This project is designed to provide a comprehensive platform for booking golf simulator bays, managing leagues, scheduling lessons, and more. Below is an overview of the features and structure of the application.

## Features

### Booking Software
- **Booking Sheet**: Users can select a date, number of bays (up to 2), number of people, and time slots in 30-minute intervals.
- **Availability**: 5 bays available for booking at a time, with restrictions on booking times and lengths.
- **Pricing**: Different rates for peak and non-peak hours, with membership discounts available.

### User Authentication
- **Login/Registration**: Users can create accounts, log in, and reset passwords.
- **Memberships**: Users can enroll in a membership for discounted rates and free hours.

### Leagues
- **League Signup**: Users can sign up for leagues, with team management features.
- **Scores**: Users can view league scores and standings.

### Lessons
- **Coach Availability**: Users can view and book lessons with coaches based on availability.
- **Email Reminders**: Users receive reminders for their scheduled lessons.

### Gift Cards
- **Purchase Gift Cards**: Users can buy gift cards for use on bookings and merchandise.

### Admin Dashboard
- **Booking Management**: Admins can view, edit, and delete bookings.
- **League Management**: Admins can create and manage leagues, including team types and match types.
- **Analytics**: Admins can view analytics on bookings, coach performance, and revenue.

## Project Structure

```
golf-simulator-app
├── src
│   ├── app.js
│   ├── components
│   │   ├── Booking
│   │   ├── Auth
│   │   ├── Leagues
│   │   ├── Lessons
│   │   ├── GiftCards
│   │   ├── Membership
│   │   └── Admin
│   ├── pages
│   ├── utils
│   ├── styles
│   └── types
├── server
│   ├── app.js
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd golf-simulator-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   - For the client-side:
     ```
     npm start
     ```
   - For the server-side:
     ```
     cd server
     npm start
     ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.