import React, { Component, Fragment } from "react";
import axios from 'axios';
 
class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_surname: '',
      employee_id: '',
      employee_type: 'RADNIKUNABAVCI'

  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    
  }

  
  handleDelete(event){
    event.preventDefault();
    axios.delete(`http://localhost:9005/employee/delete`, {data:{
      id:this.state.employee_id,
      nameSurname:this.state.name_surname,
      typeOfEmployee:this.state.employee_type
    }})
      .then(res => {
        alert('User obrisan');
      })
      .catch(error => {
        console.log(error)
    });;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('Name: ' + this.state.name_surname+'; Sifra: '+this.state.employee_id+"; select: "+this.state.employee_type);
    event.preventDefault();
    axios.post(`http://localhost:9005/employee/save`, {
      id:this.state.employee_id,
      nameSurname:this.state.name_surname,
      typeOfEmployee:this.state.employee_type
    })
      .then(res => {
        alert('User sacuvan');
      })
      .catch(error => {
        console.log(error)
    });;
  }

  handleAlternate(event) {
    event.preventDefault();  
    const handle = this.state.employee_id;
    axios.get(`http://localhost:9005/employee/returnById/${handle}`)
      .then(res => {
        if(res.data!=null){
          alert('sve ok');
          console.log(res.data)
          this.setState({
            name_surname:res.data.nameSurname,
            employee_type:res.data.typeOfEmployee
          });
        }
        else
          alert('Ne postoji user');
      })
      .catch(error => {
        console.log(error)
    });;
    
  }

  render() {
    return (
      <Fragment>
      <div>
				<h2 class = "title">Radnik/</h2>
			</div>
			<form onSubmit={this.handleSubmit}>
      
      <div class="form-group">
						<div class="col-sm-12">
							<div class="row">
								<label class="col-md-4 control-label" for="employee_id">Šifra radnika</label>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-sm-12">
							<div class="row">
								<div class="col-sm-4">
									<input id="employee_id" name="employee_id" type="text" class="form-control input-md inputform" onChange={this.handleChange}  value={this.state.employee_id}/>
								</div>
								<div class="col-sm-2">
                  
									<button id="findemployee" onClick={this.handleAlternate.bind(this)} name="findemployee" class="btn btn-secondary">Pronađi</button>
								</div>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label class="col-md-4 control-label" for="name_surname">Ime i prezime</label>
						<div class="col-md-4">
							<input id="name_surname" name="name_surname" type="text" class="form-control input-md inputform" onChange={this.handleChange} value={this.state.name_surname} />
						</div>
					</div>

					<div class="form-group">
						<label class="col-md-4 control-label" for="employee_type">Tip radnika</label>
						<div class="col-md-4">
							<select id="employee_type" name="employee_type" class="form-control inputform" multiple={false} onChange={this.handleChange} value={this.state.employee_type}>
								<option value="RADNIKUNABAVCI">Radnik u nabavci</option>
								<option value="RADNIKUMAGACINU">Radnik u magacinu</option>
								<option value="RADNIKUSERVISU">Radnik u servisu</option>
							</select>
						</div>
					</div>

					<div class="form-group">
						<div class="col-md-8">
							<div class="row">
              <input type="submit" value="Submit" />
								<button id="delete_form" type="button" class="btn btn-secondary" onClick={this.handleDelete.bind(this)}>Obriši</button>
							</div>
						</div>
					</div>
    </form>
    </Fragment>
    );
  }
}
 
export default Employee;