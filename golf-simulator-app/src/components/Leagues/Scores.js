import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Scores = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('/api/leagues/scores');
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching scores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) {
        return <div>Loading scores...</div>;
    }

    return (
        <div>
            <h1>League Scores</h1>
            <table>
                <thead>
                    <tr>
                        <th>League Name</th>
                        <th>Team</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{score.leagueName}</td>
                            <td>{score.team}</td>
                            <td>{score.score}</td>
                            <td>{new Date(score.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scores;