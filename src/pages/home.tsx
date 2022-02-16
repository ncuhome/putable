import * as React from 'react';
import Modal from '@mui/material/Modal';
import {useState} from "react";

import ApiLogin from './api/Login';
import ApiSetting from './api/ApiSetting';

export default function BasicModal() {
  const [openApiLogin, setOpenApiLogin] = useState(false);
  const [openApiSetting, setOpenApiSetting] = useState(true);

  const handleOpenApiLogin = () => setOpenApiLogin(true);
  const handleCloseApiLogin = () => setOpenApiLogin(false);
  const handleOpenApiSetting = () => setOpenApiSetting(true);
  const handleCloseApiSetting = () => setOpenApiSetting(false);

  return (
    <div>
      <Modal
        open={openApiLogin}
        onClose={handleCloseApiLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ApiLogin />
      </Modal>
      <Modal
        open={openApiSetting}
        onClose={handleCloseApiSetting}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ApiSetting />
      </Modal>
    </div>
  );
}

