<?php


return [
    'paths' => ['api/*', 'odata/*'], // Add the routes you want to allow CORS for
    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, etc.)
    'allowed_origins' => ['*'], // Allow all origins or specify your frontend origin
    'allowed_origins_patterns' => [], // Use patterns if needed
    'allowed_headers' => ['*'], // Allow all headers or specify required headers
    'exposed_headers' => [],
    'max_age' => 0, // Max age for preflight requests
    'supports_credentials' => false,
     'Access-Control-Allow-Origin'=> 'http://localhost:4200' // Set to true if credentials are required
];
