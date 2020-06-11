import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
    render() {

        const { answeredQuestions, unansweredQuestions } = this.props

        return (
            <div className="content">

                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                        <a 
                            className="nav-link active" 
                            data-toggle="tab" 
                            href="#unanswered"
                            id="home-tab"
                            role="tab"
                        >Unanswered questions</a>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link" 
                            data-toggle="tab" 
                            href="#answered"
                            id="profile-tab"
                            role="tab"
                        >Answered questions</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div 
                        id="unanswered" 
                        className="container tab-pane active" 
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        <ul className="dashboard-list">
                            {unansweredQuestions.map(id => (
                                <li key={id}>
                                    <Question id={id} />
                                </li>
                            ))}
                        </ul>
                    </div>
                
                    <div 
                        id="answered" 
                        className="container tab-pane fade"
                        role="tabpanel"
						aria-labelledby="profile-tab"
                    >
                        <ul className="dashboard-list">
                            {answeredQuestions.map(id => (
                                <li key={id}>
                                    <Question id={id} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ questions, users, authedUser }) => {
	const user = users[authedUser];
	const answeredQuestions = Object.keys(user.answers).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp
	);
	const unansweredQuestions = Object.keys(questions)
		.filter((qid) => !answeredQuestions.includes(qid))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
	return {
		unansweredQuestions,
		answeredQuestions
	};
};

export default connect(mapStateToProps)(Dashboard)