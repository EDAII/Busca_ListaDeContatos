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
    // Dados retornandos ordenados por ID, sem a busca ser realizada
    if (!data.length || !searchTerm) {
      const sortedById = [...data].sort((a: Contact, b: Contact) => a.id - b.id);
      setBinaryResults(sortedById);
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

    // Função de busca binária simplificada
    const binarySearch = (arr: Contact[]): Contact[] => {
      const found: Contact[] = [];
      let left = 0;
      let right = arr.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midName = `${arr[mid].firstName} ${arr[mid].lastName}`.toLowerCase();
        comparisonsCount++;

        if (matchesSearchTerm(arr[mid])) {
          // Adiciona o elemento encontrado
          found.push(arr[mid]);

          // Verifica elementos à esquerda
          for (let i = mid - 1; i >= 0 && matchesSearchTerm(arr[i]); i--) {
            found.push(arr[i]);
          }

          // Verifica elementos à direita
          for (let i = mid + 1; i < arr.length && matchesSearchTerm(arr[i]); i++) {
            found.push(arr[i]);
          }

          break; // Sai após encontrar o primeiro match
        }

        if (midName < lowerSearch) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      return found;
    };

    // Executa a busca binária
    const foundResults = binarySearch(sortedData);

    // Ordena os resultados por ID em uma instrução separada
    const sortedResults = [...foundResults].sort((a: Contact, b: Contact) => a.id - b.id);

    const end = performance.now();

    setBinaryResults(sortedResults);
    setBinaryTime(end - start);
    setBinaryComparisons(comparisonsCount);
  }, [searchTerm, data, sortedData]);

  return { binaryResults, binaryTime, binaryComparisons };
};