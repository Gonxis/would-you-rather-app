import React from "react";

import Card from "react-bootstrap/Card"
import Image from 'react-bootstrap/Image'

const LeaderBoardCard = ({ data }) => {
    const { avatarURL, name, answerCount, questionCount, totalScore } = data
	return (
        <Card className="leaderboard-card-container">
            <Card.Body>
                <div>
                    <Image 
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        roundedCircle
                        className="avatar-question avatar-leaderboard-card"
                    />
                </div>
                <div className="center-div-unanswered-question center-div-leaderboard-card" />

                <div className="unanswered-poll-container">
                    <div className="content-unanswered-question">
                        <h3>{name}</h3>
                        <p>Answered questions <span className="first-span-leaderboard-card">{answerCount}</span></p>
                        <hr />
                        <p>Created questions <span className="second-span-leaderboard-card">{questionCount}</span></p>
                    </div>
                </div>
                <div>
                    <div className="center-div-second-leaderboard-card"/>
                <Card className="score-leaderboard-card">
                    <Card.Header>Score</Card.Header>
                    <Card.Body>
                        <div className="total-score">
                            {totalScore}
                        </div>
                        </Card.Body>
                </Card>
                </div>
                
            </Card.Body>
        </Card>
	);
};

export default LeaderBoardCard;