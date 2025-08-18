import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeagueManagement = () => {
    const [leagues, setLeagues] = useState([]);
    const [newLeague, setNewLeague] = useState({
        name: '',
        pricePerPerson: '',
        dayOfWeek: '',
        time: '',
        duration: '',
        maxTeams: '',
        description: '',
        teamType: '',
        matchType: ''
    });

    useEffect(() => {
        fetchLeagues();
    }, []);

    const fetchLeagues = async () => {
        try {
            const response = await axios.get('/api/leagues');
            setLeagues(response.data);
        } catch (error) {
            console.error('Error fetching leagues:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeague({ ...newLeague, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/leagues', newLeague);
            fetchLeagues();
            setNewLeague({
                name: '',
                pricePerPerson: '',
                dayOfWeek: '',
                time: '',
                duration: '',
                maxTeams: '',
                description: '',
                teamType: '',
                matchType: ''
            });
        } catch (error) {
            console.error('Error creating league:', error);
        }
    };

    const handleDelete = async (leagueId) => {
        try {
            await axios.delete(`/api/leagues/${leagueId}`);
            fetchLeagues();
        } catch (error) {
            console.error('Error deleting league:', error);
        }
    };

    return (
        <div>
            <h1>League Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="League Name" value={newLeague.name} onChange={handleInputChange} required />
                <input type="number" name="pricePerPerson" placeholder="Price Per Person" value={newLeague.pricePerPerson} onChange={handleInputChange} required />
                <input type="text" name="dayOfWeek" placeholder="Day of Week" value={newLeague.dayOfWeek} onChange={handleInputChange} required />
                <input type="time" name="time" value={newLeague.time} onChange={handleInputChange} required />
                <input type="number" name="duration" placeholder="Duration (weeks)" value={newLeague.duration} onChange={handleInputChange} required />
                <input type="number" name="maxTeams" placeholder="Max Teams" value={newLeague.maxTeams} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description" value={newLeague.description} onChange={handleInputChange} required></textarea>
                <select name="teamType" value={newLeague.teamType} onChange={handleInputChange} required>
                    <option value="">Select Team Type</option>
                    <option value="Single">Single</option>
                    <option value="Scramble 2 Man">Scramble 2 Man</option>
                    <option value="Scramble 4 Man">Scramble 4 Man</option>
                </select>
                <select name="matchType" value={newLeague.matchType} onChange={handleInputChange} required>
                    <option value="">Select Match Type</option>
                    <option value="Lowest Score">Lowest Score</option>
                    <option value="Match Play">Match Play</option>
                </select>
                <button type="submit">Create League</button>
            </form>
            <h2>Existing Leagues</h2>
            <ul>
                {leagues.map((league) => (
                    <li key={league._id}>
                        {league.name} - {league.pricePerPerson} - {league.dayOfWeek} - {league.time}
                        <button onClick={() => handleDelete(league._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeagueManagement;