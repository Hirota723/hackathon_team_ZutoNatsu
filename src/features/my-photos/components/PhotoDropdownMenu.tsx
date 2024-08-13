import { useState } from "react";
import { MoreHorizontal, Trash, Edit } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Photos from "@/entities/photos";
import { ALERT_DIALOG_TEXTS } from "@/constants/alertDialogTexts";

interface PhotoDropdownMenuProps {
  photo: Photos;
  onDelete: (photoId: number) => void;
}

const PhotoDropdownMenu: React.FC<PhotoDropdownMenuProps> = ({
  photo,
  onDelete,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDeleteClick = () => {
    setAlertOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem className="opacity-30 line-through">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onSelect={handleDeleteClick}
            >
              <Trash className="mr-2 h-4 w-4" />
              削除
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{ALERT_DIALOG_TEXTS.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {ALERT_DIALOG_TEXTS.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{ALERT_DIALOG_TEXTS.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(photo.id)}>
              {ALERT_DIALOG_TEXTS.action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PhotoDropdownMenu;
