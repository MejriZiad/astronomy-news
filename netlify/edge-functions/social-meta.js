// netlify/edge-functions/social-meta.js
// Netlify Edge Function for dynamic Open Graph tags

export default async (request, context) => {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Only process HTML requests
    if (!request.headers.get('accept')?.includes('text/html')) {
        return;
    }
    
    // Get the original response
    const response = await context.next();
    
    // Clone the response so we can modify it
    const newResponse = new Response(response.body, response);
    
    // Read the response body
    const html = await newResponse.text();
    
    // Extract item ID from query parameters
    const itemId = url.searchParams.get('id');
    
    if (itemId) {
        // In a real implementation, you would fetch item data from your database
        // For now, we'll use a placeholder
        const itemData = {
            title: 'Astronomy News - Cosmic Discoveries',
            description: 'Latest astronomy news and space discoveries',
            image: 'https://astronomy-news.netlify.app/assets/icons/icon-512x512.png',
            url: request.url
        };
        
        // Add or update Open Graph meta tags
        const updatedHtml = html.replace(
            /<\/head>/i,
            `
            <!-- Open Graph Meta Tags -->
            <meta property="og:title" content="${itemData.title}">
            <meta property="og:description" content="${itemData.description}">
            <meta property="og:image" content="${itemData.image}">
            <meta property="og:url" content="${itemData.url}">
            <meta property="og:type" content="article">
            <meta property="og:site_name" content="Astronomy News">
            
            <!-- Twitter Card Meta Tags -->
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="${itemData.title}">
            <meta name="twitter:description" content="${itemData.description}">
            <meta name="twitter:image" content="${itemData.image}">
            <meta name="twitter:site" content="@AstronomyNews">
            
            </head>
            `
        );
        
        return new Response(updatedHtml, newResponse);
    }
    
    // If no item ID, use default meta tags
    const defaultHtml = html.replace(
        /<\/head>/i,
        `
        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="Astronomy News - Latest Space Discoveries">
        <meta property="og:description" content="Latest astronomy news, space missions, and cosmic discoveries from around the world and Tunisia.">
        <meta property="og:image" content="https://astronomy-news.netlify.app/assets/icons/icon-512x512.png">
        <meta property="og:url" content="${request.url}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Astronomy News">
        
        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Astronomy News - Latest Space Discoveries">
        <meta name="twitter:description" content="Latest astronomy news, space missions, and cosmic discoveries from around the world and Tunisia.">
        <meta name="twitter:image" content="https://astronomy-news.netlify.app/assets/icons/icon-512x512.png">
        <meta name="twitter:site" content="@AstronomyNews">
        
        </head>
        `
    );
    
    return new Response(defaultHtml, newResponse);
};

export const config = {
    path: "/*",
    onError: 'bypass'
};