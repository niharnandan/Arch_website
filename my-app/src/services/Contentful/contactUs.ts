import { API_URL } from "./contentfulImages";

const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

const CACHE_KEY = 'contactUsCache';
const CACHE_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour in milliseconds

// Helper function to check if cache has expired
const isCacheExpired = (timestamp: number): boolean => {
  const currentTime = Date.now();
  return (currentTime - timestamp) > CACHE_EXPIRATION_TIME;
};

// Fetch Contact Us data with caching mechanism
export const fetchContactUs = async () => {
  // Check if the data is available in sessionStorage
  const cachedData = sessionStorage.getItem(CACHE_KEY);
  const cachedTimestamp = sessionStorage.getItem(`${CACHE_KEY}_timestamp`);

  // If cached data exists and is not expired, return it
  if (cachedData && cachedTimestamp && !isCacheExpired(Number(cachedTimestamp))) {
    console.log('Returning cached Contact Us data');
    return JSON.parse(cachedData);
  }

  try {
    const entryId = '49OGxSZOCsI6KaxZqs8M2u'; // The specific Entry ID you're looking for
    const response = await fetch(`${API_URL}/${entryId}?access_token=${ACCESS_TOKEN}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data from Contentful');
    }

    const data = await response.json();

    // If there is no data, return a fallback string
    if (!data.fields) {
      return 'Info Not found';
    }

    // Cache the data in sessionStorage with a timestamp
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.fields));
    sessionStorage.setItem(`${CACHE_KEY}_timestamp`, String(Date.now()));

    return data.fields;
  } catch (error) {
    console.error('Error fetching Contact Us data:', error);
    return 'Info Not found';
  }
};
