import { Card, Layout, Text } from "@lifesg/react-design-system";
import React from "react";
import { ButtonIcon } from "./ButtonIcon";
import { ChevronRightIcon } from "@lifesg/react-icons";
import styled from "styled-components";

const InfoCard = styled(Card)`
	min-width: 20rem;
	cursor: pointer;
	transition: box-shadow 0.2s ease-in-out;
	&:hover {
		box-shadow: 0 0.2rem 0.9rem hsla(0, 0%, 30%, 0.25)
	}
`;

const CardTitle = styled(Text.H2)`
	width: 80%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const CardDescription = styled(Text.BodySmall)`
	max-width: 80%;
`;

const CardContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

interface BoardCardProps {
	title: string;
	description: string;
}

function BoardCard({ title, description }: BoardCardProps) {
    return (
        <InfoCard>
            <CardContainer>
                <div style={{
                    width: "100%",
                }}>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </div>
                <ButtonIcon>
                    <ChevronRightIcon />
                </ButtonIcon>
            </CardContainer>
        </InfoCard>
    );
}

export default BoardCard;