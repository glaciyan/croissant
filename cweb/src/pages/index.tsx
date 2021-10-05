import { Container } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Page } from "../types/page";

const Index: Page = () => {
    return (
        <Container as={"section"} maxW={"container.xl"}>
            <Title>Home</Title>
        </Container>
    );
};

export default Index;
