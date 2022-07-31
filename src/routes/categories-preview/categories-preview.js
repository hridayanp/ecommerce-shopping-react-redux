import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/CategoryPreview"
import { selectCategoriesMap } from "../../store/categories/category.selector"
// import { CategoriesContext } from "../../contexts/categories.context"

export const CategoriesPreview = () => {
    // const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
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
