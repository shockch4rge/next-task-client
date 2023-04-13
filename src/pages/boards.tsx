import { ButtonIcon, Divider } from "@/components";
import BoardCard from "@/components/BoardCard";
import type { Board } from "@/models/Board";
import { ApiRoutes } from "@/util/ApiRoute";
import { Layout, Modal, Text, Form, Button } from "@lifesg/react-design-system";
import { PlusCircleIcon } from "@lifesg/react-icons";
import { Form as FormikForm, Formik, Field, ErrorMessage } from "formik";
import Error from "next/error";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

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
	
    const router = useRouter();

    const fields = {
        title: "title",
        description: "description",
    } as const;

    const schema = useMemo(() => Yup.object().shape({
        [fields.title]: Yup.string().required("Title is required"),
        [fields.description]: Yup.string().required("Description is required"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);


    const createNewBoard = async (value: Pick<Board, "description" | "title">) => {
        const newBoard = {
            title: value.title,
            description: value.description,
        };
        
        try {
            const res = await fetch(ApiRoutes.GetBoardsByUserId(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    //TODO: Get token from local storage
                    "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjlhZWU5LTI1NDEtNGJkOS1iMzdjLTU1NDhiNmZjYmRjYyIsImlhdCI6MTY4MTI3MDY2N30.sAgfYNdDsMr1lRLb749k60GZxcaYgWwZtZmsAsUsP_qi9CumzXGhRka7bJ6KlKiSw1tBo0rXl_jYelnTcW4IXzPSvwYVqaCC9UZPmsk5tLx3NRnzl03xIvRa7rqUkMx78VJW3OA2kD0gy3P8E5axV9q57v-2m4hC22fvophNriYrsYOs6I0LDcOWJ8H-AqpBaHrJhG5gee3J7UfkxPXEq7IaFpfID-b_zDVtQUJV9DHE46evPLZUtTG0DFmoa2UmI3WhiU0fGeL-BcC8z2nsmcO8AYTs_QrAGpitlkHEzlQRFX01VDJL6s-nFDp2aBLIN1YAmB6KYwwm41yBWh9Zog"
                },
                body: JSON.stringify(newBoard),
            });

            router.replace(router.asPath);
            onOverlayClick();

        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal show={show} onOverlayClick={onOverlayClick} >
            <Modal.Box onClose={onOverlayClick}>
                <ModalContainer>
                    <Text.D2>Add Board</Text.D2>
                    <br />
                    <Formik 
                        validationSchema={schema}
                        initialValues={{
                            title: "", 
                            description: "" 
                        }} 
						
                        onSubmit={async (values, { resetForm }) => {
                            await createNewBoard(values);
                            resetForm();
                        }}
                    >
						
                        {({ errors }) => <FormikForm
						 style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <div>
                                <Field name={fields.title} as={Form.Input} label="Title" errorMessage={errors.title} />
                            </div>
                            <div>
                                <Field name={fields.description} as={Form.Textarea} label="Description" errorMessage={errors.description} />
                            </div>
                            <Button.Default type="submit" style={{
                                margin: "0.5rem 0rem",
                            }}>
								Submit
                            </Button.Default>
                        </FormikForm>}
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
                        <BoardCard key={board.id} id={board.id} title={board.title} description={board.description} />
                    )}
                </BoardGrid>
            </Layout.Content>
            <AddBoardModal show={isBoardModalOpen} onOverlayClick={() => setIsBoardModalOpen(false)} />
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(ApiRoutes.GetBoardsByUserId(), 
        { 	method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                //TODO: Get token from local storage
                "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjlhZWU5LTI1NDEtNGJkOS1iMzdjLTU1NDhiNmZjYmRjYyIsImlhdCI6MTY4MTI3MDY2N30.sAgfYNdDsMr1lRLb749k60GZxcaYgWwZtZmsAsUsP_qi9CumzXGhRka7bJ6KlKiSw1tBo0rXl_jYelnTcW4IXzPSvwYVqaCC9UZPmsk5tLx3NRnzl03xIvRa7rqUkMx78VJW3OA2kD0gy3P8E5axV9q57v-2m4hC22fvophNriYrsYOs6I0LDcOWJ8H-AqpBaHrJhG5gee3J7UfkxPXEq7IaFpfID-b_zDVtQUJV9DHE46evPLZUtTG0DFmoa2UmI3WhiU0fGeL-BcC8z2nsmcO8AYTs_QrAGpitlkHEzlQRFX01VDJL6s-nFDp2aBLIN1YAmB6KYwwm41yBWh9Zog"
            } });
    const data = await res.json();

    return { props: { data } };
    
}
