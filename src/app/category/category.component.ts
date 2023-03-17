import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categories:any=[]
  categoryOptions:any=[]

  cateName:any
  cateImg:any
  currentCategory:any
  isEdit:any=false;
  isChecked:any
  isCheckedall:any=false;
  option:any='Name'

  constructor( private ds: DataService, private router:Router) { }

  ngOnInit(): void {
    this.categories= this.ds.getDetails();
    this.categoryOptions= this.ds.getDetails();

    this.isEdit=false;
    this.isCheckedall=false;
  }

  setImage(e:any){
    console.log(this.cateImg);
    this.cateImg=e.target.files[0].name;
    console.log(this.cateImg);
    
  }

  onAdd(){
    this.isEdit=false;
    this.cateName=''
    this.cateImg=''

  }

  AddCategory(){
    if (this.cateName && this.cateImg) {
      
    const category={
      title:this.cateName,
      image:this.cateImg,
      isChecked:false
    }

    this.categories = this.ds.addCategory({ title:this.cateName,
      image:this.cateImg,
      isChecked:false});
    console.log(this.categories,'Allcategories#');
    
    this.cateName=''
    this.cateImg=''
  }
  else{
    alert('Please enter category name and image');
   }

        


  }

  onDelete(id:any){
    this.currentCategory=this.categories[id].title
    console.log(this.currentCategory,'currentCategory#');

    this.categories = this.ds.deleteCategory(this.currentCategory);
    console.log(this.categories,'allCategories#');
    
  }

  onEdit(id:any){
    this.isEdit=true;

    this.currentCategory=this.categories[id].title
    console.log(this.currentCategory);
    

    this.cateName=this.currentCategory; 

    // this.currentCategory=this.ds.editCategory();


    
  }

  onUpdate(){
    var eCateName=this.cateName
    this.categories= this.ds.updateCategory(eCateName, this.currentCategory);
    console.log(this.categories,'allcateAfterEdit#');

    this.cateName=''

  }

  onSelectall(e:any){
    
    this.isCheckedall=e.target.checked
   
    this.categories=this.ds.selectAll(this.isCheckedall);
    console.log(this.categories);

  }

  onSelect(e:any){
    this.currentCategory=e.target.value
    this.isChecked=e.target.checked;

    console.log(this.currentCategory);
    
    this.categories=this.ds.selectOne(this.isChecked,this.currentCategory);
    console.log(this.categories,'categoriesSelected');
    
  }

  onDeleteAll(){
    this.categories=this.ds.deleteAll();
    // window.location.reload()

  }

  allCategories(){
    this.categories=this.ds.getDetails();
  }

  sortByCategory(title:any){

    this.option=title;
    console.log(this.option,'option#');

    this.categories=this.ds.getDetails();     //getting recent saved categories
    this.categories=this.categories.filter((c:any)=> c.title==this.option)

    console.log(this.categories,'sortedCategory#');
    
    

  }

}
