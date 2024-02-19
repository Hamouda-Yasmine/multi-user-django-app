import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

function DeleteAlertDialog({ isOpen, onClose, onConfirm }) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered>
      <AlertDialogOverlay
        bg="rgba(0, 0, 0, 0)"
        backdropFilter="blur(2px)"
      />
      <AlertDialogContent padding="3">
        <AlertDialogHeader
          fontSize="lg"
          fontWeight="bold">
          Confirmation de Suppression
        </AlertDialogHeader>

        <AlertDialogBody>
          Êtes-vous sûr de vouloir effectuer cette action ?<br />
          Veuillez confirmer en appuyant sur "Supprimer", sinon, appuyez sur
          "Annuler".
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={onClose}>
            Annuler
          </Button>
          <Button
            colorScheme="red"
            onClick={onConfirm}
            ml={3}>
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertDialog;
