import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { Link, withRouter } from 'react-router-dom'

class Question extends Component {

    render() {
        const { question } = this.props

        if (!question) {
            return <p>This question doesn't exist</p>
        }

        const {
            id, name, avatar, options, yourVote
        } = question
        
        return (
            <div className="container">
                <Card>
                    <Card.Header as="h5" className="card-header-personalized">{`${name} asks:`}</Card.Header>
                    <Card.Body>
                        <Image 
                            src={avatar}
                            alt={`Avatar of ${name}`}
                            roundedCircle
                            className="avatar-question margin-left-25"
                        />

                        <div className="center-div wdth-40" />

                        <div className="content-question">
                            <div className="margin-left-180">
                                <h5>Would you rather</h5>
                                <p>{options.optionOneValue}</p>
                            </div>
                            <Link to={{
                                pathname: `/questions/${id}`,
                                state: {
                                    id,
                                    yourVote
                                }
                                
                            }}>
                                <Button 
                                    variant="primary" 
                                    className="view-poll-button btn btn-block btn-primary"
                                    
                                >View Poll</Button>
                            </Link>
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

export default withRouter(connect(mapStateToProps)(Question))