import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import {useEffect, useState} from "react";

const Home: NextPage = () => {
    const initialState: Movie[] = []
    const [listMovies, setListMovies] = useState(initialState);

    useEffect(() =>{
        fetch('https://localhost:7206/lists/007f3edb-9704-4398-873f-fd3a1c9f42cf')
            .then(res => res.json())
            .then(json => {
                let dbListMovies: Movie[] = [];
                json.movies.forEach((j: Movie) => {
                    dbListMovies.push(j)
                })
                setListMovies(dbListMovies);
            })
    }, [])

    const addToList = async (imdbID: string) => {
        let body = {
            "listId": "007f3edb-9704-4398-873f-fd3a1c9f42cf",
            "movieId": imdbID
        }

        console.log(body)
        await fetch('https://localhost:7206/listentries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        fetch('https://localhost:7206/lists/007f3edb-9704-4398-873f-fd3a1c9f42cf')
            .then(res => res.json())
            .then(json => {
                let dbListMovies: Movie[] = [];
                json.movies.forEach((j: Movie) => {
                    dbListMovies.push(j)
                })
                setListMovies(dbListMovies);
            })
    }

  return (
    <div className={styles.container}>
        <Head>
            <title>Movie Watch List</title>
            <meta name="description" content="A place to create movie watch lists" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <h1>Movie Watch List</h1>
            <SearchBar addToList={addToList}/>
            <List listMovies={listMovies}/>
        </main>
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

export default Home
