export default async function handler(req, res) {
    // Check if the request method is GET
    if (req.method === 'GET') {
      // Get the query parameters from the request
      const { user_input } = req.query;
  
      // Construct the URL for the Python API
      const apiUrl = `http://localhost:5000/find_related_dreams?user_input=${user_input}`;
  
      try {
        // Make the API request using fetch
        const response = await fetch(apiUrl);
  
        // Check if the API request was successful
        if (response.ok) {
          // Get the response data
          const data = await response.json();
  
          // Send the response data as JSON
          res.status(200).json(data);
        } else {
          // Handle the error response
          res.status(response.status).json({ error: 'API request failed' });
        }
      } catch (error) {
        // Handle any errors that occurred during the API request
        res.status(500).json({ error: 'An error occurred while making the API request' });
      }
    } else {
      // Handle other HTTP methods if needed
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }