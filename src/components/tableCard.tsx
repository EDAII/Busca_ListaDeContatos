import { usePagination } from "@/hooks/usePagination";
import { TableCardPagination } from "./tableCardPagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Contact } from "@/types/Contact";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type TableCardProps = {
  title: string;
  description: string;
  data: Contact[];
  input: string;
  timer: string;
  comparisonsQuantity: number;
};

export const TableCard = ({
  title,
  description,
  data,
  input,
  timer,
  comparisonsQuantity
}: TableCardProps) => {
  const {
    paginatedData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  } = usePagination(data, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-96 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>E-mail</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.id}</TableCell>
                  <TableCell>
                    {contact.firstName} {contact.lastName}
                  </TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="my-4">
          <TableCardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={setPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>

        <div className="w-96 mt-4 p-2 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold">Input:</span>
              <span className="font-normal">{input}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Operações:</span>
              <span className="font-normal">{comparisonsQuantity}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Tempo:</span>
              <span className="font-normal">{timer}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
