import { useContext } from 'react';
import {ThemeContext} from '../../App';
import './style.css';
const ThemeButton = ()=>{
    const {theme, setTheme} = useContext(ThemeContext);
    console.log(theme, setTheme);
    console.log(theme, setTheme, "theme and settheme")
    return (
        <div>
            <button 
            style={theme ? {backgroundColor:'#12343b'} : {}}
            onClick={()=> setTheme(!theme)}
            className="theme-button">Change Theme</button>
        </div>
    )
}
export default ThemeButton;