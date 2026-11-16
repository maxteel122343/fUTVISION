
import React, { useState, useEffect } from 'react';
import { EXERCISES } from './constants';
import { CardState, Exercise } from './types';
import ExerciseCard from './components/ExerciseCard';
import EditModal from './components/EditModal';

const App: React.FC = () => {
  const [cardImages, setCardImages] = useState<CardState>({});
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Initialize state from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('fitvision_state');
    if (saved) {
      try {
        setCardImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  const handleSaveImage = (newImageUrl: string) => {
    if (selectedExercise) {
      const newState = {
        ...cardImages,
        [selectedExercise.id]: newImageUrl
      };
      setCardImages(newState);
      localStorage.setItem('fitvision_state', JSON.stringify(newState));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              FitVision AI Studio
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Meu Treino</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Progresso</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Galeria</a>
          </nav>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm">
                <img src="https://picsum.photos/seed/user/100" alt="Avatar" />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Hero Section */}
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Registre sua Jornada Fitness
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Clique em um exercício para enviar sua foto. Use nossa IA avançada para editar e aprimorar suas imagens de treino.
          </p>
        </section>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXERCISES.map((exercise) => (
            <ExerciseCard 
              key={exercise.id}
              exercise={exercise}
              userImage={cardImages[exercise.id] || null}
              onClick={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>

        {/* Empty state prompt */}
        {Object.keys(cardImages).length === 0 && (
          <div className="mt-16 p-12 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
             <p className="text-gray-500 font-medium">Sua galeria está vazia. Comece selecionando um exercício acima!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 FitVision AI Studio. Desenvolvido com Gemini 2.5 Flash Image.
          </p>
        </div>
      </footer>

      {/* Modal Overlay */}
      {selectedExercise && (
        <EditModal 
          exercise={selectedExercise}
          currentImage={cardImages[selectedExercise.id] || null}
          onClose={() => setSelectedExercise(null)}
          onSave={handleSaveImage}
        />
      )}
    </div>
  );
};

export default App;
