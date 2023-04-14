import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import * as Yup from "yup";

import { ButtonIcon } from "@/components";
import { User } from "@/models/User";
import { ApiRoutes } from "@/util/ApiRoute";
import { AppRoutes } from "@/util/AppRoute";
import { Button, Footer, Form, Modal, Navbar, Text } from "@lifesg/react-design-system";
import { ArrowRightIcon } from "@lifesg/react-icons/arrow-right";
import { EyeFillIcon } from "@lifesg/react-icons/eye-fill";
import { EyeSlashFillIcon } from "@lifesg/react-icons/eye-slash-fill";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { api } from "@/api";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { plainToInstance } from "class-transformer";

const LoginModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    // TODO: add router.push to redirect to board page
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(true);

    const fields = {
        email: "email",
        password: "password",
    } as const;

    const schema = Yup.object().shape({
        [fields.email]: Yup.string()
            .email("Invalid email")
            .required("Your email is required."),
        [fields.password]: Yup.string().required("A password is required."),
    });

    const saveUserInfo = (res: AxiosResponse) => {
        auth.token = res.data.token;
        auth.user = plainToInstance(User, {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
        });
        localStorage.setItem("token", res.data.token);
    };

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
                        email: "",
                        password: "",
                    }}
                    onSubmit={
                        async (values, { resetForm }) => {
                            const res = await api({ useToken: false }).post(ApiRoutes.LoginUser(), values);
                            saveUserInfo(res);
                            resetForm();
                            onClose();

                            console.log(auth);
                        }}	
                >
                    {({ isSubmitting, isValid, errors }) => 
                        <FormikForm
                            key={"login-form"}
                            style={{ display: "flex", flexDirection: "column", gap: "2em" }}
                        >
                            <div>
                                <Field name={fields.email} as={Form.Input} label="Email" errorMessage={errors.email}/>
                            </div>
                            <div>
                                <Field
                                    name={fields.password}
                                    as={Form.InputGroup}
                                    errorMessage={errors.password}
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
                            </div>

                            <Button.Default
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="submit"
                                style={{ marginTop: "1rem" }}
                            >
                                Login <ArrowRightIcon />
                            </Button.Default>
                            
                        </FormikForm>
                    }
                </Formik>
            </Modal.Box>
        </Modal>
    );
};

const SignUpModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    // TODO: add router.push to redirect to board page
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);

    const fields = {
        name: "name",
        email: "email",
        password: "password",
        confirmPassword: "confirmPassword",
    } as const;

    const schema = Yup.object().shape({
        [fields.name]: Yup.string().required("Name is required."),
        [fields.email]: Yup.string()
            .email("Invalid email")
            .required("Your email is required."),
        [fields.password]: Yup.string().required("A password is required."),
        [fields.confirmPassword]: Yup.string()
            .oneOf([Yup.ref(fields.password)], "Passwords must match")
            .required("You must confirm your password."),
    });

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
                    key={"signup-form"}
                    validationSchema={schema}
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={async ({ confirmPassword, ...values }, { resetForm }) => {
                        await api({ useToken: false }).post(ApiRoutes.RegisterUser(), values);
                        resetForm();
                        onClose();
                    }}
                >
                    {({ isSubmitting, isValid, errors }) => 
                        <FormikForm
                            style={{ display: "flex", flexDirection: "column", gap: "2em" }}
                        >
                            <div>
                                <Field name={fields.name} as={Form.Input} label="Name" errorMessage={errors.name} />
                            </div>
                            <div>
                                <Field name={fields.email} as={Form.Input} label="Email" errorMessage={errors.email} />
                            </div>
                            <div>
                                <Field
                                    name={fields.password}
                                    as={Form.InputGroup}
                                    errorMessage={errors.password}
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
                            </div>
                            <div>
                                <Field
                                    name={fields.confirmPassword}
                                    as={Form.InputGroup}
                                    errorMessage={errors.confirmPassword}
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
                            </div>

                            <Button.Default
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="submit"
                                style={{ marginTop: "1rem" }}
                            >
                                Sign Up <ArrowRightIcon />
                            </Button.Default>
                            
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
                    compress={scrollPosition > 0}
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
