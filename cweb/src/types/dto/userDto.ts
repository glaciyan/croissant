import { PostDto } from "./postDto";

export interface UserDto {
    Id: string;
    Username: string;
    Posts: PostDto[];
}
