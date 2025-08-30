import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../lib/api";
import type { User, Link } from "../../../packages/types/index.js";
import { useAuthStore } from "../store/authStore";

// The data we'll send to the API. It's a partial version of the 'appearance' object.
type UpdateAppearanceData = Partial<User["appearance"]>;

// Custom hook for updating the user's appearance
export function useUpdateAppearance() {
  // Get the 'login' action from our Zustand store to update the user data locally
  const { login } = useAuthStore();

  return useMutation<User["appearance"], Error, UpdateAppearanceData>({
    mutationFn: async (appearanceData) => {
      // The backend expects the data inside an 'appearance' object
      const response = await apiClient.put("/users/me/appearance", { appearance: appearanceData });
      return response.data;
    },
    onSuccess: (updatedAppearance) => {
      // When the API call is successful, we want to update our global state
      // so the user sees the changes reflected everywhere instantly.
      const currentUser = useAuthStore.getState().user;
      const token = useAuthStore.getState().token;

      if (currentUser && token) {
        const updatedUser = {
          ...currentUser,
          appearance: updatedAppearance,
        };
        // Use our existing 'login' action to update the store
        login(updatedUser, token);
      }

      // Optional: If you had a query for the user's data (like '/users/me'),
      // you would invalidate it here.
      // queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
}

interface PublicProfileResponse {
  profile: Omit<User, "email" | "password">;
  links: Link[];
}

// Custom hook for fetching a user's public profile data
export function useGetPublicProfile(username: string | undefined) {
  return useQuery<PublicProfileResponse, Error>({
    // 1. The query key is now dynamic. It includes the username.
    // This ensures that data for different users is cached separately.
    queryKey: ["publicProfile", username],

    // 2. The query function fetches the data.
    queryFn: async () => {
      const response = await apiClient.get(`/users/${username}`);
      return response.data;
    },

    // 3. The 'enabled' option is a best practice. It prevents the
    // query from running if the username is not yet available.
    enabled: !!username,
  });
}
