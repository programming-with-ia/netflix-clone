'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Movie } from '@/types';
import MovieCard from '@/app/(site)/components/MovieCard';

interface MovieListProps {
  movies: Movie[];
  title: string;
  count: number;
  rowSize: number;
}

const MovieList = ({ title, movies, count, rowSize }: MovieListProps) => {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [row, setRow] = useState(0);

  useEffect(() => {
    setNumberOfRows(Math.ceil(count / rowSize));
    if (row === numberOfRows) {
      setRow(numberOfRows - 1);
    }
  }, [count, rowSize, numberOfRows, row]);

  const incrementRow = () => {
    setRow((val) => val + 1);
  };

  const decrementRow = () => {
    setRow((val) => val - 1);
  };

  const isDisabledLeft = row === 0;
  const isDisabledRight = row === numberOfRows - 1;

  const displayedMovies = useMemo(() => {
    return movies?.slice(
      row * rowSize,
      Math.min(row * rowSize + rowSize, count),
    );
  }, [count, movies, row, rowSize]);

  if (!movies.length) {
    return null;
  }

  return (
    <div className='mt-4 px-4 sm:px-12' role='list'>
      <p className='text-md md:text-xl lg:text-2xl font-semibold mb-4'>
        {title}
      </p>

      <div className='w-full relative'>
        <div
          role='listbox'
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 
            gap-2 grid-rows-1 h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw]'
        >
          {displayedMovies.map((movie, idx) => (
            <MovieCard key={idx} movie={movie} />
          ))}
        </div>

        {/* Left Arrow */}
        <div
          onClick={!isDisabledLeft ? () => decrementRow() : undefined}
          className='h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] w-12 
          flex justify-center items-center group/item cursor-pointer top-0 z-20
          hover:bg-black/20 transition duration-300 absolute -left-4 sm:-left-12'
        >
          <FaChevronLeft
            size={40}
            className={`opacity-0 group-hover/item:opacity-100 transition duration shadow-lg ${isDisabledLeft && 'text-gray-700'}`}
          />
        </div>

        {/* Right Arrow */}
        <div
          onClick={!isDisabledRight ? () => incrementRow() : undefined}
          className='h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] w-12  
          flex justify-center items-center group/item cursor-pointer top-0 z-20
          hover:bg-black/20 transition duration-300 absolute -right-4 sm:-right-12'
        >
          <FaChevronRight
            size={40}
            className={`opacity-0 group-hover/item:opacity-100
            transition duration shadow-lg ${isDisabledRight && 'text-gray-700'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
