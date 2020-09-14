import Axios from "axios";
import { TrendingMovies } from "./components/trendingmovies";
import { PopularMovies } from "./components/popularmovies";
import { SearchResults } from "./components/searchresults";
import { MovieDetails } from "./components/moviedetails";
import { MovieTopCast } from "./components/movietopcast";
import { MovieFacts } from "./components/moviefacts";
import { NavFooter } from "./components/navfooter";
import Navbar from "./components/navbar";

const baseURL = "https://api.themoviedb.org/3";
const config = {
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTcyYzlkZGFhNGViNmEzNjYyM2Y3MDBkMWU1MDg0ZiIsInN1YiI6IjVmNTRlZTdlYTU4OTAyMDAzNGUzNDY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rh4IcTbGvadDOEfEQ2MkYCBaNoH0aF5vQvLgJYeAFU8",
		"Content-Type": "application/json",
	},
};

export function getTrendingMovies() {
	Axios.get(`${baseURL}/trending/movie/week`, config)
		.then((res) => {
			setTimeout(runResponse, 500);
			function runResponse() {
				TrendingMovies.displayTrendingMovies(res.data.results);
				NavFooter.displayFooter();
			}
		})
		.catch((err) => console.log(err));
}

export function getPopularMovies() {
	Axios.get(`${baseURL}/movie/popular`, config)
		.then((res) => {
			Navbar.completeIntervalProgressBar();
			PopularMovies.displayPopularMovies(res.data.results);
			setTimeout(runResponse, 500);
			function runResponse() {
				PopularMovies.displayPopularMovies(res.data.results);
			}
		})
		.catch((err) => console.log(err));
}

export function getSearchMovies(searchValue) {
	Axios.get(`${baseURL}/search/movie?query=${searchValue}`, config)
		.then((res) => {
			Navbar.completeIntervalProgressBar();
			setTimeout(runResponse, 500);
			function runResponse() {
				SearchResults.displaySearchResults(res);
				NavFooter.displayFooter();
			}
		})
		.catch((err) => console.log(err));
}

export function getMovieById() {
	let movieId = sessionStorage.getItem("movieId");
	Promise.all([Axios.get(`${baseURL}/movie/${movieId}`, config), Axios.get(`${baseURL}/movie/${movieId}/credits`, config)])
		.then((res) => {
			Navbar.completeIntervalProgressBar();
			setTimeout(runResponse, 500);
			function runResponse() {
				MovieDetails.displayMovieDetails(res[0], res[1]);
				MovieTopCast.displayMovieTopCast(res[1].data.cast);
				MovieFacts.displayMovieFacts(res[0].data);
				NavFooter.displayFooter();
			}
		})
		.catch((err) => console.log(err));
}
