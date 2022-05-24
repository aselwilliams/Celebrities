import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
function PaginationForMovieData({ page, updatePage, total_pages }) {
    return (
        <Pagination>
            <PaginationItem>
                <PaginationLink
                    first
                    href="#"
                    onClick={()=>updatePage(1)}
                />
            </PaginationItem>
            <PaginationItem disabled={page > 1 ? false : true}>
                <PaginationLink
                    href="#"
                    previous

                    onClick={() => updatePage(page - 1)}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" onClick={() => updatePage(page > 5 ? page - 4 : 1)}>
                    {page > 5 ? page - 4 : 1}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" onClick={() => updatePage(page > 5 ? page - 3 : 2)}>
                    {page > 5 ? page - 3 : 2}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" onClick={() => updatePage(page > 5 ? page - 2 : 3)}>
                    {page > 5 ? page - 2 : 3}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" onClick={() => updatePage(page > 5 ? page - 1 : 4)}>
                    {page > 5 ? page - 1 : 4}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" onClick={() => updatePage(page > 5 ? page : 5)}>
                    {page > 5 ? page : 5}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={page === total_pages ? true : false}>
                <PaginationLink
                    href="#"
                    next
                    onClick={() => updatePage(page + 1)}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    href="#"
                    last
                    onClick={()=>updatePage(total_pages)}
                />
            </PaginationItem>
        </Pagination >
    )
}
export default PaginationForMovieData;