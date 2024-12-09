"use client";

import { useEffect, useState } from "react";
import { fetchFromRAWG, Game } from "../utils/api";
import Filters from "../components/Filters/Filters";
import PlatformFilters from "../components/Filters/PlatformFilters";
import SortOrder from "@/components/Filters/SortOrder";
import { useRouter } from "next/navigation";


export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]); 
  const [query, setQuery] = useState<string>(""); 
  const [sortOrder, setSortOrder] = useState<string>("-popularity"); 
  const [filters, setFilters] = useState<{
    genre?: string;
    platform?: string;
    [key: string]: string | undefined;
  }>({}); 
  const [page, setPage] = useState<number>(1);

  const [pagination, setPagination] = useState<{
    next: string | null;
    previous: string | null;
  }>({ next: null, previous: null }); 

  const router = useRouter();

const handleClick = (slug: string) => {
  router.push(`/games/${slug}`);
};


  const fetchGames = async () => {
    const params: {
      page: number;
      search: string;
      page_size: number;
      genres?: string;
      platforms?: string;
      ordering?: string;
    } = {
      search: query,
      page_size: 12,
      page,
      
    };
  if (!query){


    
    if (filters.genre) {
      params.genres = filters.genre;
    }
    
    if (filters.platform) {
      params.platforms = filters.platform;
    }
  }
  if (sortOrder) {
    params.ordering = sortOrder; 
  }
  
    console.log("Parámetros enviados a la API:", params);
  
    const data = await fetchFromRAWG<{
      results: Game[];
      next: string | null;
      previous: string | null;
    }>("games", params);
  
    setGames(data.results);
    setPagination({ next: data.next, previous: data.previous });
  };
  

  useEffect(() => {
    fetchGames();
    console.log("Juegos obtenidos:", games); 
  }, [query, filters, sortOrder]); 

  
  // Paginación
  const fetchNextPage = async () => {
    if (pagination.next) {
      const response = await fetch(pagination.next);
      const data = await response.json();

      setGames(data.results);
      setPagination({ next: data.next, previous: data.previous });
      setPage(page + 1);
    }
  };

  const fetchPreviousPage = async () => {
    if (pagination.previous) {
      const response = await fetch(pagination.previous);
      const data = await response.json();

      setGames(data.results);
      setPagination({ next: data.next, previous: data.previous });
      setPage(page - 1);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value || undefined };
      return newFilters;
    });
  };
  

  return (
    <div className="container mx-auto p-4 grid ">
      <h1 className="text-3xl font-bold mb-4">Motor de Búsqueda de Juegos</h1>

      {/* Barra de búsqueda */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar juegos..."
          className="border rounded p-2 h-16 w-full text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
     
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mt-5">
        <Filters onFilterChange={handleFilterChange} />
        <PlatformFilters onFilterChange={handleFilterChange} />
        <SortOrder onFilterChange={(key, value) => {
  if (key === "sortOrder") {
    setSortOrder(value);
  } else {
    handleFilterChange(key, value);
  }
}} />

      </div>

      {/* Lista de juegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {games.length > 0 ? (
          games.map((game) => (
            <div
              key={game.id}
              className={"bg-gray-600 rounded-tl-lg rounded-tr-lg flex flex-col gap-1 cursor-pointer hover:bg-gray-700 hover:shadow-[0_0_15px_5px_rgba(255,255,255,1)] hover:scale-105 transition-all duration-300 ease-in-out"}
              onClick={()=>handleClick(game.slug)}
            >
              {
                game.background_image ?
                <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover rounded"

                /> :<div className="flex items-center justify-center h-full">
                  <p className="text-3xl ">No existe foto</p>
                </div> 
                  
              }
              <div className="p-4">

              <h2 className="text-xl font-bold mt-2">{game.name}</h2>
              <div className="flex gap-4">
              <p>Calificación usuarios: {game.rating}/5</p>
              <p className="">Metacritic: <span className={game.metacritic>80?"bg-green-500 text-black text-lg p-1":game.metacritic>50?"bg-yellow-500 text-black text-lg p-1":"bg-red-600  text-black text-lg  p-1"}>{game.metacritic?game.metacritic: "?"}</span></p>

              </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl">No se encontraron resultados.</p>
        )}
      </div>

      {/* Paginación */}
      {games.length > 0 && (
        <div className="text-2xl flex justify-center items-center gap-5 my-4">
          {pagination.previous && (
            <button
              onClick={fetchPreviousPage}
              className="px-4 py-2 rounded"
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            </button>
          )}
          <p>Página: {page}</p>
          {pagination.next && (
            <button
              onClick={fetchNextPage}
              className="px-4 py-2 rounded"
              
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
