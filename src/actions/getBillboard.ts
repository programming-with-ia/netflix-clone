//!! not used this file

import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

const getBillboard = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }
    const movieCount = await prisma.movie.count();
    console.log("movie count", movieCount)
    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: Math.floor(Math.random() * movieCount),
    });
    console.log(randomMovie)

    return randomMovie[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getBillboard;
