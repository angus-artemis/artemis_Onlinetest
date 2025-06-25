# Instagram API Integration Guide

## Overview

This guide covers everything needed to integrate Instagram APIs with Artemis. The Instagram platform has specific requirements and limitations that must be understood before development.

## Instagram API Types

### 1. Instagram Basic Display API
**Purpose:** Access personal Instagram accounts  
**Use Case:** Individual creators connecting their personal accounts  
**Data Access:** Basic profile info, media, limited insights  

\`\`\`typescript
// Basic Display API Capabilities
{
  profile: {
    id: string
    username: string
    account_type: "PERSONAL" | "BUSINESS"
    media_count: number
  },
  media: {
    id: string
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
    media_url: string
    permalink: string
    timestamp: string
    caption?: string
  }
}
\`\`\`

### 2. Instagram Graph API
**Purpose:** Access business/creator Instagram accounts  
**Use Case:** Business accounts with advanced analytics  
**Data Access:** Full insights, audience data, advanced metrics  

\`\`\`typescript
// Graph API Capabilities
{
  insights: {
    reach: number
    impressions: number
    profile_views: number
    website_clicks: number
    follower_count: number
    engagement: number
  },
  audience: {
    age_range: object
    gender: object
    country: object
    city: object
  },
  hashtags: {
    name: string
    id: string
  }
}
\`\`\`

## Required App Setup

### 1. Facebook Developer Account
\`\`\`typescript
// Steps to create Instagram app
1. Go to developers.facebook.com
2. Create new app → "Business" type
3. Add Instagram Basic Display product
4. Add Instagram Graph API product (for business features)
5. Configure OAuth redirect URIs
6. Submit for App Review (required for production)
\`\`\`

### 2. App Configuration
\`\`\`typescript
// Required app settings
{
  appId: "YOUR_APP_ID",
  appSecret: "YOUR_APP_SECRET", 
  redirectUri: "https://yourdomain.com/auth/instagram/callback",
  scopes: [
    // Basic Display API
    "instagram_basic",
    
    // Graph API (business accounts)
    "instagram_content_publish",
    "instagram_manage_insights", 
    "pages_show_list",
    "pages_read_engagement"
  ]
}
\`\`\`

### 3. Business Verification
\`\`\`typescript
// For production access, you need:
{
  businessVerification: {
    required: true,
    documents: ["Business license", "Tax documents"],
    process: "Can take 2-4 weeks",
    cost: "Free"
  },
  appReview: {
    required: true,
    timeline: "7-14 days",
    requirements: ["Privacy policy", "Terms of service", "App demo"]
  }
}
\`\`\`

## OAuth Implementation

### 1. Authorization Flow
\`\`\`typescript
// Step 1: Redirect user to Instagram
const authUrl = `https://api.instagram.com/oauth/authorize?` +
  `client_id=${APP_ID}&` +
  `redirect_uri=${REDIRECT_URI}&` +
  `scope=instagram_basic&` +
  `response_type=code`;

// Step 2: Handle callback and exchange code for token
const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: APP_ID,
    client_secret: APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code: authorizationCode
  })
});

// Step 3: Get long-lived token (60 days)
const longLivedToken = await fetch(
  `https://graph.instagram.com/access_token?` +
  `grant_type=ig_exchange_token&` +
  `client_secret=${APP_SECRET}&` +
  `access_token=${shortLivedToken}`
);
\`\`\`

### 2. Token Management
\`\`\`typescript
interface InstagramToken {
  access_token: string
  token_type: "bearer"
  expires_in: number // 3600 seconds for short-lived
  user_id: string
}

// Token refresh (for long-lived tokens)
const refreshToken = async (token: string) => {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?` +
    `grant_type=ig_refresh_token&` +
    `access_token=${token}`
  );
  return response.json();
};
\`\`\`

## Data Fetching Implementation

### 1. Profile Data
\`\`\`typescript
// Get user profile
const getProfile = async (accessToken: string) => {
  const response = await fetch(
    `https://graph.instagram.com/me?` +
    `fields=id,username,account_type,media_count&` +
    `access_token=${accessToken}`
  );
  return response.json();
};
\`\`\`

### 2. Media Data
\`\`\`typescript
// Get user's media
const getMedia = async (accessToken: string, limit = 25) => {
  const response = await fetch(
    `https://graph.instagram.com/me/media?` +
    `fields=id,media_type,media_url,permalink,timestamp,caption&` +
    `limit=${limit}&` +
    `access_token=${accessToken}`
  );
  return response.json();
};
\`\`\`

### 3. Insights Data (Business Accounts Only)
\`\`\`typescript
// Get media insights
const getMediaInsights = async (mediaId: string, accessToken: string) => {
  const response = await fetch(
    `https://graph.instagram.com/${mediaId}/insights?` +
    `metric=engagement,impressions,reach,saved&` +
    `access_token=${accessToken}`
  );
  return response.json();
};

