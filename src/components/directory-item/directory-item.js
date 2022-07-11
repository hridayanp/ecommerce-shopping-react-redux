import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

export const DirectoryItem = ({ category }) => {
    const { title, imageUrl, linkUrl } = category;

    const navigate = useNavigate();
    const onNavigateHandler = () => {
        navigate(linkUrl);
    }

    return (
        <DirectoryItemContainer onClick={() => onNavigateHandler()}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    )
}
