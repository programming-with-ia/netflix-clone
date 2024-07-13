'use client';

import { useRouter } from 'next/navigation';

import useMediaQuery from '@/hooks/useMediaQuery';

import { FaPlay } from 'react-icons/fa';

interface PlayIconProps {
  movieId: string;
}

const PlayIcon = ({ movieId }: PlayIconProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');
  const router = useRouter();

  return (
    <div
      aria-label='Play'
      title='Play'
      role='button'
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/watch/${movieId}`);
      }}
      className='cursor-pointer group/item w-8 h-8 border-2 rounded-full pl-0.5
      flex justify-center items-center bg-primary hover:bg-white transition 
      duration border-white'
    >
      <FaPlay className='group-hover/item:text-primary transition duration' size={isMediumScreens ? 12 : 15} />
    </div>
  );
};

export default PlayIcon;
