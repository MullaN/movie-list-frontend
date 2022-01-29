import {NextPage} from "next";
import styles from "../styles/SearchBar.module.css";

const SearchResult: NextPage<SearchResultProps> = ({searchResult, addToList}) => {
    return (
        <div className={styles.searchResult}>
            <div className={styles.poster}>
                <img src={searchResult.poster}/>
            </div>
            <div className={styles.description}>
                <span>Title: {searchResult.title}</span>
                <span>Year: {searchResult.year}</span>
                <span>Runtime: {searchResult.runtime}</span>
                <span>imdb Rating: {searchResult.imdbRating}</span>
            </div>
            <div className={styles.add}>
                <span onClick={(e) => addToList(searchResult.imdbID)}>+</span>
            </div>
        </div>
    )
}

type SearchResultProps = {
    searchResult: Movie,
    addToList: (imdbID: string) => Promise<void>
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
    ratings: Rating[],
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

export default SearchResult