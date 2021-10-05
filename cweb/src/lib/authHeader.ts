export const authHeader = (token: string) => {
    return { Authorization: `Bearer ${token}` };
};
