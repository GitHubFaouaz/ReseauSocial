import React from "react";
import { Modal } from "@mantine/core";
import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  return (
    // Lorsque modalOpened est true, la fenêtre modale est ouverte. Lorsque modalOpened est false, la fenêtre modale est fermée
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
      <FollowersCard location="modal" />
    </Modal>
  );
};

export default FollowersModal;
