import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as signalR from '@microsoft/signalr';

const SignalRChatTest = (props) => {
    let history = useHistory();
    const [messages, setMessages] = useState([]);
    const [targets, setTargets] = useState([]);
    const [changefeedResult, setChangefeedResult] = useState([]);
    const [signalRConnection, setSignalRConnection] = useState({});
    const [mongoTestResult, setMongoTestResult] = useState([]);

    useEffect(() => {
        let connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();

        connection
            .start()
                .then(a => {
                    console.log('connected?');
                    if (a) console.log(`a: ${a}`)
                    // if (connection.connectionId) {
                    //     connection.invoke("sendConnectionId", connection.connectionId)
                    // }
                })
                .catch(err => {
                    if (err) console.log(`err: ${err}`)
                })

        connection.on("ReceiveMessage", function(user, message) {
            setMessages(messages => [...messages, `${user}: ${message}`])
        });

        connection.on("PagedTargets", function(received) {
            setTargets(targets => [...targets, ...received]);
        });

        connection.on("AttemptedChangefeed", function(received) {
            setChangefeedResult(changefeedResult => [...changefeedResult, ...received]);
        });

        connection.on("MongoTest", function(received) {
            setMongoTestResult(mongoTestResult => [...mongoTestResult, ...received]);
        });

        setSignalRConnection(connection);
    }, []);

    return (
        <div>
            <h2>SignalR Chat Test</h2>

            <div>
                <div>User</div>
                <input type="text" id="userInput" />

                <div>Message</div>
                <input type="text" id="messageInput" />

                <button type="button" id="sendButton"
                    onClick={() => {
                        signalRConnection
                            .invoke("SendMessage", 'user 1', 'sample message')
                            .catch(function(err) {
                                return console.error(err.toString());
                            });
                    }}
                >Send Message</button>
            </div>

            <h4>Messages</h4>
            <ul>
                {messages && messages.length > 0 ? messages.map((msg, idx) => {
                    return (<li key={idx}>{msg}</li>)
                }) : 'No messages to show yet.'}
            </ul>

            <h2>Query + SignalR Test</h2>
            <div>
                <button type="button" onClick={()  => {
                    signalRConnection
                        .invoke("ReactivePage", 1, 3)
                        .catch(function(err) {
                            return console.error(`ReactivePage Error: ${err.toString()}`)
                        })
                }}>Query for Targets</button>
                <ul>
                    {targets && targets.length > 0 ? targets.map((t, idx) => {
                        return (
                            <li key={idx}>
                                <p>{t.id}</p>
                                <p>{t.name}</p>
                                <p>{t.dateCreated}</p>
                            </li>
                        );
                    }) : 'No targets to display yet.'}
                </ul>
            </div>

            <h2>Attempting Changefeed</h2>
            <div>
                <button type="submit" onClick={() => {
                    signalRConnection
                        .invoke("ChangefeedTest")
                        .catch(function(err) {
                            return console.error(`Changefeed Error: ${err.toString()}`)
                        })
                }}>Try Changefeed</button>

                <ul>
                    {changefeedResult && changefeedResult.length > 0 ? changefeedResult.map((c, idx) => {
                        return (<li key={idx}>{c}</li>)
                    }) : 'No changefeed data yet'}
                </ul>
            </div>

            <h2>Mongo Test Changefeed</h2>
            <div>
                <button type="submit" onClick={() => {
                    signalRConnection
                        .invoke("MongoTest")
                        .catch(function(err) {
                            return console.error(`Mongo Test Error: ${err.toString()}`)
                        })
                }}>Try Changefeed</button>

                <ul>
                    {mongoTestResult && mongoTestResult.length > 0 ? mongoTestResult.map((c, idx) => {
                        return (<li key={idx}>{c}</li>)
                    }) : 'No changefeed data yet'}
                </ul>
            </div>
        </div>
    );
};

export default SignalRChatTest;