import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {

	state = {
        userId: "selectuser"
	};

	handleChange = (event) => {
		this.setState({ userId: event.target.value })
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(setAuthedUser(this.state.userId))
	};

	render() {
        const { users } = this.props
        const { userId } = this.state 

        const disabled = 
            userId === "selectuser" ? 
            true :
			false;

		return (
			<div className="container-sign-in">
				<div className="card text-center">
					<div className="card-header">
						<h4>Welcome to the Would You Rather App!</h4>
						<p>Please sign in to continue</p>
					</div>
					<div className="card-body">
						<img
							className="img-login"
							src="/img/react-and-redux.jpg"
							alt="React and Redux"
						/>
						<h1 className="text-primary">
							Sign In
						</h1>
						<div className="container-sign-in">
							<form onSubmit={this.handleSubmit}>
								<select
									className="form-control form-control-lg"
                                    onChange={this.handleChange}
                                    value={userId}
                                >
									<option value="selectuser" disabled>Select user</option>
									{Object.values(users).map((user) => (
                                        <option 
                                            key={user.id} 
                                            value={user.id}
                                        >
                                            {user.id}
										</option>
										
									))}
								</select>
								<button
									className="btn btn-primary btn-block mt-2"
									disabled={disabled}>
									Sign In
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users
	};
}
export default connect(mapStateToProps)(Login);