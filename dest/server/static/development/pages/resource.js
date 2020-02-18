module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"static/development/pages/resource.js": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/CodeList.jsx":
/*!*********************************!*\
  !*** ./components/CodeList.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/list */ "antd/lib/list");
/* harmony import */ var antd_lib_list__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_list__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/avatar */ "antd/lib/avatar");
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/icon */ "antd/lib/icon");
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/card */ "antd/lib/card");
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_card__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config_apiUrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/apiUrl */ "./config/apiUrl.js");




var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;



const {
  Meta
} = antd_lib_card__WEBPACK_IMPORTED_MODULE_3___default.a;

const CodeList = ({
  keywords,
  labels
}) => {
  const {
    0: list,
    1: setList
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])();
  const {
    0: listData,
    1: setListData
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]);
  const {
    0: page,
    1: setPage
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(1);
  const {
    0: pageSize,
    1: setPageSize
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(9);
  const {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(true);
  const {
    0: total,
    1: setTotal
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(0);

  const getArticles = (page, labels, keywords) => {
    const CancelToken = axios__WEBPACK_IMPORTED_MODULE_5___default.a.CancelToken;
    const source = CancelToken.source();
    let dataProps = '?category_id=4';
    dataProps += '&pageSize=' + pageSize;
    dataProps += '&page=' + page;

    if (labels != '') {
      dataProps += '&biaoqian=' + labels;
    }

    if (keywords != '') {
      dataProps += '&q=' + keywords;
    }

    axios__WEBPACK_IMPORTED_MODULE_5___default()({
      method: 'get',
      url: _config_apiUrl__WEBPACK_IMPORTED_MODULE_6__["default"].getArticleList + dataProps,
      cancelToken: source.token
    }).then(res => {
      setIsLoading(false);
      console.log(res.data.data);
      source.cancel('方法被取消');

      for (let item in res.data.data) {
        res.data.data[item].href = "/detail?id=" + res.data.data[item].id;
      }

      setListData(res.data.data);
      setTotal(res.data.meta.total);
      setPage(page);
    }).catch(function (error) {
      console.log(error);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(() => {
    getArticles(page, labels, keywords);
  }, [page, labels, keywords]);
  return __jsx(antd_lib_list__WEBPACK_IMPORTED_MODULE_0___default.a, {
    className: "list",
    style: {
      marginTop: '1rem'
    },
    grid: {
      gutter: 12,
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 3,
      xxl: 3
    },
    pagination: {
      onChange: page => {
        getArticles(page, labels, keywords);
      },
      pageSize: pageSize,
      total: total
    },
    dataSource: listData,
    renderItem: item => __jsx(antd_lib_list__WEBPACK_IMPORTED_MODULE_0___default.a.Item, {
      className: "list-item"
    }, __jsx(antd_lib_card__WEBPACK_IMPORTED_MODULE_3___default.a, {
      onClick: () => {
        window.location.href = item.href;
      },
      style: {
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 10,
        overflow: 'hidden'
      },
      cover: __jsx("img", {
        style: {
          height: 167,
          objectFit: 'cover'
        },
        alt: "example",
        src: item.fmt
      }),
      actions: [__jsx("a", null, __jsx(antd_lib_icon__WEBPACK_IMPORTED_MODULE_2___default.a, {
        type: "eye"
      }), "\xA0\xA0", __jsx("span", null, item.watches)), __jsx("a", null, __jsx(antd_lib_icon__WEBPACK_IMPORTED_MODULE_2___default.a, {
        type: "file-zip"
      }), "\xA0\xA0", __jsx("span", null, item.count)), __jsx("a", null, __jsx(antd_lib_icon__WEBPACK_IMPORTED_MODULE_2___default.a, {
        type: "download"
      }), "\xA0\xA0", __jsx("span", null, "\u4E0B\u8F7D"))]
    }, __jsx(Meta, {
      title: item.title
    }), __jsx("div", {
      className: "js",
      style: {
        marginTop: 20
      }
    }, __jsx("div", {
      className: "jianshi"
    }, __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
      src: item.user.avatar
    }), __jsx("div", {
      className: "mz"
    }, item.user.name)), __jsx("div", {
      className: "f-right",
      style: {
        marginTop: 8
      }
    }, "\u7C7B\u578B\uFF1A", item.biaoqian)), __jsx("div", {
      className: "classifybox"
    }, __jsx("div", {
      className: "classify"
    }, item.biaoqian))))
  });
};

/* harmony default export */ __webpack_exports__["default"] = (CodeList);

/***/ }),

/***/ "./components/LinkMe.jsx":
/*!*******************************!*\
  !*** ./components/LinkMe.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/card */ "antd/lib/card");
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/icon */ "antd/lib/icon");
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_icon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;


