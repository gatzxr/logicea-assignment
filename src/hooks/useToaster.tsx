import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useToaster() {
  const toastSuccess = (message: string | React.ReactNode) =>
    toast(message, { type: 'success' });

  const toastError = (message: string | React.ReactNode) =>
    toast(message, { type: 'error' });

  return {
    toastError,
    toastSuccess
  };
}
