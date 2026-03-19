import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitApplication() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      mobile: string;
      address: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitApplication(data.name, data.mobile, data.address);
    },
  });
}

export function useGetAllApplications() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllApplications();
    },
    enabled: !!actor && !isFetching,
  });
}
