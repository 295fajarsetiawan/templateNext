import axios from "axios";
import { create } from "zustand";

import { apiClient } from "@/lib/api-client";
import type { DemoUser } from "@/lib/demo-users";

type AdminUsersFetchParams = {
  query: string;
  page: number;
  limit: number;
  filters?: {
    status?: string;
    team?: string;
  };
};

type AdminUsersResponse = {
  rows: DemoUser[];
  total: number;
  page: number;
  limit: number;
};

type AdminUsersState = AdminUsersResponse & {
  isLoading: boolean;
  error: string | null;
  fetchUsers: (params: AdminUsersFetchParams) => Promise<AdminUsersResponse>;
};

const emptyResponse = (page: number, limit: number): AdminUsersResponse => ({
  rows: [],
  total: 0,
  page,
  limit,
});

export const useAdminUsersStore = create<AdminUsersState>((set) => ({
  rows: [],
  total: 0,
  page: 1,
  limit: 5,
  isLoading: false,
  error: null,
  async fetchUsers({ query, page, limit, filters }) {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get<AdminUsersResponse>("/api/users", {
        params: {
          query,
          page,
          limit,
          status: filters?.status,
          team: filters?.team,
        },
      });

      set({
        ...response.data,
        isLoading: false,
        error: null,
      });

      return response.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ?? error.message
        : "Failed to fetch users";
      const fallback = emptyResponse(page, limit);

      set({
        ...fallback,
        isLoading: false,
        error: message,
      });

      return fallback;
    }
  },
}));
