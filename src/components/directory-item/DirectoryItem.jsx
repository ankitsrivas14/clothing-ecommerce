//CSS
import './DirectoryItem.scss'

function DirectoryItem({ category }) {
    return (
        <div className="directory-item-container" key={category.id}>
            <div 
                className="background-image" 
                style={{backgroundImage: `url(${category.imageUrl})`}}
            >
            </div>
            <div className="body">
            <h2>{category.title}</h2>
            <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem