import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { CategoriesContext } from '../../contexts/categories.context'
import { ProductCard } from '../../components/product-card/ProductCard'
import { CategoryContainer, Title } from './category.styles'
import { selectCategoriesMap } from '../../store/categories/category.selector'

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const { category } = useParams()
    // const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <Title>{category}</Title>
            <CategoryContainer>

                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </CategoryContainer>
        </>

    )
}

export default Category