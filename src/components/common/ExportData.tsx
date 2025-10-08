import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, FileJson } from "lucide-react";
import { toast } from "sonner";

interface ExportDataProps {
  data: any[];
  filename: string;
  className?: string;
}

export const ExportData = ({ data, filename, className }: ExportDataProps) => {
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")),
    ].join("\n");

    downloadFile(csvContent, `${filename}.csv`, "text/csv");
    toast.success("Data exported to CSV");
  };

  const exportToJSON = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, "application/json");
    toast.success("Data exported to JSON");
  };

  const exportToExcel = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Create a simple Excel-compatible format (tab-separated values)
    const headers = Object.keys(data[0]);
    const tsvContent = [
      headers.join("\t"),
      ...data.map((row) => headers.map((header) => row[header] ?? "").join("\t")),
    ].join("\n");

    downloadFile(tsvContent, `${filename}.xls`, "application/vnd.ms-excel");
    toast.success("Data exported to Excel");
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background z-50">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="mr-2 h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
