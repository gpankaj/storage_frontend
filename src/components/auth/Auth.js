import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class  Auth extends Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email id',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            }

        },

    }

    checkVallidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {

        }
    }
    render() {
        const formElementArray = []
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        const form = formElementArray.map(
            formElement => (
                <input key={formElement.id}
                elementType={formElement.config.elementType}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       changed={(event) => this.inputChangedHandler(event, formElement.id)} />

            )
        );
        return (
            <div>
            <form>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            </div>
        );
    }
}

