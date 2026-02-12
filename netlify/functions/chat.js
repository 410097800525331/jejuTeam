
exports.handler = async (event, context) => {
  // RayPersona: Security Check - API Key Existence
  const API_KEY = process.env.OPENAI_API_KEY;
  
  if (!API_KEY) {
    console.error('CRITICAL: OPENAI_API_KEY is missing in environment variables.');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SERVER_CONFIG_ERROR: API Key configuration missing' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'BAD_REQUEST: Messages array is required' })
      };
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Cost-effective model
        messages: messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*' // Optional: Add if needed for CORS, but usually same-origin for Netlify functions
      }
    };

  } catch (error) {
    console.error('Chat Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'INTERNAL_SERVER_ERROR' })
    };
  }
};
