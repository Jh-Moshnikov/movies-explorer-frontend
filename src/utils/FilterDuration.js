import { SHORT_MOVIE_DURATION } from './constants';

export default function FilterDuration(movies) {
    return movies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION);
};