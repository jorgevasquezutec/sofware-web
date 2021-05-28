import React,{ useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat';
import db from './firebase'
import { useStateValue } from './StateProvider'
import roomService from './services/roomService'

function Sidebar() {
    
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch]=useStateValue();
    const [room,setRoom]=useState("");
    
    useEffect(() => {
        getRoom();
        getRoomInfomation();
        // return () => {
            
        // }
    
    }, [])


    const getRoomInfomation=() =>{
        // console.log("room",room);
        const unsubscribe = db.collection('room').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )
            ))
        ));
    }

    const getRoom = async () => {
        let response = await roomService.getRoom();
        console.log(response.data.room_id);
        setRoom(response?.data?.room_id);
      }
    
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            {/* <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Seach or start a new chat" type="text"></input>
                </div>
            </div> */}
            <div className="sidebar__chats">
            {/* <SidebarChat addNewChat/> */}
            {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
