export const AppRoutes = {
    Home: () => "/",
    Boards: () => "/boards",
    Board: (id: string) => `/board/${id}`,
} satisfies Record<string, (...args: any[]) => string>;

export type AppRoute = keyof typeof AppRoutes;