# About
Rank tracker API. Track your website ranking accross different search engines. 

## Tech
- NodeJS (Express)
- [SerpApi](https://serpapi.com/) - to check the SERP ranking

## Supported Search engines
- Google (max check: 100th position)
- Bing (max check: 50th position)
- DuckDuckGo

Ranking 0 means the domain is not found in the SERP.

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

Sample with params
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


## Now
- [X] Google ranking
- [ ] Bing ranking
- [ ] DuckDuckGo ranking
- [ ] Better output?

## Later
- [ ] Yahoo ranking (later)