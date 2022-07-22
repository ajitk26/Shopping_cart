import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai';
import { CartState} from '../context/Context'
import Rating from './Rating';



const Cart = () => {

  const {state:{cart}, dispatch}= CartState();

  const [total,setTotal]=useState();
  
  useEffect(() => {

    setTotal(cart.reduce((acc,curr)=> acc + Number(curr.price)*curr.qty,0 ));
    
  },[cart])
  

  return (
   
   
    <div className='home'>

      <div className='productContainer'>
        <ListGroup>
          { 

          
            cart.map(pro=>(

              <ListGroup.Item key={pro.id}>

              <Row>
                <Col md={2}>
                  <Image src={pro.image}  alt={pro.name} fluid rounded  />

                </Col>
                <Col md={2}>

                  <span>{pro.name} </span>
                </Col>
                <Col md={2}> ₹{pro.price}</Col>
                 
                 <Col md={2}>
                    <Rating rating={pro.ratings}></Rating>
                </Col>

                <Col md={2}>
                <Form.Control
                    as="select"
                    value={pro.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: pro.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(pro.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={2}>
                  <Button 
                    type="button"
                    variant="light"
                    onClick={()=>
                    dispatch({
                      type:'REMOVE_FROM_CART',
                      payload:pro,
                    })
                  
                  } > 
                   <AiFillDelete fontSize="20px"/>
                  </Button>
                
                </Col>
              </Row>


              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'>Subtotal ({cart.length} items) </span>

        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>

      </div>

    </div>


  )
}

export default Cart