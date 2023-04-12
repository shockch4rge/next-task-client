export const baseRoute = "http://localhost:4000/";
export const ApiRoutes = {
    GetUserById: (id: string) => `${baseRoute}user/${id}`,
    GetBoardsByUserId: () => `${baseRoute}/boards`,
} satisfies Record<string, (...args: any[]) => string>;
