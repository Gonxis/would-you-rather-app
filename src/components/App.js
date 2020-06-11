import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Navigation from "./Navigation";


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
					<LoadingBar />
					<Navigation isLoggedIn={this.props.isLoggedIn} />
				</div>
    )
  }
} 

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    isLoggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
