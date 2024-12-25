import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions";

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hora de stale time (se considera fresh)
    // placeholderData: [], mientras se cargan los labels, se muestran estos
    initialData: [ // se considera fresca esta data mientras haya un staleTime y pase ese tiempo
      {
        id: 139653724,
        node_id: "MDU6TGFiZWwxMzk2NTM3MjQ=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Core%20Utilities",
        name: "Component: Core Utilities",
        color: "c5def5",
        default: false,
        description: null,
      },
      {
        id: 710400704,
        node_id: "MDU6TGFiZWw3MTA0MDA3MDQ=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Test%20Renderer",
        name: "Component: Test Renderer",
        color: "006b75",
        default: false,
        description: null,
      },
    ],
  });

  return {
    labelsQuery,
  };
};
