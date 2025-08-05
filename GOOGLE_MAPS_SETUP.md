# Google Maps API Setup for Cydex Logistics

## 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable billing (required for API usage)

## 2. Enable APIs

Enable these APIs in your Google Cloud Console:
- **Distance Matrix API** - Calculate distances between addresses
- **Geocoding API** - Convert addresses to coordinates
- **Places API** - Autocomplete addresses (optional)

## 3. Create API Key

1. Go to "Credentials" in Google Cloud Console
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key
4. **IMPORTANT**: Restrict the API key to only the APIs you need

## 4. Set Usage Limits

Set daily quotas to control costs:
- Distance Matrix API: 1,000 requests/day (free tier)
- Geocoding API: 2,500 requests/day (free tier)

## 5. Environment Variables

Add to your `.env.local`:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 6. Cost Estimation

**Free Tier (per month):**
- Distance Matrix: 1,000 requests
- Geocoding: 2,500 requests

**Pricing (after free tier):**
- Distance Matrix: $5 per 1,000 requests
- Geocoding: $5 per 1,000 requests

For Cydex with 100 orders/day = ~3,000 requests/month = ~$15/month 