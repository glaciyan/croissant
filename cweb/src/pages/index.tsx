import {Text} from "@chakra-ui/layout";
import {DarkModeSwitch} from "../components/DarkModeSwitch";
import {Container} from "@chakra-ui/react";

const Index = () => (
    <Container as={"section"} maxW={"container.xl"}>
        <Text>Home</Text>
        <DarkModeSwitch/>
    </Container>
);

export default Index;
