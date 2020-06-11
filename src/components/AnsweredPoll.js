import React, { Component } from "react"
import { connect } from "react-redux"
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'

class AnsweredPoll extends Component {

    state = {
        optionOneChoice: false,
        optionTwoChoice: false
    }

    render () {

        if (!this.props.question) {
            return <Redirect to='/page404' />
        }

        const { question, authedUser } = this.props
        const { name, avatar, options, votes } = question

        let optionOneChoice = options.optionOneVotes.includes(authedUser) ? true : false;
        let optionTwoChoice = options.optionTwoVotes.includes(authedUser) ? true : false;
        
        let youChosedOptionOne = "";
        let youChosedOptionTwo = "";

        if (optionOneChoice) {
            youChosedOptionOne = "options-answered-question your-choice-option"
            youChosedOptionTwo = "options-answered-question"
        }

        if (optionTwoChoice) {
            youChosedOptionOne = "options-answered-question"
            youChosedOptionTwo = "options-answered-question your-choice-option"
        }

        return (
            <div className="container">
                <Card>
                    <Card.Header as="h5" className="card-header-personalized">{`Asked by ${name}`}</Card.Header>
                    <Card.Body>
                        <Image 
                            src={avatar}
                            alt={`Avatar of ${name}`}
                            roundedCircle
                            className="avatar-question avatar-answered-question"
                        />

                        <div className="center-div-answered-question" />

                        <div className="content-answered-question">
                            <h3>Results:</h3>
                            <div className={youChosedOptionOne}>
                                <h6>Would you rather {options.optionOneValue}?</h6>
                                <div className="progress-bar-answered-question-div">
                                    <ProgressBar 
                                        now={options.optionOneVotes.length / votes * 100} 
                                        label={`${options.optionOneVotes.length / votes * 100}%`}
                                        min={0}
                                        max={100}
                                        className="progress-bar-answered-question"
                                    />
                                    <p>{options.optionOneVotes.length} out of {votes} votes</p>
                                </div>
                                {optionOneChoice && 
                                    <div className="your-choice-label">Your choice</div>
                                }
                            </div>
                            <div className={youChosedOptionTwo}>
                                <h6>Would you rather {options.optionTwoValue}?</h6>
                                <div className="progress-bar-answered-question-div">
                                    <ProgressBar 
                                        now={options.optionTwoVotes.length / votes * 100} 
                                        label={`${options.optionTwoVotes.length / votes * 100}%`}
                                        min={0}
                                        max={100}
                                        className="progress-bar-answered-question"
                                    />
                                    <p>{options.optionTwoVotes.length} out of {votes} votes</p>
                                </div>
                                {optionTwoChoice && 
                                    <div className="your-choice-label">Your choice</div> 
                                }
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

export default connect(mapStateToProps)(AnsweredPoll)