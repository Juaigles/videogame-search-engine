import { useEffect, useState } from "react";
import { fetchGenres, Genres } from "../../utils/api";

interface FilterProps {
  onFilterChange: (key: string, value: string) => void;
}

export default function PlatformFilters({ onFilterChange }: FilterProps) {
  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    loadGenres();
  }, []);

  return (
    <div>
      <select
        onChange={(e) => onFilterChange("genre", e.target.value)}
        className="rounded-full p-3 text-white text-2xl bg-gray-700 "
      >
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.slug}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
