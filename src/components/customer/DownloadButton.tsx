import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { getPublicUrl } from "@/utils/storageHelpers";

interface DownloadButtonProps {
  url: string;
  filename: string;
  label: string;
}

export const DownloadButton = ({ url, filename, label }: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      const publicUrl = getPublicUrl(url);
      if (!publicUrl) return;
      
      const response = await fetch(publicUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="hover-scale text-xs"
    >
      <Download className="h-3 w-3 mr-1" />
      {label}
    </Button>
  );
};
