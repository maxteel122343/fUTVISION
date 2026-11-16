
import React from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  userImage: string | null;
  onClick: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, userImage, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col h-[400px]"
    >
      <div className="relative h-2/3 w-full overflow-hidden bg-gray-200">
        <img 
          src={userImage || exercise.placeholderUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!userImage && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-white font-medium">Adicionar Foto</span>
          </div>
        )}
        {userImage && (
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
            {exercise.category}
          </span>
          <h3 className="text-xl font-bold text-gray-800 leading-tight mb-2">
            {exercise.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {exercise.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
