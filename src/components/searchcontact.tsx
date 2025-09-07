import { Input } from "./ui/input";
import { TableCard } from "./tableCard";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Contact } from "@/types/Contact";
import { useSequentialSearch } from "@/hooks/useSequencialSearch";
import { useHashSearch } from "@/hooks/useHashSearch";
import { useBinarySearch } from "@/hooks/useBinarySearch";
import { InfoModal } from "./infoModal";
import { Button } from "./ui/button";

type searchContactProps = {
  data: Contact[];
  loading: boolean;
  error: string | null;
};

export const SearchContact = ({ data, loading, error }: searchContactProps) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const { sequencialResults, sequencialTime, sequencialComparisons } =
    useSequentialSearch({ data, searchTerm });
  const { hashResults, hashTime, hashComparisons } = useHashSearch({
    data,
    searchTerm,
  });
  const { binaryResults, binaryTime, binaryComparisons } = useBinarySearch({
    data,
    searchTerm,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue);
    }
  };

  const getFeedback = () => {
    if (!searchTerm) {
      return {
        bestMethod: "Nenhum",
        feedbackText: "Nenhuma busca foi realizada. Insira um termo de busca e pressione Enter para gerar o feedback.",
      };
    }

    const methods = [
      {
        name: "Busca Sequencial",
        time: sequencialTime,
        comparisons: sequencialComparisons,
        description:
          "A busca sequencial percorre cada elemento da lista, sendo simples, mas ineficiente para grandes conjuntos de dados (O(n)).",
      },
      {
        name: "Busca Binária",
        time: binaryTime,
        comparisons: binaryComparisons,
        description:
          "A busca binária é eficiente (O(log n)) para dados ordenados, mas requer ordenação prévia, que pode ser custosa.",
      },
      {
        name: "Hashing",
        time: hashTime,
        comparisons: hashComparisons,
        description:
          "A busca por hashing é muito rápida (O(1) média) quando o termo de busca é exato, mas menos flexível para buscas parciais.",
      },
    ];

    const bestMethod = methods.reduce((best, current) => {
      if (current.time === 0 && best.time === 0) return best;
      if (best.time === 0) return current;
      if (current.time === 0) return best;
      if (current.time < best.time) return current;
      if (current.time === best.time && current.comparisons < best.comparisons) return current;
      return best;
    }, methods[0]);

    return {
      bestMethod: bestMethod.name,
      feedbackText: `O método mais eficiente foi **${bestMethod.name}** com tempo de **${bestMethod.time.toFixed(2)} ms** e **${bestMethod.comparisons} comparações**. ${bestMethod.description}`,
    };
  };

  const feedback = getFeedback();

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      {loading ? (
        <>
          <Skeleton className="h-12 w-1/3 rounded-md" />
          <Skeleton className="h-10 w-1/5 rounded-md" />
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
          <div className="w-1/5 flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Pesquisar pelo nome ou telefone"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-lg py-2"
            />
             <Button
            variant="outline"
            onClick={() => setIsFeedbackModalOpen(true)}
            className="mt-2"
            disabled={!searchTerm} 
          >
            Gerar Feedback
          </Button>
          </div>
          {error ? (
            <p className="text-red-500">Erro: {error}</p>
          ) : (
            <div className="flex wrap space-x-4">
              <div className="w-1/3">
                <TableCard
                  title="Busca sequencial"
                  description="Eficiência O(n)"
                  contentModal="A busca sequencial percorre cada elemento da lista de contatos, comparando o termo de busca com o nome completo (nome e sobrenome) de cada contato. É simples, mas pode ser lenta para grandes conjuntos de dados, pois verifica cada elemento até encontrar correspondências ou chegar ao final da lista."
                  data={sequencialResults}
                  input={searchTerm}
                  timer={`${sequencialTime.toFixed(2)} ms`}
                  comparisonsQuantity={sequencialComparisons}
                />
              </div>
              <div className="w-1/3">
                <TableCard
                  title="Busca Binária"
                  contentModal="A busca binária requer que os dados estejam ordenados, o que é feito previamente com base no nome completo. Ela divide o conjunto de dados ao meio em cada iteração, reduzindo o número de comparações necessárias, com eficiência O(log n). No entanto, a ordenação inicial pode ser custosa para grandes conjuntos de dados."
                  description="Eficiência O(log n)"
                  data={binaryResults}
                  input={searchTerm}
                  timer={`${binaryTime.toFixed(2)} ms`}
                  comparisonsQuantity={binaryComparisons}
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
          <InfoModal
            title="Feedback da Busca"
            contentModal={feedback.feedbackText}
            open={isFeedbackModalOpen}
            onOpenChange={setIsFeedbackModalOpen}
          />
        </>
      )}
    </div>
  );
};