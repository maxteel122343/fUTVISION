
import React, { useState, useRef } from 'react';
import { Exercise, AppStatus } from '../types';
import { editImageWithAI } from '../services/geminiService';

interface EditModalProps {
  exercise: Exercise;
  currentImage: string | null;
  onClose: () => void;
  onSave: (newImageUrl: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ exercise, currentImage, onClose, onSave }) => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [prompt, setPrompt] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setStatus(AppStatus.IDLE);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIEdit = async () => {
    if (!previewUrl || !prompt.trim()) return;

    setStatus(AppStatus.EDITING);
    setError(null);
    
    try {
      const editedImageUrl = await editImageWithAI(previewUrl, prompt);
      setPreviewUrl(editedImageUrl);
      setStatus(AppStatus.SUCCESS);
      setPrompt('');
    } catch (err: any) {
      setError(err.message || 'Falha ao editar imagem com IA.');
      setStatus(AppStatus.ERROR);
    }
  };

  const handleFinalSave = () => {
    if (previewUrl) {
      onSave(previewUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{exercise.name}</h2>
            <p className="text-sm text-gray-500">{exercise.category}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
          
          {/* Preview Area */}
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Visualização
            </h3>
            
            <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden relative group">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium">Nenhuma foto enviada ainda</p>
                  <p className="text-sm">Envie uma foto executando o exercício para começar</p>
                </div>
              )}
              
              {status === AppStatus.EDITING && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold text-blue-600 animate-pulse">Gemini está processando sua foto...</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {previewUrl ? 'Trocar Foto' : 'Enviar Foto do Treino'}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          {/* AI Controls */}
          <div className="flex-1 space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Edição Mágica com IA
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Use o Gemini 2.5 Flash Image para modificar sua foto. Peça por filtros, correções ou ajustes visuais.
              </p>
              
              <div className="space-y-3">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Adicione um filtro retrô, remova objetos do fundo, destaque meus músculos..."
                  className="w-full p-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none h-32 text-sm"
                  disabled={!previewUrl || status === AppStatus.EDITING}
                />
                
                <button 
                  onClick={handleAIEdit}
                  disabled={!previewUrl || !prompt.trim() || status === AppStatus.EDITING}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  {status === AppStatus.EDITING ? (
                    'Processando...'
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95l1.419 13.766 5.35-6.335a1 1 0 011.488 1.34l-9.464 11.2a1 1 0 01-1.477.01l-9.464-11.2a1 1 0 011.488-1.34l5.35 6.335L6.303 1.997a1 1 0 01.897-.95l4.1-0.4z" clipRule="evenodd" />
                      </svg>
                      Aplicar Edição de IA
                    </>
                  )}
                </button>
                
                {error && (
                  <p className="text-red-500 text-xs font-medium text-center">{error}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Sugestões de comandos:</h4>
              <div className="flex flex-wrap gap-2">
                {['Estilo Fitness Pro', 'Mais Brilho', 'Fundo Desfocado', 'Aumentar Contraste'].map((sug) => (
                  <button 
                    key={sug}
                    onClick={() => setPrompt(sug)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-600 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleFinalSave}
            disabled={!previewUrl}
            className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all shadow-md"
          >
            Salvar no Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
