import React from 'react'
import './category.scss'
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import { ProductCard } from '../../components/product-card/ProductCard'

const Category = () => {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <h2 className='category-title'>{category}</h2>
            <div className='category-container'>

                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </>

    )
}

export default Category