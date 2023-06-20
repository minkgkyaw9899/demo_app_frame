import { QueryClient } from "@tanstack/react-query";
import { defaultQueryOptions } from "config/reactQueryConfig";

export const queryClient = new QueryClient({
    defaultOptions: defaultQueryOptions
})