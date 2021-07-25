import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
    return (
        <div>
            <Head>
                <title>Zulu</title>
                <meta name="zulu" content="zulu web app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Nav />

            <Results results={results} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const genre = context.query.genre;

    const req = await fetch(
        `https://api.themoviedb.org/3${
            requests[genre]?.url || requests.fetchTrending.url
        }`
    );

    const res = await req.json();

    return {
        props: {
            results: res.results,
        },
    };
}