// Get account insights
const getAccountInsights = async (accessToken: string) => {
  const response = await fetch(
    `https://graph.instagram.com/me/insights?` +
    `metric=follower_count,profile_views,reach,impressions&` +
    `period=day&` +
    `access_token=${accessToken}`
  );
  return response.json();
};
\`\`\`

## Rate Limiting & Best Practices

### 1. Rate Limits
\`\`\`typescript
// Instagram API rate limits
{
  basicDisplay: {
    limit: "200 requests per hour per user",
    resetTime: "Every hour"
  },
  graphAPI: {
    limit: "200 requests per hour per user", 
    businessLimit: "Higher limits available",
    resetTime: "Every hour"
  }
}
\`\`\`

### 2. Implementation Strategy
\`\`\`typescript
// Rate limiting implementation
class InstagramAPIClient {
  private rateLimiter = new Map<string, number>();
  
  async makeRequest(url: string, userId: string) {
    // Check rate limit
    const userRequests = this.rateLimiter.get(userId) || 0;
    if (userRequests >= 180) { // Leave buffer
      throw new Error('Rate limit exceeded');
    }
    
    // Make request
    const response = await fetch(url);
    
    // Update rate limit counter
    this.rateLimiter.set(userId, userRequests + 1);
    
    return response.json();
  }
}
\`\`\`

### 3. Caching Strategy
\`\`\`typescript
// Cache frequently accessed data
interface CacheStrategy {
  profile: "24 hours", // Profile data changes slowly
  media: "1 hour",     // New posts need quick updates  
  insights: "6 hours", // Insights have 24-48h delay anyway
  trends: "12 hours"   // Trend data for recommendations
}
\`\`\`

## Error Handling

### 1. Common Errors
\`\`\`typescript
// Instagram API error responses
interface InstagramError {
  error: {
    message: string
    type: "OAuthException" | "IGApiException" | "IGApiUnknownException"
    code: number
    error_subcode?: number
    fbtrace_id: string
  }
}

// Common error codes
{
  190: "Invalid OAuth access token",
  100: "Invalid parameter", 
  4: "Application request limit reached",
  17: "User request limit reached",
  613: "Calls to this api have exceeded the rate limit"
}
\`\`\`

### 2. Error Handling Implementation
\`\`\`typescript
const handleInstagramError = (error: InstagramError) => {
  switch (error.error.code) {
    case 190:
      // Token expired - refresh or re-authenticate
      return { action: 'refresh_token', retry: true };
    
    case 4:
    case 17:
    case 613:
      // Rate limited - wait and retry
      return { action: 'rate_limit', retryAfter: 3600 };
    
    default:
      // Log error and return generic message
      console.error('Instagram API Error:', error);
      return { action: 'error', message: 'Instagram API error' };
  }
};
\`\`\`

## Data Synchronization Strategy

### 1. Sync Schedule
\`\`\`typescript
// Recommended sync intervals
{
  profile: "Every 24 hours",
  recentMedia: "Every 30 minutes", 
  insights: "Every 6 hours",
  historicalData: "Once daily",
  trends: "Every 12 hours"
}
\`\`\`

### 2. Background Jobs
\`\`\`typescript
// Queue-based sync system
interface SyncJob {
  userId: string
  accountId: string
  syncType: 'profile' | 'media' | 'insights'
  priority: 'high' | 'normal' | 'low'
  retryCount: number
  scheduledAt: Date
}

// Job processor
const processSyncJob = async (job: SyncJob) => {
  try {
    switch (job.syncType) {
      case 'profile':
        await syncProfileData(job.accountId);
        break;
      case 'media':
        await syncMediaData(job.accountId);
        break;
      case 'insights':
        await syncInsightsData(job.accountId);
        break;
    }
  } catch (error) {
    if (job.retryCount < 3) {
      // Retry with exponential backoff
      scheduleRetry(job, job.retryCount + 1);
    } else {
      // Log failure and notify user
      logSyncFailure(job, error);
    }
  }
};
\`\`\`

## Security Considerations

### 1. Token Storage
\`\`\`typescript
// Secure token storage
{
  encryption: "Encrypt access tokens at rest",
  rotation: "Refresh tokens before expiry",
  scope: "Request minimal required scopes",
  revocation: "Handle token revocation gracefully"
}
\`\`\`

### 2. Data Privacy
\`\`\`typescript
// Privacy compliance
{
  dataRetention: "Delete data when user disconnects",
  userConsent: "Clear consent for data usage",
  dataMinimization: "Only collect necessary data",
  rightToDelete: "Allow users to delete all data"
}
\`\`\`

## Testing Strategy

### 1. Development Testing
\`\`\`typescript
// Test Instagram integration
{
  testAccounts: "Create test Instagram accounts",
  sandboxMode: "Use Instagram's test environment", 
  mockData: "Mock API responses for development",
  errorSimulation: "Test error handling scenarios"
}
\`\`\`

### 2. Production Readiness
\`\`\`typescript
// Pre-launch checklist
{
  appReview: "Complete Instagram App Review",
  businessVerification: "Verify business account",
  privacyPolicy: "Publish privacy policy",
  termsOfService: "Publish terms of service",
  dataHandling: "Document data usage practices"
}
\`\`\`

## Monitoring & Analytics

### 1. API Monitoring
\`\`\`typescript
// Track API usage
interface APIMetrics {
  requestCount: number
  errorRate: number
  responseTime: number
  rateLimitHits: number
  tokenRefreshes: number
}
\`\`\`

### 2. User Experience Monitoring
\`\`\`typescript
// Monitor user experience
{
  connectionSuccess: "Track successful account connections",
  syncReliability: "Monitor data sync success rates", 
  dataFreshness: "Track how current the data is",
  userSatisfaction: "Monitor user engagement with insights"
}
\`\`\`

---

This guide provides the foundation for Instagram API integration. The actual implementation will require careful attention to rate limits, error handling, and user experience.
