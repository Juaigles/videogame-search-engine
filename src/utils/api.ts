import axios from "axios";

const URL = process.env.BASE_RAWG_URL;
const API_KEY = process.env.RAWG_API_KEY;

export interface Game {
  id: string;
  name: string;
  slug: string;
  background_image: string;
  short_screenshots: []
  rating: number;
  released: string;
  dominant_color: string;
  metacritic: number;
  playtime: number;
  ratings : [];
  stores: [];
  tags: [];
  updated: Date;

}

export interface Platform {
  id: string; // Cambiar a `number` si la API devuelve un número
  name: string;
  slug: string;
}


export interface Genres {

    "id": string,
    "name": string,
    "slug": string,
    "games_count": number,
    "image_background": string,
  }

export const fetchFromRAWG = async <T>(
  endpoint: string,
  params: Record<string, string | number>
): Promise<T> => {
  try {
    const response = await axios.get(`${URL}/${endpoint}`, {
      params: {
        key: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw new Error("Error al obtener los datos de la API");
  }
};

export const fetchPlatforms = async (): Promise<Platform[]> => {
  try {
    const data = await fetchFromRAWG<{ results: Platform[] }>("platforms", {});
    return data.results;
  } catch (error) {
    console.error("Error al obtener plataformas:", error);
    return [];
  }
};

export const fetchGenres = async (): Promise<Genres[]> => {
    try {
      const data = await fetchFromRAWG<{ results: Genres[] }>("genres", {});
      return data.results;
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
      return [];
    }
  };
  