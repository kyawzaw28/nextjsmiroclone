"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogTitle,
    Overlay,
} from "@radix-ui/react-dialog";

import { userRenameModal } from "@/store/use-rename-modal";
import { useReadLocalStorage } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {

    const {mutate, pending} = useApiMutation(api.board.update);
    const {
        isOpen,
        onClose,
        initialValues,
    } = userRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(()=>{
        setTitle(initialValues.title);
    },[initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e,) => {
        e.preventDefault();
        mutate({
            id: initialValues.id,
            title,
        })
        .then(()=>{
            toast.success("Board renamed");
            onClose();
        })
        .catch(()=>toast.error("Failed to rename board"));
    };

    return (

        
        <Dialog open={isOpen} onOpenChange={onClose} >
          
            <DialogContent>
                <DialogTitle>
                    Edit Board Title
                </DialogTitle>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-yt-4">
                <Input
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Board title"
                />
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button disabled={pending} type="submit">
                    Save
                </Button>
                </form>
                
            </DialogContent>
        </Dialog>
    )
}