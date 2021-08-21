import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import { Link } from "react-router-dom";

class RegisterLogin extends Component {

    state = {
        email: "",
        password: "",
        errors: []
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    isValidForm = ({email, password}) => email && password;

    displayErrors = errors => 
        errors.map((error, i) => <p key={i}>{error}</p>)

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        if(this.isValidForm(this.state)) {
           
            this.setState({errors: []});

            this.props.dispatch(loginUser(dataToSubmit))
            .then(response => {
                if(response.payload.loginSuccess){
                    localStorage.setItem('userId', response.payload.userId);
                    this.props.history.push('/');
                } else {
                    this.setState({errors: this.state.errors.concat("Failed to log in, check email or password.")});
                }
            })
               
        } else {
            this.setState({errors: this.state.errors.concat("Form is not valid.")});
        }

    }

    render() {
        return (
            <div className="container" style={{backgroundColor: "rgb(251, 238, 193)", borderRadius: "5%"}}>
                <h2>Log In</h2>
                <div className="row" style={{backgroundColor:"white"}}>
                    <form className="col s6">
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name = "email"
                                    value = {this.state.email}
                                    onChange = {e => this.handleChange(e)}
                                    id = "email"
                                    type = "email"
                                    className = "validate"
                                />
                                <label className="active" htmlFor="email">Email</label>
                                <span 
                                    className="helper-text"
                                    data-error="Type a right email type"
                                    data-success="Right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name = "password"
                                    value = {this.state.password}
                                    onChange = {e => this.handleChange(e)}
                                    id = "password"
                                    type = "password"
                                    className = "validate"
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span 
                                    className="helper-text"
                                    data-error="Wrong"
                                    data-success="Right"
                                />
                            </div>
                        </div>

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        <div className="row">
                            <div className="col 12">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Log In
                                </button>&nbsp; &nbsp;
                                <Link to="/register">
                                    <button
                                        className="btn waves-effect green lighten-2"
                                        type="submit"
                                        name="action"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(RegisterLogin);

/*import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function Login(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  forgot password
                  </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(Login);*/