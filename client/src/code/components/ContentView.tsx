import React, { Component } from "react";
import styled from 'styled-components'

import LoggingView from"./LoggingView";
import ReportingView from"./ReportingView";
import Toolbar from"./Toolbar";

const ContentView = ({state}) => (
    

    <div className="contentView">
        <div className="toolbar">
            <Toolbar state={state} />
        </div>

        <div className="currentView">
            {state.currentView === "logging" && <LoggingView state={state}/>}
            {state.currentView === "reporting" && <ReportingView state={state}/>}
        </div>
        
    </div>
);

export default ContentView;