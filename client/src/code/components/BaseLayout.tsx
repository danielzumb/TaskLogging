import React, { Component } from "react";

// App imports
import WelcomeView from"./WelcomeView";
import LoggingView from"./LoggingView";
import ReportingView from"./ReportingView";

import { createState } from "../state";

class BaseLayout extends Component {
    state = createState(this);

    render(){
        return (
            <div className="appContainer">
                {this.state.currentView === "welcome" && <WelcomeView state={this.state} />}

                <div className="centerArea">
                    {this.state.currentView === "logging" && <LoggingView state={this.state}/>}
                    {this.state.currentView === "reporting" && <ReportingView state={this.state}/>}
                </div>
            </div>
        )
    }
}

export default BaseLayout;
