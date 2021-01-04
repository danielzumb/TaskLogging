import React, { Component } from "react";

// App imports
import WelcomeView from"./WelcomeView";
import ContentView from"./ContentView";

import LoggingView from"./LoggingView";
import ReportingView from"./ReportingView";

import { createState } from "../state";

class BaseLayout extends Component {
    state = createState(this);

    render(){
        const showWelcome = this.state.showWelcome;
        console.log("showWelcome: " + showWelcome);
        return (
            <div className="appContainer">
                {showWelcome
                    ? <WelcomeView state={this.state} />
                    : <ContentView state={this.state} />
                }    
            </div>
        )
    }
}

export default BaseLayout;
