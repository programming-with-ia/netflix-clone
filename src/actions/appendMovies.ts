"use server";
import { movies } from "@/data/movies";
// not used currently, use only when need to push movies in db

import prisma from "@/lib/prismadb";
export async function appendMovies() {
  console.log("appending");
  try {
    await prisma.movie.createMany({
      data: movies,
    });
  } catch (e) {
    console.log("Error", e);
  }
}