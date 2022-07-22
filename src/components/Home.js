import React from 'react'
import { CartState } from '../context/Context'
import SingleProducts from './SingleProducts';
import Filters from "./Filters";
import "./style.css"


const Home = () => {

  const {state:{products},
  productState:{byStock,byRating,sort,searchQuery}

}=CartState();

  const transformProducts=()=>{
    let sortedProducts=products;

    if(sort){
      sortedProducts=sortedProducts.sort((a,b)=>(
        sort==='lowToHigh'? a.price-b.price :b.price- a.price
      ));
    }
    if(!byStock){
      sortedProducts=sortedProducts.filter((pro)=>pro.inStock);
    }

    if(byRating){
      sortedProducts=sortedProducts.filter((pro)=>pro.ratings>=byRating)
    }

    if(searchQuery){
      sortedProducts=sortedProducts.filter((pro)=>pro.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }

  return (
    <div className='home'>

      <Filters/>
     <div className='productContainer'>

      {
        transformProducts().map((pro)=>{
          return <SingleProducts pro={pro} key={pro.id}/>
        })
      }
     </div>

    </div>
  )
}

export default Home 