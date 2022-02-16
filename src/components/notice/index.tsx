import React from 'react';

import { useSnackbar, SnackbarProvider } from 'notistack';

const during = (message: string) => Math.min(8000, Math.max(3000, message.length * 200));

let successNotice: (message: string) => void
let infoNotice: (message: string) => void
let warningNotice : (message: string) => void
let errorNotice: (message: string) => void

function NoticeFunc() {
  const { enqueueSnackbar } = useSnackbar();

  successNotice = (message: string) => {
    enqueueSnackbar(
      message,
      { variant: 'success', autoHideDuration: during(message) },
    );
  };
  infoNotice = (message: string) => {
    enqueueSnackbar(
      message,
      { variant: 'info', autoHideDuration: during(message) },
    );
  };
  warningNotice = (message: string) => {
    enqueueSnackbar(
      message,
      { variant: 'warning', autoHideDuration: during(message) },
    );
  };
  errorNotice = (message: string) => {
    enqueueSnackbar(
      message,
      { variant: 'error', autoHideDuration: during(message) },
    );
  };

  return null
}

function NoticeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <NoticeFunc />
      { children }
    </SnackbarProvider>
  );
}

export {
  NoticeProvider, successNotice, infoNotice, warningNotice, errorNotice,
};
