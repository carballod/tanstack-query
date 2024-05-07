import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 717031390,
        node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
        name: "good first issue",
        color: "6ce26a",
        default: true,
      },
      {
        id: 6344006318,
        node_id: "LA_kwDOAJy2Ks8AAAABeiHarg",
        url: "https://api.github.com/repos/facebook/react/labels/fb-exported",
        name: "fb-exported",
        color: "ededed",
        default: false,
      },
    ],
  });

  return labelsQuery;
};
