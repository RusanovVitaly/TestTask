import React from 'react';

export default ({content,isSidebarOpen,closeSidebar})=>(
    <div className={isSidebarOpen?'sidebar-wrapper':''}>
        <div className='sidebar-title'>
            Номер задачи: {content.title} <div style={{marginLeft:'15px',cursor:"pointer",color:'red'}} onClick={()=>closeSidebar()}>X</div>
        </div>
        <div className='sidebar-content'>
            {content.text}
        </div>
    </div>
)