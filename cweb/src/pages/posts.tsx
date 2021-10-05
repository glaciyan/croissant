import type { NextPage } from "next";
import useSWR from "swr";
import { PostDto } from "../types/dto/postDto";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useApi } from "../lib/useApi";

const Posts: NextPage = () => {
    const client = useApi();
    const { data, error } = useSWR<PostDto[]>("api/post", client().fetcher());

    if (error) return <Text>Failed to load</Text>;

    return (
        <Box>
            {!data ? (
                <Spinner />
            ) : (
                data.map((post) => {
                    return <Text key={post.id}>{post.title}</Text>;
                })
            )}
        </Box>
    );
};

export default Posts;
