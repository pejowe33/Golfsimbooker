import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LeagueSignup = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('');
    const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);
    const history = useHistory();

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get('/api/leagues');
                setLeagues(response.data);
            } catch (error) {
                console.error('Error fetching leagues:', error);
            }
        };
        fetchLeagues();
    }, []);

    const handleTeamMemberChange = (index, event) => {
        const newMembers = [...teamMembers];
        newMembers[index][event.target.name] = event.target.value;
        setTeamMembers(newMembers);
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, { name: '', email: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/leagues/signup', {
                leagueId: selectedLeague,
                teamMembers,
            });
            history.push('/leagues'); // Redirect to leagues page after signup
        } catch (error) {
            console.error('Error signing up for league:', error);
        }
    };

    return (
        <div>
            <h2>League Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select League:</label>
                    <select value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)}>
                        <option value="">Select a league</option>
                        {leagues.map((league) => (
                            <option key={league.id} value={league.id}>
                                {league.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h3>Team Members</h3>
                {teamMembers.map((member, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={member.name}
                            onChange={(e) => handleTeamMemberChange(index, e)}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={member.email}
                            onChange={(e) => handleTeamMemberChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addTeamMember}>Add Team Member</button>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default LeagueSignup;