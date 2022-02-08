import React from 'react';

import { useSnackbar, SnackbarProvider } from 'notistack';

const { enqueueSnackbar } = useSnackbar();

const during = (message: string) => Math.min(8000, Math.max(3000, message.length * 200));

const successNotice = (message: string) => {
  enqueueSnackbar(
    message,
    { variant: 'success', autoHideDuration: during(message) },
  );
};

const infoNotice = (message: string) => {
  enqueueSnackbar(
    message,
    { variant: 'info', autoHideDuration: during(message) },
  );
};

const warningNotice = (message: string) => {
  enqueueSnackbar(
    message,
    { variant: 'warning', autoHideDuration: during(message) },
  );
};

const errorNotice = (message: string) => {
  enqueueSnackbar(
    message,
    { variant: 'error', autoHideDuration: during(message) },
  );
};

function NoticeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      { children }
    </SnackbarProvider>
  );
}

export {
  NoticeProvider, successNotice, infoNotice, warningNotice, errorNotice,
};
