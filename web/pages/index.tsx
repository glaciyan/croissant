import React from "react";
import { Button, Pane, Text, majorScale } from "evergreen-ui";

export default function Home() {
    return (
        <Pane display="flex" alignItems="center" marginX={majorScale(2)}>
            <Button>Click me!</Button>
            <Text>This is a clickable Button</Text>
        </Pane>
    );
}
