import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState, type ReactNode } from "react";
import RegularButton from "../button-regular";

interface IAppModalProps {
  children?: ReactNode;
  open: boolean;
  title: string;
  description: string;
  image: string;
  animationImage?: string;
  loadingConfirm?: boolean;
  textConfirm?: string;
  onOpenChange?: (open: boolean) => void;
  onConfirmClick?: () => void;
  onCancelClick?: () => void;
  textCancel?: string;
  footer?: ReactNode;
}

export default function AppModal({
  children,
  open,
  title,
  description,
  image,
  animationImage,
  loadingConfirm,
  textConfirm,
  onOpenChange: onOpenChangeProp,
  onConfirmClick,
  onCancelClick,
  textCancel,
  footer,
}: IAppModalProps) {
  const [_open, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  function onOpenChange(open: boolean) {
    onOpenChangeProp?.(open);
    setOpen(open);
  }

  return (
    <AlertDialog open={_open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent className="w-[90%] max-w-[300px] rounded-xl">
        <div className="w-full flex items-center justify-center">
          {image && (
            <div className={`size-[120px] mx-auto relative ${animationImage}`}>
              <img
                alt="logout-illustration"
                src={image}
                className="size-full object-contain"
              />
            </div>
          )}
        </div>
        <AlertDialogHeader className="max-w-full">
          <AlertDialogTitle className="text-left font-semibold text-sm">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {footer}
        {!loadingConfirm && !footer && (
          <AlertDialogFooter className="flex flex-row justify-between items-center w-full">
            {textCancel &&
              (onCancelClick ? (
                <RegularButton variant="ghost-red" onClick={onCancelClick}>
                  {textCancel}
                </RegularButton>
              ) : (
                <AlertDialogCancel asChild noBaseClass>
                  <RegularButton variant="ghost-red" onClick={onCancelClick}>
                    {textCancel}
                  </RegularButton>
                </AlertDialogCancel>
              ))}
            {textConfirm &&
              (onConfirmClick ? (
                <RegularButton
                  variant="ghost-blue"
                  className="ml-auto"
                  onClick={onConfirmClick}
                >
                  {textConfirm}
                </RegularButton>
              ) : (
                <AlertDialogAction asChild noBaseClass>
                  <RegularButton variant="ghost-blue" className="ml-auto">
                    {textConfirm}
                  </RegularButton>
                </AlertDialogAction>
              ))}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
