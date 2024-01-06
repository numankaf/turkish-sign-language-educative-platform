"use client";
import { setCookie } from "cookies-next";
import { Formik, Form } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showError, setShowError] = useState<boolean>(false);
  const content = (
    <div className="flex align-items-center">
      <i className="pi pi-times-circle"></i>
      <div className="ml-2">Username or password is wrong!</div>
    </div>
  );
  useEffect(() => {
    if (session && session.user) {
      switch (session.user.role) {
        case "ADMIN": {
          router.push("/admin/home");
          break;
        }
        case "STANDART_USER": {
          router.push("/main/home");
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [session, router]);
  return (
    
      <section>
        <div className="surface-ground flex flex-col items-start justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-xl   md:mt-0 sm:max-w-3xl xl:p-0  ">
            <div className="space-y-4 md:space-y- sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center">
                Sign In
              </h1>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  rememberMe: false,
                }}
                validate={(values) => {
                  const errors = {} as any;
                  if (!values.username) {
                    errors.username = "Username required!";
                  }

                  if (!values.password) {
                    errors.password = "Password required!";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setCookie("remember-me", values.rememberMe);
                  const result = await signIn("credentials", {
                    username: values.username,
                    password: values.password,
                    rememberMe: values.rememberMe,
                    redirect: false,
                    callbackUrl: "/",
                  });
                  if (result?.status === 200) {
                    setShowError(false);
                  } else {
                    setShowError(true);
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div className="flex flex-col">
                      <label className="mb-2">Username</label>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-full p-input-icon-left">
                          <FiUser size={20} />
                          <InputText
                            id="username"
                            placeholder="Username"
                            name={"username"}
                            className="w-full"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                        </div>
                      </div>
                      <span className={"text-red-400 m-1"}>
                        {errors.username && touched.username && errors.username}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label className="mb-2">Password</label>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-full">
                          <Password
                            inputStyle={{ width: "100%" }}
                            name={"password"}
                            style={{ width: "100%" }}
                            toggleMask
                            feedback={false}
                            className="w-full "
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                        </div>
                      </div>
                      <span className={"text-red-400 m-1"}>
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-start">
                        <Checkbox
                          inputId="rememberMe"
                          name="rememberMe"
                          checked={values.rememberMe}
                          onChange={handleChange}
                        />
                        <label htmlFor="rememberMe" className="ml-2">
                          Remember me
                        </label>
                      </div>

                      <div className="">
                        <Link href={"/auth/forgotpassword"}>
                          <p className="text-sm font-medium text-primary hover:underline ">
                            Forgot password?
                          </p>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        label="Sign in"
                        className="w-10/12 my-3"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
              {showError && (
                <Message
                  style={{
                    border: "solid #ff5757",
                    borderWidth: "0 0 0 6px",
                    padding: "1.25rem 1.75rem",
                    color: "#ff5757",
                    background: "rgba(255, 231, 230, 0.7)",
                  }}
                  className="w-full justify-content-start"
                  severity="error"
                  content={content}
                />
              )}
            </div>
          </div>
        </div>
      </section>
  );
};

export default LoginPage;
