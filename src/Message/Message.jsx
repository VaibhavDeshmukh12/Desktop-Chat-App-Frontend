import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../Redux/Message/Message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudiNary } from '../utils/UploadToCloudinary';
import SockJS from 'sockjs-client';
import Stom from 'stompjs'
import { Navigate, useNavigate } from 'react-router-dom';

function Message() {

    const dispatch = useDispatch();
    const { message, auth } = useSelector(store => store);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        dispatch(getAllChats())
    }, [])

    // console.log("--chats--", message.chats)

    const handleSelectImage = async (e) => {
        setLoading(true);
        console.log('handle select image :>> ');
        const imgUrl = await uploadToCloudiNary(e.target.files[0], "image");
        setSelectedImage(imgUrl);
        setLoading(false);
    }

    const handleCreateMessage = (value) => {
        const message = {
            chatId: currentChat?.chat_id,
            content: value,
            image: selectedImage
        }
        dispatch(createMessage({message,sendMessageToServer}));
    }

    useEffect(() => {
        setMessages([...messages, message.message]);
    }, [message.message]);

    const [stompClient,setStompClient] = useState(null);

    useEffect(()=>{
        const sock = new SockJS("http://localhost:9090/ws");
        const stomp = Stom.over(sock);
        setStompClient(stomp);
        stomp.connect({},onConnect,onErr);
    },[])

    const onConnect = () =>{
        console.log("Websocket connected")
    }
    const onErr = (error) =>{
        console.log("Websocket error: ",error);
    }
    const navigate = useNavigate();

    useEffect(()=>{
        if(stompClient && auth.user && currentChat){
            console.log("inside useEffect");
            const subscription = stompClient.subscribe(`/user/${currentChat.chat_id}/private`,onMessageReceive);
        }
    });

    const sendMessageToServer = (newMessage) =>{
        if(stompClient && newMessage){
            stompClient.send(`/app/chat/${currentChat?.chat_id.toString()}`,{},JSON.stringify(newMessage));
        }
        console.log('outside if block sendMessageToServer ',newMessage);
        console.log(" stompClient ",stompClient);
    }

    const onMessageReceive = (payload) =>{
        console.log('payload :>> ', payload);
        const receivedMessage = JSON.parse(payload.body);
        console.log("Message received from Websocket: ",receivedMessage);
        setMessages([...messages,receivedMessage]);
    }

    useEffect(()=>{
        if(chatContainerRef.current){
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    },[messages]);

    return (
        <div>
            <Grid container className='h-screen overflow-y-hidden'>
                <Grid className='px-5' item xs={3}>
                    <div className="flex justify-between h-full space-x-2">
                        <div className='w-full'>
                            <div className="flex items-center py-5 space-x-4">
                                <WestIcon onClick={()=>navigate("/")} />
                                <h1 className='text-xl font-bold'>Home</h1>
                            </div>
                            <div className='h-[83vh]'>
                                <div className=''>
                                    <SearchUser />
                                </div>
                                <div className='overflow-y-scroll h-full space-y-4 hideScrollbar mt-5'>
                                    {
                                        message.chats.map((item) => {
                                            return <div key={item.chat_id} onClick={() => {
                                                setCurrentChat(item);
                                                setMessages(item.messages);
                                            }}>
                                                <UserChatCard chat={item} key={item.chat_id} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid className='h-full' item xs={9}>
                    {currentChat ? <div>
                        <div className='flex justify-between items-center border-l p-5'>
                            <div className="flex items-center space-x-3">
                                <Avatar src='https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600' />
                                <p>{auth.user?.id === currentChat.users[0]?.id ? currentChat.users[1].fname + " " + currentChat.users[1].lname : currentChat.users[0].fname + " " + currentChat.users[0].lname}</p>
                            </div>

                            <div className='flex space-x-3'>
                                <IconButton >
                                    <AddIcCallIcon />
                                </IconButton>

                                <IconButton >
                                    <VideoCallIcon />
                                </IconButton>
                            </div>
                        </div>

                        <div ref={chatContainerRef} className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
                            {messages.map((item) => <ChatMessage item={item} key={item.chat_id} />)}
                        </div>
                        <div className='sticky bottom-0 border-l'>
                            <div className='py-5 flex items-center justify-center space-x-5'>
                                {selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt="" />}
                                <input
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter" && e.target.value) {
                                            handleCreateMessage(e.target.value);
                                            setSelectedImage("")
                                            e.target.value=""
                                        }
                                    }}
                                    className='bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5'
                                    placeholder="Type message.."
                                    type="text" />

                                <div>
                                    <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id="image-input" />
                                    <label htmlFor="image-input"><AddPhotoAlternateIcon /></label>
                                </div>

                            </div>
                        </div>
                    </div> :
                        <div className='flex h-full space-y-5 flex-col justify-center items-center'>
                            <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
                            <p className='text-xl font-semibold'>No chat selected</p>
                        </div>
                    }
                </Grid>
            </Grid>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    )
}

export default Message
