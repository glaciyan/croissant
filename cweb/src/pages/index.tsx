import { Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Page } from "../types/page";
import useSWR from "swr";
import { UserDto } from "../types/dto/userDto";
import { useContext } from "react";
import { Token } from "../components/Token";
import { fetcher, setAccessToken } from "../lib/apiClient";

const Index: Page = () => {
    const [token] = useContext(Token);
    setAccessToken(token);
    const { data, error } = useSWR<UserDto>("api/users/me", fetcher);

    console.log(token);

    return (
        <Container as={"section"} maxW={"container.xl"}>
            <Title>Home</Title>
            <Text>{data?.username ?? "no user"}</Text>
        </Container>
    );
};

export default Index;
