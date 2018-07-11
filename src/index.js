import React, { Component } from "react";
import asmCrypto from "asmcrypto-lite";

class Box extends Component {
  constructor(props) {
    super(props);
    this.droppable = true;
    if (props !== undefined) {
      if (props.handleDrop !== undefined) {
        this.handleDrop = props.handleDrop;
      } else {
        this.handleDrop = console.log;
      }

      if (props.droppable !== undefined && props.droppable === false) {
        this.droppable = false;
      }
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleArrayBuffer = this.handleArrayBuffer.bind(this);
  }

  dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.droppable) {
      const dt = e.dataTransfer;
      const files = dt.files;

      this.handleFiles(files);
    }
  }

  handleArrayBuffer(arrayBuffer) {
    return asmCrypto.SHA256.hex(arrayBuffer);
  }

  handleFile(file) {
    const boxId = this.props.boxId;
    const returnResult = this.handleDrop;
    const handleArrayBuffer2 = this.handleArrayBuffer;

    const f = file;
    const b = new Blob([f]);
    const fileReader = new FileReader();

    returnResult({ busy: true, name: "", hash256: "", size: "", boxId: boxId });

    fileReader.onload = function(event) {
      const arrayBuffer = event.target.result;
      const digest = handleArrayBuffer2(arrayBuffer);

      returnResult({
        busy: false,
        name: f.name,
        hash256: digest,
        size: f.size,
        boxId: boxId
      });
    };
    fileReader.readAsArrayBuffer(b);
  }

  handleFiles(files) {
    // files is not a regular Array
    [].forEach.call(files, file => {
      this.handleFile(file);
    });
  }

  render() {
    if (this.props && this.props.droppable) {
      this.droppable = this.props.droppable;
    }

    return (
      <span
        className="Box"
        id="dropbox"
        onDragEnter={e => this.dragenter(e)}
        onDragOver={e => this.dragover(e)}
        onDrop={e => this.drop(e)}
      >
        {this.props.children}
      </span>
    );
  }
}

export default Box;
