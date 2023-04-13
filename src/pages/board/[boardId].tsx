import { useRouter } from "next/router";
import React from "react";

export default function Board() {
    const router = useRouter();

    const { boardId } = router.query;

    return (
        <div>{boardId}</div>
    );
}
