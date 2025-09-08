import type { Contact } from "@/types/Contact";
import { useEffect, useMemo, useState } from "react";

type useHashSearchProps = {
  data: Contact[];
  searchTerm: string;
};

export const useHashSearch = ({ data, searchTerm }: useHashSearchProps) => {
  const [hashResults, setHashResults] = useState<Contact[]>([]);
  const [hashTime, setHashTime] = useState(0);
  const [hashComparisons, setHashComparisons] = useState(0);

  // Função hash
  const hashFn = (key: string) => {

    return (key
        .toLowerCase()
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % data.length);
  };

  // Cálculo do hash para cada dado da tabela
  const hashTable = useMemo(() => {
    const table: Record<string, Contact[]> = {};
    data.forEach((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`;
      const index = hashFn(fullName);
      if (!table[index]) table[index] = [];
      table[index].push(contact);
    });
    return table;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!data.length || !searchTerm) {
      setHashResults(data);
      setHashTime(0);
      setHashComparisons(0);
      return;
    }

    let comparisonsCount = 0;
    let results: Contact[] = [];
    const start = performance.now();

    // Hash do input
    const index = hashFn(searchTerm);

    // Busca dos possíveis resultados por meio do hash
    const possibleMatches = hashTable[index] || [];

    // Comparação com a busca dos possíveis resultados
    results = possibleMatches.filter((c) => {
      comparisonsCount++;
      const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    const end = performance.now();

    setHashResults(results);
    setHashTime(end - start);
    setHashComparisons(comparisonsCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, data, hashTable]);

  return { hashResults, hashTime, hashComparisons };
};
