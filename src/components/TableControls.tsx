import { PrimaryButton } from './Buttons';
import Select from './Select';

interface ITableControls {
  currentPage: string;
  currentLimit: string;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onPageUpdate: (value: string) => void; // eslint-disable-line
  onLimitUpdate: (value: string) => void; // eslint-disable-line
}

export default function TableControls({
  currentPage,
  currentLimit,
  nextDisabled,
  prevDisabled,
  onPageUpdate,
  onLimitUpdate
}: ITableControls) {
  return (
    <>
      <PrimaryButton
        className="rounded-[50%]"
        disabled={prevDisabled}
        onClick={() => onPageUpdate((parseInt(currentPage, 10) - 1).toString())}
      >
        {'<'}
      </PrimaryButton>
      <span className="mt-2.5 dark:text-white">{currentPage}</span>
      <PrimaryButton
        className="rounded-[50%]"
        disabled={nextDisabled}
        onClick={() => onPageUpdate((parseInt(currentPage, 10) + 1).toString())}
      >
        {'>'}
      </PrimaryButton>
      <Select
        options={[{ value: 5 }, { value: 10 }]}
        value={currentLimit}
        onChange={(value) => onLimitUpdate(value)}
      />
    </>
  );
}
