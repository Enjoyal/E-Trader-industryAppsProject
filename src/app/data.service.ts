import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  categories:any=[];  

  constructor() {
    // this.getDetails()
   }

  saveDetails(){
    if (this.categories) {
      localStorage.setItem('categories', JSON.stringify(this.categories))
    }
  }

  getDetails(){
    if (this.categories) {
      this.categories= JSON.parse(localStorage.getItem('categories') || '')
      return this.categories
      
    }
  }




  addCategory(category:any){
    var categories=this.categories
    
    categories.push(category);
    this.saveDetails();
    
    return categories
  }


  deleteCategory(currentCategory:any){
    
    this.categories= this.categories.filter((i:any)=> i.title!=currentCategory);
    this.saveDetails()
    return  this.categories;
    
  }

  // editCategory(){

  // }

  updateCategory(eCateName:any,currentCategory:any){

    for(let i in this.categories){
      if (this.categories[i].title==currentCategory) {
        this.categories[i].title=eCateName;
      }
      
    }
    this.saveDetails()
    return this.categories
  }


  selectAll(isAllChecked:any){
    this.categories=this.categories.map((c:any)=> {
      c.isChecked=isAllChecked 
      return c
  })
    return  this.categories;

  }

  selectOne(isChecked:any,currentCategory:any){

    this.categories= this.categories.map((c:any)=>{
      if(c.title==currentCategory){
      c.isChecked=isChecked
      return c
      }

      return c
    })
    return  this.categories;

  }

  deleteAll(){
    this.categories=this.categories.filter((c:any)=> c.isChecked==false)
    this.saveDetails();
    return this.categories
  }


}
