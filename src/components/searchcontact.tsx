import { Input } from "./ui/input";
import { TableCard } from "./tableCard";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Contact } from "@/types/Contact";
import { useSequentialSearch } from "@/hooks/useSequencialSearch";
import { useHashSearch } from "@/hooks/useHashSearch";

type searchContactProps = {
  data: Contact[];
  loading: boolean;
  error: string | null;
};

export const SearchContact = ({ data, loading, error }: searchContactProps) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { sequencialResults, sequencialTime, sequencialComparisons } =
    useSequentialSearch({ data, searchTerm });
  const { hashResults, hashTime, hashComparisons } = useHashSearch({
    data,
    searchTerm,
  });

  console.log(hashResults, hashTime, hashComparisons);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      {loading ? (
        <>
          <Skeleton className="h-12 w-1/3 rounded-md" />{" "}
          <Skeleton className="h-10 w-1/5 rounded-md" />{" "}
          <div className="flex gap-4">
            <Skeleton className="h-96 w-120 rounded-md flex-shrink-0" />
            <Skeleton className="h-96 w-120 rounded-md flex-shrink-0" />
            <Skeleton className="h-96 w-120 rounded-md flex-shrink-0" />
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
          {error ? (
            <p className="text-red-500">Erro: {error}</p>
          ) : (
            <div className="flex wrap space-x-4">
              <div className="w-1/3">
                <TableCard
                  title="Busca sequencial"
                  description="Eficiência O(n)"
                  contentModal=""
                  data={sequencialResults}
                  input={searchTerm}
                  timer={`${sequencialTime.toFixed(2)} ms`}
                  comparisonsQuantity={sequencialComparisons}
                />
              </div>
              <div className="w-1/3">
                <TableCard
                  title="Busca Binária"
                  contentModal=""
                  description="Eficiência O(log n)"
                  data={[]}
                  input={searchTerm}
                  timer={`${1} ms`}
                  comparisonsQuantity={0}
                />
              </div>
              <div className="w-1/3">
                <TableCard
                  title="Hashing"
                  contentModal="A busca por hashing funciona a partir de um cálculo realizado sobre o valor inserido. Neste caso, utilizamos o nome e o sobrenome como referência. Por isso, ao digitar um nome incorreto ou incompleto, a busca não é capaz de retornar resultados. Por outro lado, o hashing permite localizar os dados de forma muito rápida e com poucas operações, quando comparado à busca sequencial, além de não exigir a ordenação prévia dos elementos, como ocorre na busca binária."
                  description="Eficiência O(1) média"
                  data={hashResults}
                  input={searchTerm}
                  timer={`${hashTime.toFixed(2)} ms`}
                  comparisonsQuantity={hashComparisons}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
