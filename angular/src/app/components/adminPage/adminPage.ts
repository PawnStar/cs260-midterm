import {Component} from '@angular/core';
import {Product} from '../../types/product';

@Component({
  selector: 'adminPage',
  templateUrl: './adminPage.html',
  styleUrls: ['./adminPage.css']
})
export class AdminPage {
  loaded = false;
  products: Array<Product>;
  p_name = '';
  p_price = '';
  p_image = '';
  error = '';

  ngOnInit(){
    this.updateProducts()
  }

  updateProducts(){
    const compare = function(a,b){
      if(a.name < b.name)
        return -1;
      if(a.name > b.name)
        return 1;
      return 0;
    }

    fetch('/api/items?count=true')
      .then(res=>res.json())
      .then(items=>{
        this.products = items;
        this.products.sort(compare)
        this.loaded = true;
      })
      .catch(console.error)
  }

  removeProduct(event){
    if(event) event.preventDefault();

    const id = event.target.getAttribute('data-target-id')
    console.log('removing ' + id)

    fetch('/api/items/delete/' + id, {method: 'POST'})
      .then(res=>res.json())
      .then(res=>this.checkError(res))
      .then(()=>this.updateProducts())
      .catch(console.error)
  }

  checkError(response){
    if(response.message){
      this.error = response.message;
      throw Error(response.statusText);
    }
    return response
  }

  createProduct(event){
    const product = {
      name: this.p_name,
      price: this.p_price,
      image: this.p_image
    }

    this.error = '';

    fetch('/api/items/create', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(product)
    })
      .then(res=>res.json())
      .then(res=>this.checkError(res))
      .then(()=>this.updateProducts())
      .catch(console.error)
  }

  updateParam(param: string, value: string){
    this[param] = value
  }
}
