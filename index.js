import getRanking from './searchengine.js';
import express from 'express';

const app = express()
const port = 3000

app.use(express.json());

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