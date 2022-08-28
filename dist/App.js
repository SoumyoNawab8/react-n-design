"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Card = _interopRequireDefault(require("./Card"));

require("./App.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: '#e4e4e4',
      height: '100vh',
      width: '100%',
      padding: '1px'
    },
    className: "rnd-d-flex"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '400px'
    }
  }, /*#__PURE__*/React.createElement(_Card.default, {
    title: "Example Card",
    footer: /*#__PURE__*/React.createElement("div", {
      className: "rnd-d-flex rnd-justify-end"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Learn More..."))
  }, "Minim sunt laborum adipisicing adipisicing proident Lorem ex irure id Lorem in. Nisi amet mollit nisi et id quis anim reprehenderit et quis. Ut dolor sit laboris aliquip officia id ullamco. Labore deserunt irure sint eiusmod dolor fugiat laboris ex et id pariatur veniam do. Reprehenderit adipisicing fugiat adipisicing duis ex commodo magna duis eu. Aute do consectetur consequat ut quis eiusmod veniam laborum in in. Qui nostrud ad culpa commodo aliquip mollit.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '320px'
    }
  }, /*#__PURE__*/React.createElement(_Card.default, {
    hideHeader: true,
    footer: /*#__PURE__*/React.createElement("div", {
      className: "rnd-d-flex rnd-justify-end"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Add To Cart"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '250px',
      width: '100%',
      backgroundImage: "url(https://images.unsplash.com/photo-1659887347330-5bd7d335edaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80)",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderRadius: '3px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "rnd-d-flex rnd-justify-between rnd-w-100",
    style: {
      marginTop: '5px'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Product Bag")), /*#__PURE__*/React.createElement("span", null, "$50")))));
}

var _default = App;
exports.default = _default;