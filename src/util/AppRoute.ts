export const AppRoutes = {
    Home: () => "/",
} satisfies Record<string, (...args: any[]) => string>;

export type AppRoute = keyof typeof AppRoutes;