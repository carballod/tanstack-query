import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
  });

  // en paralelo obtenemos los comentarios
  // const commentsQuery = useQuery({
  //   queryKey: ["issues", issueNumber, "comments"],
  //   queryFn: () => getIssueComments(issueNumber),
  //   staleTime: 1000 * 60,
  // });

  // secuencialmente obtenemos los comentarios
  const commentsQuery = useQuery({
    queryKey: ["issues", issueQuery.data?.number, "comments"],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    staleTime: 1000 * 60,
    // solo se ejecuta la peticion si el issueQuery ya tiene data
    enabled: !!issueQuery.data, // issueQuery.data !== undefined
  });
  // !! Es una forma concisa de decir "¿este valor existe y no es falsy?"

  return {
    issueQuery,
    commentsQuery,
  };
};
