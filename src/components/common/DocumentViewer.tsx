import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DocumentViewerProps {
  fileUrl: string;
  fileName: string;
  fileType: "pdf" | "image" | "text";
  onClose?: () => void;
  className?: string;
}

export const DocumentViewer = ({
  fileUrl,
  fileName,
  fileType,
  onClose,
  className,
}: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {fileName}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[60px] text-center">
            {zoom}%
          </span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto bg-muted/30 rounded-lg border">
          {fileType === "pdf" && (
            <iframe
              src={fileUrl}
              className="w-full h-[600px]"
              title={fileName}
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
            />
          )}
          
          {fileType === "image" && (
            <div className="flex items-center justify-center p-4">
              <img
                src={fileUrl}
                alt={fileName}
                className="max-w-full h-auto"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          )}
          
          {fileType === "text" && (
            <div className="p-6">
              <iframe
                src={fileUrl}
                className="w-full h-[600px] bg-background"
                title={fileName}
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
