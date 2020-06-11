import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { setAuthedUser } from "../actions/authedUser"
import { connect } from 'react-redux'

import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

class Nav extends React.Component {

    handleLogout = (e) => {
		e.preventDefault();
		this.props.dispatch(setAuthedUser(null));

		this.props.history.push("/");
    };
    
    render() {
        const { user } = this.props;
        let name, avatarURL

        if (user) {
            name = user.name
            avatarURL = user.avatarURL
        }

  return (
    <nav className='initial-nav'>
        <ul>
            <li>
            <NavLink to='/' exact activeClassName='active'>
                Home
            </NavLink>
            </li>
            <li>
            <NavLink to='/add' activeClassName='active'>
                New Question
            </NavLink>
            </li>
            <li>
            <NavLink to='/leaderboard' activeClassName='active'>
                Leader Board
            </NavLink>
            </li>
            { user && (
            <div>
                <li>
                    Hello, {name}
                </li>
                <li>
                    <Image 
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        roundedCircle
                        className="avatar-nav"
                    />
                </li>
            </div>
            )}
            <li>
                <Button onClick={this.handleLogout} >
                    Logout
                </Button>
            </li>
        </ul>
    </nav>
  )
    }
} 

const mapStateToProps = ({ users, authedUser }) => {
	const user = users[authedUser];

	return {
		user
	};
};

export default withRouter(connect(mapStateToProps)(Nav))