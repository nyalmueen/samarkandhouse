const https = require('https');

const ICAL_URL = 'https://calendar.google.com/calendar/ical/056012e08ca097c4007e4abd668fd35359e78251eb7bd830294b06d8c00bb09e%40group.calendar.google.com/private-fe1cc9b9b2f23062f21d38117b969d76/basic.ics';

exports.handler = async function() {
  return new Promise((resolve) => {
    https.get(ICAL_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'text/calendar',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=300'
          },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });
  });
};
