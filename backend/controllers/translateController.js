const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: "Text and targetLang required" });
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${targetLang}`;

    const response = await fetch(url);
    const data = await response.json();

    const translated = data?.responseData?.translatedText || text;

    res.json({ translated });
  } catch (err) {
    console.log("Translate Error:", err);
    res.status(500).json({ error: "Translation failed" });
  }
};
