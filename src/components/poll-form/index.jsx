import React, { Component } from 'react'
import shortid from 'shortid'
import MyForm from './form'

const defaultOptions = [
    { id: shortid.generate(), value: '', vote: 0 },
    { id: shortid.generate(), value: '', vote: 0 },
]

export default class PollForm extends Component {

    state = {
        title: '',
        description: '',
        options: defaultOptions,
        errors: {}
    }

    componentDidMount() {
        const { poll } = this.props
        if (poll && Object.keys(poll).length > 0) {
            this.setState({
                title: poll.title,
                description: poll.description,
                options: poll.options
            })
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOptionChange = (e, index) => {
        const { options } = this.state
        options[index].value = e.target.value
        this.setState({ options })
    }

    createOption = () => {
        const { options } = this.state
        if (options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            })
            this.setState({ options })
        } else {
            alert('You can create max 5 options')
        }
    }

    deleteOption = (index) => {
        const { options } = this.state
        if (options.length > 2) {
            options.splice(index, 1)
            this.setState(options)
        } else {
            alert('You must have at least two options')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { errors, isValid } = this.validate()

        if (isValid) {
            const { title, description, options } = this.state
            const poll = {
                title,
                description,
                options,
            }
            if (this.props.isUpdate) {
                poll.id = this.props.poll.id
                this.props.submit(poll)
                alert('Updated Successfully')
            } else {
                this.props.submit(poll)
                e.target.reset()
                this.setState({
                    title: '',
                    description: '',
                    options: defaultOptions,
                    errors: {}
                })
            }

        } else {
            this.setState({ errors })
        }
    }

    validate = () => {
        const errors = {}
        const { title, description, options } = this.state

        if (!title) {
            errors.title = 'Please provide a title'
        } else if (title.length < 30) {
            errors.title = 'Title too short'
        } else if (title.length > 100) {
            errors.title = 'Title too long'
        }

        if (!description) {
            errors.deleteOption = 'Please provide a descrition'
        } else if (description.length > 500) {
            errors.deleteOption = 'Description too long'
        }

        const optionErrors = []

        options.forEach((option, index) => {
            if (!option.value) {
                optionErrors[index] = 'Option text empty'
                //optionErrors.push('Option text empty')
            } else if (option.value.length > 100) {
                optionErrors[index] = 'Option text too long'
                //optionErrors.push('Opton too long')
            }
        })

        if (optionErrors.length > 0) {
            errors.options = optionErrors
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    }

    render() {
        const { title, description, options, errors } = this.state

        return (
            <MyForm
                title={title}
                description={description}
                options={options}
                errors={errors}
                buttonValue={this.props.buttonValue || 'Create Poll'}
                handleChange={this.handleChange}
                handleOptionChange={this.handleOptionChange}
                createOption={this.createOption}
                deleteOption={this.deleteOption}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}
