'use client';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';

import PlayButton from '@/components/Buttons/PlayButton';
import MoreInfoButton from '@/components/MoreInfoButton';

interface BillboardProps {
  movie: Movie;
}

const Billboard = ({ movie }: BillboardProps) => {
  const { onOpen } = useInfoModal();
  if (!movie) 
    return <div>movie not found</div>
    // throw new Error("movie is undefined")
  return (
    <div className='group relative h-[42.86vw] min-h-[45vh] max-h-[80vh]'>
      <video
        className='w-full h-full object-cover brightness-75'
        autoPlay
        muted
        loop
        poster={movie.thumbnailUrl}
        src={movie.videoUrl}
      />

      {/* Inner Shadow for Video */}
      <div className='absolute w-full h-full top-0 left-0 shadow-inner-upper bg-black/10 md:bg-transparent opacity-80' />
      <div className='absolute w-full h-full top-0 left-0 shadow-inner-lower bg-black/10 md:bg-transparent opacity-80' />

      {/* Mobile to Medium Screens */}
      <div
        className='absolute flex flex-col gap-y-2 md:gap-y-4 lg:hidden bottom-[5%] 
        left-0 w-full items-center text-center'
      >
        <p className='text-3xl md:text-5xl font-bold'>
          {movie.title}
        </p>
        <div className='flex flex-row gap-x-2'>
          <PlayButton movieId={movie.id} />
          <MoreInfoButton movieId={movie.id} onOpen={onOpen} />
        </div>
        <div className='flex text-center max-w-[90%] md:max-w-[60%]'>
          <p className='text-sm md:text-lg line-clamp-2 md:line-clamp-3'>
            {movie.description}
          </p>
        </div>
      </div>

      {/* Large and Screens */}
      <div className='absolute hidden lg:inline bottom-[15%] ml-16'>
        <p
          className='h-full w-[50%] lg:text-5xl xl:text-6xl 
          font-bold drop-shadow-xl transition duration-500'
        >
          {movie.title}
        </p>
        <p className='text-base xl:text-lg mt-4 w-[50%] line-clamp-4'>
          {movie.description}
        </p>
        <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
          <PlayButton movieId={movie.id} />
          <MoreInfoButton movieId={movie.id} onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
};

export default Billboard;
