"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var Ky=_interopDefault(require("ky-universal")),FormData=_interopDefault(require("form-data")),humps=require("humps"),queryString=require("query-string"),https=_interopDefault(require("https")),fs=_interopDefault(require("fs")),__assign=function(){return(__assign=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)};function __awaiter(e,r,t,n){return new(t||(t=Promise))(function(o,a){function s(e){try{i(n.next(e))}catch(e){a(e)}}function u(e){try{i(n.throw(e))}catch(e){a(e)}}function i(e){e.done?o(e.value):new t(function(r){r(e.value)}).then(s,u)}i((n=n.apply(e,r||[])).next())})}function __generator(e,r){var t,n,o,a,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;s;)try{if(t=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=r.call(e,s)}catch(e){a=[6,e],n=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}}function __read(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,o,a=t.call(e),s=[];try{for(;(void 0===r||r-- >0)&&!(n=a.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return s}function __spread(){for(var e=[],r=0;r<arguments.length;r++)e=e.concat(__read(arguments[r]));return e}function skipAllCaps(e,r,t){return/^([A-Z0-9])+_*/.test(e)?e:r(e,t)}var methods=["get","post","put","delete","stream"],KyRequester={};function responseHeadersAsObject(e){var r={};return __spread(e.headers.entries()).forEach(function(e){var t=__read(e,2),n=t[0],o=t[1];r[n]=o}),r}function readKey(e){if(e)try{return fs.readFileSync(e)}catch(r){throw"Error while reading file: "+e+". Error "+r}}function buildAgent(){var e=process.env,r=e.GITLAB_SSL_KEY,t=e.GITLAB_SSL_CERT;if(r||t){console.log("GITLAB_SSL_KEY",r,"GITLAB_SSL_CERT",t);var n=readKey(r),o=readKey(t);return new https.Agent({key:n,cert:o})}}function defaultRequest(e,r){var t=r.body,n=r.query,o=r.sudo,a=r.method;console.log("build request");var s=new Headers(e.headers),u=t,i=buildAgent();return o&&s.append("sudo",""+o),"object"!=typeof t||t instanceof FormData||(u=JSON.stringify(humps.decamelizeKeys(t,skipAllCaps)),s.append("content-type","application/json")),{timeout:e.requestTimeout,headers:s,method:"stream"===a?"get":a,onProgress:"stream"===a?function(){}:void 0,searchParams:queryString.stringify(humps.decamelizeKeys(n||{}),{arrayFormat:"bracket"}),prefixUrl:e.url,body:u,agent:i}}function processBody(e){return __awaiter(this,void 0,void 0,function(){var r,t;return __generator(this,function(n){switch(n.label){case 0:return r=e.headers.get("content-type")||"",[4,e.text()];case 1:if(t=n.sent(),r.includes("json"))try{return[2,JSON.parse(t||"{}")]}catch(e){return[2,{}]}return[2,t]}})})}methods.forEach(function(e){KyRequester[e]=function(r,t,n){return __awaiter(this,void 0,void 0,function(){var o,a,s,u,i,c;return __generator(this,function(l){switch(l.label){case 0:o=defaultRequest(r,__assign({},n,{method:e})),l.label=1;case 1:return l.trys.push([1,3,,6]),[4,Ky(t,o)];case 2:return a=l.sent(),console.log("response: ",a),[3,6];case 3:return(s=l.sent()).response?[4,s.response.json()]:[3,5];case 4:u=l.sent(),s.description=u.error||u.message,l.label=5;case 5:throw s;case 6:return i=a.status,c=responseHeadersAsObject(a),[4,processBody(a)];case 7:return[2,{body:l.sent(),headers:c,status:i}]}})})}}),exports.KyRequester=KyRequester,exports.skipAllCaps=skipAllCaps;
