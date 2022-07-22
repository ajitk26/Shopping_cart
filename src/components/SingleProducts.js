import React from 'react'
import {Button, Card} from "react-bootstrap"
import { CartState } from '../context/Context';
import Rating from './Rating'

const SingleProducts = ({pro }) => {

  const {state:{cart},dispatch,}=CartState();
  return (
    <div className='products'>
      <Card>

        <Card.Img variant='top' src={pro.image} alt={pro.name} />
        <Card.Body>
          <Card.Title>{pro.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom:10}}>
            <span>₹ {pro.price.split(".")[0]}</span>
            <div>
            <Rating rating={pro.ratings} />

            </div>
             
          </Card.Subtitle>

          {
            cart.some((p)=>p.id===pro.id) ?  (

              <Button onClick={()=>{
                dispatch({
                  type:'REMOVE_FROM_CART',
                  payload:pro,
                })
              }} variant="danger">Remove from cart</Button>

            ):(
              <Button onClick={()=>{
                dispatch({
                  type:'ADD_TO_CART',
                  payload:pro,
                });
              }} disabled={!pro.inStock}>{!pro.inStock ? "Out of stock" :" Add to cart"}</Button>

            )
          }
         

          
        </Card.Body>

      </Card>
    </div>
  )
}

export default SingleProducts