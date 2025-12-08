const API_URL = 'http://localhost:5001/api/users';

const testAuth = async () => {
    const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`, // Unique email each time
        password: 'password123'
    };

    console.log('--- Starting Auth API Test ---');

    // 1. Test Registration
    try {
        console.log(`\n1. Testing Registration for ${testUser.email}...`);
        const registerRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        
        const registerData = await registerRes.json();

        if (registerRes.ok) {
            console.log('✅ Registration Successful!');
            console.log('Status:', registerRes.status);
            console.log('Token received:', !!registerData.token);
        } else {
            console.error('❌ Registration Failed!');
            console.error('Status:', registerRes.status);
            console.error('Data:', registerData);
            return;
        }
    } catch (error) {
        console.error('❌ Registration Network Error:', error.message);
        return;
    }

    // 2. Test Login
    try {
        console.log(`\n2. Testing Login for ${testUser.email}...`);
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
            console.log('✅ Login Successful!');
            console.log('Status:', loginRes.status);
            console.log('Token received:', !!loginData.token);
        } else {
            console.error('❌ Login Failed!');
            console.error('Status:', loginRes.status);
            console.error('Data:', loginData);
        }
    } catch (error) {
        console.error('❌ Login Network Error:', error.message);
    }
};

testAuth();
