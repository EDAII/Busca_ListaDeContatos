import type { Contact } from "@/types/Contact";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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
      <div>
        <Input type="text" placeholder="Pesquisar pelo nome" />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Busca Sequencial</CardTitle>
              <CardDescription>Eficiência O(n)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
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
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {contact.firstName}
                      </TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell className="text-right">
                        {contact.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Busca Binária</CardTitle>
              <CardDescription>Eficiência O(log n)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
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
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {contact.firstName}
                      </TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell className="text-right">
                        {contact.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Hashing</CardTitle>
              <CardDescription>Eficiência O(1) média</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Tempo para encontrar o resultado:</TableCaption>
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
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {contact.firstName}
                      </TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell className="text-right">
                        {contact.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
