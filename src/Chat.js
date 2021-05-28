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
import emailService from './services/emailService'
import {Modal,Button,TextInput} from './components'
import { FormControl, FormControlLabel, Grid } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';




function Chat() {
    const [input, setInput] = useState("");
    const [seed, setseed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [openModal, setOpenModal] = useState(false)
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    


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




    const handleCloseModal = () => {
        setOpenModal(false)
    }
    
    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleSaveOption = () => {
        console.log(subject,text);
        saveMail({
            from:user.email,
            subject:subject,
            text:text
        });
        setSubject("");
        setText("");
        setOpenModal(false)
    }


    const subjectChange=(e)=>{
        setSubject(e.target.value);
    }

    const textChange=(e)=>{
        setText(e.target.value);
    }




    const sendMessage= (e)=>{
        e.preventDefault();
        console.log("You type >>> ",input);
        saveMessage({
            message: input,
            name: user.displayName
        })
        setInput('');
       
    };


    const bodyModal = (
        <>
          <h3 id="simple-modal-title">Enviar un Correo</h3>
          <Grid container spacing={3} direction="row" justify="center" style={{ marginTop: 5 }}>
            
          <Grid item xs={12} md={12}>
                <TextInput
                    fullWidth
                    label="Subject"
                    name="subject"
                    onChange={subjectChange}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <TextInput
                    fullWidth
                    label="Texto"
                    name="texto"
                    multiline
                    rows={4}
                    onChange={textChange}
                />
            </Grid>
            
            <Grid item >
              <Button variant="outlined" onClick={handleCloseModal}>CANCELAR</Button>
            </Grid>
            <Grid item >
              <Button variant="contained" onClick={handleSaveOption}>ACEPTAR</Button>
            </Grid>
          </Grid>
        </>
      );

    const saveMessage = async (body) => {
        let response = await messageService.sendMessage(body);
        console.log(response.data);
      }

    const saveMail = async (body) => {
        let response = await emailService.sendMail(body);
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
                <IconButton  onClick={() => handleOpenModal()}>
                    <MailIcon/>
                </IconButton>
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
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
                {bodyModal}
            </Modal>
        </div>
    )
}

export default Chat