const LinkMe = () => {
  return __jsx(antd_lib_card__WEBPACK_IMPORTED_MODULE_0___default.a, {
    className: "linkcard",
    size: "small"
  }, __jsx("div", {
    className: "link"
  }, __jsx("a", {
    href: "http://wpa.qq.com/msgrd?v=3&uin=3268388918&site=qq&menu=yes",
    target: "_blank"
  }, __jsx(antd_lib_icon__WEBPACK_IMPORTED_MODULE_1___default.a, {
    type: "message"
  }), __jsx("span", null, "\u8054\u7CFB\u7AD9\u957F"))));
};

/* harmony default export */ __webpack_exports__["default"] = (LinkMe);

/***/ }),

/***/ "./components/ResCommand.jsx":
/*!***********************************!*\
  !*** ./components/ResCommand.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/card */ "antd/lib/card");
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/list */ "antd/lib/list");
/* harmony import */ var antd_lib_list__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_list__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/avatar */ "antd/lib/avatar");
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/icon */ "antd/lib/icon");
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dynamic */ "next/dynamic");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _config_apiUrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../config/apiUrl */ "./config/apiUrl.js");




var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;




const Ellipsis = next_dynamic__WEBPACK_IMPORTED_MODULE_6___default()(() => Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! ant-design-pro/lib/Ellipsis */ "ant-design-pro/lib/Ellipsis", 7)), {
  ssr: false //这个要加上,禁止使用 SSR
  ,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/(/*! ant-design-pro/lib/Ellipsis */ "ant-design-pro/lib/Ellipsis")],
    modules: ["ant-design-pro/lib/Ellipsis"]
  }
});

