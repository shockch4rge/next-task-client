import { Divider } from "@/components";
import BoardCard from "@/components/BoardCard";
import { Layout, Text } from "@lifesg/react-design-system";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { headers } from "../../next.config";
import type { Board } from "@/models/Board";

const BoardGrid = styled.div`
	padding: 2rem;
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
`;

const Title = styled(Text.D1)`
	padding: 1rem 2rem;
`;

interface BoardsProps {
	data: Board[];
}

function boards({ data }: BoardsProps) {
    return (
        <>
            <Head>
                <title>NextTask</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout.Content type="flex-column">
                <Title>
					Boards
                </Title>
                <Divider />
                <BoardGrid>
                    {data.map(board => 
                        <BoardCard key={board.id} title={board.description} description={board.description} />
                    )}
                </BoardGrid>
            </Layout.Content>

        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:4000/boards`, 
        { 	method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5M2RiMTZjLTBkZGItNDc1MS1iNGM4LTEwNWE3MTQzZDkzNSIsImlhdCI6MTY4MTEwNzQ0NX0.LHclSiOb8O3Dno7XW-r7vmjPo_kOhWvkQAtJCHh0QBrKm3cWmJzXTMqYZukof6nsir4rjA3ZalK5qgY2uTnE_2r_In_DDySwxf69DZavCpi-HWXOLDmcNvXvZsROVbEzeATa8pVOkvLhuKz1xN6hQMAgZW6h3jvypc224jxaP6wVbWwwDlXlACVAR5MYiEg4o7B6AZdORgjJ6cqTSERpZmhsI5MgKAul3qFQu9th48neJWRNDJUuEXKMk2tBiMy5rcxWJBNVwqdoZAaVvvy4sFAPVNJnH-hGhuwwTEHkGOQ6EmPn89JNrcDU_PIL9LJw5-ATfc2NlNhQztZh9-QIjg"
            } });
    const data = await res.json();

    return { props: { data } };
}

export default boards;