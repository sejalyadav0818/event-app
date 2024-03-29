import React from "react";
import "../assets/style/demo.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/esm/Button";
import * as formik from "formik";
import {  Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import VadlidationSchema from "../validationSchemas/VadlidationSchema";
import { useAuth } from "../Context/AuthContext";
import { generateMockJWT } from "../utils/MockJWT";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { Formik } = formik;
  const Navigate = useNavigate();
  // const { isLogin, logIn, logOut } = useAuth();

  const handleFormSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;
    const registeredUsers = JSON.parse(localStorage.getItem("FormData")) || [];
    const user = registeredUsers.filter(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const email = user[0].email;
      const password = user[0].password;
      const id = user[0].id;
      const mockToken = generateMockJWT([
        {
          userId: id,
          email: email,
          password: password,
        },
      ]);

      localStorage.setItem("token", JSON.stringify(mockToken));
      Navigate("/home", { replace: true });
    } else {
      toast.error("Invalid credentials");
    }
    setSubmitting(false);
  };
  return (
    <>
      <ToastContainer />
      <Stack gap={2} className="mx-5 my-5">
        <h1 className="text-center mt-4">Login</h1>
        <Formik
          enableReinitialize
          validationSchema={VadlidationSchema}
          onSubmit={handleFormSubmit}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3 mt-10">
                    <Form.Label className="bold-text">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3 mt-10">
                    <Form.Label className="bold-text">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      value={values.password}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="dark" type="submit" className="text-center">
                Login
              </Button>
              <Link to="/register">
                <Button variant="dark" type="submit" className="text-center">
                  Register
                </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default Login;
