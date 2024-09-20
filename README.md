# About
Rank tracker API. Track your website ranking accross different search engines. 

## Tech
- NodeJS (Express)
- [SerpApi](https://serpapi.com/) - to check the SERP ranking

## Supported Search engines
- Google (max: 100th position)
- Bing (max: 50th position)
- DuckDuckGo (max: 30th position)

Ranking 0 means the domain is not found in the SERP until that max position.

## Run locally
- Export your API Key
```
export SERPAPI_API_KEY=YOUR_ACTUAL_API_KEY
```

- Run server `node index` or `nodemon index`

## Mini docs

- Endpoint: POST -> `localhost:3000/api/rankings`
- Parameters:
  - domain (string)
  - keywords (array[string])
  - engines ((array[name, params]))

`Params` inside `engines` can be any parameter that supported by SerpApi. Please refer to the [documentation](https://serpapi.com/search-api) for more information.

## Example usage

Simple sample
```  
{
  "domain": "archive.org",
  "keywords": ["internet archive"],
  "engines": [
    {
      "name": "google",
      "params": {
        "domain": "google.com",
        "gl": "es"
      }
    }
  ]
}
```

Multiple engines
```  
{
  "domain": "archive.org",
  "keywords": ["internet archive", "archived digital library"],
  "engines": [
    {
      "name": "google",
      "params": {
        "domain": "google.com",
        "gl": "es"
      }
    },
    {
      "name": "Bing",
      "params": {
        "cc": "gb"
      }
    }
  ]
}
```

cURL: No params sample
```
curl -X POST http://localhost:3000/api/rankings \
  -H 'Content-Type: application/json' \
  -d '{
    "keywords": ["internet archive"],
    "domain": "archive.org",
    "engines": [
      {
       "name": "google"
     }
    ]
  }'
```

cURL: Sample with params
```
curl -X POST http://localhost:3000/api/rankings \
  -H 'Content-Type: application/json' \
-d '{
    "keywords": ["internet archive", "digital library archived internet"],
    "domain": "archive.org",
    "engines": [
      {
        "name": "google",
        "params": {
            "google_domain": "google.co.id",
            "gl": "es"
        }
      }
    ]
  }'
```


## Now
- [X] Google ranking
- [X] Bing ranking
- [ ] DuckDuckGo ranking
- [ ] Better output?

## Later
- [ ] Yahoo ranking (later)