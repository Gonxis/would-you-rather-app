import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Login from "./Login";
import Leaderboard from "./LeaderBoard"
import Poll from "./Poll";
import NewQuestion from "./NewQuestion"
import Page404 from "./Page404"

const Navigation = (props) => {
	const { isLoggedIn } = props;
	return (
		<Fragment>
            <Nav />
			{
			!isLoggedIn ? 
            <Route path="/" component={Login} /> :
            <Fragment>
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/add" component={NewQuestion} />
                    <Route
                        path='/questions/:id'
                        render={(props) => <Poll {...props} />}
                    />
                    <Route path="/page404" component={Page404} />
                    <Route component={Page404} />
                </Switch>
            </Fragment>
            }
		</Fragment>
	);
};

export default Navigation;