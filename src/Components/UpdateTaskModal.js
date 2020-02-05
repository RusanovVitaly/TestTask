import React from 'react';

export default ({handleInputChange,handleSubmit,closeModal,title,id})=>{
    return(
        <div className='modal-wrapper' >
            <div className='modal-layout' onClick={()=>closeModal()}/>
        <div className='modal-container'>
            <div className='task-item_header'>
                <div className='task_item_header_text'><p>Номер задачи: {id}</p></div>
            </div>
            <form className='modal-form' onSubmit={(e)=>{
                handleSubmit(e,'update').then(()=> closeModal());
            }}>
                <input className='modal_input' type="text" value={title} onChange={(event)=>handleInputChange(event.target.value)}/>
                <input className='modal_button blue' type="submit" value="Изменить"/>
            </form>
        </div>
        </div>
    )}
