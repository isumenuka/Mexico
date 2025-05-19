import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBoY5bDBg5lM9TGXxYR3N64lR1CYUbkIIw');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function translateContent(text: string): Promise<string> {
  try {
    const prompt = `Translate the following Spanish text to English, maintaining the original tone and context: "${text}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function enhanceDescription(text: string): Promise<string> {
  try {
    const prompt = `Enhance and expand this news description while maintaining factual accuracy: "${text}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Enhancement error:', error);
    return text;
  }
}

export async function generateFacebookPost(title: string, description: string, url: string): Promise<string> {
  try {
    const prompt = `Crea una publicación de Facebook atractiva y emocionante para esta noticia. Hazla viral y llamativa, pero mantén la precisión. Usa emojis apropiadamente. Escribe en español mexicano coloquial pero profesional.

Título: ${title}
Descripción: ${description}

Requisitos:
- Usa español mexicano coloquial
- Incluye emojis relevantes
- Mantén un tono emocionante pero profesional
- Termina con "Link👉 ${url}"
- Usa saltos de línea para mejor legibilidad
- Mantén el post conciso pero impactante`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    
    // Ensure the link is always added at the end if not present
    if (!generatedText.includes(url)) {
      return `${generatedText}\n\nLink👉 ${url}`;
    }
    
    return generatedText;
  } catch (error) {
    console.error('Facebook post generation error:', error);
    return `${title}\n\n${description}\n\nLink👉 ${url}`;
  }
}