import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="gap-0 p-0 border-none max-w-2xl">
        <AlertDialogTitle />

        <AlertDialogDescription>
          <XMarkIcon
            onClick={onClose}
            className="absolute -top-12 right-4 z-10 text-white h-8 w-8 cursor-pointer"
          />

          <Image
            src={imageUrl}
            alt={imageAlt}
            width={800}
            height={800}
            priority
          />
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageModal;
