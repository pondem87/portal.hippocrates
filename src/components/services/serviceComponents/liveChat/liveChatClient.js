import React, { useEffect, useState, useRef } from 'react';
import {io} from 'socket.io-client';
import {URL} from '../../../../variables';
import {v4 as uuid} from 'uuid';
import moment from 'moment';

const LiveChatClient = ({user}) => {
    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);
    const [chatBuddy, setChatBuddy] = useState(null);
    const [messages, setMessages] = useState({messages: []});
    const [alreadyConnected, setAlreadyConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const messageRef = useRef();
    messageRef.current = message;

    useEffect(() => {
        connect()
    }, [])

    const connect = () => {
        //setup connection
        let newSocket = io(URL);
        //set socket state var
        setSocket(newSocket);
    }

    useEffect(() => {
        if (socket) {
            //attach events
            socket.on("get user", (data) => {
                returnUser(socket);
            })

            socket.on("online", (data) => {
                goOnline(data);
            })

            socket.on("offline", (data) => {
                goOffline();
            })

            socket.on("message", (data) => {
                receiveMessage(data);
            })

            socket.on("delivery report", (data) => {
                setMessages(prev => ({
                    messages: prev.messages.map((message) => {
                        if (message.idmessage === data.idmessage) {
                            message.status = data.status
                        }
    
                        return message
                    })
                }));
            })

            socket.on("reject", (data) => {
                rejection(data);
            })
        }

        return () => {
            if (socket) {
                socket.disconnect()
            }
        };
    }, [socket])

    ///////////socket events///////////////////////////////////////////////////////////////////////////
    const returnUser = (socket) => {
        socket.emit("set user", {iduser: user.iduser, username: user.forenames + ' ' + user.surname})
    }

    const rejection = (data) => {
        switch (data.message) {
            case 'already connected':
                setAlreadyConnected(true)
                break;
            default:
        }
    }

    const receiveMessage = (data) => {
        let newMessage = {
            iduser: data.iduser,
            idadmins: data.idadmins,
            type: 'received',
            idmessage: data.idmessage,
            message: data.message,
            timestamp: Date.now(),
        }

        addMessage(newMessage);

        socket.emit("client-delivery", {idadmins: data.idadmins, iduser: data.iduser, idmessage: data.idmessage, status: 'delivered'})
    }

    const goOnline = (data) => {
        setChatBuddy({
            idadmins: data.idadmins,
            username: data.username
        })

        setOnline(true);
        setDisabled(false);
    }

    const goOffline = () => {
        setOnline(false);
        setChatBuddy(null);
        setDisabled(true);  
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const onSubmitMessage = (e) => {
        e.preventDefault();

        let newMessage = {
            iduser: user.iduser,
            idadmins: chatBuddy.idadmins,
            type: 'sent',
            idmessage: uuid(),
            message: messageRef.current,
            timestamp: Date.now()
        }

        addMessage(newMessage);

        socket.emit("client-send", newMessage);
        setMessage('');
    }

    const addMessage = (msg) => {
        setMessages(prev => ({
            messages: prev.messages.concat(msg)
        }));
    }

    if (alreadyConnected) {
        return (
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12 py-2">
                    <h2>Live Chat: Duplicate window</h2>
                    <p>You have another active chat in another tab, window or browser. Please close this tab.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12 py-2">
                <h2>
                    Live Chat: { online ? 
                                   <span><span className="text-capitalize">{chatBuddy.username}</span> is online</span> : <span>Please wait for assistance</span>
                                }
                </h2>
                <div className="border border-primary rounded p-3">
                    {
                        messages && messages.messages.map((message) => {
                            return <Message key={message.idmessage} message={message} />
                        })
                    }
                    <div>
                        <form onSubmit={onSubmitMessage}>
                            <div className="form-group">
                                <textarea className="form-control" id="message" placeholder="Write message" rows="2" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary float-right" disabled={disabled}>Send</button>
                            <div style={{clear:'both'}}></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Message = ({message}) => {
    if (message.type === 'sent') {
        return (
            <div>
                <div className="float-right text-right mb-1">
                    <p className="border border-primary rounded py-1 px-2 m-0 ml-2">{message.message}</p>
                    <p className="m-0"><small><span className="font-weight-bold">{message.status && message.status}</span>, {moment(message.timestamp).fromNow()}</small></p>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    } else { 
        return (
            <div>
                <div className="float-left mb-1">
                    <p className="border border-primary rounded py-1 px-2 m-0 mr-2">{message.message}</p>
                    <p className="m-0"><small>{moment(message.timestamp).fromNow()}</small></p>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

export default LiveChatClient;