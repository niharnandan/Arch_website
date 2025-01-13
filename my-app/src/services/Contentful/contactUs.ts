import { API_URL } from "./contentfulImages";

const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

const CACHE_KEY = 'contactUsCache';
const CACHE_EXPIRATION_TIME = 1000 * 60 * 60;

const isCacheExpired = (timestamp: number): boolean => {
  const currentTime = Date.now();
  return (currentTime - timestamp) > CACHE_EXPIRATION_TIME;
};

export const fetchContactUs = async () => {
  const cachedData = sessionStorage.getItem(CACHE_KEY);
  const cachedTimestamp = sessionStorage.getItem(`${CACHE_KEY}_timestamp`);

  if (cachedData && cachedTimestamp && !isCacheExpired(Number(cachedTimestamp))) {
    console.log('Returning cached Contact Us data');
    return JSON.parse(cachedData);
  }

  try {
    const entryId = '49OGxSZOCsI6KaxZqs8M2u';
    const response = await fetch(`${API_URL}/${entryId}?access_token=${ACCESS_TOKEN}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data from Contentful');
    }

    const data = await response.json();

    if (!data.fields) {
      return 'Info Not found';
    }

    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.fields));
    sessionStorage.setItem(`${CACHE_KEY}_timestamp`, String(Date.now()));

    return data.fields;
  } catch (error) {
    console.error('Error fetching Contact Us data:', error);
    return 'Info Not found';
  }
};