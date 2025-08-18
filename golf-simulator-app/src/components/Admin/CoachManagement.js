import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoachManagement = () => {
    const [coaches, setCoaches] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [editingCoach, setEditingCoach] = useState(null);

    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        try {
            const response = await axios.get('/api/admin/coaches');
            setCoaches(response.data);
        } catch (error) {
            console.error('Error fetching coaches:', error);
        }
    };

    const handleAddOrUpdateCoach = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (editingCoach) {
                await axios.put(`/api/admin/coaches/${editingCoach._id}`, formData);
            } else {
                await axios.post('/api/admin/coaches', formData);
            }
            resetForm();
            fetchCoaches();
        } catch (error) {
            console.error('Error saving coach:', error);
        }
    };

    const handleEditCoach = (coach) => {
        setName(coach.name);
        setEmail(coach.email);
        setPhone(coach.phone);
        setEditingCoach(coach);
    };

    const handleDeleteCoach = async (id) => {
        try {
            await axios.delete(`/api/admin/coaches/${id}`);
            fetchCoaches();
        } catch (error) {
            console.error('Error deleting coach:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setImage(null);
        setEditingCoach(null);
    };

    return (
        <div>
            <h2>Coach Management</h2>
            <form onSubmit={handleAddOrUpdateCoach}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">{editingCoach ? 'Update Coach' : 'Add Coach'}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>
            <ul>
                {coaches.map((coach) => (
                    <li key={coach._id}>
                        {coach.name} - {coach.email} - {coach.phone}
                        <button onClick={() => handleEditCoach(coach)}>Edit</button>
                        <button onClick={() => handleDeleteCoach(coach._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoachManagement;