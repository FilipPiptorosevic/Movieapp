import React, { Component } from 'react';
import { registerUser } from '../../actions/user_actions';
import { connect } from 'react-redux';

export class Register extends Component {

    state = {
        lastname: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: []
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    displayErrors = errors => 
        errors.map((error, i) => <p id="err" key={i}>{error}</p>);
    

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
        this.setState({errors: []});


        if(this.isFormEmpty(this.state)) {
            this.setState({errors: this.state.errors.concat("Fill in all fields.")});
        } else if (!this.isValidPassword(this.state)) {
            this.setState({errors: this.state.errors.concat("Invalid password.")});
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
            this.setState({errors: []});

            this.props.dispatch(registerUser(dataToSubmit))
            .then(response => {
                if(response.payload.success) {
                    this.props.history.push('/login');
                } else {
                    this.setState({errors: this.state.errors.concat("Failed to register.")});
                }
            })
            .catch(err => {
                this.setState({errors: this.state.errors.concat(err)});
            });
        } else {
            console.log("Form is not valid");
        }
    }
    render() {
        return (
            <div className="container">
            <h2>Sign Up</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name = "lastname"
                                value = {this.state.lastname}
                                onChange = {e => this.handleChange(e)}
                                id = "lastname"
                                type = "text"
                                className = "validate"
                            />
                            <label className="active" htmlFor="lastname">lastname</label>
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
                                name = "name"
                                value = {this.state.name}
                                onChange = {e => this.handleChange(e)}
                                id = "name"
                                type = "text"
                                className = "validate"
                            />
                            <label className="active" htmlFor="name">name</label>
                            <span 
                                className="helper-text"
                                data-error="Wrong"
                                data-success="Right"
                            />
                        </div>
                    </div>

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
                            <label className="active" htmlFor="email">email</label>
                            <span 
                                className="helper-text"
                                data-error="Wrong"
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
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name = "passwordConfirmation"
                                    value = {this.state.passwordConfirmation}
                                    onChange = {e => this.handleChange(e)}
                                    id = "passwordConfirmation"
                                    type = "password"
                                    className = "validate"
                                />
                                <label htmlFor="passwordConfirmation">Password confirmation</label>
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
                                Create an account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}



export default connect()(Register);