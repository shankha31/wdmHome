import React from 'react'
import "./taskDetails.css"
import { useNavigate } from 'react-router-dom'
const TaskDeatils = () => {
    const navigate = useNavigate()

    const onBackBtn = () => {
        navigate(-1)
    }

    return (
        <div className='deatailsContainer'>
            <h2 onClick={onBackBtn} style={{ cursor: "pointer" }}>Back To Tasks</h2>
            <h1>Task Name: Login Page</h1>
            <p>Task Descriprion: Cretae a login Page using email and password</p>
            <p>Task DeadLine: 2 Days </p>
            <p>Task FeedBack: It is Good </p>
        </div>
    )
}

export default TaskDeatils