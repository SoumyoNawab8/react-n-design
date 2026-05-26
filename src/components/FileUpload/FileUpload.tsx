'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaCloudUploadAlt, FaFile, FaTimes } from '../../icons';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  FileItem,
  FileItemIcon,
  FileItemInfo,
  FileItemName,
  FileItemProgress,
  FileItemProgressBar,
  FileItemRemove,
  FileItemSize,
  FileList,
  FileUploadError,
  FileUploadHint,
  FileUploadIcon,
  FileUploadInput,
  FileUploadRegion,
  FileUploadStatus,
  FileUploadText,
} from './FileUpload.styles';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  uploadProgress?: Record<string, number>;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

export const FileUpload = ({
  accept,
  multiple = false,
  maxSize,
  onFilesChange,
  uploadProgress = {},
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string) => {
    setStatus(message);
    // Clear after screen readers have had time to pick it up
    setTimeout(() => setStatus(''), 1000);
  }, []);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `${file.name} exceeds the maximum size of ${formatBytes(maxSize)}`;
    }
    if (accept) {
      const acceptedTypes = accept.split(',').map((t) => t.trim());
      const matches = acceptedTypes.some((type) => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', ''));
        }
        return file.type === type || file.name.endsWith(type);
      });
      if (!matches) {
        return `${file.name} is not an accepted file type`;
      }
    }
    return null;
  };

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const incomingFiles = Array.from(incoming);
      const validFiles: File[] = [];
      let validationError: string | null = null;

      for (const file of incomingFiles) {
        const err = validateFile(file);
        if (err) {
          validationError = err;
          break;
        }
        validFiles.push(file);
      }

      if (validationError) {
        setError(validationError);
        announce(`Error: ${validationError}`);
        return;
      }

      setError(null);
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onFilesChange?.(newFiles);

      if (validFiles.length > 0) {
        announce(
          `${validFiles.length} file${validFiles.length > 1 ? 's' : ''} added: ${validFiles
            .map((f) => f.name)
            .join(', ')}`
        );
      }
    },
    [files, multiple, onFilesChange, announce, validateFile]
  );

  const removeFile = useCallback(
    (file: File) => {
      const newFiles = files.filter((f) => f !== file);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
      announce(`Removed ${file.name}`);
    },
    [files, onFilesChange, announce]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  useEffect(() => {
    // Reset files when multiple changes to avoid invalid state
    if (!multiple && files.length > 1) {
      const first = [files[0]];
      setFiles(first);
      onFilesChange?.(first);
    }
  }, [multiple, files[0], onFilesChange]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <FileUploadRegion
        ref={regionRef}
        role="region"
        aria-label="File upload"
        isDragOver={isDragOver}
        disabled={false}
        hasError={!!error}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <FileUploadInput
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          aria-label="Choose files"
        />
        <FileUploadIcon>
          <FaCloudUploadAlt />
        </FileUploadIcon>
        <FileUploadText>Drag & drop files here, or click to browse</FileUploadText>
        <FileUploadHint>
          {accept ? `Accepted: ${accept}` : 'Any file type'}{' '}
          {maxSize ? `· Max ${formatBytes(maxSize)}` : ''}
        </FileUploadHint>
        {error && <FileUploadError>{error}</FileUploadError>}
      </FileUploadRegion>

      <FileUploadStatus aria-live="polite" aria-atomic="true">
        {status}
      </FileUploadStatus>

      <AnimatePresence>
        {files.length > 0 && (
          <FileList
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {files.map((file) => {
              const progress = uploadProgress[file.name] ?? 0;
              return (
                <FileItem key={`${file.name}-${file.lastModified}-${file.size}`}>
                  <FileItemIcon>
                    <FaFile />
                  </FileItemIcon>
                  <FileItemInfo>
                    <FileItemName title={file.name}>{file.name}</FileItemName>
                    <FileItemSize>{formatBytes(file.size)}</FileItemSize>
                    {progress > 0 && (
                      <FileItemProgress>
                        <FileItemProgressBar progress={progress} />
                      </FileItemProgress>
                    )}
                  </FileItemInfo>
                  <FileItemRemove
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => removeFile(file)}
                  >
                    <FaTimes />
                  </FileItemRemove>
                </FileItem>
              );
            })}
          </FileList>
        )}
      </AnimatePresence>
    </div>
  );
};
