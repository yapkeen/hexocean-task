import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux';
import {Container} from '@material-ui/core';
import normalizeTime from './normalizeTime'

const required = value => value ? undefined : 'Required'
const minLength = min => value => 
    value && value.length < min ?  `Must be ${min} characters` : undefined
const minLength8 = minLength(8)
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1);
const maxValue = max => value =>
  value && value > max ? `Max value is ${max}` : undefined
const maxValue10 = maxValue(10)


const renderField = ({ input, label, type, step, meta: { touched, error, warning } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} step={step}/> 
        {touched && ((error && <span> {error}</span>) || (warning && <span> {warning}</span>))}
      </div>
    </div>
  )

let Form = props => {
    const { handleSubmit, pristine, reset, submitting, typeValue, invalid} = props
    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="xs">
                <div>
                    <label>Dish Name</label>
                    <div>
                        <Field
                            name="name"
                            component={renderField}
                            type="text"
                            placeholder="Dish name"
                            validate={[required]}
                        />
                    </div>
                </div>
                <div>
                    <label>Preparation Time [hh-mm-ss]</label>
                    <div>
                        <Field
                            name='preparation_time'
                            component={renderField}
                            placeholder="time"
                            normalize={normalizeTime}
                            validate={[required, minLength8]}
                        />
                    </div>
                </div >
                <div>
                    <label>Type</label>
                    <div>
                        <Field name="type" id='type' component="select" validate={[required]}>
                            <option />
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="sandwich">Sandwich</option>
                        </Field>
                    </div>
                </div>
                {typeValue === 'pizza' &&
                    <div>
                        <label>Number of slices</label>
                        <div>
                            <Field
                                parse={value => Number.parseInt(value)}
                                name="no_of_slices"
                                component={renderField}
                                type="number"
                                step="1"
                                placeholder="slices"
                                min='0'
                                validate={[required, minValue1]}
                            />
                        </div>
                        <div>
                            <label>Diameter</label>
                            <div>
                                <Field
                                    parse={value => Number.parseFloat(value)}
                                    name="diameter"
                                    component={renderField}
                                    type="number"
                                    step="0.1"
                                    placeholder="slices"
                                    min='0'
                                    validate={[required, minValue1]}
                                />
                            </div>
                        </div>
                    </div>
                }
                {typeValue === 'soup' &&
                    <div>
                        <label> Spiciness [1-10]</label>
                        <div>
                            <Field
                                parse={value => Number(value)}
                                name="spiciness_scale"
                                component={renderField}
                                type="number"
                                placeholder="spiciness"
                                validate={[required, minValue1, maxValue10]}
                            />
                        </div>

                    </div>

                }
                {typeValue === 'sandwich' &&
                    <div>
                        <label>Number of slices</label>
                        <div>
                            <Field
                                parse={value => Number(value)}
                                name="slices_of_bread"
                                component={renderField}
                                type="number"
                                placeholder="slices"
                                min='0'
                                validate={[required]}
                            />
                        </div>
                    </div>
                }
                <div>
                </div>
                <br></br>
                <div>
                    <button type="submit" disabled={invalid || pristine || submitting}>
                        Submit
                    </button>   
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
                </div>
            </Container>
        </form >
    )
}

Form = reduxForm({
    form: 'simple'  
})(Form)

const selector = formValueSelector('simple')

Form = connect(
    state => {
        const type = selector(state, 'type')
        return {
            typeValue: `${type}`
        }
    }
)(Form)


export default Form