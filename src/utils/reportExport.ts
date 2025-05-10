
import { saveAs } from 'file-saver';

interface ExportOptions {
  fileName: string;
  title?: string;
  includeTimestamp?: boolean;
}

export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  options: ExportOptions
) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const { fileName, title, includeTimestamp = true } = options;
  const timestamp = includeTimestamp ? `_${new Date().toISOString().split('T')[0]}` : '';
  const fullFileName = `${fileName}${timestamp}.csv`;
  
  // Get all headers
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csvContent = headers.join(',') + '\n';
  
  data.forEach(item => {
    const row = headers.map(header => {
      const cell = item[header];
      // Handle special cases like numbers, dates, etc.
      if (cell === null || cell === undefined) return '';
      if (typeof cell === 'string') return `"${cell.replace(/"/g, '""')}"`;
      if (typeof cell === 'object') {
        if (cell instanceof Date) return cell.toISOString();
        return `"${JSON.stringify(cell).replace(/"/g, '""')}"`;
      }
      return cell;
    });
    csvContent += row.join(',') + '\n';
  });
  
  // Create a blob and save the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, fullFileName);
};

export const exportToPDF = (elementId: string, options: ExportOptions) => {
  // This is a placeholder for PDF export functionality
  // In a real implementation, you'd use a library like jspdf or html2pdf
  console.log(`Exporting element ${elementId} to PDF with options:`, options);
  alert('PDF export functionality would be implemented with a proper PDF library');
};

export const generateDetailedReport = <T extends Record<string, any>>(
  data: T[],
  options: ExportOptions
) => {
  // Add additional metrics and analytics to the data
  const enhancedData = data.map(item => {
    return {
      ...item,
      exportedAt: new Date().toISOString(),
      reportType: 'Detailed'
    };
  });
  
  // Export the enhanced data
  exportToCSV(enhancedData, {
    ...options,
    fileName: `${options.fileName}_detailed`
  });
};

export const generateSimpleReport = <T extends Record<string, any>>(
  data: T[],
  options: ExportOptions,
  includeFields: string[]
) => {
  // Filter the data to only include specified fields
  const simplifiedData = data.map(item => {
    const newItem: Record<string, any> = {};
    includeFields.forEach(field => {
      if (field in item) {
        newItem[field] = item[field];
      }
    });
    return newItem;
  });
  
  // Export the simplified data
  exportToCSV(simplifiedData, {
    ...options,
    fileName: `${options.fileName}_simple`
  });
};
