
import { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'squat',
    name: 'Agachamento',
    category: 'Membros Inferiores',
    description: 'Mantenha as costas retas e desça como se fosse sentar em uma cadeira.',
    placeholderUrl: 'https://picsum.photos/seed/squat/400/600'
  },
  {
    id: 'plank',
    name: 'Prancha Abdominal',
    category: 'Core',
    description: 'Mantenha o corpo alinhado e contraia o abdômen.',
    placeholderUrl: 'https://picsum.photos/seed/plank/400/600'
  },
  {
    id: 'pushup',
    name: 'Flexão de Braço',
    category: 'Membros Superiores',
    description: 'Desça o peito em direção ao chão mantendo os cotovelos a 45 graus.',
    placeholderUrl: 'https://picsum.photos/seed/pushup/400/600'
  },
  {
    id: 'lunge',
    name: 'Avanço',
    category: 'Membros Inferiores',
    description: 'Dê um passo à frente e desça o joelho de trás em direção ao chão.',
    placeholderUrl: 'https://picsum.photos/seed/lunge/400/600'
  },
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'Cardio',
    description: 'Um movimento explosivo que combina flexão e salto.',
    placeholderUrl: 'https://picsum.photos/seed/burpee/400/600'
  },
  {
    id: 'stretching',
    name: 'Alongamento',
    category: 'Flexibilidade',
    description: 'Relaxe a musculatura e aumente sua amplitude de movimento.',
    placeholderUrl: 'https://picsum.photos/seed/stretch/400/600'
  }
];
