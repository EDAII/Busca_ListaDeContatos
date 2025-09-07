import type { Contact } from "@/types/Contact";

type useHashSearchProps = {
  data: Contact[];
  searchTerm: string;
};

export const useHashSearch = ({ data, searchTerm }: useHashSearchProps) => {
  const hashResults = data
  const hashTime = 0;
  const hashComparisons = 0;

  return { hashResults, hashTime, hashComparisons };
};
