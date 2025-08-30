import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/api.js";
// Make sure this import for your shared Link type is present
import type { Link } from "../../../packages/types/index.js";

export function useGetLinks() {
  // Add the generic <Link[], Error> to give TypeScript the type info

  const query = useQuery<Link[], Error>({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await apiClient.get("/links");
      return response.data;
    },
  });

  return query;
}

interface CreateLinkData {
  title: string;
  url: string;
}

export function useCreateLink() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Link, Error, CreateLinkData>({
    mutationFn: async (newLink) => {
      const response = await apiClient.post("/links", newLink);
      return response.data;
    },
    onSuccess: () => {
      // This automatically tells the useGetLinks hook to refetch the data
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return mutation;
}

interface UpdateLinkData {
  linkId: string;
  data: {
    title?: string;
    url?: string;
  };
}

// Custom hook for updating a link
export function useUpdateLink() {
  const queryClient = useQueryClient();
  return useMutation<Link, Error, UpdateLinkData>({
    mutationFn: async ({ linkId, data }) => {
      const response = await apiClient.put(`/links/${linkId}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the links list to show the update
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}

// Custom hook for deleting a link
export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    // The third generic 'string' is the type for the linkId
    mutationFn: async (linkId) => {
      await apiClient.delete(`/links/${linkId}`);
    },
    onSuccess: () => {
      // Invalidate and refetch the links list to remove the deleted item
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}

export function useTrackClick() {
  return useMutation<void, Error, string>({
    // Takes a linkId (string)
    mutationFn: (linkId) => apiClient.patch(`/links/${linkId}/click`),
  });
}
