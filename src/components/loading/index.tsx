import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import style from './index.module.css';

interface LoadingProps {
  children: React.ReactNode
}

interface DisplayProgressProps {
  loadingStack: number
}

function DisplayProgress({ loadingStack = 0 }: DisplayProgressProps) {
  const [delay, setDelay] = useState(false);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (loadingStack === 1) {
      setTimeout(() => {
        setDelay(true);
      }, 500);
      return;
    }
    if (loadingStack <= 0) {
      setDisplay(false);
    }
  }, [loadingStack]);
  useEffect(() => {
    if (!delay) return;
    if (delay && loadingStack > 0) {
      setDisplay(true);
    }
    setDelay(false);
  }, [delay]);

  if (display) {
    return (
      <div className={style.container}>
        <div className={style.innerContainer}>
          <CircularProgress />
        </div>
      </div>
    );
  }
  return null;
}

const [addStack, setAddStack] = useState(0);
const [delStack, setDelStack] = useState(0);
const addLoading = () => {
  setAddStack(addStack + 1);
};
const delLoading = () => {
  setDelStack(delStack + 1);
};

function LoadingProvider({ children }: LoadingProps) {
  return (
    <>
      <DisplayProgress loadingStack={addStack - delStack} />
      { children }
    </>
  );
}

export { LoadingProvider, addLoading, delLoading };
