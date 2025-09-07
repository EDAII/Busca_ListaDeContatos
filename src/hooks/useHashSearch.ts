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

  const hashFn = (key: string) => {
    return (
      key
        .toLowerCase()
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % data.length
    );
  };

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

    const start = performance.now();
    let comparisonsCount = 0;
    let results: Contact[] = [];

    const index = hashFn(searchTerm);
    const possibleMatches = hashTable[index] || [];

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
