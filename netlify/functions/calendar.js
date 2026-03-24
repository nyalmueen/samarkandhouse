const ICAL_URL = 'https://calendar.google.com/calendar/ical/056012e08ca097c4007e4abd668fd35359e78251eb7bd830294b06d8c00bb09e%40group.calendar.google.com/private-fe1cc9b9b2f23062f21d38117b969d76/basic.ics';

exports.handler = async function(event, context) {
  try {
    const response = await fetch(ICAL_URL);
    if (!response.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to fetch calendar' }) };
    }
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/calendar',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body: text
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
```

Commit that. Then:

**File 2** → **Add file → Create new file** → filename:

`netlify.toml`

Paste this:
```
[build]
  functions = "netlify/functions"
