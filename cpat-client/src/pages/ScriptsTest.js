import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from 'evergreen-ui';
import { connect } from 'react-redux';
import { scriptsTestActions } from '../state-management/scripts-test/actions';

const ScriptsTest = (props) => {
    const { dispatch, loading, testScript } = props;

    return (
        <div>
            <Heading>Scripts Test</Heading>

            <button onClick={() => dispatch(scriptsTestActions.startNmap())}>start nmap script</button>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        results: (state.scriptsTest && Array.isArray(state.scriptsTest.results)) ? state.scriptsTest.results : [],
        loading: state.scriptsTest ? state.scriptsTest.loading : false
    }
}

const connectedScriptsTest = connect(mapStateToProps)(ScriptsTest);
export { connectedScriptsTest as ScriptsTest };