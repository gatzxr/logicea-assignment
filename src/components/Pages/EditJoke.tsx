import { format } from 'date-fns';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LabelInput } from 'components/Inputs';

import useCreateJokeQuery from 'api/useCreateJokeMutation';
import useDeleteJokeQuery from 'api/useDeleteJokeMutation';
import useGetJokeQuery, { Joke } from 'api/useGetJokeQuery';
import useUpdateJokeQuery from 'api/useUpdateJokeMutation';

import useToaster from 'hooks/useToaster';

import { DeleteButton, PrimaryButton } from '../Buttons';
import withAuth from '../withAuth';

interface IEditJoke {
  isNew: boolean;
}

type JokeFormValues = Omit<Joke, 'id'>;

function EditJoke({ isNew }: IEditJoke) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toastError, toastSuccess } = useToaster();

  const { data, isLoading: isLoadingJoke } = useGetJokeQuery(id!, {
    enabled: !!id,
    onError: () => {
      toastError('Error fetching joke!');
    }
  });
  const { mutateAsync: updateJokeAsync, isLoading: isLoadingUpdate } =
    useUpdateJokeQuery(id!);
  const { mutateAsync: createJokeAsync, isLoading: isLoadingCreate } =
    useCreateJokeQuery();
  const { mutateAsync: deleteJokeAsync, isLoading: isLoadingDelete } =
    useDeleteJokeQuery();

  const [formValues, setFormValues] = useState<JokeFormValues>({
    author: '',
    createdAt: '',
    title: '',
    body: '',
    views: 0
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        author: data.author,
        createdAt: data.createdAt,
        title: data.title,
        body: data.body,
        views: data.views
      });
    }
  }, [data]);

  const onValueChange = (name: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (isNew) {
        await createJokeAsync(formValues);
      } else {
        await updateJokeAsync(formValues);
      }
      toastSuccess(`Joke ${isNew ? 'created' : 'updated'} successfully`);
    } catch (error) {
      toastError(
        `Something went wrong when ${isNew ? 'creating' : 'updating'} joke!`
      );
    }
  };

  const onDelete = async () => {
    try {
      await deleteJokeAsync(id!);
      toastSuccess('Joke deleted successfully');
    } catch (error) {
      toastError(`Something went wrong when deleting joke!`);
    }
  };

  return (
    <div className="h-full p-10">
      <div className="flex gap-2.5">
        <PrimaryButton text="Go back" onClick={() => navigate(-1)} />
        {!isNew && id && (
          <DeleteButton
            text="Delete"
            onClick={onDelete}
            isLoading={isLoadingDelete}
            disabled={isLoadingJoke}
          />
        )}
      </div>
      <div className="flex h-full items-center justify-center">
        <form className="max-w-[50%]" onSubmit={onSubmit}>
          <LabelInput
            title="Title"
            isLoading={isLoadingJoke}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onValueChange('title', e.target.value)
            }
            value={formValues.title}
            type="text"
            id="title"
            placeholder="Type title"
            required
          />
          <LabelInput
            title="Author"
            isLoading={isLoadingJoke}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onValueChange('author', e.target.value)
            }
            value={formValues.author}
            type="email"
            id="author"
            placeholder="Type email"
            required
          />
          <LabelInput
            title="Created Date"
            isLoading={isLoadingJoke}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onValueChange('createdAt', e.target.value)
            }
            value={
              formValues.createdAt
                ? format(new Date(formValues.createdAt), 'yyyy-MM-dd')
                : ''
            }
            type="date"
            id="createdAt"
            placeholder="Type views"
            required
          />
          <LabelInput
            title="Views"
            isLoading={isLoadingJoke}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onValueChange('views', e.target.value)
            }
            value={formValues.views || ''}
            type="number"
            id="views"
            placeholder="Type views"
            required
          />
          <PrimaryButton
            type="submit"
            text="Submit"
            disabled={isLoadingDelete}
            isLoading={isLoadingUpdate || isLoadingCreate || isLoadingJoke}
          />
        </form>
      </div>
    </div>
  );
}

export default withAuth(EditJoke);
