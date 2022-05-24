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

function App() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [total_pages, setTotal] = useState(0)

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
    const filteredAfterSearch = (searchItem) => {
        let filtered = data.filter(i => i.name.toLowerCase().includes(searchItem.toLowerCase())) //"Venera" >> "venera"
        return filtered //[{},{}]
    }
    const updatePage = (pageNumber) => {
        setPage(pageNumber)
        setDataLoaded(false)
        console.log(pageNumber)
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="mb-5">
                    <Input onChange={handleChange}
                    />
                </div>

                <PaginationForMovieData total_pages={total_pages} updatePage={updatePage} page={page} />
                {
                    !dataLoaded ? <Spinner>
                        Loading...
                    </Spinner> : filteredAfterSearch(search).map(star => {
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
                                    <Button size="small">show more..</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default App;

