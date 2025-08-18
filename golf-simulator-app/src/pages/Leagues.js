import React, { useEffect, useState } from 'react';
import { fetchLeagues, signUpForLeague } from '../utils/api';

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getLeagues = async () => {
            const data = await fetchLeagues();
            setLeagues(data);
        };
        getLeagues();
    }, []);

    const handleTeamMemberChange = (index, event) => {
        const newTeamMembers = [...teamMembers];
        newTeamMembers[index][event.target.name] = event.target.value;
        setTeamMembers(newTeamMembers);
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, { name: '', email: '' }]);
    };

    const handleLeagueSignup = async () => {
        const emails = teamMembers.map(member => member.email);
        const response = await signUpForLeague(selectedLeague, teamMembers);
        if (response.success) {
            setMessage('Successfully signed up for the league!');
        } else {
            setMessage('Error signing up for the league. Please check the emails and try again.');
        }
    };

    return (
        <div>
            <h1>Leagues</h1>
            <select onChange={(e) => setSelectedLeague(e.target.value)} value={selectedLeague}>
                <option value="">Select a League</option>
                {leagues.map((league) => (
                    <option key={league.id} value={league.id}>{league.name}</option>
                ))}
            </select>

            {selectedLeague && (
                <div>
                    <h2>Sign Up for {selectedLeague}</h2>
                    {teamMembers.map((member, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={member.name}
                                onChange={(event) => handleTeamMemberChange(index, event)}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={member.email}
                                onChange={(event) => handleTeamMemberChange(index, event)}
                            />
                        </div>
                    ))}
                    <button onClick={addTeamMember}>Add Team Member</button>
                    <button onClick={handleLeagueSignup}>Sign Up</button>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default Leagues;