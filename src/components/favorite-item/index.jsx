import { useContext } from 'react';
import './style.css';
import { ThemeContext } from '../../App';
const FavoriteItem = (props) => {

    const {id, image, title, removeFromFavorites} = props;
    const {theme} = useContext(ThemeContext);

    console.log(props, 'favorite item props');
  return (<div key={id} className="favorite-item">
    <div>
        <img src={image} alt={title} />
    </div>
    <p style={theme ? {color:"#12343b"}:{}}>{title}</p>
    <button type='button' style={theme ? {backgroundColor:"#12343b"}:{}} onClick={removeFromFavorites}>Remove from favorites</button>
  </div>);
};
export default FavoriteItem;
