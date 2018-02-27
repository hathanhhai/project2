import React, { Component } from 'react';
class TaskItem extends Component {
    onChangeStatus(e){
       this.props.onChangeStatus(e);
    }
    onDeleteTask(e){
        this.props.onDeleteTask(e);
    }
    onUpdate = ()=>{
        this.props.onUpdate(this.props.id);
    }
  render() {
      var {name,index,status,id} = this.props;
      var _status = status ? 'Kích hoạt' : 'Ẩn';
     
    return (
        <tr>
        <td>{index}</td>
        <td>{name}</td>
        <td className="text-center">
            <span className={status ? 'label label-success' : 'label label-danger'}
            onClick={(e)=>{this.onChangeStatus(id)}}
            >
                        {_status}
                    </span>
        </td>
        <td className="text-center">
            <button type="button" className="btn btn-warning"
            onClick={this.onUpdate}
            >
                <span className="fa fa-pencil mr-5"></span>Sửa
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger"
            onClick={(e)=>this.onDeleteTask(id)}
            >
                <span className="fa fa-trash mr-5"></span>Xóa
            </button>
        </td>
    </tr>
    );
  }
}

export default TaskItem;
