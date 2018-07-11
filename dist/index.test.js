"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Box = require("./Box");

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("renders without crashing", function () {
  var div = document.createElement("div");
  _reactDom2.default.render(_react2.default.createElement(_Box2.default, null), div);
  _reactDom2.default.unmountComponentAtNode(div);
});

it("obtains a sha-256 from an ArrayBuffer", function () {
  var box = new _Box2.default({ handleDrop: null, boxId: "1" });
  expect(box.handleArrayBuffer("Hello World!")).toBe("7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
});