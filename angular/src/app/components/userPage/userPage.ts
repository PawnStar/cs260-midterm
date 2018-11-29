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
