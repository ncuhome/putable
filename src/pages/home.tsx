import * as React from 'react';
import DrawerLeft from "../components/DrawerLeft";
import {NoticeProvider} from "../components/notice";

export default function BasicModal() {


  return (
    <NoticeProvider>
      <DrawerLeft/>

    </NoticeProvider>
  );
}

