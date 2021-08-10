import React from 'react'
import { Card, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
const Product = ({product}) => {
    return (
        <div>
            <Card className="m-2 p-3 rounded"style={{ width: '18rem',height:'25rem' }}>
             <NavLink as={Link} to={`/product/${product._id}`}><Card.Img src={product.image} variant="top" style={{ width: '15rem',height:'11rem' }}/></NavLink>   
             <NavLink as={Link} to={`/product/${product._id}`}><Card.Body>
                    <Card.Title as="div">
                        <strong>{product.title}</strong>
                    </Card.Title>
                    <Card.Title as="div">
                        <Ratings rating={product.rating} reviews={product.reviews} />
                    </Card.Title>

                    <Card.Text>$ {product.price}</Card.Text>
                </Card.Body></NavLink>   


            </Card>
        </div>
    )
}

export default Product
