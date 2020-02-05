import React from 'react';
import axios from 'axios';
import Task from './Task';
import AddTaskModal from './AddTaskModal';
import UpdateTaskModal from "./UpdateTaskModal";
import Sidebar from './Sidebar';

const API_MAIN_URL = "https://test.megapolis-it.ru/api/list";
class MainPage extends React.Component{

    state = {
        currentTasks:[],
        isModalCreateOpen:false,
        isModalUpdateOpen:false,
        title:'',
        id:'',
        content:{},
        isSidebarOpen:false
    };

    getTasks = (url)=>{
        axios.get(url,{})
            .then(response => {
                this.setState({currentTasks:response.data.data});
                console.log(response.data.data);
            });
    };
    createTask = (title,url) =>{
        axios.post(url,{
            title:title
        })
            .then(response =>{
                console.log(response);
                this.setState({currentTasks:[...this.state.currentTasks,{id:response.data.id,title:title}]},
                    ()=>this.setState({title:''}))
            })
            .catch(err =>{if(!err.success){
                console.log("Ну не может быть заголовок пустым!")
            }})
    };
    deleteTask = (id,url) =>{
        axios.delete(url+`/${id}`)
            .then(response => {
                if(response.data.success) {
                    const tasks = this.state.currentTasks.filter((task) => task.id !== id);
                    this.setState({currentTasks: tasks});
                }
            })
    };
    updateTask = (id,title,url)=>{
        axios.post(`${url}/${id}`,{
            title:title
        })
            .then(response => console.log(response))
            .then(()=>{
                const tasks = this.state.currentTasks;
                tasks.map(item =>{if(item.id === id)item.title = title});
                this.setState({id:id,title:title});
            })

    };
    handleInputChange = (value) =>{
       this.setState({title:value})
    };
    handleSubmit = async (event,type)=>{
        event.preventDefault();
        if (type === 'create') {
            if(this.state.title === ''){
                this.setState({warning:'Заголовок не может быть пустым!'})
            }
            else {
                this.createTask(this.state.title, API_MAIN_URL);
                this.openModalCreate();
                this.setState({warning:''})
            }
        }
        else if (type === 'update') {
            this.updateTask(this.state.id, this.state.title, API_MAIN_URL);
        }
    };
    openModalCreate = ()=>{
        this.setState({isModalCreateOpen:!this.state.isModalCreateOpen})
    };
    openModalUpdate = (id,title)=>{
        this.setState({isModalUpdateOpen:!this.state.isModalUpdateOpen,id:id,title:title});
    };
    componentDidMount() {
        this.getTasks(API_MAIN_URL);
    }
    openSidebar =(content)=>{
        this.setState({content},()=>{
            this.setState({isSidebarOpen:true});
            console.log(this.state)
        })
    };
    closeSidebar = ()=>{
        this.setState({isSidebarOpen:false});
    };

    render() {
       const {currentTasks,isModalCreateOpen,isModalUpdateOpen,content,isSidebarOpen,warning} = this.state;
        return(
            <div style={{display:"flex"}}>
                <div>
                    {isSidebarOpen ? <Sidebar closeSidebar ={this.closeSidebar} isSidebarOpen={isSidebarOpen} content={content}/> : ''}
                </div>
                <div className='main-content' style={{width:'100%'}}>
                    <div className='task-header'>
                        <div><h1>Список задач:</h1></div>
                        <input className="add-button" type="button" value='Добавить'
                               onClick={() => this.openModalCreate()}/>
                    </div>
                    {isModalCreateOpen ? <AddTaskModal
                        handleSubmit={this.handleSubmit}
                        handleInputChange={this.handleInputChange}
                        closeModal={this.openModalCreate}
                        warning={warning}
                    /> : ''}
                    {isModalUpdateOpen ? <UpdateTaskModal
                        handleSubmit={this.handleSubmit}
                        handleInputChange={this.handleInputChange}
                        closeModal={this.openModalUpdate}
                        id={this.state.id}
                        title={this.state.title}
                    /> : ''}
                    <div className='tasks-holder'>
                        {currentTasks ? this.state.currentTasks.map((item, key) => (
                            <Task title={item.title} openSidebar={this.openSidebar} id={item.id} key={key}
                                  onEdit={this.openModalUpdate} onDelete={this.deleteTask} url={API_MAIN_URL}/>
                        )) : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage;