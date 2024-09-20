# About
Rank tracker API

## Domains to support
- Google
- Bing
- DucDuckGo

## Run locally
- Export your API Key
```
export SERPAPI_API_KEY=YOUR_ACTUAL_API_KEY
```

- Run server `node index` or `nodemon index`

## Now
- [X] Google ranking
- [ ] Bing ranking
- [ ] DuckDuckGo ranking

- [ ] Better output?

- [ ] Work on a blog post
- [ ] Yahoo ranking (later)

## Sample usage

```  
{
  "domain": "sko.dev",
  "keywords": ["skodev indonesia"],
  "engines": [
    {
      "name": "google",
      "params": {
        "domain": "google.co.id",
        "gl": "id",
        "hl": "id"
      }
    },
    {
      "name": "duckduckgo",
      "params": {
        "region": "id-id"
      }
    }
  ]
}
```

Curl
```
curl -X POST http://localhost:3000/api/rankings \
  -H 'Content-Type: application/json' \
-d '{
    "keywords": ["skodev indonesia"],
    "domain": "sko.dev",
    "engines": [
      {
        "name": "google",
        "params": {
            "google_domain": "google.co.id",
            "gl": "id",
            "hl": "id"
        }
      }
    ]
  }'
```

No params sample
```
curl -X POST http://localhost:3000/api/rankings \
  -H 'Content-Type: application/json' \
  -d '{
    "keywords": ["skodev indonesia"],
    "domain": "sko.dev",
    "engines": [
      {
       "name": "google"
     }
    ]
  }'
```