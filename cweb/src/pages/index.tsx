import { Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";
import { Layout } from "../components/Layout";
import { Page } from "../types/page";

const Index: Page = () => (
    <Container as={"section"} maxW={"container.xl"}>
        <PageTitle>Home</PageTitle>

        <Text>Home</Text>
    </Container>
);

Index.layout = Layout;

export default Index;
