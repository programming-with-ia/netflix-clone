/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Movie } from "@/types";
import useInfoModal from "@/hooks/useInfoModal";

import FavoriteButton from "@/components/Buttons/FavoriteButton";
import PlayIcon from "@/components/IconButtons/PlayIcon";
import MoreIcon from "@/components/IconButtons/MoreIcon";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { onOpen } = useInfoModal();

  const animate = isHovered ? "open" : "closed";

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "100%" },
  };

  const transition = {
    duration: 0.25,
    delay: 0.1,
  };

  return (
    <div
      role="listitem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onAnimationEnd={()=>console.log("Animation End")}
      onAnimationEndCapture={()=>console.log("Animation Capture End")}
      onClick={() => onOpen(movie.id)}
      className="group rounded-md overflow-hidden relative h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] sm:hover:scale-[115%] sm:hover:translate-x-6 transition duration-300 cursor-pointer hover:z-20 before:absolute before:bg-gradient-to-t before:from-black/80 before:to-transparent before:inset-0 before:transition-opacity before:opacity-0 hover:before:opacity-100 before:duration-300"
    >
      <img
        role="banner"
        className="object-cover transition duration shadow-xl w-full h-full"
        src={movie.thumbnailUrl}
        alt="Thumbnail"
        sizes="100vw"
      />

      {/* Hover Div */}
      <div
        className="hidden sm:flex flex-col justify-end px-2 pb-2 h-full w-full absolute top-0 left-0"
      >
        <motion.div
          initial="closed"
          animate={animate}
          variants={variants}
          transition={transition}
          className="flex flex-row items-center justify-start gap-x-2 lg:gap-3"
        >
          <PlayIcon movieId={movie.id} />
          <FavoriteButton movieId={movie.id} />
          <MoreIcon movieId={movie.id} onOpen={onOpen} />
        </motion.div>
        <motion.p
          initial="closed"
          animate={animate}
          variants={variants}
          transition={transition}
          className="text-lg font-bold truncate"
        >
          {movie.title}
        </motion.p>
        <motion.p
          initial="closed"
          animate={animate}
          variants={variants}
          transition={transition}
          className="text-xs font-semibold truncate"
        >
          {movie.genre}
        </motion.p>
      </div>
    </div>
  );
};

export default MovieCard;
