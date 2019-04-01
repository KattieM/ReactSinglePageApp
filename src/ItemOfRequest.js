import React, { Component, Fragment } from "react";


class ItemOfRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      product_id: '',
      product: '',
      quantity: '',
      um_id: '',
      um_name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDelete(event) {
    var id = event.target.getAttribute('id').split('_')[1];
    this.props.handleDeleteItem(id);
  }

  handleUpdate(event) {
    var id = event.target.getAttribute('id').split('_')[1];
    this.props.handleUpdateItem(id);
  }

  componentDidMount() {
    this.setState({
      id:this.props.id,
      product:this.props.product_name,
      product_id:this.props.product_id,
      quantity: this.props.quantity,
      um_id: this.props.um_id,
      um_name: this.props.um_name
    });
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    if(this.props.product_id!==prevProps.product_id || this.props.quantity!==prevProps.quantity){
      console.log("Usao");
      this.setState({
      id:this.props.id,
      product_id:this.props.product_id,
      product:this.props.product_name,
      quantity: this.props.quantity,
      um_id: this.props.um_id,
      um_name: this.props.um_name
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row rowitem" >
        <div class="col-md-2 ">
          <input
            name="order_num_table"
            type="text"
            class="form-control input-md inputform whiteInput order_num_table"
            disabled
            value={this.state.id}
            onChange={this.handleChange}
          />
        </div>
        <div class="col-md-2 ">
          <input
            name="product"
            type="text"
            class="form-control inputform whiteInput product_table"
            disabled
            value={"" || this.state.product_id}
            onChange={this.handleChange}
          />
        </div>
        <div class="col-md-2 ">
          <input
            name="unit"
            type="text"
            class="form-control inputform whiteInput unit"
            disabled
            value={"" || this.state.um_name}
            onChange={this.handleChange}
          />
        </div>
        <div class="col-md-2 ">
          <input
            name="quantity_table"
            type="text"
            class="form-control input-md inputform whiteInput quantity_table"
            disabled
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </div>
        <div class="col-md-1 ">
          <button id={"delete_"+this.state.id} name="deleteItemBtn" type="button" class="btn btn-secondary delete" onClick={this.handleDelete}>Obriši</button>
        </div>
        <div class="col-md-1 ">
          <button id={"update_"+this.state.id} name="updateItemBtn" type="button" class="btn btn-secondary update" onClick={this.handleUpdate}>Ažuriraj</button>
        </div>
        </div>
      </Fragment>
    );
  }
}

export default ItemOfRequest;