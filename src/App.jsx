import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function fetchMoviesHandler() {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('https://swapi.dev/api/films');

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const data = await response.json();

			const transformedMovies = data.results.map(result => {
				return {
					id: result.episode_id,
					title: result.title,
					openingText: result.opening_crawl,
					releaseDate: result.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
				{isLoading && <p>Loading...</p>}
				{!isLoading && error && <p>{error}</p>}
			</section>
		</React.Fragment>
	);
}

export default App;

