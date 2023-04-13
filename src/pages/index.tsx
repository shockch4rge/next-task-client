import { Layout, Text } from "@lifesg/react-design-system";
import Image from "next/image";



export default function Home() {

    return (		
        <>
            <Layout.Container
                style={{
                    height: "75vh",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                type="flex"
            >
                <Text.D1 style={{ maxWidth: "20ch" }}>
                        Deal with your tasks the right way.
                </Text.D1>
                <Image
                    width={536}
                    height={354}
                    alt="Hello"
                    src="/feature-img.svg"
                />
            </Layout.Container>  
s        </>
    );
}
