import React,{useState} from 'react'
import './Search.css';

export const SearchBar = (props) => {
    const [searchTxt , updateTxt] = useState("");
    return(
        <div className="search-bar-wrapper">
                <div className="search__bar">
                    <form onSubmit={(event)=>{props.onSearchChange(searchTxt);event.preventDefault()}}>
                        <input type="text" name="search" value={searchTxt} placeholder="Search for images here..." onChange={(e)=>updateTxt(e.target.value)} />                
                        <button type="submit" className="search-icon"></button>
                    </form>                    
                </div>
        </div>
    )
}
