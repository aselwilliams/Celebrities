// pagination
// searching with debounce
// modal
// sorting based on name or popularity
// sorting based on gender 

import { useState, useEffect } from "react";
import { Spinner, Button, Input } from "reactstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PaginationForMovieData from "./Pagination";
import {FaArrowAltCircleDown,FaArrowAltCircleUp} from 'react-icons/fa';
import ModalComp from './ModalComp';
// import DebounceInput from 'debounce'


function App() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [total_pages, setTotal] = useState(0)
    const [sortByPopularity,setSortByPopularity]=useState('desc')
    const [modalDataToBeShown,setModalData]=useState('')
    const [openModal, setOpenModal]=useState(false)

    const header = "https://image.tmdb.org/t/p/w185/"

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=df8b08ecb436696fee41a00f8d87a540&language=en&page=${page}`)
            .then(res => res.json())
            .then(finalData => {
                setDataLoaded(true)
                setTotal(finalData.total_pages)
                setData(finalData.results)
            })
            .catch(err => console.log(err.status_message))
    }, [page])
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    // const filteredAfterSearch=()=>{
    //     let filtered=data.filter(i=>i.name.toLowercase().includes(search.toLowerCase()))
    //     return filtered;
    // }

    const sortData=()=>{
        let sorted=data.sort((a,b)=>sortByPopularity==='desc' ? b.popularity-a.popularity : a.popularity-b.popularity)
        return sorted;//[asc] [desc]
    }

    const filteredAfterSearch = () => {
        let filtered = sortData(data).filter(i => i.name.toLowerCase().includes(search.toLowerCase())) //"Venera" >> "venera"
        return filtered //[{},{}]
    }
    const updatePage = (pageNumber) => {
        setPage(pageNumber)
        setDataLoaded(false)
        console.log(pageNumber)
    }

    const handleSortingByPopularity=()=>{
        if(sortByPopularity==='desc'){
            setSortByPopularity('asc')
        } else {
            setSortByPopularity('desc')
        }
    }
const handleModal=(modalId)=>{
    let modalData=data.filter(i=>i.id===modalId[0])
    setModalData(modalData)
    setOpenModal(true)
}
const handleClose=()=>{
    setOpenModal(false)
}
    const handleKeyDown=()=>{

    }
console.log(search)
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="mb-5">
                    <Input onChange={handleChange} onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='d-flex justify-content-between'>
                <PaginationForMovieData total_pages={total_pages} updatePage={updatePage} page={page} />
                <div onClick={handleSortingByPopularity}>
                    <span className='me-3'><strong>Sort by Popularity</strong></span>
                    {sortByPopularity==='desc' ?
                    <FaArrowAltCircleDown size='28px'/> :
                    <FaArrowAltCircleUp size='28px' />
                }    
                </div>
        
                </div>
                {
                    !dataLoaded ? <Spinner>
                        Loading...
                    </Spinner> : filteredAfterSearch().map(star => {
                        let knownFor = star.known_for.map(i => i.original_title || i.original_name) //star.known_for:[{original_title:},{original_title},{}]
                        return (

                            <Card sx={{ maxWidth: 345 }} key={star.id} className='col-12 col-lg-3'>
                                <CardMedia
                                    component="img"
                                    alt={star.name}
                                    // height="240"
                                    image={`${header}${star.profile_path}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {star.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <h6>known for:</h6>  {knownFor.join(", ")}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={()=>handleModal(star.id)}>show more..</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
                {modalDataToBeShown && <BasicModal handleClose={handleClose}/>}
            </div>
        </div>
    )
}
export default App;

