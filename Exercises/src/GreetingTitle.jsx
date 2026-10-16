import { useState, useEffect } from 'react';

const GreetingTitle = () => {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('Hello');

    useEffect(() => {
        if (name.trim() === '') {
            document.title = 'Welcome!';
        } else {
            document.title = `${greeting}, ${name}`;
        }
    }, [name, greeting]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Enter Your Name:</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
            />

            <h2>Choose a Greeting:</h2>
            <input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Enter greeting..."
            />
        </div>
    );
};

export default GreetingTitle;