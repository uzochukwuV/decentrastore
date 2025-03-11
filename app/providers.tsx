"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WagmiProvider } from 'wagmi'
import { config } from '../config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider} from "@heroui/toast";
import { StoreProvider } from "@/context/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const queryClient = new QueryClient()

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            <StoreProvider>
              {children}
            </StoreProvider>
          </NextThemesProvider>
          <ToastProvider />
        </HeroUIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
