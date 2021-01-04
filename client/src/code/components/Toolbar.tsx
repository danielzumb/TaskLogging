import React, { Component } from "react";
import styled from 'styled-components'

const Button = styled.button`
    background-color: #5900b3;
    color: white;
    font-size: 10px;
    padding: 5px 30px;
    border-radius: 5px;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
    cursor: pointer;

    &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
    }
`;

const Toolbar = ({state}) => (
    <div>
        <Button variant="contained" size="small"
                    onClick={ state.showTaskPage}>
            Log Task
        </Button>
        <Button disabled variant="contained" color="primary" size="small"
                    onClick={ state.showReportingPage}>
            Reporting
        </Button>
    </div>
);

export default Toolbar;