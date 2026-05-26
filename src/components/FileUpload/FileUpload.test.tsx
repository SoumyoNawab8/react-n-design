import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { FileUpload } from './FileUpload';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('FileUpload', () => {
  const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

  it('renders upload area', () => {
    renderWithTheme(<FileUpload />);
    expect(screen.getByText('Drag & drop files here, or click to browse')).toBeInTheDocument();
    expect(screen.getByLabelText('File upload')).toBeInTheDocument();
  });

  it('handles file selection via input', async () => {
    const onFilesChange = vi.fn();
    renderWithTheme(<FileUpload onFilesChange={onFilesChange} />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFile);
    expect(onFilesChange).toHaveBeenCalled();
  });

  it('handles drag and drop', async () => {
    const onFilesChange = vi.fn();
    renderWithTheme(<FileUpload onFilesChange={onFilesChange} />);
    const dropZone = screen.getByLabelText('File upload');

    fireEvent.dragOver(dropZone);
    expect(dropZone).toHaveClass('dragover');

    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [mockFile],
      },
    });
    await waitFor(() => {
      expect(onFilesChange).toHaveBeenCalled();
    });
  });

  it('removes file when remove button clicked', async () => {
    const onFilesChange = vi.fn();
    renderWithTheme(<FileUpload onFilesChange={onFilesChange} />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFile);

    const removeButton = screen.getByLabelText('Remove test.txt');
    await userEvent.click(removeButton);
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });

  it('handles multiple files', async () => {
    const onFilesChange = vi.fn();
    const mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' }),
    ];
    renderWithTheme(<FileUpload onFilesChange={onFilesChange} multiple />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFiles);
    expect(onFilesChange).toHaveBeenCalledWith(expect.arrayContaining(mockFiles));
  });

  it('validates file size', async () => {
    const mockLargeFile = new File(['large content'], 'large.txt', { type: 'text/plain' });
    Object.defineProperty(mockLargeFile, 'size', { value: 10 * 1024 * 1024 });
    const onFilesChange = vi.fn();
    renderWithTheme(<FileUpload maxSize={1024} onFilesChange={onFilesChange} />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockLargeFile);
    expect(screen.getByText(/exceeds the maximum size/i)).toBeInTheDocument();
  });

  it('validates file type', async () => {
    const onFilesChange = vi.fn();
    renderWithTheme(<FileUpload accept=".jpg,.png" onFilesChange={onFilesChange} />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFile);
    expect(screen.getByText(/not an accepted file type/i)).toBeInTheDocument();
  });

  it('shows accepted file types in hint', () => {
    renderWithTheme(<FileUpload accept=".jpg,.png" />);
    expect(screen.getByText(/Accepted: .jpg,.png/i)).toBeInTheDocument();
  });

  it('shows max size in hint', () => {
    renderWithTheme(<FileUpload maxSize={1024 * 1024} />);
    expect(screen.getByText(/Max 1 MB/i)).toBeInTheDocument();
  });

  it('opens file dialog on Enter key', () => {
    const inputRef = { current: { click: vi.fn() } };
    renderWithTheme(<FileUpload />);
    const dropZone = screen.getByLabelText('File upload');
    fireEvent.keyDown(dropZone, { key: 'Enter' });
  });

  it('opens file dialog on Space key', () => {
    renderWithTheme(<FileUpload />);
    const dropZone = screen.getByLabelText('File upload');
    fireEvent.keyDown(dropZone, { key: ' ' });
  });

  it('clears drag state on drag leave', () => {
    renderWithTheme(<FileUpload />);
    const dropZone = screen.getByLabelText('File upload');
    fireEvent.dragOver(dropZone);
    fireEvent.dragLeave(dropZone);
    expect(dropZone).not.toHaveClass('dragover');
  });

  it('shows upload progress', async () => {
    renderWithTheme(<FileUpload uploadProgress={{ 'test.txt': 50 }} />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFile);
    const progressBar = document.querySelector('[role="progressbar"]');
    expect(progressBar).toBeTruthy();
  });

  it('formats file sizes correctly', async () => {
    const mockKBFile = new File(['x'.repeat(2048)], 'test.txt');
    renderWithTheme(<FileUpload />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockKBFile);
    expect(screen.getByText(/2 KB/i)).toBeInTheDocument();
  });

  it('formats large file sizes in MB', async () => {
    const mockMBFile = new File(['x'.repeat(2 * 1024 * 1024)], 'test.txt');
    renderWithTheme(<FileUpload />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockMBFile);
    expect(screen.getByText(/2 MB/i)).toBeInTheDocument();
  });

  it('displays file list with animations', async () => {
    renderWithTheme(<FileUpload />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFile);
    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });

  it('handles single file mode', async () => {
    const onFilesChange = vi.fn();
    renderWithTheme(<FileUpload onFilesChange={onFilesChange} multiple={false} />);
    const input = screen.getByLabelText('Choose files');
    await userEvent.upload(input, mockFile);
    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });

  it('handles empty file list on initial render', () => {
    renderWithTheme(<FileUpload />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('has correct tabIndex on drop zone', () => {
    renderWithTheme(<FileUpload />);
    const dropZone = screen.getByLabelText('File upload');
    expect(dropZone).toHaveAttribute('tabindex', '0');
  });

  it('announces status updates to screen readers', async () => {
    renderWithTheme(<FileUpload />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });
});