const ResCommand = () => {
  const {
    0: list,
    1: setList
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])();

  const getLastArticle = () => {
    const CancelToken = axios__WEBPACK_IMPORTED_MODULE_5___default.a.CancelToken;
    const source = CancelToken.source();
    axios__WEBPACK_IMPORTED_MODULE_5___default()({
      method: 'get',
      url: _config_apiUrl__WEBPACK_IMPORTED_MODULE_7__["default"].getRecommandList + '?category_id=4',
      cancelToken: source.token
    }).then(res => {
      console.log(res.data.data);
      source.cancel('方法被取消');

      for (let item in res.data.data) {
        res.data.data[item].href = "/detail?id=" + res.data.data[item].id;
      }

      setList(res.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(() => {
    getLastArticle();
  }, []);
  return __jsx(antd_lib_card__WEBPACK_IMPORTED_MODULE_0___default.a, {
    size: "small",
    extra: __jsx("a", {
      style: {
        color: '#000'
      },
      href: "#"
    }, __jsx(antd_lib_icon__WEBPACK_IMPORTED_MODULE_3___default.a, {
      type: "ellipsis"
    })),
    title: __jsx("div", {
      style: {
        width: '100%',
        textAlign: 'left'
      }
    }, __jsx(antd_lib_icon__WEBPACK_IMPORTED_MODULE_3___default.a, {
      type: "share-alt"
    }), __jsx("span", {
      style: {
        marginLeft: 10
      }
    }, "\u6700\u65B0\u5206\u4EAB")),
    style: {
      margin: '1rem 1rem 0.5rem 1rem',
      borderRadius: '0.3rem'
    }
  }, __jsx(antd_lib_list__WEBPACK_IMPORTED_MODULE_1___default.a, {
    dataSource: list,
    renderItem: item => __jsx(antd_lib_list__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
      key: item.id,
      className: "re-item",
      style: {
        margin: '10px auto',
        borderBottom: 'none'
      }
    }, __jsx(antd_lib_list__WEBPACK_IMPORTED_MODULE_1___default.a.Item.Meta, {
      avatar: __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_2___default.a, {
        style: {
          borderRadius: '25%'
        },
        src: item.fmt
      }),
      title: __jsx(Ellipsis, {
        lines: 2,
        tooltip: true
      }, __jsx("a", {
        style: {
          position: "relative",
          color: "#000",
          fontSize: '0.4rem',
          lineHeight: 0.1
        },
        href: item.href
      }, item.title))
    }), __jsx("div", {
      style: {
        color: '#98a6ad',
        fontSize: '8px'
      }
    }, "\u6587\u4EF6\uFF1A", item.count))
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ResCommand);

/***/ }),

/***/ "./components/TagList.jsx":
/*!********************************!*\
  !*** ./components/TagList.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/card */ "antd/lib/card");
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ant_design_pro_lib_TagSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ant-design-pro/lib/TagSelect */ "ant-design-pro/lib/TagSelect");
/* harmony import */ var ant_design_pro_lib_TagSelect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ant_design_pro_lib_TagSelect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config_apiUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/apiUrl */ "./config/apiUrl.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;






const TagList = ({
  id,
  update_labels,
  labels
}) => {
  console.log('labels', labels);
  const {
    0: labs,
    1: setLabs
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(labels);
  const {
    0: dataLoading,
    1: setDataLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true);

  function handleFormSubmit(checkedValue) {
    console.log(checkedValue);
    update_labels(checkedValue.join(','));
  }

  const getlabs = () => {
    const CancelToken = axios__WEBPACK_IMPORTED_MODULE_3___default.a.CancelToken;
    const source = CancelToken.source();
    axios__WEBPACK_IMPORTED_MODULE_3___default()({
      method: 'get',
      url: _config_apiUrl__WEBPACK_IMPORTED_MODULE_5__["default"].getTags + '?id=' + id,
      cancelToken: source.token
    }).then(res => {
      console.log(res.data.data);
      source.cancel('方法被取消');
      let labes = [];

      for (let item in res.data.data) {
        labes.push(__jsx(ant_design_pro_lib_TagSelect__WEBPACK_IMPORTED_MODULE_2___default.a.Option, {
          key: res.data.data[item].label,
          value: res.data.data[item].label
        }, res.data.data[item].label));
      }

      setLabs(labes);
      setDataLoading(false);
    }).catch(function (error) {
      console.log(error);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (dataLoading) {
      getlabs();
    }
  }, []);
  return __jsx(antd_lib_card__WEBPACK_IMPORTED_MODULE_0___default.a, {
    className: "tagcard",
    loading: dataLoading
  }, !dataLoading && __jsx(ant_design_pro_lib_TagSelect__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: "tagselect",
    onChange: handleFormSubmit,
    hideCheckAll: true,
    actionsText: {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部'
    },
    expandable: true
  }, __jsx("span", {
    className: "all"
  }, "\u6240\u6709\u6807\u7B7E\uFF1A"), labs));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(function mapStateToProps(state) {
  return {
    labels: state.labels,
    current: state.current
  };
}, function mapDispatchToProps(dispatch) {
  return {
    update: current => dispatch({
      type: 'UPDATE_CURRENT',
      current
    }),
    update_labels: labels => dispatch({
      type: 'UPDATE_LABELS',
      labels
    })
  };
})(TagList));

/***/ }),

/***/ "./components/User.jsx":
/*!*****************************!*\
  !*** ./components/User.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_divider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/divider */ "antd/lib/divider");
