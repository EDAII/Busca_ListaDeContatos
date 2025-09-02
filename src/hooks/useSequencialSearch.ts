import Papa from "papaparse"

export const useSequencialSearch = async () => {
const response = await fetch("/people-100000.csv");
  const csv = await response.text();

  const data = Papa.parse(csv, { header: true });
  return data;

  // implementar busca sequencial
  // retornar resultado, tempo de busca
};