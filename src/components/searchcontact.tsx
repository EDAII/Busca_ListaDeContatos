import type { Contact } from '@/types/Contact';
import { Input } from './ui/input';
import { TableCard } from './tableCard';
import { useSequentialSearch } from '@/hooks/useSequencialSearch';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const SearchContact = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { results: filteredSequencial, time: timeSequencial, loading, error } = useSequentialSearch(searchTerm);

  const placeholderData = [
    {
      id: 1,
      firstName: 'Renanzin',
      lastName: 'do Rodo',
      phone: '4002-8922',
      email: 'renanzingatin123@gmail.com',
    },
  ] as Contact[];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      {loading ? (
        <>
          <Skeleton className="h-12 w-1/3 rounded-md" /> {/* Skeleton para o título */}
          <Skeleton className="h-10 w-1/5 rounded-md" /> {/* Skeleton para o input */}
          <div className="flex space-x-4">
            <Skeleton className="h-64 w-1/3 rounded-md" /> {/* Skeleton para o TableCard da busca sequencial */}
            <Skeleton className="h-64 w-1/3 rounded-md" /> {/* Skeleton para o TableCard da busca binária */}
            <Skeleton className="h-64 w-1/3 rounded-md" /> {/* Skeleton para o TableCard de hashing */}
          </div>
        </>
      ) : (
        <>
          <h1 className="scroll-m-20 text-center text-5xl font-bold tracking-tight text-balance mt-0">
            Buscador de Contatos
          </h1>
          <div className="w-1/5">
            <Input
              type="text"
              placeholder="Pesquisar pelo nome ou telefone"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-lg py-2"
            />
          </div>
          {error && <p className="text-red-500">Erro: {error}</p>}
          {!error && (
            <div className="flex space-x-4">
              <div className="w-1/3">
                <TableCard
                  title="Busca sequencial"
                  description="Eficiência O(n)"
                  data={filteredSequencial.length > 0 ? filteredSequencial : []}
                  timer={`${timeSequencial.toFixed(2)} ms`}
                />
              </div>
              <div className="w-1/3">
                <TableCard
                  title="Busca Binária"
                  description="Eficiência O(log n)"
                  data={placeholderData}
                  timer="00:03"
                />
              </div>
              <div className="w-1/3">
                <TableCard
                  title="Hashing"
                  description="Eficiência O(1) média"
                  data={placeholderData}
                  timer="00:01"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};