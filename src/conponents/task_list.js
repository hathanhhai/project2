import React, { Component } from 'react';
import TaskItem from './task_item'
class TaskList extends Component {

    constructor(props){
        super(props);
        this.state = {
            filter :'',
            filterStatus: -1
        }
    }
    onChange = (e) =>{
        var target =e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        }) 
        this.props.onFilter(name === 'filter' ? value : this.state.filter , 
         name === 'filterStatus' ? value : this.state.filterStatus);
    }

    onChangeStatus= (value)=>{
        this.props.onChangeStatus(value);
    }

    onDeleteTask = (value)=>{
        this.props.onDeleteTask(value);
    }

  render() {
      var {tasks} = this.props;
      var {filter,filterStatus} = this.state;
      var elementTask = tasks.map((item,index)=>{
          return <TaskItem
           onChangeStatus={this.onChangeStatus}
            onDeleteTask={this.onDeleteTask}
            onUpdate={this.props.onUpdate}
             id={item.id} key={item.id} index={index} name={item.name} status={item.status} />
      })
    return (
        <table className="table table-bordered table-hover mt-15">
        <thead>
            <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td></td>
                <td>
                    <input type="text" className="form-control"
                        value={filter}
                        name="filter"
                        onChange={this.onChange}
                     />
                </td>
                <td>
                    <select className="form-control"
                    value={filterStatus}
                        onChange={this.onChange}
                        name="filterStatus"
                    >
                        <option value="-1">Tất Cả</option>
                        <option value="0">Ẩn</option>
                        <option value="1">Kích Hoạt</option>
                    </select>
                </td>
                <td></td>
            </tr>

            {elementTask}
           

        </tbody>
    </table>
    );
  }
}

export default TaskList;
