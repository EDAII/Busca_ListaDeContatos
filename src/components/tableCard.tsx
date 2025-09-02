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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { Contact } from "@/types/Contact";

type TableCardProps = {
  title: string;
  description: string;
  data: Contact[];
  timer: string;
};

export const TableCard = ({
  title,
  description,
  data,
  timer,
}: TableCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-100">
          <Table>
            <TableCaption>
              Tempo para encontrar o resultado: {timer}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">id</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">E-mail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((contact) => (
                <TableRow key={contact?.id}>
                  <TableCell className="font-medium">{contact?.id}</TableCell>
                  <TableCell>
                    {contact?.firstName} {contact?.lastName}
                  </TableCell>
                  <TableCell>{contact?.phone}</TableCell>
                  <TableCell className="text-right">{contact?.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
