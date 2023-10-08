import clsx from 'clsx';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Table, { ColumnOption } from 'components/Table';
import TableControls from 'components/Table/TableControls';

import useGetJokesQuery, { Joke } from 'api/useGetJokesQuery';

import { PrimaryButton } from '../Buttons';
import Spinner from '../Spinner';
import withAuth from '../withAuth';

const defaultParams = {
  page: '1',
  limit: '10'
};

function Jokes() {
  const [queryParams, setQueryParams] = useSearchParams(defaultParams);
  const navigate = useNavigate();
  const { data: jokes, isLoading: isLoadingJokes } = useGetJokesQuery({
    page: queryParams.get('page')!,
    limit: queryParams.get('limit')!
  });

  useEffect(() => {
    const page = parseInt(queryParams.get('limit')!, 10);
    const limit = parseInt(queryParams.get('limit')!, 10);
    if (page <= 0 || (limit !== 5 && limit !== 10)) {
      navigate(
        `/jokes?page=${defaultParams.page}&limit=${defaultParams.limit}`
      );
    }
  }, [queryParams, navigate]);

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
      <Link
        to="/jokes/new"
        state={{
          page: queryParams.get('page')!,
          limit: queryParams.get('limit')!
        }}
      >
        <PrimaryButton text="Add new joke" />
      </Link>
      <div className="mt-10 flex min-h-[700px] w-full flex-col items-center justify-between">
        {isLoadingJokes ? (
          <Spinner size="lg" />
        ) : (
          <>
            <Table columns={columns} data={jokes.items || []} />
            {jokes.items.length === 0 && (
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
              parseInt(queryParams.get('limit')!, 10) *
                parseInt(queryParams.get('page')!, 10) >=
              jokes.totalCount
            }
            onPageUpdate={(value: string) =>
              setQueryParams((prev) => ({
                page: value,
                limit: prev.get('limit')!
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
