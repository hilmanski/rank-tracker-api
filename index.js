const express = require('express')
const app = express()
const port = 3000

// exported in terminal
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;

if(!SERPAPI_API_KEY) {
  console.error('SERPAPI_API_KEY is required.');
  process.exit(1);
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function searchGoogle(keyword, params, domain) {
  let endpoint = `https://serpapi.com/search?q=${keyword}&engine=google&num=100&api_key=${SERPAPI_API_KEY}`
  if(params) {
    endpoint += `&${new URLSearchParams(params).toString()}`
  }

  return fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const organic_results = data.organic_results;
      let ranking = organic_results.findIndex(result => result.link.includes(domain))
      return ranking + 1;
    })
    .catch(error => {
      console.error(error);
    });
}

async function getRanking(keyword, engine, domain) {
  return new Promise(async (resolve, reject) => {
    console.log(`Checking ranking for ${keyword} on ${engine.name}`);
    switch(engine.name) {
        case 'google':
          const ranking = await searchGoogle(keyword, engine.params, domain);
          resolve(ranking);
          break;
        default:
          break;
    }
  })
}

app.post('/api/rankings', async(req, res) => {
  const { keywords, engines, domain } = req.body;

  // Validate keywords
  if (!Array.isArray(keywords) || !keywords.length) {
    return res.status(400).json({ error: 'Keywords and engines must be arrays.' });
  }

  // Validate engines
  for (const engine of engines) {
    if (typeof engine !== 'object' || !engine.name) {
      return res.status(400).json({ error: 'Each engine must be an object with a "name" property.' });
    }
    if (engine.params && typeof engine.params !== 'object') {
      return res.status(400).json({ error: 'Engine "params" must be an object.' });
    }
  }

  // CLean up domain
  // Since people can include https:// or http:// or a subdomain, strip all of it?
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Parallel search
  const results = await Promise.all(engines.map(async engine => {
    const rankings = await Promise.all(keywords.map(async keyword => {
      return await getRanking(keyword, engine, cleanDomain);
    }));

    return { domain, engine, keywords, rankings };
  }))

  console.log(results);

  res.json({ keywords, engines });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})