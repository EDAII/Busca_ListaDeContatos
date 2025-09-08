import { useEffect, useMemo, useState } from "react";
import type { Contact } from "@/types/Contact";

type useBinarySearchProps = {
  data: Contact[];
  searchTerm: string;
};

export const useBinarySearch = ({ data, searchTerm }: useBinarySearchProps) => {
  const [binaryResults, setBinaryResults] = useState<Contact[]>([]);
  const [binaryTime, setBinaryTime] = useState(0);
  const [binaryComparisons, setBinaryComparisons] = useState(0);

  // Ordenando os dados apenas quando necessário, memoizando o resultado
  const sortedData = useMemo(() => {
    return [...data].sort((a: Contact, b: Contact) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [data]);

  useEffect(() => {
    // Retorna dados ordenados por ID se não houver busca
    if (!data.length || !searchTerm) {
      setBinaryResults(data);
      setBinaryTime(0);
      setBinaryComparisons(0);
      return;
    }

    const start = performance.now();
    let comparisonsCount = 0;
    const lowerSearch = searchTerm.toLowerCase();

    // Função auxiliar para verificar se um contato contém o termo de busca
    const matchesSearchTerm = (contact: Contact): boolean => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      comparisonsCount++;
      return fullName.includes(lowerSearch);
    };

    // Função de busca binária para encontrar um ponto de correspondência
    const binarySearch = (arr: Contact[]): Contact[] => {
      const found: Contact[] = [];
      let left = 0;
      let right = arr.length - 1;
      let foundIndex = -1;

      // Busca binária para encontrar um elemento correspondente
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midName = `${arr[mid].firstName} ${arr[mid].lastName}`.toLowerCase();
        comparisonsCount++;

        if (midName.includes(lowerSearch)) {
          foundIndex = mid;
          break;
        }

        if (midName < lowerSearch) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      // Se encontrou um elemento, expande para esquerda e direita
      if (foundIndex !== -1) {
        found.push(arr[foundIndex]);

        // Expande à esquerda
        let i = foundIndex - 1;
        while (i >= 0 && matchesSearchTerm(arr[i])) {
          found.push(arr[i]);
          i--;
          comparisonsCount++;
        }

        // Expande à direita
        i = foundIndex + 1;
        while (i < arr.length && matchesSearchTerm(arr[i])) {
          found.push(arr[i]);
          i++;
          comparisonsCount++;
        }
      }

      return found;
    };

    // Executa a busca binária
    const foundResults = binarySearch(sortedData);

    // Ordena os resultados por ID
    const sortedResults = [...foundResults].sort((a: Contact, b: Contact) => a.id - b.id);

    const end = performance.now();

    setBinaryResults(sortedResults);
    setBinaryTime(end - start);
    setBinaryComparisons(comparisonsCount);
  }, [searchTerm, data, sortedData]);

  return { binaryResults, binaryTime, binaryComparisons };
};