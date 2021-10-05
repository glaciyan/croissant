import { Post } from "./post";
import { IdentityUser } from "./identityUser";

export interface User extends IdentityUser {
    RefreshTokenVersion: string;
    Posts: Post[];
}
