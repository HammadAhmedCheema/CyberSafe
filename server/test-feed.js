const API_URL = 'http://localhost:5001/api/incidents/public';

const testPublicFeed = async () => {
    console.log('--- Testing Public Feed API ---');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (response.ok) {
            console.log('✅ Public Feed Fetch Successful!');
            console.log('Status:', response.status);
            console.log('Incidents count:', data.length);
            console.log('Sample incident:', data[0]);
        } else {
            console.error('❌ Public Feed Fetch Failed!');
            console.error('Status:', response.status);
            console.error('Data:', data);
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
};

testPublicFeed();
