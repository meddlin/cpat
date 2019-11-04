import React, { Component, useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

class TargetHub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: '',
            messages: []
        }
    }

    componentDidMount() {
        let connection = new HubConnectionBuilder()
                    .withUrl("https://localhost:5001/targethub")
                    .build();
        
        connection
            .start()
            .then(() => console.log('Connected to TargetHub...'))
            .catch(err => console.log('Error while establishing a connection.'));
        
        connection.on("ReceiveTargets", (user, message) => {
            const { messages } = this.state;

            if (!(messages && messages.length > 0)) {
                this.setState({ messages: [`${user} - ${message}`] });
            } else {
                this.setState({ messages: [...messages, `${user} - ${message}`] });
            }
        });

        this.setState({ hubConnection: connection })
    }

    sendTarget = () => {
        const { hubConnection } = this.state;

        hubConnection.invoke("sendTarget", { name: 'Sample Target', region: 'Region 1' });
    }

    render() {
        const { messages } = this.state;

        return (
            <div>
                <button onClick={this.sendTarget}>Send a target</button>
                <ul>
                    {(messages && messages.length > 0) ? messages.map((m, idx) => {
                        return <li key={idx}>{m}</li>;
                    }) : <span>No messages yet.</span>}
                </ul>
            </div>
        );
    }
}

export default TargetHub;