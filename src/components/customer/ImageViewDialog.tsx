import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ImageViewDialogProps {
  image: { url: string; title: string } | null;
  onClose: () => void;
}

export const ImageViewDialog = ({ image, onClose }: ImageViewDialogProps) => {
  if (!image) return null;

  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{image.title}</DialogTitle>
          <DialogDescription>
            View the uploaded {image.title.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <img 
            src={image.url} 
            alt={image.title}
            className="max-w-full h-auto rounded-lg"
            onError={(e) => {
              console.error('Image failed to load:', image.url);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
