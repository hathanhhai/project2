import React, { Component } from 'react';


class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            status:false
        }
    }
    //khoi tao chay ban dau
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status
            });
            
        }
    }

    //cap nhap lai props moi thay doi dc gia chi
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id:nextProps.task.id,
                name:nextProps.task.name,
                status:nextProps.task.status
            });
            
        }else if(nextProps && !nextProps.task){
            this.setState({id:'',name:'',status:false})
        }
    }

    onChange = (e) =>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if(name==='status'){
            value = target.value === 'true'? true: false;
        }
        this.setState({[name]:value});
    }

    onSubmitForm =(event)=>{
       event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
    }

    onClear =()=>{
        this.setState({name:'',status:false})
        this.props.onClear(false);
    }

  render() {
      var {id} = this.state;
      var title = id ? 'Sửa công viêc ' : 'Thêm công việc';
    return (
        <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">{title}<span
             onClick={()=>{this.props.onCloseForm(false)}} 
            className="fa fa-close pull-right"></span></h3>
               
        </div>
        <div className="panel-body">
            <form onSubmit={this.onSubmitForm}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input name="name" type="text" className="form-control"
                    value={this.state.name}
                    onChange={this.onChange}
                     />
                </div>
                <label>Trạng Thái :</label>
                <select name="status" className="form-control" required="required"
                value={this.state.status}
                    onChange={this.onChange}
                >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                </select>
                <br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                    <button onClick={this.onClear} type="button" className="btn btn-danger">Hủy Bỏ</button>
                </div>
            </form>
        </div>
     </div>
    );
  }
}

export default TaskForm;
