import React from "react";

export default ({id,title,onEdit,onDelete,url,openSidebar})=>{
    return(
        <div className='task-container'>
            <div className='task-item_header'>
                <div className='task_item_header_text'><p>Номер задачи: {id}</p></div>
            </div>
            <div className='task_item_container'>

                <div className='task_item'>{title}</div>
                <div style={{color:"blue",fontSize:"12px",cursor:'pointer'}} onClick={()=>openSidebar({title:id,text:title})}>Показать полностью...</div>
            </div>
            <div className='task_item_container_buttons'>
                <div className='task_item'><input className='task_button blue' type="button" value='Изменить' onClick={() => {
                    onEdit(id,title)
                }}/></div>
                <div className='task_item'><input className='task_button red' type="button" value='Удалить' onClick={() => {
                    onDelete(id, url)
                }}/></div>
            </div>
        </div>
    )
}