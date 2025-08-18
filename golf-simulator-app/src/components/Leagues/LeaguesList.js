import React, { useEffect, useState } from 'react';
import { fetchLeagues } from '../../utils/api';

const LeaguesList = () => {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeagues = async () => {
            try {
                const data = await fetchLeagues();
                setLeagues(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getLeagues();
    }, []);

    if (loading) {
        return <div>Loading leagues...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Available Leagues</h2>
            <ul>
                {leagues.map((league) => (
                    <li key={league.id}>
                        <h3>{league.name}</h3>
                        <p>{league.description}</p>
                        <p>Price: ${league.price}</p>
                        <p>Teams: {league.teams}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaguesList;