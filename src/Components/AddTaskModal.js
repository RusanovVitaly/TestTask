import React from 'react';

export default ({handleInputChange,handleSubmit,closeModal,warning})=>{
    return(
        <div className='modal-wrapper' >
            <div className='modal-layout' onClick={()=>closeModal()}/>
        <div className='modal-container'>
            <div className='task-item_header'>
                <div className='task_item_header_text'><p>Краткое описание:</p></div>
            </div>
            <form className='modal-form' onSubmit={(e)=>{
                handleSubmit(e,'create')
            }}>
                <input className='modal_input' type="text" onChange={(event)=>handleInputChange(event.target.value)}/>
                <div style={{textAlign:"center",margin:'10px',color:'red'}}>{warning}</div>
                <input className='modal_button blue' type="submit" value="Создать"/>
            </form>
        </div>
        </div>
    )
}