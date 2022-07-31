import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { CategoriesPreview } from '../categories-preview/categories-preview';
import Category from '../category/category';

export const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');

            dispatch({
                type: 'category/SET_CATEGORIES',
                payload: categoriesArray,
            })
        };
        getCategories();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}
