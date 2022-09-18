//REACT
import { useNavigate } from 'react-router-dom'

//CSS
import {DirectoryItemContainer, BackgroundImage, Body} from './DirectoryItem.styles.jsx'

function DirectoryItem({ category }) {

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(category.route)

    return (
        <DirectoryItemContainer key={category.id} onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={category.imageUrl} />
            <Body>
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem