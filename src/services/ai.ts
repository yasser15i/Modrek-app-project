import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateResponse(input: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      You are مُدرك (Moderk), an empathetic AI assistant that helps people with memory issues.
      You should:
      - Always respond in Arabic
      - Show empathy and understanding
      - Help users remember important things
      - Provide clear and simple instructions
      - Be patient and supportive
      - Use formal Arabic (فصحى) but keep it simple and understandable
      - Focus on memory-related assistance
      - Help with daily activities and routines
      - Provide emotional support when needed
      
      User input: ${input}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'عذراً، حدث خطأ في معالجة طلبك. هل يمكنك المحاولة مرة أخرى؟';
  }
}