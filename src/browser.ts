import * as React from "react";

interface SimpleImageBrowserState {
    loadedFiles: File[];
    currentFile: File;
}
export class SimpleImageBrowser extends React.Component<{}, SimpleImageBrowserState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            loadedFiles: [],
            currentFile: null
        };
        this.handleFilesSelect = this.handleFilesSelect.bind(this);
        this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    handleFilesSelect(files: File[]) {
        this.setState({
            loadedFiles: files
        });
    }

    handleItemSelect(file: File) {
        this.setState({
            currentFile: file
        });
    }

    render() {
        const imageFileList = React.createElement(ImageFileList, {
            disabled: false,
            files: this.state.loadedFiles,
            selectListener: this.handleItemSelect
        });
        const imageFilePicker = React.createElement(ImageFilePicker, {
            disabled: false,
            selectListener: this.handleFilesSelect
        });
        const imageViewer = React.createElement(ImageViewer, {
            currentFile: this.state.currentFile
        });
        const viewPane = React.createElement("section", { className: "ViewPane" }, imageViewer, imageFileList);
        return React.createElement("section", { className: "SimpleImageBrowser" }, imageFilePicker, viewPane)
    }
}

interface ImageViewerProps {
    currentFile: File;
}
class ImageViewer extends React.Component<ImageViewerProps> {
    constructor(props: ImageViewerProps) {
        super(props);
    }

    render() {
        let image = null;
        if (this.props.currentFile !== null) {
            const url = URL.createObjectURL(this.props.currentFile);
            image = React.createElement("img", {
                src: url,
                onLoad: (e) => {
                    URL.revokeObjectURL(url);
                }
            });
        }
        return React.createElement("section", { className: "ImageViewer" }, image)
    }
}

interface ImageFilePickerProps {
    disabled: boolean;
    selectListener: (nextValue: File[]) => void;
}
class ImageFilePicker extends React.Component<ImageFilePickerProps> {

    fileInputElement: React.RefObject<HTMLInputElement>;

    constructor(props: ImageFilePickerProps) {
        super(props);
        this.fileInputElement = React.createRef<HTMLInputElement>();
    }

    render() {
        const fileInput = React.createElement("input", {
            type: "file",
            multiple: true,
            accept: "image/*",
            style: { display: "none" },
            ref: this.fileInputElement,
            onChange: (e) => {
                const selectedFiles = this.fileInputElement.current.files;
                if (selectedFiles.length > 0) {
                    const files = Array<File>(selectedFiles.length);
                    for (let i = 0; i < selectedFiles.length; i++) {
                        files[i] = selectedFiles.item(i);
                    }
                    this.props.selectListener(files);
                }
            }
        });
        const fileSelectButton = React.createElement("button", {
            onClick: (e) => {
                this.fileInputElement.current.click();
                e.preventDefault();
            }
        }, "Open...");
        return React.createElement("section", { className: "ImageFilePicker" }, fileInput, fileSelectButton)
    }
}


interface ImageFileListProps {
    files: File[];
    disabled: boolean;
    selectListener: (nextValue: File) => void;
}
interface ImageFileListState {
    selectedImageFile: File;
}
class ImageFileList extends React.Component<ImageFileListProps, ImageFileListState> {

    constructor(props: ImageFileListProps) {
        super(props);
        this.state = {
            selectedImageFile: null
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidUpdate(prevProps: ImageFileListProps, prevState: ImageFileListState) {
        if (prevState.selectedImageFile !== this.state.selectedImageFile) {
            this.props.selectListener(this.state.selectedImageFile);
        }
    }

    handleSelect(nextFile: File) {
        this.setState({
            selectedImageFile: nextFile
        });
    }

    render() {
        const images = this.props.files.map(file => {
            const url = URL.createObjectURL(file);
            return React.createElement("img", {
                key: file.name,
                src: url,
                onLoad: (e) => {
                    URL.revokeObjectURL(url);
                },
                onClick: (e) => {
                    this.handleSelect(file);
                },
                className: file === this.state.selectedImageFile ? "selected" : null
            });
        });
        return React.createElement("section", { className: "ImageFileList" }, images);
    }
}