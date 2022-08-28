"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Card;

var _react = _interopRequireDefault(require("react"));

require("./style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Card(_ref) {
  let {
    children,
    hideHeader = false,
    title,
    headerAction,
    customFooter = null,
    footer
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rnd-card"
  }, !hideHeader && /*#__PURE__*/_react.default.createElement("div", {
    className: "rnd-card-header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "rnd-card-title"
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "rnd-card-right"
  }, headerAction)), /*#__PURE__*/_react.default.createElement("div", {
    className: "rnd-card-body"
  }, children), /*#__PURE__*/_react.default.createElement("div", {
    className: "rnd-card-footer"
  }, customFooter ? customFooter : /*#__PURE__*/_react.default.createElement("div", {
    className: "rnd-card-default-footer"
  }, footer)));
}