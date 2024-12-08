import { API_URL } from "./contentfulImages";

const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

export const fetchFirmName = async () => {
  try {
    const response = await fetch(`${API_URL}?access_token=${ACCESS_TOKEN}&content_type=firmName`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Contentful');
    }

    const data = await response.json();

    // Check if there are any entries, and return the first item
    const firmName = data.items?.[0]?.fields?.name || 'Default Firm Name';
    return firmName;
  } catch (error) {
    console.error('Error fetching firm name:', error);
    return 'Aadarsh Architecture firm Default';
  }
};
