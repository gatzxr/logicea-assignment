import clsx from 'clsx';
import { format } from 'date-fns';
import { Link, useSearchParams } from 'react-router-dom';

import Table, { ColumnOption } from 'components/Table';
import TableControls from 'components/Table/TableControls';

import useGetJokesQuery, { Joke } from 'api/useGetJokesQuery';

import { PrimaryButton } from '../Buttons';
import Spinner from '../Spinner';
import withAuth from '../withAuth';

function Jokes() {
  const [queryParams, setQueryParams] = useSearchParams({
    page: '1',
    limit: '10'
  });

  const { data: jokes, isLoading: isLoadingJokes } = useGetJokesQuery({
    page: queryParams.get('page')!,
    limit: queryParams.get('limit')!
  });

  const columns: ColumnOption<Joke>[] = [
    {
      columnTitle: 'Title',
      renderCell: (joke: Joke) => (
        <Link
          to={`/jokes/${joke.id}`}
          className="font-bold"
          data-cy="joke-title"
          state={{
            page: queryParams.get('page')!,
            limit: queryParams.get('limit')!
          }}
        >
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

  return (
    <div className="p-10">
      <Link to="/jokes/new">
        <PrimaryButton text="Add new joke" />
      </Link>
      <div className="mt-10 flex min-h-[700px] w-full flex-col items-center justify-between">
        {isLoadingJokes ? (
          <Spinner size="lg" />
        ) : (
          <>
            <Table columns={columns} data={jokes || []} />
            {jokes?.length === 0 && (
              <span className="dark:text-white">No results</span>
            )}
          </>
        )}
        <div className="mt-5 flex justify-center gap-4">
          <TableControls
            currentPage={queryParams.get('page')!}
            currentLimit={queryParams.get('limit')!}
            prevDisabled={queryParams.get('page') === '1'}
            nextDisabled={
              !jokes || jokes.length < parseInt(queryParams.get('limit')!, 10)
            }
            onPageUpdate={(value: string) =>
              setQueryParams((prev) => ({
                limit: prev.get('limit')!,
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
