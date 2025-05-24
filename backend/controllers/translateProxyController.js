expors.translateProxycontroller = async (req, res) => {
  try {
    const { q, source, target, format } = req.body;

    if (!q || !target) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await fetch(process.env, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, source, target, format }),
    });

    const data = await response.json();
    console.log('Translation API Response:', data);

    if (data.translatedText) {
      res.json({ translatedText: data.translatedText });
    } else {
      res.status(500).json({ error: 'Proxy translation failed', details: data });
    }
  } catch (err) {
    console.error('Backend Error:', err);
    res.status(500).json({ error: 'Proxy translation failed' });
  }
}

