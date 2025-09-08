import { useState, useEffect } from "react";
import Papa from "papaparse";
import type { Data } from "@/types/Data";
import type { Contact } from "@/types/Contact";

export const useLoadData = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.BASE_URL}people-100000.csv`
        );
        if (!response.ok) {
          throw new Error(`Erro ao carregar CSV: ${response.status}`);
        }

        const csv = await response.text();
        const parsed = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        }).data as Data[];

        const contacts: Contact[] = parsed.map((item) => ({
          id: Number(item["Index"]),
          firstName: item["First Name"] || "",
          lastName: item["Last Name"] || "",
          phone: item["Phone"] || "",
          email: item["Email"] || "",
        }));
        setData(contacts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
};
