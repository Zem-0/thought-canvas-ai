import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function summarizeText(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Please provide a concise summary of the following text. Focus on the main points and key ideas:
    
    ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw new Error('Failed to summarize text');
  }
}
