import Head from "next/head";

import { Button } from "@lifesg/react-design-system/button";
import { Text } from "@lifesg/react-design-system";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>NextTask</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Text.D1>NextTask</Text.D1>
                <Text.Body>The best task tracker that no one will use</Text.Body>
                <br />
                <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <Button.Default>Click me!</Button.Default>
                </Link>
            </main>
        </>
    );
}
