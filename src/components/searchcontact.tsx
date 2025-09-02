import type { Contact } from "@/types/Contact";
import { Input } from "./ui/input";
import { TableCard } from "./tableCard";

export const SearchContact = () => {
  const data = [
    {
      id: 1,
      firstName: "Renanzin",
      lastName: "do Rodo",
      phone: "4002-8922",
      email: "renanzingatin123@gmail.com",
    }, // Inserir dados do CSV
  ] as Contact[];

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      <h1 className="scroll-m-20 text-center text-5xl font-bold tracking-tight text-balance mt-0">
        Buscador de Contatos
      </h1>
      <div>
        <Input type="text" placeholder="Pesquisar pelo nome" />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <TableCard
            title={"Busca sequencial"}
            description={"Eficiência O(1)"}
            data={data}
            timer={"00:01"}
          />
        </div>
        <div className="w-1/3">
          <TableCard
            title={"Busca Binária"}
            description={"Eficiência O(log n)"}
            data={data}
            timer={"00:03"}
          />
        </div>
        <div className="w-1/3">
          <TableCard
            title={"Hashing"}
            description={"Eficiência O(1) média"}
            data={data}
            timer={"00:01"}
          />
        </div>
      </div>
    </div>
  );
};
