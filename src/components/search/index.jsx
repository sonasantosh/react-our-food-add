import { useContext, useEffect, useState } from 'react';
import './style.css';
import { ThemeContext } from '../../App';


const Search = (props)=>{
    const {theme} = useContext(ThemeContext)
    console.log(props);

    const {getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess} = props;

    const [inputValue, setInputValue] = useState('');

    const handleInputValue = (event)=>{
        const {value} = event.target;
        setInputValue(value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        getDataFromSearchComponent(inputValue);
    }

    useEffect(() => {
        if(apiCalledSuccess){
            setInputValue('');
            setApiCalledSuccess(false);
        }
    }, [apiCalledSuccess, setApiCalledSuccess])
    

    return (
        <form onSubmit={handleSubmit} className="search">
            <input type="text" onChange={handleInputValue} value={inputValue} name="search" placeholder="Search Recipes" id="searchRecipes" />
            <button style={theme ? {backgroundColor:"#12343b"}:{}} type="submit" >Search</button>
        </form>
    );
}
export default Search