import { Avatar,IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined} from '@material-ui/icons';
import React,{ useState, useEffect } from 'react'
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom'
import "./Chat.css"
import db from './firebase';
import {useStateValue} from "./StateProvider";
import firebase from 'firebase';
import messageService from './services/messageService'





function Chat() {
    const [input, setInput] = useState("");
    const [seed, setseed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();


    useEffect(()=>{
        if(roomId){
            db.collection('room').doc(roomId).onSnapshot(snapshot =>{
                setRoomName(snapshot.data().name);
            })
            db.collection('room').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot =>{  
                setMessages(snapshot.docs.map(doc=>doc.data()));
            });
        }

    },    
    )

    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000));
    },[roomId])


    const sendMessage= (e)=>{
        e.preventDefault();
        console.log("You type >>> ",input);
        // db.collection('room').doc(roomId).collection('messages').add({
        //     message: input,
        //     name: user.displayName,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // })
        saveMessage({
            message: input,
            name: user.displayName
        })
        setInput('');
       
    };

    const saveMessage = async (body) => {
        let response = await messageService.sendMessage(body);
        console.log(response.data);
      }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div id="list" className="chat__body">
                {messages.map(message=>(
                       <p className={`chat__message ${ message.name == user.displayName && 'chat__reciever'}`}>
                       <span className="chat__name">
                          {message.name}
                       </span>
                       {message.message}
                       <span className="chat__timestamp">
                           {new Date(message?.timestamp.toDate()).toUTCString()}
                       </span>
                   </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={e=>setInput(e.target
                        .value)} type="text" placeholder="Type a message"/>
                    <button  onClick={sendMessage}type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
