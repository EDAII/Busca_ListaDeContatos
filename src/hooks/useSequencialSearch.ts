import { useState, useEffect } from "react";
import type { Contact } from "@/types/Contact";

type useSequentialSearchProps = {
  data: Contact[];
  searchTerm: string;
};

export const useSequentialSearch = ({
  data,
  searchTerm,
}: useSequentialSearchProps) => {
  const [sequencialResults, setSequencialResults] = useState<Contact[]>([]);
  const [sequencialTime, setSequencialTime] = useState(0);
  const [sequencialComparisons, setSequencialComparisons] = useState(0);

  useEffect(() => {
    if (!data.length || !searchTerm) {
      setSequencialResults(data);
      setSequencialTime(0);
      setSequencialComparisons(0);
      return;
    }

    let comparisonsCount = 0;
    const start = performance.now();

    const found: Contact[] = [];
    const lowerSearch = searchTerm.toLowerCase();

    for (let i = 0; i < data.length; i++) {
      comparisonsCount++;
      const fullName = `${data[i].firstName} ${data[i].lastName}`.toLowerCase();

      if (fullName.includes(lowerSearch)) {
        found.push(data[i]);
      }
    }

    const end = performance.now();

    setSequencialResults(found);
    setSequencialTime(end - start);
    setSequencialComparisons(comparisonsCount);
  }, [searchTerm, data]);

  return { sequencialResults, sequencialTime, sequencialComparisons };
};