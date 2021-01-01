import React, { Component } from "react";
import styled from 'styled-components'

const Button = styled.button`
    background-color: #5900b3;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 50px;
    margin-left: 50px;
    margin-bottom: 10px;
    cursor: pointer;

    &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
    }
`;

const WelcomeView = ({state}) => (
    <div className="welcomePage">
        <div style={{
            position:"relative", top:"30%", textAlign:"center", color:"#bb86FE"
        }}>
            <Button variant="contained" size="small"
                        onClick={ state.showTaskPage}>
                Log Task
            </Button>
            <Button disabled variant="contained" color="primary" size="small"
                        onClick={ state.showReportingPage}>
                Reporting
            </Button>
        </div>
    </div>
);

export default WelcomeView;