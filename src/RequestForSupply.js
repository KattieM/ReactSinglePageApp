import React, { Component, Fragment } from "react";
import axios from 'axios';
import dateFormat from 'dateformat';

class RequestForSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_id: '',
      date_of_order: '',
      date_of_delivery: '',
      employee_id: '',
      suppliers: [],
      items: [],
      units: [],
      products: [],
      quantity: '',
      product: '',
      unit: '',
      selectValue : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSaveItem = this.handleSaveItem.bind(this);

  }

  handleDelete(event) {
    event.preventDefault();
    let handle = this.state.request_id;
    axios.delete(`http://localhost:9005/request/delete/${handle}`)
      .then(res => {
        alert('Zahtev obrisan');
      })
      .catch(error => {
        console.log(error)
      });;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.name+ " "+event.target.value);
  }

  handleSubmit(event) {
    alert('Items: ' + this.state.items);
    // console.log(this.state.request_id, this.state.date_of_delivery, this.state.date_of_order, this.state.employee_id, this.state.selectValue, this.state.items);
    event.preventDefault();
    axios.post(`http://localhost:9005/request/save`, {
      id: this.state.request_id,
      dateOfDelivery: this.state.date_of_delivery,
      dateOfOrder: this.state.date_of_order,
      employeeEntity: {
        id:this.state.employee_id
      },
      supplierEntity : {id:this.state.selectValue},
      itemOfRequestEntities: this.state.items

    })
      .then(res => {
        console.log(res)
        alert('User sacuvan');
      })
      .catch(error => {
        console.log(error)
      });;
  }

  handleSaveItem(event){
    // console.log(this.state.product+" "+this.state.unit+" "+this.state.product);
    // console.log(this.state.items);
    // console.log(this.state.products);
var prod_name = '';
var unit_name = '';
    this.state.products.forEach(element => {
      if(element.value==this.state.product){
        prod_name = element.display;
      }
    });

    // console.log(prod_name);
    this.state.units.forEach(element => {
      if(element.value==this.state.unit)
      unit_name = element.display;
    });
    var newArray = this.state.items;    
    var element = {id:{orderNumber:this.state.items.length+1}, productEntity:{id:this.state.product, productName:prod_name}, unitOfMeasurementEntity:{id:this.state.unit, nameUM:unit_name}, quantity:this.state.quantity};
    // console.log(element);
    newArray.push(element);   
    this.setState({items:newArray});

    // console.log(newArray);
    
  }

  handleAlternate(event) {
    event.preventDefault();
    const handle = this.state.request_id;
    axios.get(`http://localhost:9005/request/returnById/${handle}`)
      .then(res => {
        if (res.data != null) {
          alert('sve ok');
          console.log(res.data)
          this.setState({
            date_of_order: dateFormat(res.data.dateOfOrder, "yyyy-mm-dd"),
            date_of_delivery: dateFormat(res.data.dateOfDelivery, "yyyy-mm-dd"),
            employee_id: res.data.employeeEntity.id,
            selectValue:res.data.supplierEntity.id,
            items: res.data.itemOfRequestEntities
          });
        }
        else
          alert('Ne postoji Zahtev');
      })
      .catch(error => {
        console.log(error)
      });;



  }

  componentDidMount() {
    axios.get(`http://localhost:9005/supplier/returnAll`)
      .then(res => {
        if (res.data != null) {
          let suppliersFromApi = res.data.map(supplier => { return { value: supplier.id, display: supplier.supplierName } });
          this.setState({ suppliers: [{ value: '', display: 'Dobavljaci' }].concat(suppliersFromApi) });

        }
      })
      .catch(error => {
        console.log(error)
      });

    axios.get(`http://localhost:9005/unit/returnAll`)
      .then(res => {
        if (res.data != null) {
          let UnitsFromApi = res.data.map(unit => { return { value: unit.id, display: unit.nameUM } });
          this.setState({ units: [{ value: '', display: 'Jedinice mere' }].concat(UnitsFromApi) });

        }
      })
      .catch(error => {
        console.log(error)
      });

    axios.get(`http://localhost:9005/product/returnAll`)
      .then(res => {
        if (res.data != null) {
          let ProductsFromApi = res.data.map(product => { return { value: product.id, display: product.productName } });
          this.setState({ products: [{ value: '', display: 'Proizvodi' }].concat(ProductsFromApi) });

        }
      })
      .catch(error => {
        console.log(error)
      });


  }
  render() {
    return (
      <Fragment>
        <div>
          <h2 class="title">Zahtev za nabavku/</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <div class="row">
              <div class="col-md-12">
                <label class="col-md-4 control-label" for="request_id">Šifra zahteva</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-4">
                  <input id="request_id" name="request_id" type="text" class=" form-control input-md inputform" onChange={this.handleChange} value={this.state.request_id} />
                </div>
                <div class="col-sm-2">
                  <button id="findrequest" name="findrequest" class="btn btn-secondary" onClick={this.handleAlternate.bind(this)}>Pronađi</button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-12">
              <div class="row">
                <label class="col-md-4 control-label" for="date_of_order">Datum naručivanja</label>
                <label class="col-md-4 col-md-offset-4 control-label" for="date_of_delivery">Datum slanja</label>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <input id="date_of_order" name="date_of_order" type="date" class="form-control input-md inputform" onChange={this.handleChange} value={this.state.date_of_order} />
                </div>
                <div class="col-md-4 col-md-offset-4">
                  <input id="date_of_delivery" name="date_of_delivery" type="date" class="form-control input-md inputform" onChange={this.handleChange} value={this.state.date_of_delivery} />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-12">
              <div class="row">
                <label class="col-md-4 control-label" for="employee_id">Šifra radnika</label>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <input id="employee_id" name="employee_id" type="text" class="form-control input-md inputform" onChange={this.handleChange} value={this.state.employee_id} />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="suppliers">Naziv dobavljača</label>
            <div class="col-md-4">
              <select onChange={this.handleChange} value={this.state.selectValue}>
                {this.state.suppliers.map((supplier) => <option key={supplier.value} value={supplier.value}>{supplier.display}</option>)}
              </select>

            </div>
          </div>

          <div class="form-group">
            <div class="col-md-12">
              <div class="row">
                <label class="col-md-2  control-label" for="product" >Naziv</label>
                <label class="col-md-2 col-md-offset-4 control-label" for="unit" >Jedinica mere</label>
                <label class="col-md-2  control-label" for="quantity" >Količina</label>
              </div>

              <div class="row">
                <div class="col-md-2">
                  <select onChange={this.handleChange} name= "product">
                    {this.state.products.map((product) => <option key={product.value} value={product.value}>{product.display}</option>)}
                  </select>
                </div>
                <select onChange={this.handleChange} name= "unit">
                  {this.state.units.map((unit) => <option key={unit.value} value={unit.value}>{unit.display}</option>)}
                </select>
                <div class="col-md-2" >
                  <input id="quantity" name="quantity" type="text" class="form-control input-md inputform inputRequest" onChange={this.handleChange} value={this.state.quantity}/>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-1"><button type="button" class="btn btn-secondary additem" id="additemBtn" name="additemBtn" onClick={this.handleSaveItem}>Sačuvaj</button></div>
                <div class="col-md-1"></div>
                <div class="col-md-1 ">
                  <button type="button" class="btn btn-secondary additem" id="updateItemBtn" name="updateItemBtn">Ažuriraj</button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <label class="col-md-2 control-label" for="order_num_table" >Redni broj</label>
                  <label class="col-md-2 col-md-offset-4 control-label" for="product_table" >Naziv</label>
                  <label class="col-md-2 control-label" for="unit_table">Jedinica mere</label>
                  <label class="col-md-2 col-md-offset-4 control-label" for="quantity_table">Količina</label>
                </div>

                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12 allItems" id="allItemsRow">
                      {this.state.items.map((item) =>
                        <Fragment>
                          <div class="col-md-2 ">
                            <input id="order_num_table_" name="order_num_table" type="text" class="form-control input-md inputform whiteInput" value={item.id.orderNumber} />
                          </div>
                          <div class="col-md-2 ">
                            <input id="product_table_" name="unit" class="form-control inputform whiteInput" disabled value={"" || item.productEntity.productName} />
                          </div>
                          <div class="col-md-2 ">
                            <input id="unit_" name="unit" class="form-control inputform whiteInput" disabled value={"" || item.unitOfMeasurementEntity.nameUM} />
                          </div>
                          <div class="col-md-2 ">
                            <input id="quantity_table_" name="quantity_table" type="text" class="form-control input-md inputform whiteInput" value={item.quantity} disabled />
                          </div>
                          <div class="col-md-1 ">
                            <i class="delete_icon fa fa-trash" aria-hidden="true" id="delete_icon_">
                            </i></div>
                          <div class="col-md-1 ">
                            <i class="update_icon fa fa-pen" aria-hidden="true" id="update_icon_">
                            </i></div></Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-8">
              <button type="submit" class="btn btn-secondary" form="request_form" id="save_request" onClick={this.handleSubmit.bind(this)}>Sačuvaj</button>
              <button type="button" class="btn btn-secondary" id="delete_form" onClick={this.handleDelete.bind(this)}>Obriši</button>
            </div>
          </div>

        </form>
      </Fragment>
    );
  }
}

export default RequestForSupply;