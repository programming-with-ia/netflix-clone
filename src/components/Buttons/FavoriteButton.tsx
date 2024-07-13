"use client";

import axios from "axios";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCheck, MdDeleteOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";

import useMediaQuery from "@/hooks/useMediaQuery";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const isMediumScreens = useMediaQuery("(max-width: 1023px)");
  const router = useRouter();
  const [isHover, setHover] = useState(false);

  const { mutate: mutateFavorites } = useFavorites();
  const { user: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    if (response.status === 200) {

      if (!isFavorite) {
        toast.success("Added to Favorites", { id: "favorite" });
      } else {
        toast.error("Remove from Favorites", { id: "favorite", className: 'bg-primary', icon: <MdDeleteOutline className="text-primary" /> });
      }
      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    }
    router.refresh();
  };

  const Icon = isFavorite
    ? isHover
      ? MdDeleteOutline
      : MdOutlineCheck
    : FiPlus;

  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      aria-label={
        isFavorite ? "Remove from Favorites list" : "Add to Favorite list"
      }
      title={isFavorite ? "Remove from Favorites" : "Add to Favorite"}
      role="button"
      className="cursor-pointer group/item w-8 h-8 rounded-full 
      border-2 flex justify-center items-center transition duration border-white 
      bg-transparent hover:bg-white"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
    >
      <Icon
        className="group-hover/item:text-black transition duration"
        size={isMediumScreens ? 20 : 25}
      />
    </div>
  );
};

export default FavoriteButton;
