import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('your api');

export async function getExplanation(topic: string, concept: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Explain ${concept} in ${topic} in a way that's easy to understand. Include:
  1. Simple explanation
  2. Real-world example
  3. Common pitfalls to avoid
  4. Best practices
  Please format the response in Markdown.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
