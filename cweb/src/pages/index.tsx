import { Container, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { PageTitle } from "../components/PageTitle";
import { Page } from "../types/page";

const Index: Page = () => (
    <Container as={"section"} maxW={"container.xl"}>
        <PageTitle>Home</PageTitle>

        <Text>Home</Text>
    </Container>
);

Index.layout = Layout;

export default Index;
