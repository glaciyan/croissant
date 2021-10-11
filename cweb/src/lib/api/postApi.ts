import { AxiosResponse } from "axios";
import { PostDto } from "../../types/dto/postDto";
import { PostForCreationDto } from "../../types/dto/postForCreationDto";
import { apiCall, apiClient } from "./api";

export default {
    create: async (title: string, content: string) => {
        return await apiCall<PostDto>(() =>
            apiClient.post<PostForCreationDto, AxiosResponse<PostDto>>("api/post", {
                title,
                content,
            })
        );
    },
};
