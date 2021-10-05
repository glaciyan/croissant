import { Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Layout } from "../components/Layout";
import { Page } from "../types/page";

const Index: Page = () => (
    <Container as={"section"} maxW={"container.xl"}>
        <Title>Home</Title>

        <Text>Home</Text>
    </Container>
);

Index.layout = Layout;

export default Index;
