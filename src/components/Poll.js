import React, { Component } from "react"
import { connect } from "react-redux"
import AnsweredPoll from './AnsweredPoll'
import UnansweredPoll from './UnansweredPoll'
import { Redirect } from 'react-router-dom'

class Poll extends Component {
    render () {

        if (!this.props.location.state) {
            return <Redirect to='/page404' />
        }

        const { id, yourVote } = this.props.location.state

        return (
            <div>
                {
                yourVote ?
                <AnsweredPoll
                    id={id}
                /> :
                <UnansweredPoll
                    id={id}
                />
                }
            </div>
        )
    }
}

export default connect()(Poll)