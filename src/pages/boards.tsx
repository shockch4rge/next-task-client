import { ButtonIcon, Divider } from "@/components";
import BoardCard from "@/components/BoardCard";
import type { Board } from "@/models/Board";
import { Layout, Modal, Text, Form, Button } from "@lifesg/react-design-system";
import { PlusCircleIcon } from "@lifesg/react-icons";
import { Form as FormikForm, Formik, Field } from "formik";
import { useState } from "react";
import styled from "styled-components";

const BoardTitle = styled.div`
	display: flex;
	justify-content: space-between;
	padding-right: 2rem;
`;

const BoardGrid = styled.div`
	padding: 2rem;
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
`;

const Title = styled(Text.D1)`
	padding: 1rem 2rem;
`;

const ModalContainer = styled.div`
	padding: 1rem 2.5rem;
`;

interface BoardsProps {
	data: Board[];
}

const AddBoardModal = ({ show, onOverlayClick }: {show: boolean; onOverlayClick: () => void}) => {
    return (
        <Modal show={show} onOverlayClick={onOverlayClick} >
            <Modal.Box onClose={onOverlayClick}>
                <ModalContainer>
                    <Text.D2>Add Board</Text.D2>
                    <br />
                    <Formik 
                        initialValues={{
                            title: "", 
                            description: "" 
                        }} 
						
                        onSubmit={values => {
                            console.log(values);
                        }}
                    >
                        <FormikForm
						 style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <div>
                                <Field name={"title"} as={Form.Input} label="Title" />
                            </div>
                            <div>
                                <Field name={"description"} as={Form.Textarea} label="Description" />
                            </div>
                            <Button.Default type="submit" style={{
                                margin: "0.5rem 0rem",
                            }}>
								Submit
                            </Button.Default>
                        </FormikForm>
                    </Formik>
                </ModalContainer>
            </Modal.Box>
	   </Modal>
    );
};

export default function Boards({ data }: BoardsProps) {

    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

    return (
        <> 
            <Layout.Content type="flex-column">
                <BoardTitle>
                    <Title>
						Boards
                    </Title>
                    <ButtonIcon onClick={() => setIsBoardModalOpen(true)}>
                        <PlusCircleIcon fontSize={"1.5rem"} />
                    </ButtonIcon>
                </BoardTitle>
                <Divider />
                <BoardGrid>
                    {data.map(board => 
                        <BoardCard key={board.id} id={board.id} title={board.description} description={board.description} />
                    )}
                </BoardGrid>
            </Layout.Content>
            <AddBoardModal show={isBoardModalOpen} onOverlayClick={() => setIsBoardModalOpen(false)} />
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:4000/boards`, 
        { 	method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjlhZWU5LTI1NDEtNGJkOS1iMzdjLTU1NDhiNmZjYmRjYyIsImlhdCI6MTY4MTI3MDY2N30.sAgfYNdDsMr1lRLb749k60GZxcaYgWwZtZmsAsUsP_qi9CumzXGhRka7bJ6KlKiSw1tBo0rXl_jYelnTcW4IXzPSvwYVqaCC9UZPmsk5tLx3NRnzl03xIvRa7rqUkMx78VJW3OA2kD0gy3P8E5axV9q57v-2m4hC22fvophNriYrsYOs6I0LDcOWJ8H-AqpBaHrJhG5gee3J7UfkxPXEq7IaFpfID-b_zDVtQUJV9DHE46evPLZUtTG0DFmoa2UmI3WhiU0fGeL-BcC8z2nsmcO8AYTs_QrAGpitlkHEzlQRFX01VDJL6s-nFDp2aBLIN1YAmB6KYwwm41yBWh9Zog"
            } });
    const data = await res.json();

    return { props: { data } };
}
