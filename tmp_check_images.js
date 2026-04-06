const http = require('https');

const urls = [
  'https://images.unsplash.com/photo-1581092921461-7dc6779b8fd5?auto=format&fit=crop&q=80&w=1200&h=675',
  'https://images.ctfassets.net/e0821f6q5nel/1ismk2VeoZr0hHcZzP6QPB/c70a8bd53e6413eaaf2aa335feaa2bc7/family-in-kitchen.jpeg'
];

urls.forEach(url => {
  http.get(url, (res) => {
    console.log(`URL: ${url}`);
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', () => {}); // consume data
  }).on('error', (e) => {
    console.error(`URL: ${url}`);
    console.error(`ERROR: ${e.message}`);
  });
});
