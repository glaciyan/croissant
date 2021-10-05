import { PostDto } from "./postDto";

export interface UserDto {
    id: string;
    username: string;
    posts: PostDto[];
}