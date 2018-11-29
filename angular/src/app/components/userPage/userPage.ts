import {Component} from '@angular/core';
import {Product} from '../../types/product';


@Component({
  selector: 'userPage',
  templateUrl: './userPage.html',
  styleUrls: ['./userPage.css']
})
export class UserPage {
  loaded = false;
  products: Array<Product>;
  error = '';
  message = '';

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

    fetch('/api/items')
      .then(res=>res.json())
      .then(items=>{
        this.products = items.map(item=>{
          item.selected = false;
          return item;
        });
        this.products.sort(compare)
        this.loaded = true;
      })
      .catch(console.error)
  }

  checkError(response){
    if(response.message){
      this.error = response.message;
      throw Error(response.statusText);
    }
    return response
  }

  submitCart(event){
    if(event) event.preventDefault();

    const items = this.products.filter(p=>p.selected).map(p=>p._id)

    fetch('/api/user/purchase', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(items)
    })
      .then(res=>res.json())
      .then(res=>this.checkError(res))
      .then(()=>{
        this.message = 'Success';
        this.updateProducts()
      })
      .catch(console.error)
  }

  toggleProduct(event){
    if(event) event.preventDefault();

    const id = event.target.getAttribute('data-target-id')
    console.log('toggling ' + id)

    for(let product of this.products)
      if(product._id === id)
        product.selected = !product.selected

    console.log(this.products)
  }
}
