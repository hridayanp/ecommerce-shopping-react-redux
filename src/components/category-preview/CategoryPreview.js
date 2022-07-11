import React from 'react'
import { ProductCard } from '../product-card/ProductCard'
import { Link } from 'react-router-dom'
import { CategoryPreviewContainer, CategoryPreviewView } from './category-preview.styles'

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link to={title} className='title'>{title.toUpperCase()}</Link>
            </h2>
            <CategoryPreviewView>
                {
                    products.filter((_, idx) => {
                        return idx < 4
                    }).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </CategoryPreviewView>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview