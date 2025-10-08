import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  file: File;
  preview?: string;
  progress: number;
}

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: Record<string, string[]>;
  className?: string;
}

export const FileUpload = ({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    "application/pdf": [".pdf"],
    "text/*": [".txt", ".csv"],
  },
  className,
}: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles - uploadedFiles.length).map((file) => ({
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        progress: 0,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      
      // Simulate upload progress
      newFiles.forEach((uploadedFile, index) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.file === uploadedFile.file ? { ...f, progress: Math.min(progress, 100) } : f
            )
          );
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 100);
      });

      onFilesSelected(acceptedFiles);
    },
    [maxFiles, uploadedFiles.length, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize: maxSize * 1024 * 1024,
    accept,
  });

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((f) => f.file !== fileToRemove);
      const file = prev.find((f) => f.file === fileToRemove);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return updated;
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return ImageIcon;
    if (file.type === "application/pdf") return FileText;
    return File;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-primary font-medium">Drop files here...</p>
        ) : (
          <div>
            <p className="text-foreground font-medium mb-1">
              Drag & drop files here, or click to select
            </p>
            <p className="text-sm text-muted-foreground">
              Max {maxFiles} files, up to {maxSize}MB each
            </p>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((uploadedFile) => {
            const Icon = getFileIcon(uploadedFile.file);
            return (
              <div
                key={uploadedFile.file.name}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              >
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <Icon className="h-10 w-10 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {uploadedFile.progress < 100 && (
                    <Progress value={uploadedFile.progress} className="h-1 mt-1" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(uploadedFile.file)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