/* harmony import */ var antd_lib_divider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_divider__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/avatar */ "antd/lib/avatar");
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;


const User = ({
  user
}) => {
  return __jsx("div", {
    className: "comm-box"
  }, __jsx("div", {
    className: "classifybox1"
  }, __jsx("div", {
    className: "classify1"
  }, "\u7AD9\u957F")), __jsx("div", null, " ", __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    size: 100,
    src: user.avatar
  })), __jsx("div", {
    className: "author-introduction"
  }, user.introduction, __jsx(antd_lib_divider__WEBPACK_IMPORTED_MODULE_0___default.a, null, "\u793E\u4EA4\u8D26\u53F7"), __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    size: 28,
    icon: "github",
    className: "account"
  }), __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    size: 28,
    icon: "qq",
    className: "account"
  }), __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
    size: 28,
    icon: "wechat",
    className: "account"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./config/apiUrl.js":
/*!**************************!*\
  !*** ./config/apiUrl.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ipUrl = 'http://borentang.net/api/v1/';
let servicePath = {
  getCategories: ipUrl + 'get/category',
  //获取菜单分类
  getArticles: ipUrl + 'article',
  //获取搜索文章列表
  getNotifications: ipUrl + 'notifications',
  //获取通知
  getNotificationReaded: ipUrl + 'user/read/notifications',
  //点击编辑已读
  getNotificationStatus: ipUrl + 'notifications/stats',
  //获取未读通知数量
  getTags: ipUrl + 'get/labs',
  //获取分类标签
  getArticleList: ipUrl + 'article/list',
  //获取文章列表
  getRecommandList: ipUrl + 'get/article',
  //获取推荐文章
  getZhanInfo: ipUrl + 'users/zz',
  //获取站长信息
  getArticleDetail: ipUrl + 'article/',
  //获取文章详情
  goLogin: ipUrl + 'authorizations',
  //去登录
  goGithubLogin: ipUrl + 'oauth/github',
  //github去登录
  Logout: ipUrl + 'authorizations/current',
  //推出登录
  getUserInfo: ipUrl + 'user',
  //依据token获取用户信息
  addArticle: ipUrl + 'article/add',
  //添加文章
  uploadImage: ipUrl + 'upload_image',
  //上传图片
  getLabs: ipUrl + 'get/labs',
  //获取标签
  uploadArticleImage: ipUrl + 'upload/image',
  //上传文章图片
  getUser: ipUrl + 'users/',
  //依据编号获取用户信息
  getThird: ipUrl + 'third/user',
  //获取用户第三方信息
  getUserArticle: ipUrl + 'user/article',
  //获取用户文章列表
  getAddressName: ipUrl + 'get/name',
  //获取地址名称
  giveLike: ipUrl + 'user/like',
  //点赞
  hasLike: ipUrl + 'user/haslike',
  //判断是否点赞
  getProvinces: ipUrl + 'get/provinces',
  //获取省
  getCity: ipUrl + 'get/city',
  //获取城市
  saveThird: ipUrl + 'user/third_save',
  //保存第三方资料
  getNotifications: ipUrl + 'notifications',
  //获取通知消息
  getUserArticleList: ipUrl + 'user/article',
  //获取用户文章列表
  registerUser: ipUrl + 'users',
  //注册用户
  RepairPassword: ipUrl + 'user/repair' //修改用户密码

};
/* harmony default export */ __webpack_exports__["default"] = (servicePath);

/***/ }),

/***/ "./pages/resource.js":
/*!***************************!*\
  !*** ./pages/resource.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_back_top__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/back-top */ "antd/lib/back-top");
/* harmony import */ var antd_lib_back_top__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_back_top__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/row */ "antd/lib/row");
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/col */ "antd/lib/col");
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_TagList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/TagList */ "./components/TagList.jsx");
/* harmony import */ var _components_LinkMe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/LinkMe */ "./components/LinkMe.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_User__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/User */ "./components/User.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _config_apiUrl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../config/apiUrl */ "./config/apiUrl.js");
/* harmony import */ var _components_CodeList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/CodeList */ "./components/CodeList.jsx");
/* harmony import */ var _components_ResCommand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/ResCommand */ "./components/ResCommand.jsx");



