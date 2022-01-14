import {NextPage} from "next";
import styles from "../styles/SearchBar.module.css"
import {ChangeEvent, SyntheticEvent, useState} from "react";

const SearchBar: NextPage<SearchBarProps> = ({addToList}): JSX.Element => {

    const [search, setSearch] = useState("");
    const initialState: SearchResult[] = []
    const [searchResults, setSearchResults] = useState(initialState);

    const handleChange = async (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        setSearch(value);
        setSearchResults([]);
        if (value.length > 1) {
            await fetch(`https://localhost:7206/movies/search?queryString=${value}&searchExternal=false`)
                .then(res => res.json())
                .then(json => {
                    let searchResults: SearchResult[] = [];
                    json.forEach((j: SearchResult) => {
                        searchResults.push(j)
                        console.log(j)
                    })
                    setSearchResults(searchResults);
                });
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let res = await fetch(`https://localhost:7206/movies/search?queryString=${search}&searchExternal=true`)
            .then(res => res.json())
            .then(json => {
                let searchResults: SearchResult[] = [];
                json.forEach((j: SearchResult) => {
                    searchResults.push(j)
                })
                setSearchResults(searchResults);
            });
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input id="search" name="search" type="text" value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <div className={styles.searchResults}>
                { searchResults.length > 0 ?
                    <ul>
                        {
                            searchResults.map((result: SearchResult) => <li key={result.imdbID}><img
                            className={styles.poster} src={result.poster}/>{result.title}<span onClick={(e) => addToList(result.imdbID)}>+</span></li>)}
                    </ul>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

type SearchResult = {
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

type SearchBarProps = {
    addToList: (imdbID: string) => Promise<void>
}

export default SearchBar