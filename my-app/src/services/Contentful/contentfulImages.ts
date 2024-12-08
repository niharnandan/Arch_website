const SPACE_ID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

export const API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries`;

const CACHE_KEY = 'rotatingImagesCache';
const CACHE_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour in milliseconds

// Helper function to check if cache has expired
const isCacheExpired = (timestamp: number): boolean => {
  const currentTime = Date.now();
  return (currentTime - timestamp) > CACHE_EXPIRATION_TIME;
};

// Fetch images with caching mechanism
export const fetchImages = async () => {
  // Check if the data is available in sessionStorage
  const cachedData = sessionStorage.getItem(CACHE_KEY);
  const cachedTimestamp = sessionStorage.getItem(`${CACHE_KEY}_timestamp`);

  // If cached data exists and is not expired, return it
  if (cachedData && cachedTimestamp && !isCacheExpired(Number(cachedTimestamp))) {
    console.log('Returning cached data');
    return JSON.parse(cachedData);
  }

  try {
    // Fetching entries for the 'rotatingImages' content type from Contentful
    const response = await fetch(`${API_URL}?access_token=${ACCESS_TOKEN}&content_type=rotatingImages`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Contentful');
    }

    const data = await response.json();

    // If there are no items, return an empty array
    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Extract the image asset IDs from the 'fields.image' array
    const imageAssetIds = data.items[0].fields.image.map((item: any) => item.sys.id);

    // Find the image URLs using the asset IDs from the 'includes.Asset' array
    const imageUrls = imageAssetIds.map((assetId: string) => {
      const asset = data.includes.Asset.find((asset: any) => asset.sys.id === assetId);
      return asset ? `https:${asset.fields.file.url}` : null; // Prefix the URL with 'https:'
    }).filter((url: string | null) => url !== null); // Filter out null URLs if any asset is not found

    // Cache the data in sessionStorage with a timestamp
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(imageUrls));
    sessionStorage.setItem(`${CACHE_KEY}_timestamp`, String(Date.now()));

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};