import React from 'react'
 
import '../Components/HomePage.css'
 
 
const HomePage = () => {
  return (
    <div>
     
      <main className="main-content">
      <div className="task-illustration">
        <img src='https://img.freepik.com/free-vector/flat-design-coworking-illustration_23-2150320692.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723075200&semt=ais_hybrid' alt="Task Management Illustration" />
        <div className='centered' style={{fontWeight:'bold'}}>WorkBuddy</div>
      </div>
      <div className="text-box">
        <p>Success at work is a journey, and the first step is managing your tasks effectively. Our platform offers a seamless task management process, helping you stay organized and focused. Start managing your tasks today and get one step closer to achieving your work goals.</p>
      </div>
    </main>
    <footer className="footer">
      <h6 style={{color:'white'}}>Contact Us</h6>
      <h6 style={{color:'white'}}>Email:example@example.com</h6>
      <h6 style={{color:'white'}}>Phone:123-456-7890</h6>
    </footer>
         
 
    </div>
  )
}
 
export default HomePage
 