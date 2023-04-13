import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import * as Yup from "yup";

import { ButtonIcon } from "@/components";
import type { User } from "@/models/User";
import { ApiRoutes } from "@/util/ApiRoute";
import { AppRoutes } from "@/util/AppRoute";
import { Button, Footer, Form, Modal, Navbar, Text } from "@lifesg/react-design-system";
import { ArrowRightIcon } from "@lifesg/react-icons/arrow-right";
import { EyeFillIcon } from "@lifesg/react-icons/eye-fill";
import { EyeSlashFillIcon } from "@lifesg/react-icons/eye-slash-fill";

const LoginModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    return (
        <Modal show={show} onOverlayClick={onClose}>
            <Modal.Box
                onClose={onClose}
                style={{
                    padding: "3rem 2rem",
                    minHeight: "24rem",
                    overflow: "auto",
                }}
            >
                <Text.D3 style={{ marginBottom: "1.5rem" }}>Login</Text.D3>
                <Form.Input label="Email" />
                <Form.Input label="Password" />
                <Button.Default
                    onClick={() => {}}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "1rem 0",
                    }}
                >
                    Login <ArrowRightIcon />
                </Button.Default>
                <Text.Hyperlink.Small
                    href={AppRoutes.Home()}
                    style={{
                        textAlign: "center",
                        textDecoration: "underline",
                    }}
                >
                    Register
                </Text.Hyperlink.Small>
            </Modal.Box>
        </Modal>
    );
};

const SignUpModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    // TODO: add router.push to redirect to board page
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const { data, error } = useSWR<User, Error>(
        ApiRoutes.GetUserById("123"),
        key => fetch(key).then()
    );

    const fields = {
        name: "name",
        email: "email",
        password: "password",
        confirmPassword: "confirmPassword",
    } as const;

    const schema = useMemo(
        () =>
            Yup.object().shape({
                [fields.name]: Yup.string().required("Name is required."),
                [fields.email]: Yup.string()
                    .email("Invalid email")
                    .required("Your email is required."),
                [fields.password]: Yup.string().required("A password is required."),
                [fields.confirmPassword]: Yup.string()
                    .oneOf([Yup.ref(fields.password)], "Passwords must match")
                    .required("You must confirm your password."),
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <Modal show={show} onOverlayClick={onClose}>
            <Modal.Box
                onClose={onClose}
                style={{
                    padding: "2rem 2rem",
                    minHeight: "30rem",
                    overflow: "auto",
                }}
            >
                <Text.D3 style={{ marginBottom: "1.5rem" }}>Sign Up</Text.D3>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={async values => {
                        console.log(values);
                    }}
                >
                    {({ isSubmitting, isValid }) => 
                        <FormikForm
                            style={{ display: "flex", flexDirection: "column", gap: "2em" }}
                        >
                            <div>
                                <Field name={fields.name} as={Form.Input} label="Name" />
                                <ErrorMessage name={fields.name} />
                            </div>
                            <div>
                                <Field name={fields.email} as={Form.Input} label="Email" />
                                <ErrorMessage name={fields.email} />
                            </div>
                            <div>
                                <Field
                                    name={fields.password}
                                    as={Form.InputGroup}
                                    label="Password"
                                    addon={{
                                        type: "custom",
                                        attributes: {
                                            children: 
                                                <ButtonIcon
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    focusOutline="browser"
                                                    focusHighlight={false}
                                                >
                                                    {showPassword ? 
                                                        <EyeFillIcon />
                                                        : 
                                                        <EyeSlashFillIcon />
                                                    }
                                                </ButtonIcon>
                                            ,
                                        },
                                        position: "right",
                                    }}
                                />
                                <ErrorMessage name={fields.password} />
                            </div>
                            <div>
                                <Field
                                    name={fields.confirmPassword}
                                    as={Form.InputGroup}
                                    label="Confirm Password"
                                    addon={{
                                        type: "custom",
                                        attributes: {
                                            children: 
                                                <ButtonIcon
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    focusOutline="browser"
                                                    focusHighlight={false}
                                                >
                                                    {showPassword ? 
                                                        <EyeFillIcon />
                                                        : 
                                                        <EyeSlashFillIcon />
                                                    }
                                                </ButtonIcon>
                                            ,
                                        },
                                        position: "right",
                                    }}
                                />
                                <ErrorMessage name={fields.confirmPassword} />
                            </div>

                            <Button.Default
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="submit"
                                style={{ marginTop: "1rem" }}
                            >
                                Sign Up <ArrowRightIcon />
                            </Button.Default>
                            <Text.Hyperlink.Small
                                href={AppRoutes.Home()}
                                style={{
                                    textAlign: "center",
                                    textDecoration: "underline",
                                }}
                            >
                                Login
                            </Text.Hyperlink.Small>
                        </FormikForm>
                    }
                </Formik>
            </Modal.Box>
        </Modal>
    );
};


export default function AppLayout({ children }: {children: React.ReactNode}) {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
		 	<Head>
                <title>NextTask</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>	
            <div style={{
                paddingBottom: "8rem",
            }}>
                <Navbar
                    items={{
                        desktop: [],
                        mobile: [
                           
                        ],
                    }}
                    actionButtons={{
                        desktop: [
                            {
                                type: "button",
                                args: {
                                    children: "Sign Up",
                                    styleType: "secondary",
                                    onClick: () => setSignUpModalOpen(!isSignUpModalOpen),
                                },
                            },
                            {
                                type: "button",
                                args: {
                                    children: "Log In",
                                    onClick: () => setLoginModalOpen(!isLoginModalOpen),
                                },
                            },
                        ],
                    }}
                    selectedId={"home"}
                    compress={scrollPosition > 100}
                    resources={{
                        primary: {
                            brandName: "NextTask",
                            logoSrc:
                                "/next-task-logo.svg",
                        },
                    }}
                
                />
            </div>
            <main style={{ minHeight: "100vh" }}>{children}</main>
            <Footer
                lastUpdated={new Date()}
                copyrightInfo="© 2023 NextTask"
                logoSrc="/next-task-Logo.svg"
                links={[
                    [
                        {
                            children: "GitHub",
                            href: "https://github.com/shockch4rge/next-task-client",
                        },
                    ],
                ]}
            />

            <LoginModal show={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
            <SignUpModal show={isSignUpModalOpen} onClose={() => setSignUpModalOpen(false)} />
        </>
    );
}
