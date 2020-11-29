import * as React from "react";
export class SimpleImageBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedFiles: [],
            currentFile: null
        };
    }
    handleFilesSelect(files) {
        this.setState({
            loadedFiles: files
        });
    }
    handleItemSelect(file) {
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
        return React.createElement("section", { className: "SimpleImageBrowser" }, imageFilePicker, imageViewer, imageFileList);
    }
}
class ImageViewer extends React.Component {
    constructor(props) {
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
        return React.createElement("section", { className: "ImageViewer" }, image);
    }
}
class ImageFilePicker extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputElement = React.createRef();
    }
    render() {
        const fileInput = React.createElement("input", {
            type: "file",
            multiple: true,
            accept: "image/*",
            style: "display:none",
            ref: this.fileInputElement,
            onChange: (e) => {
                const selectedFiles = this.fileInputElement.current.files;
                if (selectedFiles.length > 0) {
                    this.props.selectListener.apply(selectedFiles);
                }
            }
        });
        const fileSelectButton = React.createElement("button", {
            onClick: (e) => {
                this.fileInputElement.current.click();
                e.preventDefault();
            }
        }, "Open...");
        return React.createElement("section", { className: "ImageFilePicker" }, fileInput, fileSelectButton);
    }
}
class ImageFileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImageFile: null
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedImageFile !== this.state.selectedImageFile) {
            this.props.selectListener.apply(this.state.selectedImageFile);
        }
    }
    handleSelect(nextFile) {
        this.setState({
            selectedImageFile: nextFile
        });
    }
    render() {
        const images = this.props.files.map(file => {
            const url = URL.createObjectURL(file);
            return React.createElement("img", {
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
