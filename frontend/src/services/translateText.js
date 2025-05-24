const API_URL = import.meta.env.VITE_API_URL;
export const translateText = async (text, targetLang) => {
  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      })
    });

    const data = await response.json();
    console.log('API Response:', data);
    
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // fallback to original text
  }
};
