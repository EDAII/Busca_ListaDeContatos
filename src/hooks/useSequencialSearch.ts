import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Contact } from '@/types/Contact';

export const useSequentialSearch = (searchTerm: string) => {
  const [data, setData] = useState<Contact[]>([]);
  const [results, setResults] = useState<Contact[]>([]);
  const [time, setTime] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Função para carregar o arquivo CSV
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch('/people-100000.csv');
        if (!response.ok) {
          throw new Error(`Erro ao carregar CSV: ${response.status}`);
        }

        const csv = await response.text();
        const parsed = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        }).data as any[];

        const contacts: Contact[] = parsed.map((item) => ({
          id: parseInt(item.Index || '0'),
          firstName: item['First Name'] || '',
          lastName: item['Last Name'] || '',
          phone: item.Phone || '',
          email: item.Email || '',
        }));

        setData(contacts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Função para realizar a busca sequencial
  useEffect(() => {
    if (loading || !data.length || !searchTerm) {
      setResults([]);
      setTime(0);
      setComparisons(0);
      return;
    }

    let comparisonsCount = 0;
    const start = performance.now();

    const found: Contact[] = [];
    const lowerSearch = searchTerm.toLowerCase();

    for (let i = 0; i < data.length; i++) {
      comparisonsCount++;
      const fullName = `${data[i].firstName} ${data[i].lastName}`.toLowerCase();
      const phone = data[i].phone.toLowerCase();

      if (fullName.includes(lowerSearch) || phone.includes(lowerSearch)) {
        found.push(data[i]);
      }
    }

    const end = performance.now();

    setResults(found);
    setTime(end - start);
    setComparisons(comparisonsCount);
  }, [searchTerm, data, loading]);

  return { results, time, comparisons, loading, error };
};
