import { Container } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";
import { Layout } from "../components/Layout";
import { Page } from "../types/page";
import { User } from "../components/UserManager";

const Index: Page = () => (
    <Container as={"section"} maxW={"container.xl"}>
        <PageTitle>Home</PageTitle>

        <User>{({ user }) => <div>{user.username}</div>}</User>
    </Container>
);

Index.layout = Layout;

export default Index;
