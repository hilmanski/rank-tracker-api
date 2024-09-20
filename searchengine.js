// exported in terminal
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;

if(!SERPAPI_API_KEY) {
  console.error('SERPAPI_API_KEY is required.');
  process.exit(1);
}

const suportEngines = ['google', 'bing'];

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

function searchBing(keyword, params, domain) {
  let endpoint = `https://serpapi.com/search?q=${keyword}&engine=bing&count=50&api_key=${SERPAPI_API_KEY}`
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
  const engineName = engine.name.toLowerCase();

  if(!suportEngines.includes(engineName)) {
      console.error(`Error: Engine ${engineName} is not supported.`);
      return;
  }

  return new Promise(async (resolve, reject) => {
      switch(engineName) {
          case 'google':
            resolve(await searchGoogle(keyword, engine.params, domain))
          break;
          case 'bing':
            resolve(await searchBing(keyword, engine.params, domain))
          break;
          default:
          break;
      }
  })
}

export default getRanking;