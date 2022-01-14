import {NextPage} from "next";
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";

const List: NextPage<ListProps> = ({listMovies}) => {

    return(
        <div>
            { listMovies.length > 0 ?
                <ul>
                    {listMovies.map((movie: Movie) => <li key={movie.imdbID}><img
                        src={movie.poster}/>{movie.title}</li>)}
                </ul>
                :
                <></>
            }
        </div>
    )
}

type Movie = {
    title: string,
    year: number,
    rated: string,
    released: string,
    runtime: string,
    genre: string,
    director: string,
    writer: string,
    actors: string,
    plot: string,
    language: string,
    country: string,
    awards: string,
    poster: string,
    ratings: string,
    rottenTomatoesScore: string,
    metaScore: string,
    imdbRating: number,
    imdbVotes: string,
    imdbID: string,
    type: string,
    boxOffice: string,
    modified: Date,
}

type Rating = {
    source: string,
    value: string
}

type ListProps = {
    listMovies: Movie[]
}

export default List