import { User } from "./user";
import { PostBase } from "./postBase";

export interface Post extends PostBase {
    Id: string;
    CreatedAt: string;
    UpdatedAt: string | null;
    PosterId: string;
    Poster: User;
}
