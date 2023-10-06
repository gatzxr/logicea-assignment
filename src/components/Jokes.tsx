import clsx from 'clsx';
import { format } from 'date-fns';
import { Link, useSearchParams } from 'react-router-dom';

import useGetJokesQuery, { Joke } from 'api/useGetJokesQuery';

import { PrimaryButton } from './Buttons';
import Table, { ColumnOption } from './Table';
import TableControls from './TableControls';
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
      joke.author ? joke.author.replace(/(@.+)(\..+$)/, '@***$2') : '-'
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
  const [queryParams, setQueryParams] = useSearchParams({
    page: '1',
    limit: '10'
  });

  const { data: jokes, isLoading: isLoadingJokes } = useGetJokesQuery({
    page: queryParams.get('page') as string,
    limit: queryParams.get('limit') as string
  });

  return (
    <div className="p-10">
      <PrimaryButton>
        <Link to="/jokes/new">Add new joke</Link>
      </PrimaryButton>
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center">
        {isLoadingJokes ? (
          <span className="text-xl dark:text-white">Loading...</span>
        ) : (
          <>
            <Table columns={columns} data={jokes || []} />
            {jokes?.length === 0 && <span>No results</span>}
          </>
        )}
        <div className="mt-5 flex justify-center gap-4">
          <TableControls
            currentPage={queryParams.get('page') as string}
            currentLimit={queryParams.get('limit') as string}
            prevDisabled={queryParams.get('page') === '1'}
            nextDisabled={
              !jokes ||
              jokes.length < parseInt(queryParams.get('limit') as string, 10)
            }
            onPageUpdate={(value: string) =>
              setQueryParams((prev) => ({
                limit: prev.get('limit') as string,
                page: value
              }))
            }
            onLimitUpdate={(value: string) =>
              setQueryParams({
                page: '1',
                limit: value
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Jokes);
