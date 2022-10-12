import React, { Component } from 'react'
import { Form, FormGroup, FormFeedback, Button, Input, Label } from 'reactstrap'

export default class ParticipationForm extends Component {
    state = {
        name: '',
        selectedOption: '',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { errors, isValid } = this.validate()

        if (isValid) {
            this.props.getOpinion({
                pollId: this.props.poll.id,
                name: this.state.name,
                selectedOption: this.state.selectedOption
            })
            e.target.reset()
            this.setState({
                name: '',
                selectedOption: '',
                errors: {}
            })
        } else {
            this.setState({ errors })
        }
    }

    validate = () => {
        const errors = {}
        if (!this.state.name) {
            errors.name = 'Please provide a name'
        } else if (this.state.name.length > 20) {
            errors.name = 'Name too long'
        }

        if (!this.state.selectedOption) {
            errors.selectedOption = 'Please select atleast one option'
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="d-flex">
                    <h4>Options</h4>
                    <Button
                        color='warning'
                        type='button'
                        //className='ml-auto'
                        style={{marginLeft: 'auto'}}
                        onClick={this.props.toggleModal}
                    >
                        Edit
                    </Button>
                    <Button
                        type='button'
                        //className='ml-2'
                        style={{marginLeft: '10px'}}
                        onClick={() => this.props.deletePoll(this.props.poll.id)}
                    >
                        Delete
                    </Button>
                </div>
                {this.props.poll.options.map(option => {
                    return (
                        <FormGroup className='my-2' key={option.id} >
                            <Label className='d-flex'>
                                <Input
                                    type='radio'
                                    id={option.id}
                                    name='selectedOption'
                                    value={option.id}
                                    onChange={this.handleChange}
                                    invalid={this.state.errors.selectedOption ? true : false}
                                />
                                {this.state.errors.selectedOption && <FormFeedback>{this.state.errors.selectedOption}</FormFeedback>}
                                {option.value}
                                <span
                                    style={{
                                        padding: '5px 20px',
                                        background: 'green',
                                        color: 'white',
                                        borderRadius: '5px',
                                        marginLeft: 'auto'
                                    }}
                                    // className='ml-auto'
                                >
                                    {option.vote}
                                </span>
                                <span
                                    style={{
                                        padding: '5px 20px',
                                        background: 'orange',
                                        color: 'white',
                                        borderRadius: '5px',
                                        marginLeft: '10px'
                                    }}
                                    //className='ml-2'
                                >
                                    {this.props.poll.totalVote > 0
                                        ? (
                                            (100 * option.vote) /
                                            this.props.poll.totalVote
                                        ).toFixed(2)
                                        : 0
                                    } %
                                </span>
                            </Label>
                        </FormGroup>
                    )
                })}

                <FormGroup className='my-3'>
                    <Label>
                        Enter Your Name
                    </Label>
                    <Input
                        name='name'
                        placeholder='GM Nayeem'
                        value={this.state.value}
                        onChange={this.handleChange}
                        invalid={this.state.errors.name ? true : false}
                    />
                    {this.state.errors.name && <FormFeedback>{this.state.errors.name}</FormFeedback>}
                </FormGroup>
                <Button type='submit'>
                    Submit Your Option
                </Button>
            </Form>
        )
    }
}
