import BoardCard from "@/components/BoardCard";
import { Layout } from "@lifesg/react-design-system";
import Head from "next/head";
import React from "react";

const boards = () => {
    return (
        <>
            <Head>
                <title>NextTask</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{
                padding: "2rem",
                display: "grid",
                gridGap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
            }}>
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
                <BoardCard />  
            </div>
            
        </>
    );
};

export default boards;