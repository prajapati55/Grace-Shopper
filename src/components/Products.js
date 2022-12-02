import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Paper, TextField } from '@mui/material';
import { deleteProduct } from '../api';

const Products = ({ products, user,token, fetchProducts}) => {
    console.log(user,"user")
    const [searchTerm, setSearchTerm] = useState('');
    function productMatches(products, string) {
        const { 
            
            title,
            description,
       
             } = products;
            //  console.log(products)
        if (title.toLowerCase().includes(string.toLowerCase()) || description.toLowerCase().includes(string.toLowerCase())) {
            return products;
        }
    }
    const filteredProducts = products.filter(product => productMatches(product, searchTerm));
    const productsToDisplay = searchTerm.length ? filteredProducts : products;

    return (
        <Card style={{
            padding: '.5rem',
            margin: '.5rem',
            background: '#247BA0'
                }} elevation={6} >
            <div className="main-product-div">
                <div >
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                        <Card style={{ 
                            padding: '.5rem',
                             margin: '.5rem',
                              background: '#C3B299'
                               }} >
                            <TextField style={{ 
                                width: '100%',
                                 background: '#FFFCFF'
                                 }}
                                type='text'
                                label='Search'
                                onChange={(event) => setSearchTerm(event.target.value)}
                            ></TextField>
                        </Card>
                    </form>

                </div>
                <div>
                    {user.isAdmin ? (
<div>
                        <Link style={{
                             textDecoration: 'none'
                             }} to='/products/add-product'><Button
                            style={{
                             height: '4rem',
                             width: '100%',
                             borderRadius: 15,
                             background: '#001242'
                             }}
                            variant='contained'
                            type='submit'>
                            + ADD Product
                        </Button></Link>

                         
</div>
                    ) : (
                        null
                    )}
                    {
                        productsToDisplay.map((product) => {
                            console.log(product)
                            const { 
                                id, 
                                title,
                                description,
                                price,
                                count } = product;

                            return (
                                <Card key={id} style={{
                                    padding: '.5rem',
                                    margin: '.5rem',
                                    background: '#FFFCFF'
                                    }}>
                                    <div  >
                                        <Link  style={{
                                                textDecoration: 'none'
                                                        }}
                                                        to={`/products/${id}`}>
                                                        <h3>{title}</h3></Link>
                                                        <p>Description: {description}</p>
                                                        <p>Price: ${price}</p>
                                                        <p>Count: {count}</p>
                                    </div>
                                    {user.isAdmin ?
                                    <div>
                                    <Link key={id}
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                    to={`/products/edit-products/${id}`}
                                ><Button
                                    style={{
                                        height: '3rem',
                                        margin: '.25rem',
                                        width: '100%',
                                        borderRadius: 15,
                                        backgroundColor: ' #50514F'
                                    }}
                                    variant='contained'
                                    type='submit'>Edit Product
                                    </Button> </Link>
                                    
                                <Button
                                    style={{
                                        height: '3rem',
                                        margin: '.25rem',
                                        width: '100%',
                                        borderRadius: 15,
                                        backgroundColor: ' #50514F'
                                    }}
                                    variant='contained'
                                    type='submit' onClick={async () => {
                                        await deleteProduct(token, id)
                                        fetchProducts()
                                    }}>Delete Product
                                    </Button> 
                                    </div>:
                                    null}
                                    
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </Card>
    )



}

export default Products;