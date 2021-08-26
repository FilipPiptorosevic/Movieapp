import React, { Component } from 'react';
import { registerUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import { Button, Input, Typography, Form } from 'antd';

export class Register extends Component {

    state = {
        lastname: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: ""
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    displayErrors = errors => 
        <p style={{color:'red'}}>{errors}</p>
        

    isFormEmpty = ({ lastname, name, email, password, passwordConfirmation }) => {
        return (
            !lastname.length ||
            !name.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    }

    isValidForm = () => {

        if(this.isFormEmpty(this.state)) {
            this.setState({errors: "Fill in all fields."});
        } else if (!this.isValidPassword(this.state)) {
            this.setState({errors: "Invalid password."});
        } else {
            return true;
        }
    }

    isValidPassword = ({ password, passwordConfirmation }) => {
        if(password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if(password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        };

        if(this.isValidForm()) {

            this.props.dispatch(registerUser(dataToSubmit))
            .then(response => {
                if(response.payload.success) {
                    this.props.history.push('/login');
                } else {
                    this.setState({errors: "Failed to register."});
                }
            })
            .catch(err => {
                this.setState({errors: err});
            });
        } else {
            console.log("Form is not valid");
        }
    }
    render() {
        return (
            <div className="container" style={{backgroundColor:'lavender'}}>
            <br />
            <br />
            <br />
            <h1 align="middle">Sign Up</h1>
            <div className="row" type="flex" justify="center" align="middle" style={{height: '100vh'}}>
                <Form className="col s12" style={{backgroundColor:'honeydew'}}>
                    <div className="row">
                        <div className="input-field col s12">
                            <Typography className="active" htmlFor="name">Name</Typography>
                            <Input
                                name = "name"
                                value = {this.state.name}
                                onChange = {e => this.handleChange(e)}
                                id = "name"
                                type = "text"
                                className = "validate"
                                style={{width:'30%'}}
                            />
                            <span 
                                className="helper-text"
                                data-success="Right"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <Typography className="active" htmlFor="lastname">Lastname</Typography>
                            <Input
                                name = "lastname"
                                value = {this.state.lastname}
                                onChange = {e => this.handleChange(e)}
                                id = "lastname"
                                type = "text"
                                className = "validate"
                                style={{width:'30%'}}
                            />
                            <span 
                                className="helper-text"
                                data-success="Right"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <Typography className="active" htmlFor="email">Email</Typography>
                            <Input
                                name = "email"
                                value = {this.state.email}
                                onChange = {e => this.handleChange(e)}
                                id = "email"
                                type = "email"
                                className = "validate"
                                style={{width:'30%'}}
                            />
                            <span 
                                className="helper-text"
                                data-error="Wrong"
                                data-success="Right"
                            />
                        </div>
                    </div>

                    <div className="row">
                            <div className="input-field col s12">
                                <Typography htmlFor="password">Password</Typography>
                                <Input
                                    name = "password"
                                    value = {this.state.password}
                                    onChange = {e => this.handleChange(e)}
                                    id = "password"
                                    type = "password"
                                    className = "validate"
                                    style={{width:'30%'}}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <Typography htmlFor="passwordConfirmation">Password confirmation</Typography>
                                <Input
                                    name = "passwordConfirmation"
                                    value = {this.state.passwordConfirmation}
                                    onChange = {e => this.handleChange(e)}
                                    id = "passwordConfirmation"
                                    type = "password"
                                    className = "validate"
                                    style={{width:'30%'}}
                                />
                            </div>
                        </div>

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        <br />

                    <div className="row">
                        <div className="col 12">
                            <Button
                                className="btn waves-effect red lighten-2"
                                type="submit"
                                name="action"
                                onClick={this.submitForm}
                            >
                                Create an account
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        );
    }
}



export default connect()(Register);