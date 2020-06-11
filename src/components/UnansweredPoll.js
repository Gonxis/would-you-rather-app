import React, { Component } from "react"
import { connect } from "react-redux"
import { handleSaveQuestionAnswer } from '../actions/questions'
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class UnansweredPoll extends Component {

    state = {
        option: "",
        toAnsweredQuestion: false
	}

	handleChoice = (event) => {
		this.setState({ option: event.target.value });
	}

	saveAnswer = (event) => {
		const { dispatch, question } = this.props
		const { option } = this.state

        event.preventDefault()
        dispatch(handleSaveQuestionAnswer(question, option))
        
        this.setState(() => ({
            option: "",
            toAnsweredQuestion: question.yourVote ? false : true,
        }))
	}

    render () {

        if (!this.props.question) {
            return <Redirect to='/page404' />
        }

        const { id, question } = this.props
        const { name, avatar, options, yourVote } = question
        const { option, toAnsweredQuestion } = this.state

        const disabled = 
            option === "" ? 
            true :
            false

        if (toAnsweredQuestion) {
            return <Redirect to={{
                pathname: `/questions/${id}`,
                state: {
                    id,
                    yourVote
                }
                
            }} />
        }

        return (
            <div className="container">
                <Card>
                    <Card.Header as="h5" className="card-header-personalized">{`${name} asks: `}</Card.Header>
                    <Card.Body>
                        <Image 
                            src={avatar}
                            alt={`Avatar of ${name}`}
                            roundedCircle
                            className="avatar-unanswered-question avatar-question"
                        />

                        <div className="center-div-unanswered-question" />

                        <div className="unanswered-poll-container">
                            <div className="content-unanswered-question">
                                <h3>Would You Rather...</h3>
                                <Form 
                                    onSubmit={this.saveAnswer}
                                    className="unanswered-poll-form"
                                >
                                    <div className="radio-buttons-unanswered-question">
                                        <Form.Check 
                                                key="optionOne"
                                                type='radio'
                                                id="optionOne"
                                                label={options.values[0]}
                                                name="wouldYouRatherQuestion"
                                                value="optionOne"
                                                onChange={this.handleChoice}
                                            />
                                        <Form.Check 
                                                key="optionTwo"
                                                type='radio'
                                                id="optionTwo"
                                                label={options.values[1]}
                                                name="wouldYouRatherQuestion"
                                                value="optionTwo"
                                                onChange={this.handleChoice}
                                            />
                                    </div>
                                    <Button 
                                        className="submit-button-unanswered-question"
                                        type="submit"
						                disabled={disabled}
                                    >Submit</Button>
                                </Form>
                            </div>
                        </div>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question: question ? 
            formatQuestion(question, users[question.author], authedUser) : 
            null
    }
}

export default connect(mapStateToProps)(UnansweredPoll)