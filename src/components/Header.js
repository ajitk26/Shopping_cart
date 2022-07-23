import React from 'react'
import { Container, Dropdown, FormControl, Navbar,Badge,Nav, Button } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import {FaShoppingCart} from "react-icons/fa"
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'
import logo from "../logo.png"

const Header = () => {

  const {
    state:{cart},
    dispatch,
    productDispatch
  }= CartState();
  return (
    <Navbar className='nav' variant='dark'>
        <Container>
            <Navbar.Brand>
                <Link to='/'><img src={logo} alt='logo'></img></Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl style={{width:400}}

                placeholder='Search Product'

                className='m-auto'

                onChange={(e)=>{
                  productDispatch({
                    type:"FILTER_BY_SEARCH",
                    payload:e.target.value,
                  })
                }
                
                }
                /> 
            </Navbar.Text>
            <Nav>
              <Dropdown className='ml-auto'>
                <Dropdown.Toggle variant="success">
                    <FaShoppingCart color="white" fontSize="25px"/>
                  <Badge>{cart.length}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{minWidth:370}}>
                  
                  {cart.length > 0 ?(
                    <>
                    {
                      cart.map((pro)=>(
                        <span className='cartItem' key={pro.id}>

                          <img 

                          src={pro.image}
                          className='cartItemImg'
                          alt={pro.name}
                          />
                          <div className='cartItemDetail'>
                            <span>{pro.name}</span>
                            <span>₹{pro.price.split(".")[0]}</span>

                          </div>
                          <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: pro,
                          })
                        }
                      />
                          
                        </span>
                      ))
                    }
                    <Link to="/cart">
                      <Button style={{width:"95%", margin:"0 10px"}}>
                        Go to Cart 
                      </Button>
                    </Link>
                    </>
                  ):(<span style={{padding:10}}>Cart is Empty </span>)}
                  
                  
                </Dropdown.Menu>

              </Dropdown>
            </Nav>
        </Container>

    </Navbar>
  )
}

export default Header