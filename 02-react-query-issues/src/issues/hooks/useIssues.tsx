import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }], // se manda como objeto para mandar diferentes keys donde el orden no importa, si el orden importara se mandaria de manera posicional
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    setPage(1); // Reset page to 1 when state change
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage(page + 1);
    issuesQuery.refetch();
  };

  const prevPage = () => {
    if (page === 1) return;

    setPage((prePage) => prePage - 1);
  };

  return {
    issuesQuery,

    // Getters
    page,

    // Actions
    nextPage,
    prevPage,
  };
};
