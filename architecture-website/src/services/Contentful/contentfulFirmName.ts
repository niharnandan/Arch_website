import { API_URL } from './contentfulImages';

const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

export const fetchFirmName = async () => {
  try {
    const entryId = '5DBfH1JWGf81PCuV5BiEAj';
    const response = await fetch(
      `${API_URL}/${entryId}?access_token=${ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Contentful');
    }

    const data = await response.json();

    const firmName = data.fields?.name || 'Default Firm Name';
    return firmName;
  } catch (error) {
    console.error('Error fetching firm name:', error);
    return 'Architecture Firm';
  }
};