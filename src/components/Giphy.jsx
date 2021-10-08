import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Giphy.css';
import Pagination from './Pagination';
import searchicon from '../images/searchicon.png';

const Giphy = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        const fetchData = async () => {
            const results = await axios('https://api.giphy.com/v1/gifs/trending', {
                params: {
                    api_key: 'VeOEx0CEKeyYaMugklzs09duRus8NW9Z'
                }
            })
            console.log(results.data.data);
            setData(results.data.data);
        }
        fetchData();
    }, [])

    const handleSearch = async () => {
        const results = await axios('https://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: 'VeOEx0CEKeyYaMugklzs09duRus8NW9Z',
                q: search
            }
        })
        setData(results.data.data);
    }
    
    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="main">
            <div className= "container">
                <img style= {{marginTop: '-20px', marginLeft: '-10px'}} src={'https://media.giphy.com/media/1n9xKwR6fKqI0X7t9I/giphy.gif'} height= '50' width= '50'alt="" />
                <span><h1 className="giphy"><b>GIPHY</b></h1></span><br />
                <input type="text" placeholder="Search all the GIF's" value= {search} onChange= {(e) => setSearch(e.target.value)} />
                <span><img style= {{backgroundColor: 'pink', display: 'inline-block', marginTop: '-4px'}} onClick= {() => handleSearch()} src= {searchicon} height= '40' width= '40'alt="" /></span><br /><br />

                <h6 style= {{color: 'white'}}>Trending GIF's</h6>

                {currentItems.map((item, index) => {
                    return (
                        <img style= {{margin: '5px'}} key= {index} src= {item.images.fixed_height.url} alt= "" />
                    )
                })}
            </div>

            <div className= "container">
                <Pagination currentPage={currentPage} itemsPerPage= {itemsPerPage} 
                    totalItems= {data.length} pageSelected= {pageSelected} />
            </div>
        </div>
    );
}

export default Giphy
