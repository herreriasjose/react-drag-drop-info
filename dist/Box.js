"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _asmcryptoLite = require("asmcrypto-lite");

var _asmcryptoLite2 = _interopRequireDefault(_asmcryptoLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box(props) {
    _classCallCheck(this, Box);

    var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, props));

    _this.droppable = true;
    if (props !== undefined) {
      if (props.handleDrop !== undefined) {
        _this.handleDrop = props.handleDrop;
      } else {
        _this.handleDrop = console.log;
      }

      if (props.droppable !== undefined && props.droppable === false) {
        _this.droppable = false;
      }
    }
    _this.handleFile = _this.handleFile.bind(_this);
    _this.handleArrayBuffer = _this.handleArrayBuffer.bind(_this);
    return _this;
  }

  _createClass(Box, [{
    key: "dragenter",
    value: function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, {
    key: "dragover",
    value: function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, {
    key: "drop",
    value: function drop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.droppable) {
        var dt = e.dataTransfer;
        var files = dt.files;

        this.handleFiles(files);
      }
    }
  }, {
    key: "handleArrayBuffer",
    value: function handleArrayBuffer(arrayBuffer) {
      return _asmcryptoLite2.default.SHA256.hex(arrayBuffer);
    }
  }, {
    key: "handleFile",
    value: function handleFile(file) {
      var boxId = this.props.boxId;
      var returnResult = this.handleDrop;
      var handleArrayBuffer2 = this.handleArrayBuffer;

      var f = file;
      var b = new Blob([f]);
      var fileReader = new FileReader();

      returnResult({ busy: true, name: "", hash256: "", size: "", boxId: boxId });

      fileReader.onload = function (event) {
        var arrayBuffer = event.target.result;
        var digest = handleArrayBuffer2(arrayBuffer);

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
  }, {
    key: "handleFiles",
    value: function handleFiles(files) {
      var _this2 = this;

      // files is not a regular Array
      [].forEach.call(files, function (file) {
        _this2.handleFile(file);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.props && this.props.droppable) {
        this.droppable = this.props.droppable;
      }

      return _react2.default.createElement(
        "span",
        {
          className: "Box",
          id: "dropbox",
          onDragEnter: function onDragEnter(e) {
            return _this3.dragenter(e);
          },
          onDragOver: function onDragOver(e) {
            return _this3.dragover(e);
          },
          onDrop: function onDrop(e) {
            return _this3.drop(e);
          }
        },
        this.props.children
      );
    }
  }]);

  return Box;
}(_react.Component);

exports.default = Box;