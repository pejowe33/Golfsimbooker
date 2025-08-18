// This file defines TypeScript types used throughout the application.

export type Booking = {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    numberOfBays: number;
    numberOfPeople: number;
    userId: string | null; // null if not logged in
    bookingType: 'league' | 'lesson' | 'regular';
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    membership: boolean;
};

export type League = {
    id: string;
    name: string;
    pricePerPerson: number;
    dayOfWeek: string;
    time: string;
    durationWeeks: number;
    maxTeams: number;
    teamType: 'single' | 'scramble2' | 'scramble4';
};

export type Lesson = {
    id: string;
    coachId: string;
    date: string;
    startTime: string;
    endTime: string;
    userId: string;
};

export type GiftCard = {
    id: string;
    amount: number;
    code: string;
    userId: string;
};

export type Coach = {
    id: string;
    name: string;
    email: string;
    phone: string;
    availability: Array<{ date: string; timeSlots: string[] }>;
};