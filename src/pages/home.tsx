import * as React from 'react';

import DrawerLeft from "../components/DrawerLeft";
import {NoticeProvider} from "../components/notice";
import Table from "../components/Table";
import styles from './index.module.css'

export default function BasicModal() {
  return (
    <NoticeProvider>
      <div className={styles.container}>
        <DrawerLeft/>
        <div className={styles.tableContainer}>
          <Table />
        </div>
      </div>
    </NoticeProvider>
  );
}

