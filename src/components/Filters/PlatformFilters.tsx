import { useEffect, useState } from "react";
import { fetchPlatforms, Platform } from "../../utils/api";

interface FilterProps {
  onFilterChange: (key: string, value: string) => void;
}

export default function PlatformFilters({ onFilterChange }: FilterProps) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const loadPlatforms = async () => {
      const platformsData = await fetchPlatforms();
      setPlatforms(platformsData);
    };
    loadPlatforms();
  }, []);

  return (
    <div>
      <select
        onChange={(e) => onFilterChange("platform", e.target.value)}
        className="rounded-full p-3 text-white text-2xl bg-gray-700 "
      >
        <option value="">Todas las plataformas</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
    </div>
  );
}
