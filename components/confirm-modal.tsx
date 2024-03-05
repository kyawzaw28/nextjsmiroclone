"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger,Overlay } from "@radix-ui/react-alert-dialog";
import AlertDialogHeader from "@radix-ui/react-alert-dialog";
import React from "react";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
    disabled?: boolean;
    header: string;
    description?: string;
};

export const ConfirmModal = ({
    children,
    onConfirm,
    disabled,
    header,
    description
}: ConfirmModalProps) => {

    const handleConfirm = () => {
        onConfirm();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            
            <Overlay className="fixed inset-0 bg-black/50">
            <AlertDialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-16 text-gray-900 shadow">
                {/* <AlertDialogHeader> */}
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                    {/* </AlertDialogHeader> */}
                {/* <AlertDialogFooter> */}
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={disabled} onClick={handleConfirm} >
                        Confirm
                    </AlertDialogAction>
                {/* </AlertDialogFooter> */}
            </AlertDialogContent>
                </Overlay>
        </AlertDialog>
    )
}