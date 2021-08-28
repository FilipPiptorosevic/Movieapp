import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import { Button, Input, Typography, Form } from 'antd';

class RegisterLogin extends Component {

    state = {
        email: "",
        password: "",
        errors: ""
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    isValidForm = ({email, password}) => email && password;

    displayErrors = errors => 
        <p style={{color:'red'}}>{errors}</p>

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password,
        };

        if(this.isValidForm(this.state)) {
           
            this.props.dispatch(loginUser(dataToSubmit))
            .then(response => {
                if(response.payload.loginSuccess){
                    localStorage.setItem('userId', response.payload.userId);
                    this.props.history.push('/');
                } else {
                    this.setState({errors: "Failed to log in, check email or password."});
                }
            })
               
        } else {
            this.setState({errors: "Fill in all fields."});
        }

    }

    render() {
        return (
            <div className="container" style={{backgroundColor: 'lavender'}}>
                <br />
                <br />
                <br />
                <h1 align="middle">Log In</h1>
                <div className="row" type="flex" justify="center" align="middle" style={{height: '100vh'}}>
                    <Form className="col s6" style={{backgroundColor:'honeydew'}}>
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
                                    data-error="Type a right email type"
                                    data-success="Right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <Typography className="active" htmlFor="password">Password</Typography>
                                <Input
                                    name = "password"
                                    value = {this.state.password}
                                    onChange = {e => this.handleChange(e)}
                                    id = "password"
                                    type = "password"
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
                                    Log In
                                </Button>
                            </div>
                        </div>
                    </Form>
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

