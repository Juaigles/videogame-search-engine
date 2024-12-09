"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFromRAWG} from '../../../utils/api';

interface Genre {
  name: string;
}

interface Platform {
  platform: {
    name: string;
  };
}
interface Screenshot{
  image: string;
}
interface Game {
  id: string;
  name: string;
  slug: string;
  short_screenshots: Screenshot[];

  released: string;
  dominant_color: string;

  playtime: number;
  ratings : [];
  stores: [];
  tags: [];
  updated: Date;
  background_image: string | null;
  description_raw: string | null;
  rating: number;
  metacritic: number | null;
  genres: Genre[]; 
  platforms: Platform[]; 
}

export default function Page() {
  const { slug } = useParams();
  const [game, setGame] = useState<Game |null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data: Game = await fetchFromRAWG(`games/${slug}`, {});
        setGame(data);
        console.log(data)
      } catch (error) {
        console.error("Error al obtener los detalles del juego:", error);
      }
    };

    if (slug) {
      fetchGameDetails();
    }
  }, [slug]);

  if (!game) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Cargando detalles del juego...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 grid gap-8">
      <h1 className="text-4xl font-bold mt-4 text-center">{game.name}</h1>
      {game.background_image ? (
        <div className=" flex items-center justify-center">

        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover mb-4 rounded"
          />
          </div>
      ) : (
        <div className="w-full h-96 flex items-center justify-center bg-gray-200">
          <p className="text-lg">No hay imagen disponible</p>
        </div>
      )}
      <p className="text-lg">{game.description_raw || "Descripción no disponible"}</p>
      <div>
     {game.short_screenshots?.map((bg)=>{
      return(<img src={bg.image}></img>)
     })}
      </div>
      <div className="mt-4">
        <p>Calificación: {game.rating || "N/A"}</p>
        <p>Metacritic: {game.metacritic || "N/A"}</p>
        <p>Géneros: {game.genres?.map((genre) => genre.name).join(", ") || "N/A"}</p>
        <p>Plataformas: {game.platforms?.map((p) => p.platform.name).join(", ") || "N/A"}</p>
      </div>
    </div>
  );
}
