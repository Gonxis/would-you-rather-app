import React, { Component } from "react";
import { connect } from "react-redux";

import LeaderBoardCard from './LeaderBoardCard'

class LeaderBoard extends Component {

	render() {
		const { leaderBoardData } = this.props;

		return (
			<div className="container-leaderboard">
				{leaderBoardData.map((data, id) => (
					<LeaderBoardCard
						key={data.id}
						data={data}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = ({ users }) => {
	const leaderBoardData = Object.values(users)
		.map((user) => ({
			id: user.id,
			name: user.name,
			avatarURL: user.avatarURL,
			answerCount: Object.keys(user.answers).length,
			questionCount: user.questions.length,
			totalScore: Object.keys(user.answers).length + user.questions.length
		}))
		.sort((a, b) => b.totalScore - a.totalScore);

	return {
		leaderBoardData
	};
};

export default connect(mapStateToProps)(LeaderBoard);