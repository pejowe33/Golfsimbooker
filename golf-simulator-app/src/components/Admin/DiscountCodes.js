import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiscountCodes = () => {
    const [discountCodes, setDiscountCodes] = useState([]);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [discountType, setDiscountType] = useState('percentage');
    const [amount, setAmount] = useState('');
    const [maxUses, setMaxUses] = useState('');
    const [validFrom, setValidFrom] = useState('');
    const [validUntil, setValidUntil] = useState('');

    useEffect(() => {
        fetchDiscountCodes();
    }, []);

    const fetchDiscountCodes = async () => {
        try {
            const response = await axios.get('/api/admin/discount-codes');
            setDiscountCodes(response.data);
        } catch (error) {
            console.error('Error fetching discount codes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/discount-codes', {
                code,
                description,
                discountType,
                amount,
                maxUses,
                validFrom,
                validUntil,
            });
            fetchDiscountCodes();
            resetForm();
        } catch (error) {
            console.error('Error creating discount code:', error);
        }
    };

    const resetForm = () => {
        setCode('');
        setDescription('');
        setDiscountType('percentage');
        setAmount('');
        setMaxUses('');
        setValidFrom('');
        setValidUntil('');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/discount-codes/${id}`);
            fetchDiscountCodes();
        } catch (error) {
            console.error('Error deleting discount code:', error);
        }
    };

    return (
        <div>
            <h1>Discount Codes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                >
                    <option value="percentage">Percentage</option>
                    <option value="dollar">Dollar</option>
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Max Uses"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Valid From"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Valid Until"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    required
                />
                <button type="submit">Create Discount Code</button>
            </form>
            <h2>Existing Discount Codes</h2>
            <ul>
                {discountCodes.map((discount) => (
                    <li key={discount.id}>
                        {discount.code} - {discount.description} 
                        <button onClick={() => handleDelete(discount.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DiscountCodes;