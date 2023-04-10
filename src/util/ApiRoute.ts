export const baseRoute = "http://localhost:4000/";
export const ApiRoutes = {
    GetUserById: (id: string) => `${baseRoute}user/${id}`,
} satisfies Record<string, (...args: any[]) => string>;
