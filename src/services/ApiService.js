import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

// Helper function to get the details of a single story by its ID
const fetchStoryDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/item/${id}.json`);
    return response.data;
};

// Main function that the component will call
export const fetchHackerNewsStories = async () => {
  try {
    // Step 1: Get the list of top story IDs
    const idResponse = await axios.get(`${BASE_URL}/topstories.json`);
    const storyIds = idResponse.data;

    // We only want to fetch the top 10 stories to keep our app fast
    const top10Ids = storyIds.slice(0, 10);

    // Step 2: Fetch the details for each of the top 10 stories concurrently
    // Promise.all is a powerful tool that runs many promises at the same time
    const storyPromises = top10Ids.map(id => fetchStoryDetails(id));
    const stories = await Promise.all(storyPromises);
    
    return stories;

  } catch (error) {
    console.error("Error fetching Hacker News stories:", error);
    // Re-throw the error so the component can handle it
    throw new Error('Failed to fetch Hacker News stories.');
  }
};