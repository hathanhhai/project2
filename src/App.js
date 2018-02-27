import React, { Component } from 'react';
import './App.css'
import TaskForm from './conponents/task_form'
import Control from './conponents/control'
import TaskList from './conponents/task_list'
import {findIndex} from 'lodash'
//  
class App extends Component {
    
    constructor(props){
        super(props);
         this.state = {
             tasks:[],
             isDisplayform:false,
             taskEditing:null,
             filter:{
                 name:'',
                 status:-1
             },
             keyword:'',
             sortBy:'name',
                value:1
             
         }
    }
    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({tasks:tasks})
        }

    }

    onGenerateData = ()=>{
        
            var tasks =[
                {
                    id:this.GererateID(),
                    name:'Ha Thanh Hai',
                    status:true
                },
                {
                    id:this.GererateID(),
                    name:'Ha Quang Tuan ',
                    status:false 
                },
                {
                    id:this.GererateID(),
                    name:'Ha Duy Quang',
                    status:true
                },
            ];
            this.setState({tasks:tasks});
            localStorage.setItem('tasks',JSON.stringify(tasks));
           
    }

    //display form
    onDisplayForm = ()=>{
        if(this.state.isDisplayform  && this.state.taskEditing !== null){
            this.setState({isDisplayform:true,taskEditing:null});
        }else{

            this.setState({isDisplayform:!this.state.isDisplayform,taskEditing:null});
        }
    }

    GererateID(){
        var random =require("randomstring");
        return random.generate();
    }
    
    onCloseForm = (value)=>{
      this.setState({isDisplayform:false});
    }
    onShowForm = (value)=>{
        this.setState({isDisplayform:true});
      }
    onSubmit = (value)=>{
        var {tasks} =this.state;
        if(value.id){
            var index = findIndex(value.id);
            tasks[index] = value;

        }else{
            value.id = this.GererateID();
            tasks.push(value);
        }
       
        this.setState({
            tasks:tasks,
            taskEditing:null
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    onChangeStatus= (value)=>{
            var {tasks} =this.state;
            tasks.forEach((item,index)=>{
                if(item.id === value){
                    item.status = !item.status
                }
            });
            this.setState({tasks:tasks})
            localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    
    onDeleteTask = (value)=>{
        var {tasks,isDisplayform} =this.state;
        var index = findIndex(value);
        tasks.splice(index,1);
            this.setState({tasks:tasks})
            localStorage.setItem('tasks',JSON.stringify(tasks));
            isDisplayform ? this.onCloseForm() : null;
    }
    onUpdate = (value) =>{
        var {tasks} =this.state;
        var index = findIndex(value);
        var taskEditing= tasks[index];
        this.setState({taskEditing:taskEditing})
        this.onShowForm();
    }


    //filter
    onFilter = (filter,filterStatus)=>{
        filterStatus = parseInt(filterStatus);
        this.setState({filter:{
            name:filter.toLowerCase(),
            status:filterStatus
        }})
    }

    onSearch = (value)=>{
        this.setState({keyword:value.toLowerCase()});
    }

    onSort = (name,value)=>{
        this.setState({sortBy:name,value:value});
        
    }

  render() {
      var {tasks,isDisplayform,taskEditing,filter,keyword,sortBy,value} =this.state;
      if(filter){
          if(filter.name){
              tasks= tasks.filter((item)=>{
                  return item.name.toLowerCase().indexOf(filter.name) !== -1
              })
          }
          
              tasks  = tasks.filter((item)=>{
                if(filter.status === -1) return item;
                else{
                    return item.status === (filter.status  === 1 ? true : false)
                }
              })
          
      }


      //search
      if(keyword){
        tasks = tasks.filter((item)=>{
            if(keyword){
                return item.name.toLowerCase().indexOf(keyword) !== -1;
            }else{
                return item;
            }
        });
      }

     
      var taskFormUI = isDisplayform ? 
            <TaskForm 
            task={taskEditing}
            onCloseForm={this.onCloseForm}
            onSubmit={this.onSubmit}
            onClear={this.onCloseForm}
            /> : null;

      //sort
      if(sortBy === 'name'){
          tasks.sort((a,b)=>{
              if(a.name > b.name) return value;
              else if (a.name < b.name) return -value;
              else return 0;
          })
      }else{
        tasks.sort((a,b)=>{
            if(a.status > b.status) return -value;
            else if (a.status < b.status) return value;
            else return 0;
        })
      }

    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">

            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {taskFormUI}
            </div>

            <div className={isDisplayform ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary"
                onClick={this.onDisplayForm}
                >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>&nbsp;
                <button type="button" className="btn btn-success"
                    onClick={this.onGenerateData}
                >
                    <span className="fa fa-plus mr-5"></span>Generate Data
                </button>
                <br/>
                
                <Control sortBy={sortBy} value={value} onSort={this.onSort} onSearch={this.onSearch}></Control>
               


                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList 
                        onDeleteTask={this.onDeleteTask}
                         tasks={tasks}
                          onChangeStatus={this.onChangeStatus}
                          onUpdate={this.onUpdate}
                           onFilter = {this.onFilter}
                           />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
