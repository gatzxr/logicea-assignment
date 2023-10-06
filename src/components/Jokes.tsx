import clsx from 'clsx';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import useGetJokesQuery, { Joke } from 'api/useGetJokesQuery';

import Table, { ColumnOption } from './Table';
import withAuth from './withAuth';

const columns: ColumnOption<Joke>[] = [
  {
    columnTitle: 'Title',
    renderCell: (joke: Joke) => (
      <Link to={`/jokes/${joke.id}`} className="font-bold">
        {joke.title}
      </Link>
    )
  },
  {
    columnTitle: 'Author',
    renderCell: (joke: Joke) =>
      joke.author ? joke.author.replace(/(@.+)(\..+$)/, '@**$2') : '-'
  },
  {
    columnTitle: 'Created Date',
    renderCell: (joke: Joke) =>
      joke.createdAt ? format(new Date(joke.createdAt), 'dd MMM yyyy') : '-'
  },
  {
    columnTitle: 'Views',
    renderCell: (joke: Joke) => (
      <span
        className={clsx({
          'text-[tomato]': joke.views >= 0 && joke.views <= 25,
          'text-[orange]': joke.views >= 26 && joke.views <= 50,
          'text-[yellow]': joke.views >= 51 && joke.views <= 75,
          'text-[green]': joke.views >= 76 && joke.views <= 100
        })}
      >
        {joke.views ?? '-'}
      </span>
    )
  }
];

function Jokes() {
  const { data: jokes, isLoading: isLoadingJokes } = useGetJokesQuery({
    page: 1,
    limit: 10
  });

  if (isLoadingJokes) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Table columns={columns} data={jokes || []} />
    </div>
  );
}

export default withAuth(Jokes);
