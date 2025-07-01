import React from 'react';
import { Typography } from '../../../components/ui';
import { MovieCard } from './MovieCard';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movieId: string) => void;
  showTitle?: boolean;
  title?: string;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  onMovieClick,
  showTitle = true,
  title = '豆瓣电影排行榜',
}) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <Typography variant="muted">暂无符合条件的电影</Typography>
      </div>
    );
  }

  return (
    <div>
      {showTitle && (
        <Typography variant="h2" className="mb-4">
          {title}
        </Typography>
      )}
      
      <div className="grid gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
}; 