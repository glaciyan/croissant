import { Text } from "@chakra-ui/layout";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Container } from "@chakra-ui/react";
import { Title } from "../components/Title";

const Index = () => (
    <Container as={"section"} maxW={"container.xl"}>
        <Title>Home</Title>

        <Text>Home</Text>
        <DarkModeSwitch />
    </Container>
);

export default Index;
