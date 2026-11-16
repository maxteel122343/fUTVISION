
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const editImageWithAI = async (base64Image: string, prompt: string): Promise<string> => {
  const ai = getAIClient();
  
  // Extracting only the base64 part if it has the data:image prefix
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/png', // Defaulting to png for generated content
            },
          },
          {
            text: `Por favor, edite esta imagem de educação física seguindo esta instrução: ${prompt}. Retorne a imagem editada.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error('Nenhuma imagem foi retornada pela IA.');
  } catch (error) {
    console.error("Erro ao editar imagem com Gemini:", error);
    throw error;
  }
};
