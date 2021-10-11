import { Container, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { PageTitle } from "../components/PageTitle";
import { Page } from "../types/page";
import useSwr from "swr";
import { fetcher } from "../lib/api/api";
import { PostDto } from "../types/dto/postDto";

const Index: Page = () => {
    const { data, error } = useSwr<PostDto[]>("api/post", fetcher);

    return (
        <Container as={"section"} maxW={"container.xl"}>
            <PageTitle>Home</PageTitle>

            {error && <Text>Couldn't fetch posts</Text>}
            {data
                ? data.map((post) => {
                      return (
                          <Text>
                              <b>{post.title}</b> {post.content}
                          </Text>
                      );
                  })
                : null}
        </Container>
    );
};

Index.layout = Layout;

export default Index;
