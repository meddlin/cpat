import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
    componentDidMount() {
        this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }

    render() {
        // just render a placeholder container that will be filled in
        return <span ref="container" />;
    }
}