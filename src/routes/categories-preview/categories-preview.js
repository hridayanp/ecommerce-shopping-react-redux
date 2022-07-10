import { useContext } from "react"
import CategoryPreview from "../../components/category-preview/CategoryPreview"
import { CategoriesContext } from "../../contexts/categories.context"

export const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)

    return (
        <>
            {
                Object.keys(categoriesMap).map((title, index) => {
                    return <CategoryPreview key={index} title={title} products={categoriesMap[title]} />
                })
            }
        </>
    )
}
