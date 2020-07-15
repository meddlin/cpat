import React, { Component, useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

class Hub extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hubConnection: '',
            messages: []
        }
    }

    componentDidMount() {
        let connection = new HubConnectionBuilder()
                    .withUrl("https://localhost:5001/chathub")
                    .build();
        
        connection
            .start()
            .then(() => connection.invoke("send", "Hello"))
            .catch(err => console.log('Error while establishing a connection.'));
        
        connection.on("ReceiveMessage", (user, message) => {
            const { messages } = this.state;

            if (!(messages && messages.length > 0)) {
                this.setState({ messages: [`${user} - ${message}`] });
            } else {
                this.setState({ messages: [...messages, `${user} - ${message}`] });
            }
        });

        this.setState({ hubConnection: connection })
    }
  
    sendMessage = () => {
        const { hubConnection } = this.state;

        let dt = new Date();
        hubConnection.invoke("SendMessage", 'user1', `${dt.toDateString()} ${dt.toTimeString()}`);
    }

    render() {
        const { messages } = this.state;

        return (
            <div>
                <button onClick={this.sendMessage}>Send a message</button>
                <ul>
                    {(messages && messages.length > 0) ? messages.map((m, idx) => {
                        return <li key={idx}>{m}</li>;
                    }) : <span>No messages yet.</span>}
                </ul>
            </div>
        );
    }
}

export default Hub;