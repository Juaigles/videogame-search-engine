


interface FilterProps {
    onFilterChange: (key: string, value: string) => void;
  }

  
  export default function SortOrder({ onFilterChange }: FilterProps) {
    const options = [
  
    
            { name: "Popularidad", slug: "-popularity" },
            { name: "Fecha de lanzamiento", slug: "-released" },
            { name: "Calificación", slug: "-rating" },
            { name: "Nombre (A-Z)", slug: "name" },
            { name: "Nombre (Z-A)", slug: "-name" },
            { name: "Metacritic", slug: "-metacritic" },
            { name: "Fecha de adición", slug: "-added" },
            { name: "Última actualización", slug: "-updated" },
          
          
      
    ];
  
    return (
      <div>
        <label htmlFor="sortOrder" className="mr-2 text-lg">Ordenar por

        </label>
        <select
          id="sortOrder"
          onChange={(e) => onFilterChange("sortOrder", e.target.value)}
          className="rounded-full p-3 text-white text-2xl bg-gray-700 "
        >
        
          {options.map((option) => (
            <option value={option.slug} key={option.slug}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  