var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;











const Resource = props => {
  const {
    0: zhanz,
    1: setZhanz
  } = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({});
  const {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(true);

  const getZhanInfo = () => {
    axios__WEBPACK_IMPORTED_MODULE_9___default()(_config_apiUrl__WEBPACK_IMPORTED_MODULE_10__["default"].getZhanInfo).then(res => {
      setIsLoading(false);
      console.log(res.data.data);
      setZhanz(res.data.data);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    if (isLoading) {
      getZhanInfo();
    }
  }, []);
  return __jsx("div", {
    className: "container"
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, null, __jsx("title", null, "\u535A\u4EBA\u5802--\u9996\u9875"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico"
  })), __jsx(antd_lib_row__WEBPACK_IMPORTED_MODULE_1___default.a, {
    type: "flex",
    className: "content"
  }, __jsx(antd_lib_col__WEBPACK_IMPORTED_MODULE_2___default.a, {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 19,
    xl: 19,
    style: {
      padding: '1rem'
    }
  }, __jsx(_components_TagList__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: 4
  }), __jsx(_components_CodeList__WEBPACK_IMPORTED_MODULE_11__["default"], {
    keywords: props.keywords,
    labels: props.labels
  })), __jsx(antd_lib_col__WEBPACK_IMPORTED_MODULE_2___default.a, {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 5,
    xl: 5
  }, __jsx(_components_User__WEBPACK_IMPORTED_MODULE_8__["default"], {
    user: zhanz
  }), __jsx(_components_LinkMe__WEBPACK_IMPORTED_MODULE_6__["default"], null), __jsx(_components_ResCommand__WEBPACK_IMPORTED_MODULE_12__["default"], null))), __jsx(antd_lib_back_top__WEBPACK_IMPORTED_MODULE_0___default.a, null));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(function mapStateToProps(state) {
  return {
    labels: state.labels.labels,
    keywords: state.keywords.keywords
  };
})(Resource));

/***/ }),

/***/ 4:
/*!*********************************!*\
  !*** multi ./pages/resource.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mac/Desktop/liy-blog/pages/resource.js */"./pages/resource.js");


/***/ }),

/***/ "ant-design-pro/lib/Ellipsis":
/*!**********************************************!*\
  !*** external "ant-design-pro/lib/Ellipsis" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ant-design-pro/lib/Ellipsis");

/***/ }),

/***/ "ant-design-pro/lib/TagSelect":
/*!***********************************************!*\
  !*** external "ant-design-pro/lib/TagSelect" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ant-design-pro/lib/TagSelect");

/***/ }),

/***/ "antd/lib/avatar":
/*!**********************************!*\
  !*** external "antd/lib/avatar" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/avatar");

/***/ }),

/***/ "antd/lib/back-top":
/*!************************************!*\
  !*** external "antd/lib/back-top" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/back-top");

/***/ }),

/***/ "antd/lib/card":
/*!********************************!*\
  !*** external "antd/lib/card" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/card");

/***/ }),

/***/ "antd/lib/col":
/*!*******************************!*\
  !*** external "antd/lib/col" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/col");

/***/ }),

/***/ "antd/lib/divider":
/*!***********************************!*\
  !*** external "antd/lib/divider" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/divider");

/***/ }),

/***/ "antd/lib/icon":
/*!********************************!*\
  !*** external "antd/lib/icon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon");

/***/ }),

/***/ "antd/lib/list":
/*!********************************!*\
  !*** external "antd/lib/list" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/list");

/***/ }),

/***/ "antd/lib/row":
/*!*******************************!*\
  !*** external "antd/lib/row" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/row");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "next/dynamic":
/*!*******************************!*\
  !*** external "next/dynamic" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ })

/******/ });
//# sourceMappingURL=resource.js.map