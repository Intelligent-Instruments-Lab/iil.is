var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require3() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
var import_http, import_https, import_zlib, import_stream, import_util, import_crypto, import_url, src, dataUriToBuffer$1, Readable, wm, Blob, fetchBlob, Blob$1, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, carriage, dashes, carriageLength, getFooter, getBoundary, INTERNALS$2, Body, clone, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers, redirectStatus, isRedirect, INTERNALS$1, Response, getSearch, INTERNALS, isRequest, Request, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    init_shims();
    import_http = __toModule(require("http"));
    import_https = __toModule(require("https"));
    import_zlib = __toModule(require("zlib"));
    import_stream = __toModule(require("stream"));
    import_util = __toModule(require("util"));
    import_crypto = __toModule(require("crypto"));
    import_url = __toModule(require("url"));
    src = dataUriToBuffer;
    dataUriToBuffer$1 = src;
    ({ Readable } = import_stream.default);
    wm = new WeakMap();
    Blob = class {
      constructor(blobParts = [], options2 = {}) {
        let size = 0;
        const parts = blobParts.map((element) => {
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element;
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length || buffer.size || 0;
          return buffer;
        });
        const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
        wm.set(this, {
          type: /[^\u0020-\u007E]/.test(type) ? "" : type,
          size,
          parts
        });
      }
      get size() {
        return wm.get(this).size;
      }
      get type() {
        return wm.get(this).type;
      }
      async text() {
        return Buffer.from(await this.arrayBuffer()).toString();
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of this.stream()) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        return Readable.from(read(wm.get(this).parts));
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = wm.get(this).parts.values();
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
            blobParts.push(chunk);
            added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
            relativeStart = 0;
            if (added >= span) {
              break;
            }
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        Object.assign(wm.get(blob), { size: span, parts: blobParts });
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    fetchBlob = Blob;
    Blob$1 = fetchBlob;
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && object[NAME] === "AbortSignal";
    };
    carriage = "\r\n";
    dashes = "-".repeat(2);
    carriageLength = Buffer.byteLength(carriage);
    getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
    getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_stream.default)
          ;
        else if (isFormData(body)) {
          boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
          body = import_stream.default.Readable.from(formDataIterator(body, boundary));
        } else {
          body = Buffer.from(String(body));
        }
        this[INTERNALS$2] = {
          body,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_stream.default) {
          body.on("error", (err) => {
            const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].body;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_stream.PassThrough({ highWaterMark });
        p2 = new import_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].body = p1;
        body = p2;
      }
      return body;
    };
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      }
      if (isFormData(body)) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body instanceof import_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request;
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      if (isFormData(body)) {
        return getFormDataLength(request[INTERNALS$2].boundary);
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else if (isBlob(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw err;
      }
    };
    validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const err = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
        throw err;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback) {
        for (const name of this.keys()) {
          callback(this.get(name), name);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options2 = {}) {
        super(body, options2);
        const status = options2.status || 200;
        const headers = new Headers(options2.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: options2.url,
          status,
          statusText: options2.statusText || "",
          headers,
          counter: options2.counter,
          highWaterMark: options2.highWaterMark
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal !== null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const requestOptions = {
        path: parsedURL.pathname + search,
        pathname: parsedURL.pathname,
        hostname: parsedURL.hostname,
        protocol: parsedURL.protocol,
        port: parsedURL.port,
        hash: parsedURL.hash,
        search: parsedURL.search,
        query: parsedURL.query,
        href: parsedURL.href,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return requestOptions;
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/@sveltejs/adapter-netlify/files/shims.js
var init_shims = __esm({
  "node_modules/@sveltejs/adapter-netlify/files/shims.js"() {
    init_install_fetch();
  }
});

// node_modules/bibtex/index.js
var require_bibtex = __commonJS({
  "node_modules/bibtex/index.js"(exports, module2) {
    init_shims();
    !function(e, t) {
      if (typeof exports == "object" && typeof module2 == "object")
        module2.exports = t();
      else if (typeof define == "function" && define.amd)
        define([], t);
      else {
        var n = t();
        for (var r in n)
          (typeof exports == "object" ? exports : e)[r] = n[r];
      }
    }(exports, function() {
      return function(e) {
        function t(r) {
          if (n[r])
            return n[r].exports;
          var s2 = n[r] = { i: r, l: false, exports: {} };
          return e[r].call(s2.exports, s2, s2.exports, t), s2.l = true, s2.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e2, n2, r) {
          t.o(e2, n2) || Object.defineProperty(e2, n2, { configurable: false, enumerable: true, get: r });
        }, t.n = function(e2) {
          var n2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return t.d(n2, "a", n2), n2;
        }, t.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, t.p = "", t(t.s = 17);
      }([function(e, t, n) {
        "use strict";
        function r(e2, t2) {
          if (typeof e2 != "string")
            throw new Error("Expected to be string: " + JSON.stringify(t2 || e2));
          return e2;
        }
        function s2(e2, t2) {
          if (e2 === void 0)
            throw new Error("Expected to be defined: " + JSON.stringify(t2 || e2));
          return e2;
        }
        function o(e2, t2) {
          if (!i(e2))
            throw new Error("Expected to be array: " + JSON.stringify(t2 || e2));
          return e2;
        }
        function i(e2) {
          return !!e2 && e2.constructor === Array;
        }
        function a(e2) {
          return typeof e2 == "number";
        }
        function u(e2) {
          return typeof e2 == "string";
        }
        Object.defineProperty(t, "__esModule", { value: true }), t.mustBeString = r, t.mustBeDefined = s2, t.mustBeArray = o, t.isArray = i, t.isNumber = a, t.isString = u, t.flattenMyArray = function(e2, n2) {
          n2 || (n2 = []);
          for (var r2 = 0, s3 = e2.length; r2 < s3; r2++) {
            var o2 = e2[r2];
            if (Array.isArray(o2))
              for (var i2 = 0, a2 = o2.length; i2 < a2; i2++) {
                var u2 = o2[i2];
                Array.isArray(u2) ? t.flattenMyArray(u2, n2) : n2.push(u2);
              }
            else
              n2.push(o2);
          }
          return n2;
        };
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return e2.type === "quotedstringwrapper";
        }
        function s2(e2) {
          return e2.type === "quotedstring";
        }
        var o = this && this.__extends || function() {
          var e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t2) {
            e3.__proto__ = t2;
          } || function(e3, t2) {
            for (var n2 in t2)
              t2.hasOwnProperty(n2) && (e3[n2] = t2[n2]);
          };
          return function(t2, n2) {
            function r2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }();
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(4), a = function(e2) {
          function t2(t3, n2) {
            return e2.call(this, "quotedstring", t3, n2) || this;
          }
          return o(t2, e2), t2;
        }(i.BibStringComponent);
        t.QuotedString = a;
        var u = function(e2) {
          function t2(t3) {
            return e2.call(this, "quotedstringwrapper", t3) || this;
          }
          return o(t2, e2), t2;
        }(i.BibOuterStringComponent);
        t.OuterQuotedString = u, t.isOuterQuotedString = r, t.isQuotedString = s2;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return e2.type === "bracedstringwrapper";
        }
        function s2(e2) {
          return e2.type === "bracedstring";
        }
        var o = this && this.__extends || function() {
          var e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t2) {
            e3.__proto__ = t2;
          } || function(e3, t2) {
            for (var n2 in t2)
              t2.hasOwnProperty(n2) && (e3[n2] = t2[n2]);
          };
          return function(t2, n2) {
            function r2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }();
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(4), a = function(e2) {
          function t2(t3, n2) {
            var r2 = e2.call(this, "bracedstring", t3, n2) || this;
            return r2.isSpecialCharacter = t3 === 0 && n2[0] === "\\", r2;
          }
          return o(t2, e2), t2;
        }(i.BibStringComponent);
        t.BracedString = a;
        var u = function(e2) {
          function t2(t3) {
            return e2.call(this, "bracedstringwrapper", t3) || this;
          }
          return o(t2, e2), t2;
        }(i.BibOuterStringComponent);
        t.OuterBracedString = u, t.isOuterBracedString = r, t.isBracedString = s2;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return typeof e2.braceDepth == "number" && typeof e2.type == "string";
        }
        function s2(e2) {
          return e2.type === "ContiguousSimpleString" && d.isArray(e2.data);
        }
        function o(e2) {
          return e2.data.join("");
        }
        function i(e2, t2) {
          if (d.isNumber(t2) || d.isString(t2))
            return t2;
          if (y.isStringRef(t2))
            return new y.StringRef(0, t2.stringref);
          switch (d.mustBeString(t2.type, t2)) {
            case "id":
            case "ws":
            case "number":
              return d.mustBeString(t2.string);
            case "bracedstring":
            case "braced":
              if (!d.isArray(t2.data))
                throw new Error("Expect array for data: " + JSON.stringify(t2));
              return new h.BracedString(e2, d.flattenMyArray(t2.data).map(function(t3) {
                return i(e2 + 1, t3);
              }));
            case "quotedstring":
              if (!d.isArray(t2.data))
                throw new Error("Expect array for data: " + JSON.stringify(t2));
              var n2 = d.flattenMyArray(t2.data);
              return new $.QuotedString(e2, n2.map(function(t3) {
                return i(e2, t3);
              }));
            default:
              throw new Error("Unexpected complex string type: " + t2.type);
          }
        }
        function a(e2) {
          if (d.isString(e2))
            return e2;
          if (d.isNumber(e2))
            return e2 + "";
          if (h.isBracedString(e2) || $.isQuotedString(e2) || $.isOuterQuotedString(e2) || h.isOuterBracedString(e2))
            return u(e2.data);
          throw new Error(JSON.stringify(e2));
        }
        function u(e2) {
          return e2.map(a).join("");
        }
        function c(e2, t2) {
          for (var n2 = [], r2 = 0, s3 = e2; r2 < s3.length; r2++) {
            var o2 = s3[r2], i2 = p(o2, t2);
            d.isArray(i2) ? n2 = n2.concat(i2) : n2.push(i2);
          }
          return n2;
        }
        function p(e2, t2) {
          if (h.isBracedString(e2))
            return e2;
          if ($.isQuotedString(e2)) {
            var n2 = c(e2.data, true);
            return d.isArray(n2) ? t2 ? n2 : _.concat(n2).concat(_) : t2 ? n2 : ['"', n2, '"'];
          }
          if ($.isOuterQuotedString(e2))
            return c(e2.data, true);
          if (h.isOuterBracedString(e2))
            return c(e2.data, false);
          if (d.isString(e2) || d.isNumber(e2))
            return e2;
          throw y.isStringRef(e2) ? new Error("StringRef should be resolved at this point!") : new Error();
        }
        function b(e2) {
          for (var t2 = [], n2 = 0, r2 = e2; n2 < r2.length; n2++) {
            var o2 = r2[n2];
            if (d.isString(o2) || d.isNumber(o2))
              if (t2.length <= 0) {
                var i2 = { type: "ContiguousSimpleString", data: [o2] };
                t2.push(i2);
              } else {
                var a2 = t2[t2.length - 1];
                if (s2(a2))
                  a2.data.push(o2);
                else {
                  var i2 = { type: "ContiguousSimpleString", data: [o2] };
                  t2.push(i2);
                }
              }
            else
              t2.push(o2);
          }
          return t2;
        }
        function l(e2) {
          return m(e2, /\s+and\s+/g);
        }
        function f(e2, t2) {
          return t2 === void 0 && (t2 = 2), m(e2, /\s*,\s*/g, t2);
        }
        function m(e2, t2, n2) {
          for (var r2 = [], s3 = [], o2 = 0, i2 = e2; o2 < i2.length; o2++) {
            var a2 = i2[o2];
            if (d.isString(a2) && (n2 === void 0 || n2 > 0)) {
              var u2 = t2.exec(a2), c2 = 0;
              if (u2) {
                do {
                  var p2 = c2;
                  c2 = u2.index + u2[0].length, s3.push(a2.substring(p2, u2.index)), (n2 === void 0 || n2 > 0) && (r2.push(s3), s3 = [], n2 !== void 0 && n2 > 0 && n2--), u2 = n2 === void 0 || n2 > 0 ? t2.exec(a2) : void 0;
                } while (u2);
                c2 > 0 && c2 < a2.length && s3.push(a2.substring(c2));
              } else
                s3.push(a2);
            } else
              s3.push(a2);
          }
          return s3.length > 0 && r2.push(s3), r2;
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var y = n(5), h = n(2), $ = n(1), d = n(0);
        t.isBibStringComponent = r, t.isContiguousSimpleString = s2, t.joinContiguousSimpleStrings = o, t.parseStringComponent = i, t.toStringBibStringDatum = a, t.toStringBibStringData = u, t.flattenQuotedStrings = c;
        var _ = ['"'];
        t.globContiguousStrings = b, t.splitOnAnd = l, t.splitOnComma = f, t.splitOnPattern = m;
      }, function(e, t, n) {
        "use strict";
        var r = this && this.__extends || function() {
          var e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t2) {
            e3.__proto__ = t2;
          } || function(e3, t2) {
            for (var n2 in t2)
              t2.hasOwnProperty(n2) && (e3[n2] = t2[n2]);
          };
          return function(t2, n2) {
            function r2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }();
        Object.defineProperty(t, "__esModule", { value: true });
        var s2 = n(0), o = function() {
          function e2(e3, t2, n2) {
            this.type = e3, this.braceDepth = t2, this.data = n2;
          }
          return e2.isBibStringComponent = function(e3) {
            return typeof e3.braceDepth == "number" && typeof e3.type == "string";
          }, e2.stringifyDatum = function(t2) {
            if (s2.isString(t2))
              return t2;
            if (s2.isNumber(t2))
              return t2.toString();
            if (e2.isBibStringComponent(t2))
              return t2.stringify();
            throw new Error("Unexpected state");
          }, e2.prototype.stringify = function() {
            return this.data.map(e2.stringifyDatum).join("");
          }, e2;
        }();
        t.BibStringComponent = o;
        var i = function(e2) {
          function t2(t3, n2) {
            return e2.call(this, t3, 0, n2) || this;
          }
          return r(t2, e2), t2;
        }(o);
        t.BibOuterStringComponent = i;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return typeof e2.stringref == "string";
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var s2 = function() {
          function e2(e3, t2) {
            this.braceDepth = e3, this.stringref = t2;
          }
          return e2;
        }();
        t.StringRef = s2, t.isStringRef = r;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return typeof e2.key == "string" && e2.value !== void 0;
        }
        function s2(e2) {
          if (r(e2))
            return { key: e2.key, value: o(e2.value) };
          throw new Error("Was not a KeyVal: " + JSON.stringify(e2));
        }
        function o(e2) {
          if (c.isNumber(e2))
            return e2;
          var t2 = c.mustBeArray(e2.data);
          switch (e2.type) {
            case "quotedstringwrapper":
              return t2.length === 1 && c.isNumber(t2[0]) ? t2[0] : new u.OuterQuotedString(t2.map(function(e3) {
                return p.parseStringComponent(0, e3);
              }));
            case "bracedstringwrapper":
              return new a.OuterBracedString(t2.map(function(e3) {
                return p.parseStringComponent(0, e3);
              }));
            default:
              throw new Error("Unexpected value: " + JSON.stringify(e2));
          }
        }
        function i(e2) {
          if (e2)
            return c.isNumber(e2) ? e2 : e2.stringify();
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var a = n(2), u = n(1), c = n(0), p = n(3);
        t.isKeyVal = r, t.newKeyVal = s2, t.parseFieldValue = o, t.normalizeFieldValue = i;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          var t2 = s2(e2), n2 = t2.key, r2 = t2.value;
          return new $(n2, r2);
        }
        function s2(e2) {
          if (b.isKeyVal(e2))
            return b.newKeyVal(e2);
          if (e2.type !== "string")
            throw new Error("Unexpected node: " + JSON.stringify(e2));
          return s2(e2.data);
        }
        function o(e2) {
          var t2 = {};
          return Object.keys(e2).forEach(function(n2) {
            t2[n2] || (t2[n2] = a({}, t2, e2, e2[n2]));
          }), t2;
        }
        function i(e2, t2, n2, r2) {
          return e2.data.map(function(e3) {
            if (y.isString(e3) || y.isNumber(e3))
              return e3;
            if (l.isStringRef(e3))
              return u(t2, r2, e3, n2);
            if (h.isBibStringComponent(e3))
              return c(e3, t2, n2, r2);
            throw new Error();
          });
        }
        function a(e2, t2, n2, r2) {
          return y.isNumber(r2) ? r2 : m.isOuterBracedString(r2) || f.isOuterQuotedString(r2) ? p(r2, e2, t2, n2) : l.isStringRef(r2) ? u(e2, n2, r2, t2) : r2;
        }
        function u(e2, t2, n2, r2) {
          var s3 = n2.stringref;
          if (e2[s3])
            throw new Error("Cycle detected: " + s3);
          if (r2[s3])
            return r2[s3];
          if (!t2[s3])
            throw new Error('Unresolved reference: "' + n2.stringref + '" (' + JSON.stringify(n2) + ")");
          return r2[s3] = a(Object.assign({}, e2, (o2 = {}, o2[s3] = true, o2)), r2, t2, t2[s3]), r2[s3];
          var o2;
        }
        function c(e2, t2, n2, r2) {
          var s3 = i(e2, t2, n2, r2), o2 = e2.braceDepth;
          if (f.isQuotedString(e2))
            return new f.QuotedString(o2, s3);
          if (m.isBracedString(e2))
            return new m.BracedString(o2, s3);
          if (f.isOuterQuotedString(e2))
            return new f.OuterQuotedString(s3);
          if (m.isOuterBracedString(e2))
            return new m.OuterBracedString(s3);
          throw new Error();
        }
        function p(e2, t2, n2, r2) {
          var s3 = c(e2, t2, n2, r2);
          if (!m.isOuterBracedString(s3) && !f.isOuterQuotedString(s3))
            throw new Error();
          return s3;
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var b = n(6), l = n(5), f = n(1), m = n(2), y = n(0), h = n(3), $ = function() {
          function e2(e3, t2) {
            this.type = "string", this.key = e3, this.value = t2;
          }
          return e2;
        }();
        t.BibStringEntry = $, t.newStringEntry = r, t.resolveStrings = o, t.resolveStringReferences = i, t.resolveStringReference = a, t.copyWithResolvedStringReferences = c, t.copyOuterWithResolvedStringReferences = p;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          var t2 = $.toStringBibStringData(e2);
          return t2 ? t2.charAt(0) : "";
        }
        function s2(e2) {
          return e2.length > 0 && o(e2[0]);
        }
        function o(e2) {
          if (f.isString(e2)) {
            if (!e2)
              return false;
            var t2 = e2.charAt(0);
            return t2.toLowerCase() === t2 && t2.toUpperCase() !== t2;
          }
          if (m.isQuotedString(e2))
            return !(!e2.data || e2.data.length <= 0) && o(e2.data[0]);
          if (y.isStringRef(e2) || m.isOuterQuotedString(e2) || h.isOuterBracedString(e2))
            throw new Error("Should not do this test on this type");
          return false;
        }
        function i(e2) {
          for (var t2 = $.splitOnPattern(e2, d), n2 = -1, r2 = -1, o2 = -1, i2 = 0; i2 < t2.length - 1; i2++)
            s2(t2[i2]) && (n2 < 0 && (n2 = i2), r2 = i2 + 1);
          o2 = n2 >= 0 ? n2 : t2.length - 1;
          var a2 = n2 >= 0 ? u(t2, n2, r2) : [], c2 = u(t2, 0, o2), p2 = u(t2, Math.max(r2, o2), t2.length);
          return new _(c2, a2, p2, []);
        }
        function a(e2, t2) {
          for (var n2 = $.splitOnPattern(e2, d), r2 = $.splitOnPattern(t2, d), o2 = -1, i2 = -1, a2 = 0; a2 < n2.length - 1; a2++)
            s2(n2[a2]) && (o2 < 0 && (o2 = a2), i2 = a2 + 1);
          var c2 = o2 >= 0 ? u(n2, 0, i2) : [], p2 = r2, b2 = u(n2, Math.max(i2, 0));
          return new _(p2, c2, b2, []);
        }
        function u(e2, t2, n2) {
          for (var r2 = [], s3 = t2; s3 < (n2 === void 0 ? e2.length : n2); s3++)
            r2.push(e2[s3]);
          return r2;
        }
        function c(e2, t2, n2) {
          for (var r2 = $.splitOnPattern(e2, d), o2 = $.splitOnPattern(n2, d), i2 = $.splitOnPattern(t2, d), a2 = -1, c2 = -1, p2 = 0; p2 < r2.length - 1; p2++)
            s2(r2[p2]) && (a2 < 0 && (a2 = p2), c2 = p2 + 1);
          var b2 = a2 >= 0 ? u(r2, 0, c2) : [], l2 = u(r2, Math.max(c2, 0));
          return new _(o2, b2, l2, i2);
        }
        function p(e2) {
          var t2 = $.splitOnComma(e2);
          switch (t2.length) {
            case 1:
              return i(t2[0]);
            case 2:
              return a(l(t2[0]), l(t2[1]));
            case 3:
              return c(l(t2[0]), l(t2[1]), l(t2[2]));
            default:
              throw new Error("Could not parse author name: partitioned as " + JSON.stringify(t2) + " in " + JSON.stringify(e2));
          }
        }
        function b(e2) {
          return e2 !== void 0;
        }
        function l(e2) {
          if (b(e2))
            return e2;
          throw new Error("???????");
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var f = n(0), m = n(1), y = n(5), h = n(2), $ = n(3), d = /\s+/g, _ = function() {
          function e2(e3, t2, n2, s3) {
            this.firstNames$ = e3, this.vons$ = t2, this.lastNames$ = n2, this.jrs$ = s3, this.initials = e3.map(r), this.firstNames = e3.map($.toStringBibStringData), this.vons = t2.map($.toStringBibStringData), this.lastNames = n2.map($.toStringBibStringData), this.jrs = s3.map($.toStringBibStringData), this.id = this.firstNames.join("-") + "-" + this.vons.join("-") + "-" + this.lastNames.join("-") + "-" + this.jrs.join("-");
          }
          return e2;
        }();
        t.AuthorName = _, t.parseAuthorName = p;
        var g = function() {
          function e2(e3, t2, n2) {
            this.first = e3, this.von = t2, this.last = n2;
          }
          return e2;
        }();
        t.Authorrr = g;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return p.parseAuthorName(e2);
        }
        function s2(e2) {
          return c.isNumber(e2) ? o([e2]) : o(e2.data, b.isOuterQuotedString(e2));
        }
        function o(e2, t2) {
          var n2 = f.globContiguousStrings(f.flattenQuotedStrings(e2, t2)), r2 = n2.map(function(e3) {
            return f.isContiguousSimpleString(e3) ? f.joinContiguousSimpleStrings(e3) : e3;
          });
          return f.splitOnAnd(r2);
        }
        function i(e2) {
          if (!a(e2))
            throw new Error();
          return e2;
        }
        function a(e2) {
          return c.isArray(e2.authors$) && e2.type === "authors";
        }
        var u = this && this.__extends || function() {
          var e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t2) {
            e3.__proto__ = t2;
          } || function(e3, t2) {
            for (var n2 in t2)
              t2.hasOwnProperty(n2) && (e3[n2] = t2[n2]);
          };
          return function(t2, n2) {
            function r2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }();
        Object.defineProperty(t, "__esModule", { value: true });
        var c = n(0), p = n(8), b = n(1), l = n(4), f = n(3), m = function(e2) {
          function t2(t3) {
            var n2 = this, o2 = c.isNumber(t3) ? [t3] : t3.data;
            n2 = e2.call(this, "authors", o2) || this;
            var i2 = s2(t3);
            return n2.authors$ = i2.map(function(e3) {
              return r(e3);
            }), n2;
          }
          return u(t2, e2), t2;
        }(l.BibOuterStringComponent);
        t.Authors = m, t.determineAuthorNames$ = s2, t.mustBeAuthors = i, t.isAuthors = a;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return e2.type === "comment" && o.isArray(e2.data);
        }
        function s2(e2) {
          return o.flattenMyArray(e2).map(u);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var o = n(0), i = function() {
          function e2(e3) {
            this.type = "comment", this.data = e3, this.string = e3.join("");
          }
          return e2.prototype.toString = function() {
            return this.string;
          }, e2;
        }();
        t.BibComment = i;
        var a = function() {
          function e2(e3, t2) {
            this.type = e3, this.data = t2, this.string = t2.join("");
          }
          return e2.prototype.toString = function() {
            return this.string;
          }, e2;
        }();
        t.CommentEntry = a, t.isBibComment = r;
        var u = function(e2) {
          return o.isString(e2) ? e2 : typeof e2 == "number" ? e2.toString() : e2.type === "@bib" ? "@" + o.mustBeString(e2.string) : e2.type === "escapedEntry" ? "\\" + u(e2.data) : o.mustBeString(e2.string);
        };
        t.flattenPlainText = s2;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          var t2 = {};
          return Object.keys(e2).forEach(function(n2) {
            t2[n2] = u.parseFieldValue(e2[n2]);
          }), t2;
        }
        function s2(e2) {
          return typeof e2.type == "string" && typeof e2._id == "string" && !!e2.fields;
        }
        function o(e2, t2) {
          var n2 = {}, r2 = e2.fields;
          return Object.keys(e2.fields).forEach(function(e3) {
            var s3 = a.resolveStringReference({}, n2, t2, r2[e3]);
            switch (e3) {
              case "author":
                n2[e3] = new i.Authors(s3);
                break;
              case "title":
                n2[e3] = s3;
                break;
              case "incollection":
              default:
                n2[e3] = s3;
            }
          }), new c(e2.type, e2._id, n2);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(9), a = n(7), u = n(6), c = function() {
          function e2(e3, t2, n2) {
            this.type = e3, this._id = t2, this.fields = n2, this.sortkey$ = "", this.title$ = "";
          }
          return e2.prototype.getField = function(e3) {
            return this.fields[e3.toLowerCase()];
          }, e2.prototype.getFieldAsString = function(e3) {
            var t2 = this.getField(e3);
            return u.normalizeFieldValue(t2);
          }, e2.prototype.getAuthors = function() {
            var e3 = this.fields.author;
            return e3 === void 0 ? e3 : i.mustBeAuthors(e3);
          }, e2;
        }();
        t.BibEntry = c, t.parseEntryFields = r, t.isBibEntry = s2, t.processEntry = o;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return e2.type === "preamble" && !!e2.data;
        }
        function s2(e2) {
          var t2 = i.parseBibEntriesAndNonEntries(o.mustBeArray(e2.data));
          return new a(t2);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var o = n(0), i = n(13), a = function() {
          function e2(e3) {
            this.type = "preamble", this.data = e3, this.string = e3.join("");
          }
          return e2.prototype.toString = function() {
            return this.string;
          }, e2;
        }();
        t.Preamble = a, t.isPreamble = r, t.newPreambleNode = s2;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          if (!u.isArray(e2.data) || e2.type !== "NON_ENTRY")
            throw new Error();
          return new b.BibComment(b.flattenPlainText(e2.data));
        }
        function s2(e2) {
          switch (typeof e2) {
            case "object":
              var t2 = e2.data;
              if (typeof t2["@type"] == "string")
                return new p.BibEntry(t2["@type"], t2._id, p.parseEntryFields(t2.fields));
              switch (u.mustBeString(t2.type)) {
                case "string":
                  return f.newStringEntry(t2);
                case "preamble":
                  return l.newPreambleNode(t2);
                default:
                  throw new Error("Unexpected entry parsed: " + t2.type);
              }
            default:
              throw new Error("Expected object as data for entry");
          }
        }
        function o(e2) {
          var n2 = new i.Parser(a.grammar.ParserRules, a.grammar.ParserStart);
          n2.feed(new m.default(e2).readTokens());
          var r2 = n2.results, s3 = r2[0];
          return new y(t.parseBibEntriesAndNonEntries(s3));
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(19), a = n(20), u = n(0), c = n(6), p = n(11), b = n(10), l = n(12), f = n(7), m = n(21), y = function() {
          function e2(e3) {
            var t2 = this;
            this.content = e3, this.comments = e3.filter(b.isBibComment).map(function(e4) {
              if (b.isBibComment(e4))
                return e4;
              throw new Error();
            }), this.preambles_raw = e3.filter(function(e4) {
              return l.isPreamble(e4);
            }).map(function(e4) {
              if (l.isPreamble(e4))
                return e4;
              throw new Error();
            }), this.preamble$ = this.preambles_raw.map(function(e4) {
              return e4.toString();
            }).join("\n");
            var n2 = {};
            this.content.forEach(function(e4) {
              if (c.isKeyVal(e4)) {
                if (n2[e4.key])
                  throw new Error("String with id " + e4.key + " was defined more than once");
                n2[e4.key] = e4.value;
              }
            }), this.strings_raw = n2, this.strings$ = f.resolveStrings(n2), this.entries_raw = e3.filter(function(e4) {
              return p.isBibEntry(e4);
            }).map(function(e4) {
              if (p.isBibEntry(e4))
                return e4;
              throw new Error();
            });
            var r2 = {};
            this.entries_raw.forEach(function(e4) {
              var n3 = e4._id.toLowerCase();
              if (r2[n3])
                throw new Error("Entry with id " + n3 + " was defined more than once");
              r2[n3] = p.processEntry(e4, t2.strings$);
            }), this.entries$ = r2;
          }
          return e2.prototype.getEntry = function(e3) {
            return this.entries$[e3.toLowerCase()];
          }, e2;
        }();
        t.BibFilePresenter = y, t.parseBibEntriesAndNonEntries = function(e2) {
          return e2.map(function(e3) {
            switch (e3.type) {
              case "NON_ENTRY":
                return r(e3);
              case "ENTRY":
                return s2(e3);
              default:
                throw new Error("Expected ENTRY or NON_ENTRY");
            }
          });
        }, t.parseBibFile = o;
      }, function(e, t, n) {
        "use strict";
        function r(e2, t2) {
          return { type: e2, string: t2 };
        }
        function s2(e2) {
          return t.specialChars.hasOwnProperty(e2);
        }
        function o(e2) {
          return t.escapableChars.hasOwnProperty(e2);
        }
        Object.defineProperty(t, "__esModule", { value: true }), t.newToken = r, t.specialChars = { "@": true, "(": true, ")": true, "{": true, "}": true, "#": true, "=": true, ",": true, "\\": true, '"': true }, t.isSpecialChar = s2, t.escapableChars = { "\\": true, "@": true, "{": true, "}": true }, t.isEscapableChar = o;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return { type: "ws", string: e2 };
        }
        function s2(e2) {
          return typeof e2.string == "string" && e2.type === t.WS;
        }
        function o(e2) {
          return t.singleWhitespaces.hasOwnProperty(e2);
        }
        Object.defineProperty(t, "__esModule", { value: true }), t.WS = "ws", t.newWhitespace = r, t.isWhitespace = s2, t.singleWhitespaces = { " ": true, "	": true, "\r": true, "\n": true }, t.isSingleWhiteSpaceCharacter = o;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return { type: "number", string: e2 };
        }
        function s2(e2) {
          return t.numericChars.hasOwnProperty(e2);
        }
        Object.defineProperty(t, "__esModule", { value: true }), t.newNumber = r, t.numericChars = { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true }, t.isNum = s2;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          for (var n2 in e2)
            t.hasOwnProperty(n2) || (t[n2] = e2[n2]);
        }
        Object.defineProperty(t, "__esModule", { value: true }), r(n(8)), r(n(9)), r(n(18)), r(n(10)), r(n(11)), r(n(12)), r(n(7)), r(n(3)), r(n(4)), r(n(2)), r(n(1)), r(n(5)), r(n(6)), r(n(13)), r(n(0));
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return t.optionalFields.hasOwnProperty(e2);
        }
        function s2(e2) {
          return t.mandatoryFields.hasOwnProperty(e2);
        }
        function o(e2) {
          return s2(e2) ? t.mandatoryFields[e2] : [];
        }
        function i(e2) {
          return r(e2) ? t.optionalFields[e2] : [];
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var a = n(0);
        t.address = "address", t.author = "author", t.booktitle = "booktitle", t.chapter = "chapter", t.edition = "edition", t.editor = "editor", t.howpublished = "howpublished", t.institution = "institution", t.journal = "journal", t.month = "month", t.note = "note", t.number = "number", t.organization = "organization", t.pages = "pages", t.publisher = "publisher", t.school = "school", t.series = "series", t.title = "title", t.type = "type", t.volume = "volume", t.year = "year", t.optionalFields = { book: [["volume", "number"], "series", "address", "edition", "month", "note"], booklet: ["author", "howpublished", "address", "address", "month", "year", "note"], conference: ["editor", ["volume", "number"], "series", "pages", "address", "month", "organization", "publisher", "note"], inproceedings: ["editor", ["volume", "number"], t.series, "pages", "address", "month", "organization", "publisher", "note"], inbook: ["volume", "number", "series", "type", "address", "edition", "month", "note"], incollection: ["editor", ["volume", "number"], "series", "type", "chapter", "pages", "address", "edition", "month", "note"], manual: ["author", "organization", "year", "address", "edition", "month", "note"], mastersthesis: ["type", "address", "month", "note"], misc: [], phdthesis: ["type", "address", "month", "note"], proceedings: ["editor", ["volume", "number"], "series", "address", "month", "organization", "publisher", "note"], techreport: ["type", "address", "number", "month", "note"], unpublished: ["month", "year"] }, t.mandatoryFields = { article: ["author", "title", "year", "journal"], book: [["author", "editor"], "title", "publisher", "year"], booklet: ["title"], conference: ["author", "title", "booktitle", "year"], inproceedings: ["author", "title", "booktitle", "year"], inbook: [["author", "editor"], "title", ["chapter", "pages"]], incollection: ["author", "title", "booktitle", "publisher", "year"], manual: ["title"], mastersthesis: ["author", "title", "school", "year"], misc: [["author", "title", "howpublished", "year", "month", "note"]], phdthesis: ["author", "title", "school", "year"], proceedings: ["year", "title"], techreport: ["author", "title", "institution", "year"], unpublished: ["author", "title", "note"] }, t.hasOptionalFields = r, t.hasMandatoryFields = s2, t.getMandatoryFields = o, t.getOptionalFields = i, t.findError = function(e2, t2) {
          var n2 = e2.fields;
          if (a.isString(t2)) {
            if (!n2[t2])
              return new Error("Warning: expected " + e2.type + " with id " + e2._id + " to have the field: " + t2);
          } else if (a.isArray(t2)) {
            var r2 = t2.reduce(function(e3, t3) {
              if (a.isString(t3))
                return e3 && n2.hasOwnProperty(t3);
              throw new Error();
            }, true);
            if (!r2)
              return new Error("Expected " + e2.type + " with id " + e2._id + " to have one of the following fields: " + t2);
          }
        };
      }, function(e, t) {
        !function(t2, n) {
          typeof e == "object" && e.exports ? e.exports = n() : t2.nearley = n();
        }(this, function() {
          function e2(t3, n2, r2) {
            return this.id = ++e2.highestId, this.name = t3, this.symbols = n2, this.postprocess = r2, this;
          }
          function t2(e3, t3, n2, r2) {
            this.rule = e3, this.dot = t3, this.reference = n2, this.data = [], this.wantedBy = r2, this.isComplete = this.dot === e3.symbols.length;
          }
          function n(e3, t3) {
            this.grammar = e3, this.index = t3, this.states = [], this.wants = {}, this.scannable = [], this.completed = {};
          }
          function r(e3, t3) {
            this.rules = e3, this.start = t3 || this.rules[0].name;
            var n2 = this.byName = {};
            this.rules.forEach(function(e4) {
              n2.hasOwnProperty(e4.name) || (n2[e4.name] = []), n2[e4.name].push(e4);
            });
          }
          function s2() {
            this.reset("");
          }
          function o(e3, t3, o2) {
            if (e3 instanceof r)
              var i = e3, o2 = t3;
            else
              var i = r.fromCompiled(e3, t3);
            this.grammar = i, this.options = { keepHistory: false, lexer: i.lexer || new s2() };
            for (var a in o2 || {})
              this.options[a] = o2[a];
            this.lexer = this.options.lexer, this.lexerState = void 0;
            var u = new n(i, 0);
            this.table = [u];
            u.wants[i.start] = [], u.predict(i.start), u.process(), this.current = 0;
          }
          return e2.highestId = 0, e2.prototype.toString = function(e3) {
            function t3(e4) {
              return e4.literal ? JSON.stringify(e4.literal) : e4.type ? "%" + e4.type : e4.toString();
            }
            var n2 = e3 === void 0 ? this.symbols.map(t3).join(" ") : this.symbols.slice(0, e3).map(t3).join(" ") + " \u25CF " + this.symbols.slice(e3).map(t3).join(" ");
            return this.name + " \u2192 " + n2;
          }, t2.prototype.toString = function() {
            return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
          }, t2.prototype.nextState = function(e3) {
            var n2 = new t2(this.rule, this.dot + 1, this.reference, this.wantedBy);
            return n2.left = this, n2.right = e3, n2.isComplete && (n2.data = n2.build()), n2;
          }, t2.prototype.build = function() {
            var e3 = [], t3 = this;
            do {
              e3.push(t3.right.data), t3 = t3.left;
            } while (t3.left);
            return e3.reverse(), e3;
          }, t2.prototype.finish = function() {
            this.rule.postprocess && (this.data = this.rule.postprocess(this.data, this.reference, o.fail));
          }, n.prototype.process = function(e3) {
            for (var t3 = this.states, n2 = this.wants, r2 = this.completed, s3 = 0; s3 < t3.length; s3++) {
              var i = t3[s3];
              if (i.isComplete) {
                if (i.finish(), i.data !== o.fail) {
                  for (var a = i.wantedBy, u = a.length; u--; ) {
                    var c = a[u];
                    this.complete(c, i);
                  }
                  if (i.reference === this.index) {
                    var p = i.rule.name;
                    (this.completed[p] = this.completed[p] || []).push(i);
                  }
                }
              } else {
                var p = i.rule.symbols[i.dot];
                if (typeof p != "string") {
                  this.scannable.push(i);
                  continue;
                }
                if (n2[p]) {
                  if (n2[p].push(i), r2.hasOwnProperty(p))
                    for (var b = r2[p], u = 0; u < b.length; u++) {
                      var l = b[u];
                      this.complete(i, l);
                    }
                } else
                  n2[p] = [i], this.predict(p);
              }
            }
          }, n.prototype.predict = function(e3) {
            for (var n2 = this.grammar.byName[e3] || [], r2 = 0; r2 < n2.length; r2++) {
              var s3 = n2[r2], o2 = this.wants[e3], i = new t2(s3, 0, this.index, o2);
              this.states.push(i);
            }
          }, n.prototype.complete = function(e3, t3) {
            var n2 = t3.rule.name;
            if (e3.rule.symbols[e3.dot] === n2) {
              var r2 = e3.nextState(t3);
              this.states.push(r2);
            }
          }, r.fromCompiled = function(t3, n2) {
            var s3 = t3.Lexer;
            t3.ParserStart && (n2 = t3.ParserStart, t3 = t3.ParserRules);
            var t3 = t3.map(function(t4) {
              return new e2(t4.name, t4.symbols, t4.postprocess);
            }), o2 = new r(t3, n2);
            return o2.lexer = s3, o2;
          }, s2.prototype.reset = function(e3, t3) {
            this.buffer = e3, this.index = 0, this.line = t3 ? t3.line : 1, this.lastLineBreak = t3 ? -t3.col : 0;
          }, s2.prototype.next = function() {
            if (this.index < this.buffer.length) {
              var e3 = this.buffer[this.index++];
              return e3 === "\n" && (this.line += 1, this.lastLineBreak = this.index), { value: e3 };
            }
          }, s2.prototype.save = function() {
            return { line: this.line, col: this.index - this.lastLineBreak };
          }, s2.prototype.formatError = function(e3, t3) {
            var n2 = this.buffer;
            if (typeof n2 == "string") {
              var r2 = n2.indexOf("\n", this.index);
              r2 === -1 && (r2 = n2.length);
              var s3 = n2.substring(this.lastLineBreak, r2), o2 = this.index - this.lastLineBreak;
              return t3 += " at line " + this.line + " col " + o2 + ":\n\n", t3 += "  " + s3 + "\n", t3 += "  " + Array(o2).join(" ") + "^";
            }
            return t3 + " at index " + (this.index - 1);
          }, o.fail = {}, o.prototype.feed = function(e3) {
            var t3 = this.lexer;
            t3.reset(e3, this.lexerState);
            for (var r2; r2 = t3.next(); ) {
              var o2 = this.table[this.current];
              this.options.keepHistory || delete this.table[this.current - 1];
              var i = this.current + 1, a = new n(this.grammar, i);
              this.table.push(a);
              for (var u = r2.value, c = t3.constructor === s2 ? r2.value : r2, p = o2.scannable, b = p.length; b--; ) {
                var l = p[b], f = l.rule.symbols[l.dot];
                if (f.test ? f.test(c) : f.type ? f.type === r2.type : f.literal === u) {
                  var m = l.nextState({ data: c, token: r2, isToken: true, reference: i - 1 });
                  a.states.push(m);
                }
              }
              if (a.process(), a.states.length === 0) {
                var y = this.lexer.formatError(r2, "invalid syntax") + "\n";
                y += "Unexpected " + (r2.type ? r2.type + " token: " : ""), y += JSON.stringify(r2.value !== void 0 ? r2.value : r2) + "\n";
                var h = new Error(y);
                throw h.offset = this.current, h.token = r2, h;
              }
              this.options.keepHistory && (o2.lexerState = t3.save()), this.current++;
            }
            return o2 && (this.lexerState = t3.save()), this.results = this.finish(), this;
          }, o.prototype.save = function() {
            var e3 = this.table[this.current];
            return e3.lexerState = this.lexerState, e3;
          }, o.prototype.restore = function(e3) {
            var t3 = e3.index;
            this.current = t3, this.table[t3] = e3, this.table.splice(t3 + 1), this.lexerState = e3.lexerState, this.results = this.finish();
          }, o.prototype.rewind = function(e3) {
            if (!this.options.keepHistory)
              throw new Error("set option `keepHistory` to enable rewinding");
            this.restore(this.table[e3]);
          }, o.prototype.finish = function() {
            var e3 = [], t3 = this.grammar.start;
            return this.table[this.table.length - 1].states.forEach(function(n2) {
              n2.rule.name === t3 && n2.dot === n2.rule.symbols.length && n2.reference === 0 && n2.data !== o.fail && e3.push(n2);
            }), e3.map(function(e4) {
              return e4.data;
            });
          }, { Parser: o, Grammar: r, Rule: e2 };
        });
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return e2[0];
        }
        function s2(e2, t2) {
          if (t2.type !== "keyval")
            throw new Error("Expected a keyval object");
          var n2 = t2.key.toLowerCase();
          return e2.fields[n2] ? void 0 : (e2.fields[n2] = t2.value, e2);
        }
        function o(e2) {
          for (var t2 = [], n2 = 0; n2 < e2.length; n2++)
            if (typeof e2[n2] == "object") {
              if (!e2[n2].string)
                throw new Error("Expected token to have a string field called 'string' in object " + JSON.stringify(e2[n2]));
              t2.push(e2[n2].string);
            } else {
              if (typeof e2[n2] != "string" && typeof e2[n2] != "number")
                throw new Error("Could not handle token " + JSON.stringify(e2[n2]) + " in array " + JSON.stringify(e2));
              t2.push(e2[n2]);
            }
          return t2.join("");
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = function(e2) {
          return e2.constructor === Number || typeof e2 == "object" && e2.type === "number";
        }, a = { test: function(e2) {
          return typeof e2 == "object" && e2.type === "id";
        } }, u = { test: function(e2) {
          return typeof e2 == "object" && e2.type === "@bib";
        } }, c = { test: function(e2) {
          return typeof e2 == "object" && e2.type === "@string";
        } }, p = { test: function(e2) {
          return typeof e2 == "object" && e2.type === "@preamble";
        } }, b = { test: function(e2) {
          return typeof e2 == "object" && e2.type === "@comment";
        } }, l = { test: function(e2) {
          return typeof e2 == "object" && e2.type === "ws";
        } }, f = { test: i }, m = { literal: "#" }, y = { literal: "=" }, h = { literal: "\\" }, $ = { literal: "(" }, d = { literal: ")" }, _ = { literal: "{" }, g = { literal: "}" }, v = { literal: '"' }, x = { literal: "," };
        t.grammar = { Lexer: void 0, ParserRules: [{ name: "main$ebnf$1", symbols: ["non_entry"], postprocess: r }, { name: "main$ebnf$1", symbols: [], postprocess: function() {
        } }, { name: "main$ebnf$2", symbols: [] }, { name: "main$ebnf$2$subexpression$1$ebnf$1", symbols: ["non_entry"], postprocess: r }, { name: "main$ebnf$2$subexpression$1$ebnf$1", symbols: [], postprocess: function() {
        } }, { name: "main$ebnf$2$subexpression$1", symbols: ["entry", "main$ebnf$2$subexpression$1$ebnf$1"] }, { name: "main$ebnf$2", symbols: ["main$ebnf$2", "main$ebnf$2$subexpression$1"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "main", symbols: ["main$ebnf$1", "main$ebnf$2"], postprocess: function(e2) {
          var t2 = [];
          e2[0] && t2.push({ type: "NON_ENTRY", data: e2[0] });
          for (var n2 = 0; n2 < e2[1].length; n2++)
            t2.push({ type: "ENTRY", data: e2[1][n2][0] }), e2[1][n2][1] && t2.push({ type: "NON_ENTRY", data: e2[1][n2][1] });
          return t2;
        } }, { name: "_$ebnf$1", symbols: [] }, { name: "_$ebnf$1", symbols: ["_$ebnf$1", l], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "_", symbols: ["_$ebnf$1"] }, { name: "entry_decl$subexpression$1", symbols: [u] }, { name: "entry_decl$subexpression$1", symbols: [c] }, { name: "entry_decl$subexpression$1", symbols: [p] }, { name: "entry_decl$subexpression$1", symbols: [b] }, { name: "entry_decl", symbols: ["entry_decl$subexpression$1"], postprocess: function(e2) {
          return e2[0][0];
        } }, { name: "entry$subexpression$1", symbols: ["bib_entry"] }, { name: "entry$subexpression$1", symbols: ["string_entry"] }, { name: "entry$subexpression$1", symbols: ["preamble_entry"] }, { name: "entry$subexpression$1", symbols: ["comment_entry"] }, { name: "entry", symbols: ["entry$subexpression$1"], postprocess: function(e2) {
          return e2[0][0];
        } }, { name: "comment", symbols: ["main"], postprocess: function(e2) {
          return e2[0];
        } }, { name: "comment_liberal$ebnf$1", symbols: [] }, { name: "comment_liberal$ebnf$1$subexpression$1", symbols: [/./] }, { name: "comment_liberal$ebnf$1", symbols: ["comment_liberal$ebnf$1", "comment_liberal$ebnf$1$subexpression$1"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "comment_liberal", symbols: ["comment_liberal$ebnf$1"], postprocess: function(e2) {
          for (var t2 = [], n2 = 0; n2 < e2[0].length; n2++)
            t2.push(e2[0][n2][0]);
          return t2;
        } }, { name: "entry_body_comment$subexpression$1$macrocall$2", symbols: ["comment"] }, { name: "entry_body_comment$subexpression$1$macrocall$1", symbols: [$, "entry_body_comment$subexpression$1$macrocall$2", d], postprocess: function(e2) {
          return e2[1];
        } }, { name: "entry_body_comment$subexpression$1", symbols: ["entry_body_comment$subexpression$1$macrocall$1"] }, { name: "entry_body_comment$subexpression$1$macrocall$4", symbols: ["comment"] }, { name: "entry_body_comment$subexpression$1$macrocall$3", symbols: [_, "entry_body_comment$subexpression$1$macrocall$4", g], postprocess: function(e2) {
          return e2[1];
        } }, { name: "entry_body_comment$subexpression$1", symbols: ["entry_body_comment$subexpression$1$macrocall$3"] }, { name: "entry_body_comment", symbols: ["entry_body_comment$subexpression$1"], postprocess: function(e2) {
          return e2[0][0][0];
        } }, { name: "entry_body_string$subexpression$1$macrocall$2", symbols: ["keyval"] }, { name: "entry_body_string$subexpression$1$macrocall$1", symbols: [$, "_", "entry_body_string$subexpression$1$macrocall$2", "_", d], postprocess: function(e2) {
          return e2[2];
        } }, { name: "entry_body_string$subexpression$1", symbols: ["entry_body_string$subexpression$1$macrocall$1"] }, { name: "entry_body_string$subexpression$1$macrocall$4", symbols: ["keyval"] }, { name: "entry_body_string$subexpression$1$macrocall$3", symbols: [_, "_", "entry_body_string$subexpression$1$macrocall$4", "_", g], postprocess: function(e2) {
          return e2[2];
        } }, { name: "entry_body_string$subexpression$1", symbols: ["entry_body_string$subexpression$1$macrocall$3"] }, { name: "entry_body_string", symbols: ["entry_body_string$subexpression$1"], postprocess: function(e2) {
          return e2[0][0][0];
        } }, { name: "entry_body_bib$subexpression$1$macrocall$2", symbols: ["bib_content"] }, { name: "entry_body_bib$subexpression$1$macrocall$1", symbols: [$, "_", "entry_body_bib$subexpression$1$macrocall$2", "_", d], postprocess: function(e2) {
          return e2[2];
        } }, { name: "entry_body_bib$subexpression$1", symbols: ["entry_body_bib$subexpression$1$macrocall$1"] }, { name: "entry_body_bib$subexpression$1$macrocall$4", symbols: ["bib_content"] }, { name: "entry_body_bib$subexpression$1$macrocall$3", symbols: [_, "_", "entry_body_bib$subexpression$1$macrocall$4", "_", g], postprocess: function(e2) {
          return e2[2];
        } }, { name: "entry_body_bib$subexpression$1", symbols: ["entry_body_bib$subexpression$1$macrocall$3"] }, { name: "entry_body_bib", symbols: ["entry_body_bib$subexpression$1"], postprocess: function(e2) {
          return e2[0][0][0];
        } }, { name: "bib_content$ebnf$1", symbols: [] }, { name: "bib_content$ebnf$1$subexpression$1", symbols: ["keyval", "_", x, "_"] }, { name: "bib_content$ebnf$1", symbols: ["bib_content$ebnf$1", "bib_content$ebnf$1$subexpression$1"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "bib_content$ebnf$2$subexpression$1", symbols: ["_", x] }, { name: "bib_content$ebnf$2", symbols: ["bib_content$ebnf$2$subexpression$1"], postprocess: r }, { name: "bib_content$ebnf$2", symbols: [], postprocess: function() {
        } }, { name: "bib_content", symbols: ["key_string", "_", x, "_", "bib_content$ebnf$1", "keyval", "bib_content$ebnf$2"], postprocess: function(e2) {
          for (var t2 = { _id: e2[0], fields: [] }, n2 = e2[4], r2 = 0; r2 < n2.length; r2++)
            t2.fields.push(n2[r2][0]);
          return t2.fields.push(e2[5]), t2;
        } }, { name: "bib_entry", symbols: [u, "_", "entry_body_bib"], postprocess: function(e2) {
          var t2 = { _id: e2[2]._id };
          t2["@type"] = e2[0].string, t2.fields = {};
          for (var n2 = e2[2].fields, r2 = 0; r2 < n2.length; r2++)
            s2(t2, n2[r2]);
          return t2;
        } }, { name: "string_entry", symbols: [c, "_", "entry_body_string"], postprocess: function(e2) {
          return { type: "string", data: e2[2] };
        } }, { name: "preamble_entry", symbols: [p, "_", "entry_body_comment"], postprocess: function(e2) {
          return { type: "preamble", data: e2[2] };
        } }, { name: "comment_entry", symbols: [b, "_", "entry_body_comment"], postprocess: function(e2) {
          return { type: "comment", data: e2[2] };
        } }, { name: "keyval", symbols: ["key_string", "_", y, "_", "value_string"], postprocess: function(e2) {
          return { type: "keyval", key: e2[0], value: e2[4] };
        } }, { name: "braced_string$ebnf$1", symbols: [] }, { name: "braced_string$ebnf$1$subexpression$1", symbols: ["non_brace"] }, { name: "braced_string$ebnf$1$subexpression$1", symbols: ["braced_string"] }, { name: "braced_string$ebnf$1", symbols: ["braced_string$ebnf$1", "braced_string$ebnf$1$subexpression$1"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "braced_string", symbols: [_, "braced_string$ebnf$1", g], postprocess: function(e2) {
          var t2 = [];
          for (var n2 in e2[1])
            t2.push(e2[1][n2][0]);
          return { type: "braced", data: t2 };
        } }, { name: "quoted_string$ebnf$1", symbols: [] }, { name: "quoted_string$ebnf$1$subexpression$1", symbols: ["escaped_quote"] }, { name: "quoted_string$ebnf$1$subexpression$1", symbols: ["non_quote_non_brace"] }, { name: "quoted_string$ebnf$1$subexpression$1", symbols: ["braced_string"] }, { name: "quoted_string$ebnf$1", symbols: ["quoted_string$ebnf$1", "quoted_string$ebnf$1$subexpression$1"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "quoted_string", symbols: [v, "quoted_string$ebnf$1", v], postprocess: function(e2) {
          var t2 = [];
          for (var n2 in e2[1])
            t2.push(e2[1][n2][0]);
          return { type: "quotedstring", data: t2 };
        } }, { name: "escaped_quote", symbols: [h, v] }, { name: "non_quote_non_brace$subexpression$1", symbols: [a] }, { name: "non_quote_non_brace$subexpression$1", symbols: [u] }, { name: "non_quote_non_brace$subexpression$1", symbols: [c] }, { name: "non_quote_non_brace$subexpression$1", symbols: [p] }, { name: "non_quote_non_brace$subexpression$1", symbols: [b] }, { name: "non_quote_non_brace$subexpression$1", symbols: [l] }, { name: "non_quote_non_brace$subexpression$1", symbols: [f] }, { name: "non_quote_non_brace$subexpression$1", symbols: [m] }, { name: "non_quote_non_brace$subexpression$1", symbols: [y] }, { name: "non_quote_non_brace$subexpression$1", symbols: [h] }, { name: "non_quote_non_brace$subexpression$1", symbols: [$] }, { name: "non_quote_non_brace$subexpression$1", symbols: [d] }, { name: "non_quote_non_brace$subexpression$1", symbols: [x] }, { name: "non_quote_non_brace", symbols: ["non_quote_non_brace$subexpression$1"] }, { name: "key_string$ebnf$1", symbols: ["stringreftoken"] }, { name: "key_string$ebnf$1", symbols: ["key_string$ebnf$1", "stringreftoken"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "key_string", symbols: ["key_string$ebnf$1"], postprocess: function(e2) {
          return o(e2[0]).toLowerCase();
        } }, { name: "value_string$subexpression$1$ebnf$1", symbols: [] }, { name: "value_string$subexpression$1$ebnf$1$subexpression$1", symbols: ["_", m, "_", "quoted_string_or_ref"] }, { name: "value_string$subexpression$1$ebnf$1", symbols: ["value_string$subexpression$1$ebnf$1", "value_string$subexpression$1$ebnf$1$subexpression$1"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "value_string$subexpression$1", symbols: ["quoted_string_or_ref", "value_string$subexpression$1$ebnf$1"] }, { name: "value_string$subexpression$1", symbols: ["braced_string"] }, { name: "value_string", symbols: ["value_string$subexpression$1"], postprocess: function(e2) {
          var t2 = e2[0];
          if (t2.length === 2) {
            var n2 = [];
            n2.push(t2[0]);
            for (var r2 = 0; r2 < t2[1].length; r2++)
              n2.push(t2[1][r2][3]);
            return { type: "quotedstringwrapper", data: n2 };
          }
          if (t2[0].type === "braced")
            return { type: "bracedstringwrapper", data: t2[0].data };
          throw new Error("Don't know how to handle value " + JSON.stringify(t2[0]));
        } }, { name: "quoted_string_or_ref$subexpression$1", symbols: ["quoted_string"] }, { name: "quoted_string_or_ref$subexpression$1", symbols: ["string_ref"] }, { name: "quoted_string_or_ref$subexpression$1", symbols: [f] }, { name: "quoted_string_or_ref", symbols: ["quoted_string_or_ref$subexpression$1"], postprocess: function(e2) {
          return e2[0][0].type, e2[0][0];
        } }, { name: "string_ref$subexpression$1$ebnf$1", symbols: [] }, { name: "string_ref$subexpression$1$ebnf$1", symbols: ["string_ref$subexpression$1$ebnf$1", "stringreftoken"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "string_ref$subexpression$1", symbols: ["stringreftoken_n_num", "string_ref$subexpression$1$ebnf$1"] }, { name: "string_ref", symbols: ["string_ref$subexpression$1"], postprocess: function(e2) {
          return { stringref: e2[0][0] + o(e2[0][1]) };
        } }, { name: "stringreftoken$subexpression$1", symbols: [h] }, { name: "stringreftoken$subexpression$1", symbols: [$] }, { name: "stringreftoken$subexpression$1", symbols: [d] }, { name: "stringreftoken$subexpression$1", symbols: [a] }, { name: "stringreftoken$subexpression$1", symbols: [f] }, { name: "stringreftoken$subexpression$1", symbols: [u] }, { name: "stringreftoken$subexpression$1", symbols: [c] }, { name: "stringreftoken$subexpression$1", symbols: [p] }, { name: "stringreftoken$subexpression$1", symbols: [b] }, { name: "stringreftoken", symbols: ["stringreftoken$subexpression$1"], postprocess: function(e2) {
          if (typeof e2[0][0] == "object") {
            if (!e2[0][0].string)
              throw new Error("Expected " + e2[0] + "to have a 'string' field");
            return e2[0][0].string;
          }
          if (typeof e2[0][0] != "string" && typeof e2[0][0] != "number")
            throw new Error("Expected " + e2[0][0] + " to be a string");
          return e2[0][0];
        } }, { name: "stringreftoken_n_num$subexpression$1", symbols: [h] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [$] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [d] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [a] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [u] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [c] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [p] }, { name: "stringreftoken_n_num$subexpression$1", symbols: [b] }, { name: "stringreftoken_n_num", symbols: ["stringreftoken_n_num$subexpression$1"], postprocess: function(e2) {
          if (typeof e2[0][0] == "object") {
            if (!e2[0][0].string)
              throw new Error("Expected " + e2[0] + "to have a 'string' field");
            return e2[0][0].string;
          }
          if (typeof e2[0][0] != "string" && typeof e2[0][0] != "number")
            throw new Error("Expected " + e2[0][0] + " to be a string");
          return e2[0][0];
        } }, { name: "non_brace$subexpression$1", symbols: [h] }, { name: "non_brace$subexpression$1", symbols: [$] }, { name: "non_brace$subexpression$1", symbols: [d] }, { name: "non_brace$subexpression$1", symbols: [a] }, { name: "non_brace$subexpression$1", symbols: [v] }, { name: "non_brace$subexpression$1", symbols: [l] }, { name: "non_brace$subexpression$1", symbols: [f] }, { name: "non_brace$subexpression$1", symbols: [x] }, { name: "non_brace$subexpression$1", symbols: [u] }, { name: "non_brace$subexpression$1", symbols: [c] }, { name: "non_brace$subexpression$1", symbols: [p] }, { name: "non_brace$subexpression$1", symbols: [b] }, { name: "non_brace$subexpression$1", symbols: [m] }, { name: "non_brace$subexpression$1", symbols: [y] }, { name: "non_brace", symbols: ["non_brace$subexpression$1"], postprocess: function(e2) {
          return e2[0][0];
        } }, { name: "non_bracket$subexpression$1", symbols: [h] }, { name: "non_bracket$subexpression$1", symbols: [a] }, { name: "non_bracket$subexpression$1", symbols: [v] }, { name: "non_bracket$subexpression$1", symbols: [l] }, { name: "non_bracket$subexpression$1", symbols: [f] }, { name: "non_bracket$subexpression$1", symbols: [x] }, { name: "non_bracket$subexpression$1", symbols: [u] }, { name: "non_bracket$subexpression$1", symbols: [c] }, { name: "non_bracket$subexpression$1", symbols: [p] }, { name: "non_bracket$subexpression$1", symbols: [b] }, { name: "non_bracket$subexpression$1", symbols: [m] }, { name: "non_bracket$subexpression$1", symbols: [y] }, { name: "non_bracket", symbols: ["non_bracket$subexpression$1"], postprocess: function(e2) {
          return e2[0][0];
        } }, { name: "non_entry$ebnf$1$subexpression$1", symbols: ["escaped_entry"] }, { name: "non_entry$ebnf$1$subexpression$1", symbols: ["escaped_escape"] }, { name: "non_entry$ebnf$1$subexpression$1", symbols: ["escaped_non_esc_outside_entry"] }, { name: "non_entry$ebnf$1$subexpression$1", symbols: ["non_esc_outside_entry"] }, { name: "non_entry$ebnf$1", symbols: ["non_entry$ebnf$1$subexpression$1"] }, { name: "non_entry$ebnf$1$subexpression$2", symbols: ["escaped_entry"] }, { name: "non_entry$ebnf$1$subexpression$2", symbols: ["escaped_escape"] }, { name: "non_entry$ebnf$1$subexpression$2", symbols: ["escaped_non_esc_outside_entry"] }, { name: "non_entry$ebnf$1$subexpression$2", symbols: ["non_esc_outside_entry"] }, { name: "non_entry$ebnf$1", symbols: ["non_entry$ebnf$1", "non_entry$ebnf$1$subexpression$2"], postprocess: function(e2) {
          return e2[0].concat([e2[1]]);
        } }, { name: "non_entry", symbols: ["non_entry$ebnf$1"], postprocess: function(e2) {
          for (var t2 = [], n2 = 0; n2 < e2[0].length; n2++)
            t2.push(e2[0][n2][0]);
          return t2;
        } }, { name: "escaped_escape", symbols: [h, h], postprocess: function() {
          return "\\";
        } }, { name: "escaped_entry", symbols: [h, "entry_decl"], postprocess: function(e2) {
          return { type: "escapedEntry", data: e2[1] };
        } }, { name: "escaped_non_esc_outside_entry", symbols: [h, "non_esc_outside_entry"], postprocess: function(e2) {
          return e2;
        } }, { name: "non_esc_outside_entry$subexpression$1", symbols: [a] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [l] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [f] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [m] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [y] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [$] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [d] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [_] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [g] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [v] }, { name: "non_esc_outside_entry$subexpression$1", symbols: [x] }, { name: "non_esc_outside_entry", symbols: ["non_esc_outside_entry$subexpression$1"], postprocess: function(e2) {
          return e2[0][0];
        } }], ParserStart: "main" };
      }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: true });
        var r = n(14), s2 = n(15), o = n(16), i = n(22), a = n(23), u = function() {
          function e2(e3) {
            this.str = e3, this.len = e3.length, this.pos = 0;
          }
          return e2.prototype.getStringUntilNonEscapedChar = function(e3) {
            for (var t2 = [], n2 = this.pos; n2 < this.len + 1; n2++) {
              if (this.pos = n2, this.str.charAt(n2) == "\\" && this.str.charAt(n2 + 1).match(e3))
                n2++, this.pos = n2;
              else if (this.str.charAt(n2).match(e3))
                break;
              t2.push(this.str.charAt(n2));
            }
            return t2.join("");
          }, e2.prototype.readTokens = function() {
            for (var e3, t2 = []; e3 = this.readNextToken(); )
              t2.push(e3);
            return t2;
          }, e2.prototype.readNextToken = function() {
            if (!(this.pos >= this.str.length)) {
              var e3 = this.str.charAt(this.pos);
              return s2.isSingleWhiteSpaceCharacter(e3) ? this.eatWhiteSpace() : r.isSpecialChar(e3) ? this.eatSpecialChars(e3) : o.isNum(e3) ? this.eatNumericString(e3) : this.eatIdString();
            }
          }, e2.prototype.eatIdString = function() {
            for (var e3 = [], t2 = this.pos, n2 = t2; n2 < this.len + 1; n2++) {
              this.pos = n2;
              var r2 = this.str.charAt(n2);
              if (!i.isIdChar(r2))
                break;
              e3.push(r2);
            }
            return i.newIdToken(e3.join("").trim());
          }, e2.prototype.eatNumericString = function(e3) {
            for (var t2 = [e3], n2 = this.pos + 1, r2 = n2; r2 < this.len + 1; r2++) {
              this.pos = r2;
              var s3 = this.str.charAt(r2);
              if (!o.isNum(s3))
                break;
              t2.push(s3);
            }
            var i2 = t2.join("");
            if (t2[0] === "0")
              return o.newNumber(i2);
            var a2 = Number.parseInt(i2);
            return Number.isFinite(a2) ? a2 : o.newNumber(i2);
          }, e2.prototype.eatSpecialChars = function(e3) {
            if (this.pos++, e3 === "@") {
              var t2 = this.getStringUntilNonEscapedChar("{").trim().toLowerCase();
              return a.isBibType(t2) ? r.newToken(a.bibTypes[t2], t2) : r.newToken("@bib", t2);
            }
            return e3;
          }, e2.prototype.eatWhiteSpace = function() {
            for (var e3 = []; this.pos < this.len + 1; ) {
              var t2 = this.str.charAt(this.pos);
              if (!s2.isSingleWhiteSpaceCharacter(t2))
                break;
              e3.push(t2), this.pos++;
            }
            return s2.newWhitespace(e3.join(""));
          }, e2;
        }();
        t.default = u;
      }, function(e, t, n) {
        "use strict";
        function r(e2) {
          return { type: "id", string: e2 };
        }
        function s2(e2) {
          return e2.type === "id" && typeof e2.string == "string";
        }
        function o(e2) {
          return !(i.isSpecialChar(e2) || u.isNum(e2) || a.isSingleWhiteSpaceCharacter(e2));
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(14), a = n(15), u = n(16);
        t.newIdToken = r, t.isIdToken = s2, t.isIdChar = o;
      }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: true }), t.bibTypes = { string: "@string", preamble: "@preamble", comment: "@comment", bib: "@bib" }, t.isBibType = function(e2) {
          return t.bibTypes.hasOwnProperty(e2);
        };
      }]);
    });
  }
});

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});
init_shims();

// .svelte-kit/output/server/app.js
init_shims();
var bibtex = __toModule(require_bibtex());
var __require2 = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return;
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members2 = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members2.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    context: node_loaded.context,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(request2.path);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
Promise.resolve();
var ATTR_REGEX = /[&"]/g;
var CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function afterUpdate() {
}
var css$5 = {
  code: "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}</style>"],"names":[],"mappings":"AAqDO,gCAAiB,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,CAAC,SAAS,MAAM,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$5);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`;
        }
      })}` : ``}`;
    }
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n\n    <!-- Favicon -->\n    <link rel="shortcut icon" href="/favicon.ico">\n    <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon/favicon.ico">\n    <link rel="icon" type="image/png" sizes="196x196" href="/favicon/favicon-192.png">\n    <link rel="icon" type="image/png" sizes="160x160" href="/favicon/favicon-160.png">\n    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96.png">\n    <link rel="icon" type="image/png" sizes="64x64" href="/favicon/favicon-64.png">\n    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32.png">\n    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16.png">\n    <link rel="apple-touch-icon" href="/favicon/favicon-57.png">\n    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/favicon-114.png">\n    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/favicon-72.png">\n    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/favicon-144.png">\n    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/favicon-60.png">\n    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/favicon-120.png">\n    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/favicon-76.png">\n    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/favicon-152.png">\n    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180.png">\n    <meta name="msapplication-TileColor" content="#FFFFFF">\n    <meta name="msapplication-TileImage" content="/favicon/favicon-144.png">\n    <meta name="msapplication-config" content="/favicon/browserconfig.xml">\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n\n    <link rel="manifest" href="/manifest.json"/>\n    ' + head + '\n  </head>\n  <body class="bg-primary-700">\n    <div id="svelte">' + body + "</div>\n  </body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-2727b205.js",
      css: [assets + "/_app/assets/start-464e9d0a.css", assets + "/_app/assets/vendor-8daff541.css"],
      js: [assets + "/_app/start-2727b205.js", assets + "/_app/chunks/vendor-d2cacae7.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: null,
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": ".DS_Store", "size": 6148, "type": null }, { "file": "favicon/browserconfig.xml", "size": 315, "type": "application/xml" }, { "file": "favicon/favicon-114.png", "size": 1557, "type": "image/png" }, { "file": "favicon/favicon-120.png", "size": 1616, "type": "image/png" }, { "file": "favicon/favicon-144.png", "size": 2020, "type": "image/png" }, { "file": "favicon/favicon-150.png", "size": 2118, "type": "image/png" }, { "file": "favicon/favicon-152.png", "size": 2156, "type": "image/png" }, { "file": "favicon/favicon-16.png", "size": 408, "type": "image/png" }, { "file": "favicon/favicon-160.png", "size": 2292, "type": "image/png" }, { "file": "favicon/favicon-180.png", "size": 2540, "type": "image/png" }, { "file": "favicon/favicon-192.png", "size": 2691, "type": "image/png" }, { "file": "favicon/favicon-310.png", "size": 3294, "type": "image/png" }, { "file": "favicon/favicon-32.png", "size": 503, "type": "image/png" }, { "file": "favicon/favicon-57.png", "size": 758, "type": "image/png" }, { "file": "favicon/favicon-60.png", "size": 760, "type": "image/png" }, { "file": "favicon/favicon-64.png", "size": 760, "type": "image/png" }, { "file": "favicon/favicon-70.png", "size": 838, "type": "image/png" }, { "file": "favicon/favicon-72.png", "size": 809, "type": "image/png" }, { "file": "favicon/favicon-76.png", "size": 827, "type": "image/png" }, { "file": "favicon/favicon-96.png", "size": 1006, "type": "image/png" }, { "file": "favicon/favicon.ico", "size": 9326, "type": "image/vnd.microsoft.icon" }, { "file": "fonts/Friedrich-Book.eot", "size": 62527, "type": "application/vnd.ms-fontobject" }, { "file": "fonts/Friedrich-Book.woff", "size": 60232, "type": "font/woff" }, { "file": "fonts/Friedrich-Book.woff2", "size": 55112, "type": "font/woff2" }, { "file": "fonts/SMHauser-60.woff", "size": 21028, "type": "font/woff" }, { "file": "fonts/SMHauser-60.woff2", "size": 14532, "type": "font/woff2" }, { "file": "icons/.DS_Store", "size": 6148, "type": null }, { "file": "icons/svg/discord.svg", "size": 1393, "type": "image/svg+xml" }, { "file": "icons/svg/facebook.svg", "size": 392, "type": "image/svg+xml" }, { "file": "icons/svg/github.svg", "size": 1533, "type": "image/svg+xml" }, { "file": "icons/svg/instagram.svg", "size": 1147, "type": "image/svg+xml" }, { "file": "icons/svg/twitter.svg", "size": 923, "type": "image/svg+xml" }, { "file": "images/.DS_Store", "size": 8196, "type": null }, { "file": "images/events/.DS_Store", "size": 6148, "type": null }, { "file": "images/events/living-algorithms.jpg", "size": 192349, "type": "image/jpeg" }, { "file": "images/events/moving-strings/adam.jpg", "size": 245569, "type": "image/jpeg" }, { "file": "images/events/moving-strings/chris.jpg", "size": 268684, "type": "image/jpeg" }, { "file": "images/events/moving-strings/mrp_andrew.jpg", "size": 132040, "type": "image/jpeg" }, { "file": "images/events/moving-strings/mrp_concert.jpg", "size": 249743, "type": "image/jpeg" }, { "file": "images/events/moving-strings/mrp_workshops.jpg", "size": 203784, "type": "image/jpeg" }, { "file": "images/events/moving-strings/tabita.jpg", "size": 451525, "type": "image/jpeg" }, { "file": "images/logos/rannis.png", "size": 12390, "type": "image/png" }, { "file": "images/logos/rannis.svg", "size": 12757, "type": "image/svg+xml" }, { "file": "images/news/.DS_Store", "size": 6148, "type": null }, { "file": "images/news/aaabcn.png", "size": 238383, "type": "image/png" }, { "file": "images/news/bela.png", "size": 1287271, "type": "image/png" }, { "file": "images/news/karl.jpeg", "size": 134675, "type": "image/jpeg" }, { "file": "images/news/phd2advert.jpeg", "size": 143677, "type": "image/jpeg" }, { "file": "images/news/robin_device.jpeg", "size": 154540, "type": "image/jpeg" }, { "file": "images/news/rusl-sigga.png", "size": 1250610, "type": "image/png" }, { "file": "images/news/ruslbanner.jpeg", "size": 848527, "type": "image/jpeg" }, { "file": "images/news/sigga-4884.jpg", "size": 1347465, "type": "image/jpeg" }, { "file": "images/news/soundwork.png", "size": 2042232, "type": "image/png" }, { "file": "images/news/steve.jpg", "size": 1213891, "type": "image/jpeg" }, { "file": "images/news/synthabaeli.jpg", "size": 211373, "type": "image/jpeg" }, { "file": "images/news/trash-group.jpg", "size": 857547, "type": "image/jpeg" }, { "file": "images/news/trash-stuff1.jpg", "size": 809482, "type": "image/jpeg" }, { "file": "images/news/trash-stuff2.jpg", "size": 837998, "type": "image/jpeg" }, { "file": "images/news/trash_schedule.png", "size": 47813, "type": "image/png" }, { "file": "images/openlabs/ol4a.jpeg", "size": 192997, "type": "image/jpeg" }, { "file": "images/openlabs/ol6a.JPG", "size": 1376906, "type": "image/jpeg" }, { "file": "images/openlabs/ol6b.JPG", "size": 1071250, "type": "image/jpeg" }, { "file": "images/openlabs/ol6c.JPG", "size": 1131994, "type": "image/jpeg" }, { "file": "images/people/davidbrynjar.JPG", "size": 1347090, "type": "image/jpeg" }, { "file": "images/people/davidbrynjar.png", "size": 3323357, "type": "image/png" }, { "file": "images/people/enrike_1500.jpg", "size": 255214, "type": "image/jpeg" }, { "file": "images/people/esther.jpg", "size": 124318, "type": "image/jpeg" }, { "file": "images/people/ezra.jpeg", "size": 68681, "type": "image/jpeg" }, { "file": "images/people/halldor.jpg", "size": 234815, "type": "image/jpeg" }, { "file": "images/people/jack.jpg", "size": 127213, "type": "image/jpeg" }, { "file": "images/people/jonr.jpg", "size": 81819, "type": "image/jpeg" }, { "file": "images/people/karl.png", "size": 1403199, "type": "image/png" }, { "file": "images/people/kit.jpg", "size": 244358, "type": "image/jpeg" }, { "file": "images/people/marco_1500.jpg", "size": 183427, "type": "image/jpeg" }, { "file": "images/people/robin.jpg", "size": 244185, "type": "image/jpeg" }, { "file": "images/people/sean.png", "size": 1010120, "type": "image/png" }, { "file": "images/people/sigga.jpg", "size": 334902, "type": "image/jpeg" }, { "file": "images/people/steve_1500.jpg", "size": 125161, "type": "image/jpeg" }, { "file": "images/people/thor.jpg", "size": 178805, "type": "image/jpeg" }, { "file": "images/people/victor.jpg", "size": 115718, "type": "image/jpeg" }, { "file": "images/research/projects/halldorophone.jpg", "size": 265169, "type": "image/jpeg" }, { "file": "images/research/projects/protolangspil.jpg", "size": 730502, "type": "image/jpeg" }, { "file": "images/research/projects/protolangspil2.jpg", "size": 434618, "type": "image/jpeg" }, { "file": "images/research/projects/stenophone.jpg", "size": 539590, "type": "image/jpeg" }, { "file": "images/research/projects/supercollider.png", "size": 502848, "type": "image/png" }, { "file": "images/research/projects/threnoscope.png", "size": 488188, "type": "image/png" }, { "file": "images/stock/empty_lab_yellow.jpg", "size": 491163, "type": "image/jpeg" }, { "file": "images/stock/frettabladid21.jpg", "size": 95799, "type": "image/jpeg" }, { "file": "images/stock/halldor_kastljos.png", "size": 319837, "type": "image/png" }, { "file": "images/stock/halldorophone.jpeg", "size": 1577789, "type": "image/jpeg" }, { "file": "images/stock/halldorophone3.jpg", "size": 69891, "type": "image/jpeg" }, { "file": "images/stock/hlci_sq_1.jpg", "size": 1346288, "type": "image/jpeg" }, { "file": "images/stock/hlci_sq_2.jpg", "size": 1257751, "type": "image/jpeg" }, { "file": "images/stock/hugarflug.png", "size": 2298311, "type": "image/png" }, { "file": "images/stock/lestin2020.png", "size": 373032, "type": "image/png" }, { "file": "images/stock/openlab_5_roundtable.jpeg", "size": 192997, "type": "image/jpeg" }, { "file": "images/stock/phd2advert.jpeg", "size": 479872, "type": "image/jpeg" }, { "file": "images/stock/prototype_langspil_cardboard.jpg", "size": 142284, "type": "image/jpeg" }, { "file": "images/stock/prototype_langspil_plywood_1.jpg", "size": 143068, "type": "image/jpeg" }, { "file": "images/stock/prototype_langspil_plywood_2_electrical_chords.jpg", "size": 134757, "type": "image/jpeg" }, { "file": "images/stock/schermata1.png", "size": 304087, "type": "image/png" }, { "file": "images/stock/schermata2.png", "size": 529941, "type": "image/png" }, { "file": "images/stock/student_IIL.jpeg", "size": 1310844, "type": "image/jpeg" }, { "file": "images/stock/thraedir.png", "size": 299284, "type": "image/png" }, { "file": "manifest.json", "size": 417, "type": "application/json" }, { "file": "publications.bib", "size": 6618, "type": null }, { "file": "seo/ogimage.jpg", "size": 265169, "type": "image/jpeg" }, { "file": "vid/moving_strings.mp4", "size": 7874707, "type": "video/mp4" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/collaborate\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/collaborate.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/research\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/research\/halldorophone\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/halldorophone.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/research\/projects\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return projects_json;
      })
    },
    {
      type: "page",
      pattern: /^\/research\/livinglooper\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/livinglooper.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/research\/threnoscope\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/threnoscope.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/research\/stenophone\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/stenophone.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/research\/langspil\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/langspil.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/contact\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return contact$1;
      })
    },
    {
      type: "page",
      pattern: /^\/openlab\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/openlab\/openlabs\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return openlabs_json;
      })
    },
    {
      type: "page",
      pattern: /^\/openlab\/10\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/10.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/11\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/11.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/12\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/12.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/13\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/13.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/14\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/14.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/15\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/15.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/16\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/16.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/17\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/17.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/18\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/18.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/19\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/19.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/20\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/20.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/21\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/21.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/1\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/1.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/2\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/2.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/3\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/3.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/4\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/4.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/5\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/5.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/6\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/6.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/7\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/7.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/8\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/8.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/openlab\/9\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/openlab/9.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/outputs\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/outputs/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/events\/moving-strings\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/events/moving-strings/index.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/events\/moving-strings\/copy\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return copy$1;
      })
    },
    {
      type: "page",
      pattern: /^\/people\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/davidbrynjar\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/davidbrynjar.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/people\/people\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return people_json;
      })
    },
    {
      type: "page",
      pattern: /^\/people\/halldor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/halldor.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/enrike\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/enrike.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/esther\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/esther.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/victor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/victor.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/marco\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/marco.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/people\/order\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return order$1;
      })
    },
    {
      type: "page",
      pattern: /^\/people\/robin\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/robin.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/sigga\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/sigga.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/steve\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/steve.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/ezra\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/ezra.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/jack\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/jack.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/karl\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/karl.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/sean\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/sean.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/thor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/thor.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/jon\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/jon.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/people\/kit\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/people/kit.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/pages\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return pages$1;
      })
    },
    {
      type: "page",
      pattern: /^\/news\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/nordic-popular-music-union\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/nordic-popular-music-union.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/halldorophone-kastljos\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/halldorophone-kastljos.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/google-summer-of-code\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/google-summer-of-code.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/on-the-fly-residency\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/on-the-fly-residency.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/nime-2022-workshop\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/nime-2022-workshop.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/root-workshop-2022\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/root-workshop-2022.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/living-algorithms\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/living-algorithms.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/steve-residency\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/steve-residency.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/icelandic-news\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/icelandic-news.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/moving-strings\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/moving-strings.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/summer-interns\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/summer-interns.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/trash-workshop\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/trash-workshop.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/phd2-deadline\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/phd2-deadline.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/synthabaeli\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/synthabaeli.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/good-start\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/good-start.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/news\/items\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return items_json;
      })
    },
    {
      type: "page",
      pattern: /^\/news\/soundworks\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/soundworks.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/ICLC2021\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/ICLC2021.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/gsoc2022\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/gsoc2022.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/rusl2022\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/rusl2022.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/robin\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/robin.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/karl\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/karl.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/phd2\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/phd2.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.md": () => Promise.resolve().then(function() {
    return index$6;
  }),
  "src/routes/collaborate.md": () => Promise.resolve().then(function() {
    return collaborate;
  }),
  "src/routes/research/index.svelte": () => Promise.resolve().then(function() {
    return index$5;
  }),
  "src/routes/research/halldorophone.md": () => Promise.resolve().then(function() {
    return halldorophone;
  }),
  "src/routes/research/livinglooper.md": () => Promise.resolve().then(function() {
    return livinglooper;
  }),
  "src/routes/research/threnoscope.md": () => Promise.resolve().then(function() {
    return threnoscope;
  }),
  "src/routes/research/stenophone.md": () => Promise.resolve().then(function() {
    return stenophone;
  }),
  "src/routes/research/langspil.md": () => Promise.resolve().then(function() {
    return langspil;
  }),
  "src/routes/openlab/index.svelte": () => Promise.resolve().then(function() {
    return index$4;
  }),
  "src/routes/openlab/10.md": () => Promise.resolve().then(function() {
    return _10$1;
  }),
  "src/routes/openlab/11.md": () => Promise.resolve().then(function() {
    return _11$1;
  }),
  "src/routes/openlab/12.md": () => Promise.resolve().then(function() {
    return _12$1;
  }),
  "src/routes/openlab/13.md": () => Promise.resolve().then(function() {
    return _13$1;
  }),
  "src/routes/openlab/14.md": () => Promise.resolve().then(function() {
    return _14$1;
  }),
  "src/routes/openlab/15.md": () => Promise.resolve().then(function() {
    return _15$1;
  }),
  "src/routes/openlab/16.md": () => Promise.resolve().then(function() {
    return _16$1;
  }),
  "src/routes/openlab/17.md": () => Promise.resolve().then(function() {
    return _17$1;
  }),
  "src/routes/openlab/18.md": () => Promise.resolve().then(function() {
    return _18$1;
  }),
  "src/routes/openlab/19.md": () => Promise.resolve().then(function() {
    return _19$1;
  }),
  "src/routes/openlab/20.md": () => Promise.resolve().then(function() {
    return _20$1;
  }),
  "src/routes/openlab/21.md": () => Promise.resolve().then(function() {
    return _21$1;
  }),
  "src/routes/openlab/1.md": () => Promise.resolve().then(function() {
    return _1$1;
  }),
  "src/routes/openlab/2.md": () => Promise.resolve().then(function() {
    return _2$1;
  }),
  "src/routes/openlab/3.md": () => Promise.resolve().then(function() {
    return _3$1;
  }),
  "src/routes/openlab/4.md": () => Promise.resolve().then(function() {
    return _4$1;
  }),
  "src/routes/openlab/5.md": () => Promise.resolve().then(function() {
    return _5$1;
  }),
  "src/routes/openlab/6.md": () => Promise.resolve().then(function() {
    return _6$1;
  }),
  "src/routes/openlab/7.md": () => Promise.resolve().then(function() {
    return _7$1;
  }),
  "src/routes/openlab/8.md": () => Promise.resolve().then(function() {
    return _8$1;
  }),
  "src/routes/openlab/9.md": () => Promise.resolve().then(function() {
    return _9$1;
  }),
  "src/routes/outputs/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/events/moving-strings/index.md": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/people/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/people/davidbrynjar.md": () => Promise.resolve().then(function() {
    return davidbrynjar;
  }),
  "src/routes/people/halldor.md": () => Promise.resolve().then(function() {
    return halldor;
  }),
  "src/routes/people/enrike.md": () => Promise.resolve().then(function() {
    return enrike;
  }),
  "src/routes/people/esther.md": () => Promise.resolve().then(function() {
    return esther;
  }),
  "src/routes/people/victor.md": () => Promise.resolve().then(function() {
    return victor;
  }),
  "src/routes/people/marco.md": () => Promise.resolve().then(function() {
    return marco;
  }),
  "src/routes/people/robin.md": () => Promise.resolve().then(function() {
    return robin$1;
  }),
  "src/routes/people/sigga.md": () => Promise.resolve().then(function() {
    return sigga;
  }),
  "src/routes/people/steve.md": () => Promise.resolve().then(function() {
    return steve;
  }),
  "src/routes/people/ezra.md": () => Promise.resolve().then(function() {
    return ezra;
  }),
  "src/routes/people/jack.md": () => Promise.resolve().then(function() {
    return jack;
  }),
  "src/routes/people/karl.md": () => Promise.resolve().then(function() {
    return karl$1;
  }),
  "src/routes/people/sean.md": () => Promise.resolve().then(function() {
    return sean;
  }),
  "src/routes/people/thor.md": () => Promise.resolve().then(function() {
    return thor;
  }),
  "src/routes/people/jon.md": () => Promise.resolve().then(function() {
    return jon;
  }),
  "src/routes/people/kit.md": () => Promise.resolve().then(function() {
    return kit;
  }),
  "src/routes/about.md": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/news/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/news/nordic-popular-music-union.md": () => Promise.resolve().then(function() {
    return nordicPopularMusicUnion;
  }),
  "src/routes/news/halldorophone-kastljos.md": () => Promise.resolve().then(function() {
    return halldorophoneKastljos;
  }),
  "src/routes/news/google-summer-of-code.md": () => Promise.resolve().then(function() {
    return googleSummerOfCode;
  }),
  "src/routes/news/on-the-fly-residency.md": () => Promise.resolve().then(function() {
    return onTheFlyResidency;
  }),
  "src/routes/news/nime-2022-workshop.md": () => Promise.resolve().then(function() {
    return nime2022Workshop;
  }),
  "src/routes/news/root-workshop-2022.md": () => Promise.resolve().then(function() {
    return rootWorkshop2022;
  }),
  "src/routes/news/living-algorithms.md": () => Promise.resolve().then(function() {
    return livingAlgorithms;
  }),
  "src/routes/news/steve-residency.md": () => Promise.resolve().then(function() {
    return steveResidency;
  }),
  "src/routes/news/icelandic-news.md": () => Promise.resolve().then(function() {
    return icelandicNews;
  }),
  "src/routes/news/moving-strings.md": () => Promise.resolve().then(function() {
    return movingStrings;
  }),
  "src/routes/news/summer-interns.md": () => Promise.resolve().then(function() {
    return summerInterns;
  }),
  "src/routes/news/trash-workshop.md": () => Promise.resolve().then(function() {
    return trashWorkshop;
  }),
  "src/routes/news/phd2-deadline.md": () => Promise.resolve().then(function() {
    return phd2Deadline;
  }),
  "src/routes/news/synthabaeli.md": () => Promise.resolve().then(function() {
    return synthabaeli;
  }),
  "src/routes/news/good-start.md": () => Promise.resolve().then(function() {
    return goodStart;
  }),
  "src/routes/news/soundworks.md": () => Promise.resolve().then(function() {
    return soundworks;
  }),
  "src/routes/news/ICLC2021.md": () => Promise.resolve().then(function() {
    return ICLC2021$1;
  }),
  "src/routes/news/gsoc2022.md": () => Promise.resolve().then(function() {
    return gsoc2022;
  }),
  "src/routes/news/rusl2022.md": () => Promise.resolve().then(function() {
    return rusl2022;
  }),
  "src/routes/news/robin.md": () => Promise.resolve().then(function() {
    return robin;
  }),
  "src/routes/news/karl.md": () => Promise.resolve().then(function() {
    return karl;
  }),
  "src/routes/news/phd2.md": () => Promise.resolve().then(function() {
    return phd2;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-f825bc05.js", "css": ["assets/pages/__layout.svelte-150c7dc4.css", "assets/vendor-8daff541.css"], "js": ["pages/__layout.svelte-f825bc05.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-c3e68ef3.js", "css": ["assets/vendor-8daff541.css"], "js": ["error.svelte-c3e68ef3.js", "chunks/vendor-d2cacae7.js"], "styles": [] }, "src/routes/index.md": { "entry": "pages/index.md-57072547.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css", "assets/pages/events/moving-strings/index.md-f79e1562.css"], "js": ["pages/index.md-57072547.js", "chunks/vendor-d2cacae7.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/EmbedYouTube.svelte_svelte&type=style&lang-e1c25fad.js"], "styles": [] }, "src/routes/collaborate.md": { "entry": "pages/collaborate.md-61643dad.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/collaborate.md-61643dad.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/research/index.svelte": { "entry": "pages/research/index.svelte-30024e81.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/research/index.svelte-30024e81.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/research/halldorophone.md": { "entry": "pages/research/halldorophone.md-c82b1732.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/research/halldorophone.md-c82b1732.js", "chunks/vendor-d2cacae7.js", "chunks/ResearchProject-c0aea680.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/research/livinglooper.md": { "entry": "pages/research/livinglooper.md-1d6d111c.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/research/livinglooper.md-1d6d111c.js", "chunks/vendor-d2cacae7.js", "chunks/ResearchProject-c0aea680.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/research/threnoscope.md": { "entry": "pages/research/threnoscope.md-7aa55f14.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/research/threnoscope.md-7aa55f14.js", "chunks/vendor-d2cacae7.js", "chunks/ResearchProject-c0aea680.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/research/stenophone.md": { "entry": "pages/research/stenophone.md-5f1d03e5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/research/stenophone.md-5f1d03e5.js", "chunks/vendor-d2cacae7.js", "chunks/ResearchProject-c0aea680.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/research/langspil.md": { "entry": "pages/research/langspil.md-e025e37d.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/research/langspil.md-e025e37d.js", "chunks/vendor-d2cacae7.js", "chunks/ResearchProject-c0aea680.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/openlab/index.svelte": { "entry": "pages/openlab/index.svelte-d2f1d054.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/index.svelte-d2f1d054.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/10.md": { "entry": "pages/openlab/10.md-044a5450.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/10.md-044a5450.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/11.md": { "entry": "pages/openlab/11.md-e7b77df0.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/11.md-e7b77df0.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/12.md": { "entry": "pages/openlab/12.md-01e7293d.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/12.md-01e7293d.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/13.md": { "entry": "pages/openlab/13.md-b8c8caf3.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/13.md-b8c8caf3.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/14.md": { "entry": "pages/openlab/14.md-ff0d63bb.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/14.md-ff0d63bb.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/15.md": { "entry": "pages/openlab/15.md-d02f7b47.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/15.md-d02f7b47.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/16.md": { "entry": "pages/openlab/16.md-09d0a537.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/16.md-09d0a537.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/17.md": { "entry": "pages/openlab/17.md-bcce9933.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/17.md-bcce9933.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/18.md": { "entry": "pages/openlab/18.md-3d8689a0.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/18.md-3d8689a0.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/19.md": { "entry": "pages/openlab/19.md-3adfc3cf.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/19.md-3adfc3cf.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/20.md": { "entry": "pages/openlab/20.md-48ea1fb5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/20.md-48ea1fb5.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/21.md": { "entry": "pages/openlab/21.md-a0513b14.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/21.md-a0513b14.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/1.md": { "entry": "pages/openlab/1.md-c3299e5a.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/1.md-c3299e5a.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/2.md": { "entry": "pages/openlab/2.md-f4e420e1.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/2.md-f4e420e1.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/3.md": { "entry": "pages/openlab/3.md-77d50d3d.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/3.md-77d50d3d.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/4.md": { "entry": "pages/openlab/4.md-da3ed499.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/4.md-da3ed499.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/5.md": { "entry": "pages/openlab/5.md-a1d0dd9b.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/5.md-a1d0dd9b.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/openlab/6.md": { "entry": "pages/openlab/6.md-28c6b204.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/6.md-28c6b204.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/openlab/7.md": { "entry": "pages/openlab/7.md-353e439c.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/7.md-353e439c.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/8.md": { "entry": "pages/openlab/8.md-281435c5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/8.md-281435c5.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/openlab/9.md": { "entry": "pages/openlab/9.md-6cf66454.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/openlab/9.md-6cf66454.js", "chunks/vendor-d2cacae7.js", "chunks/OpenLabEvent-5b148cfa.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/outputs/index.svelte": { "entry": "pages/outputs/index.svelte-151fb171.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/outputs/index.svelte-151fb171.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/events/moving-strings/index.md": { "entry": "pages/events/moving-strings/index.md-615ff445.js", "css": ["assets/pages/events/moving-strings/index.md-f79e1562.css", "assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/events/moving-strings/index.md-615ff445.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/EmbedYouTube.svelte_svelte&type=style&lang-e1c25fad.js"], "styles": [] }, "src/routes/people/index.svelte": { "entry": "pages/people/index.svelte-db53ca33.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/index.svelte-db53ca33.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/davidbrynjar.md": { "entry": "pages/people/davidbrynjar.md-6d74012c.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/davidbrynjar.md-6d74012c.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/halldor.md": { "entry": "pages/people/halldor.md-d8077641.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/halldor.md-d8077641.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/enrike.md": { "entry": "pages/people/enrike.md-2d2c7deb.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/enrike.md-2d2c7deb.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/esther.md": { "entry": "pages/people/esther.md-dc2bf7ba.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/esther.md-dc2bf7ba.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/victor.md": { "entry": "pages/people/victor.md-71c217a1.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/victor.md-71c217a1.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/marco.md": { "entry": "pages/people/marco.md-394a96fa.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/marco.md-394a96fa.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/robin.md": { "entry": "pages/people/robin.md-70c55db7.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/robin.md-70c55db7.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/sigga.md": { "entry": "pages/people/sigga.md-b98c1ecc.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/sigga.md-b98c1ecc.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/steve.md": { "entry": "pages/people/steve.md-6a46c127.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/steve.md-6a46c127.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/ezra.md": { "entry": "pages/people/ezra.md-08ea56c3.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/ezra.md-08ea56c3.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/jack.md": { "entry": "pages/people/jack.md-95223354.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/jack.md-95223354.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/karl.md": { "entry": "pages/people/karl.md-cff9e375.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/karl.md-cff9e375.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/sean.md": { "entry": "pages/people/sean.md-7cb47557.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/sean.md-7cb47557.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/thor.md": { "entry": "pages/people/thor.md-b3882066.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/thor.md-b3882066.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/jon.md": { "entry": "pages/people/jon.md-6725e8fe.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/jon.md-6725e8fe.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/people/kit.md": { "entry": "pages/people/kit.md-b4799d22.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/people/kit.md-b4799d22.js", "chunks/vendor-d2cacae7.js", "chunks/People-01228011.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/about.md": { "entry": "pages/about.md-87890c8c.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/about.md-87890c8c.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/news/index.svelte": { "entry": "pages/news/index.svelte-79c383ef.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/index.svelte-79c383ef.js", "chunks/vendor-d2cacae7.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/news/nordic-popular-music-union.md": { "entry": "pages/news/nordic-popular-music-union.md-ad5a02c1.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/nordic-popular-music-union.md-ad5a02c1.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/news/halldorophone-kastljos.md": { "entry": "pages/news/halldorophone-kastljos.md-97b020c8.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/halldorophone-kastljos.md-97b020c8.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/google-summer-of-code.md": { "entry": "pages/news/google-summer-of-code.md-5ab56eb9.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/google-summer-of-code.md-5ab56eb9.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/on-the-fly-residency.md": { "entry": "pages/news/on-the-fly-residency.md-90201977.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/on-the-fly-residency.md-90201977.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/nime-2022-workshop.md": { "entry": "pages/news/nime-2022-workshop.md-7fff584b.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/nime-2022-workshop.md-7fff584b.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/root-workshop-2022.md": { "entry": "pages/news/root-workshop-2022.md-b47f638e.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/root-workshop-2022.md-b47f638e.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/news/living-algorithms.md": { "entry": "pages/news/living-algorithms.md-d3d232a2.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/living-algorithms.md-d3d232a2.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/steve-residency.md": { "entry": "pages/news/steve-residency.md-3a039b62.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/steve-residency.md-3a039b62.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/icelandic-news.md": { "entry": "pages/news/icelandic-news.md-04901008.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/icelandic-news.md-04901008.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/moving-strings.md": { "entry": "pages/news/moving-strings.md-8dae82b5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/moving-strings.md-8dae82b5.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/summer-interns.md": { "entry": "pages/news/summer-interns.md-a8c8650b.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/summer-interns.md-a8c8650b.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/trash-workshop.md": { "entry": "pages/news/trash-workshop.md-2be8b460.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/trash-workshop.md-2be8b460.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/phd2-deadline.md": { "entry": "pages/news/phd2-deadline.md-6763ee4f.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/phd2-deadline.md-6763ee4f.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/synthabaeli.md": { "entry": "pages/news/synthabaeli.md-43b2fc2b.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/synthabaeli.md-43b2fc2b.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/good-start.md": { "entry": "pages/news/good-start.md-eed8ddd1.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/good-start.md-eed8ddd1.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/soundworks.md": { "entry": "pages/news/soundworks.md-e5c5ea86.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/soundworks.md-e5c5ea86.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/ICLC2021.md": { "entry": "pages/news/ICLC2021.md-4e0778bb.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/ICLC2021.md-4e0778bb.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js"], "styles": [] }, "src/routes/news/gsoc2022.md": { "entry": "pages/news/gsoc2022.md-ade6ba32.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/gsoc2022.md-ade6ba32.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/rusl2022.md": { "entry": "pages/news/rusl2022.md-a1567c04.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/rusl2022.md-a1567c04.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/robin.md": { "entry": "pages/news/robin.md-bd8070d5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/robin.md-bd8070d5.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/karl.md": { "entry": "pages/news/karl.md-84206a99.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/karl.md-84206a99.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] }, "src/routes/news/phd2.md": { "entry": "pages/news/phd2.md-0c723c8c.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-a215ead7.css"], "js": ["pages/news/phd2.md-0c723c8c.js", "chunks/vendor-d2cacae7.js", "chunks/NewsItem-5725c16b.js", "chunks/seo-5e494dd3.js", "chunks/pages-2af87491.js", "chunks/Menu-4b5474b0.js", "chunks/CaptionedImage-cbb0f4e0.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
async function get$3() {
  const imports = { "./halldorophone.md": () => Promise.resolve().then(function() {
    return halldorophone;
  }), "./langspil.md": () => Promise.resolve().then(function() {
    return langspil;
  }), "./livinglooper.md": () => Promise.resolve().then(function() {
    return livinglooper;
  }), "./stenophone.md": () => Promise.resolve().then(function() {
    return stenophone;
  }), "./threnoscope.md": () => Promise.resolve().then(function() {
    return threnoscope;
  }) };
  let body = [];
  for (const path in imports) {
    body.push(imports[path]().then(({ metadata: metadata2 }) => {
      return {
        metadata: metadata2,
        path
      };
    }));
  }
  const posts = await Promise.all(body);
  return {
    body: JSON.stringify(posts)
  };
}
var projects_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$3
});
var contact = [
  {
    url: "mailto:iil@lhi.is",
    label: "Email"
  },
  {
    url: "https://facebook.com/intelligentinstrumentslab",
    label: "Facebook"
  },
  {
    url: "https://instagram.com/intelligentinstruments",
    label: "Instagram"
  },
  {
    url: "https://twitter.com/_iil_is",
    label: "Twitter"
  },
  {
    url: "https://discord.gg/fY9GYMebtJ",
    label: "Discord"
  },
  {
    url: "https://github.com/intelligent-instruments-lab",
    label: "GitHub"
  }
];
var contact$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": contact
});
async function get$2() {
  const imports = { "./1.md": () => Promise.resolve().then(function() {
    return _1$1;
  }), "./10.md": () => Promise.resolve().then(function() {
    return _10$1;
  }), "./11.md": () => Promise.resolve().then(function() {
    return _11$1;
  }), "./12.md": () => Promise.resolve().then(function() {
    return _12$1;
  }), "./13.md": () => Promise.resolve().then(function() {
    return _13$1;
  }), "./14.md": () => Promise.resolve().then(function() {
    return _14$1;
  }), "./15.md": () => Promise.resolve().then(function() {
    return _15$1;
  }), "./16.md": () => Promise.resolve().then(function() {
    return _16$1;
  }), "./17.md": () => Promise.resolve().then(function() {
    return _17$1;
  }), "./18.md": () => Promise.resolve().then(function() {
    return _18$1;
  }), "./19.md": () => Promise.resolve().then(function() {
    return _19$1;
  }), "./2.md": () => Promise.resolve().then(function() {
    return _2$1;
  }), "./20.md": () => Promise.resolve().then(function() {
    return _20$1;
  }), "./21.md": () => Promise.resolve().then(function() {
    return _21$1;
  }), "./3.md": () => Promise.resolve().then(function() {
    return _3$1;
  }), "./4.md": () => Promise.resolve().then(function() {
    return _4$1;
  }), "./5.md": () => Promise.resolve().then(function() {
    return _5$1;
  }), "./6.md": () => Promise.resolve().then(function() {
    return _6$1;
  }), "./7.md": () => Promise.resolve().then(function() {
    return _7$1;
  }), "./8.md": () => Promise.resolve().then(function() {
    return _8$1;
  }), "./9.md": () => Promise.resolve().then(function() {
    return _9$1;
  }) };
  let body = [];
  for (const path in imports) {
    body.push(imports[path]().then(({ metadata: metadata2 }) => {
      return {
        metadata: metadata2,
        path
      };
    }));
  }
  const posts = await Promise.all(body);
  return {
    body: JSON.stringify(posts)
  };
}
var openlabs_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$2
});
var top = {
  info: {
    tagline: "Events on new and modified, electronically actuated string instruments, augmented with code and AI.",
    details: "7-10 Dec, Reykjav\xEDk, Iceland",
    description: [
      "In the first international gathering hosted by the newly formed Intelligent Instruments Lab, at the Iceland University of the Arts, we bring together musicians and instrument makers who are using contemporary technologies to rethink how we play strings.",
      "How can digital processing, including dynamical systems and AI, augment the nature of the string, a technical element we have used in our instruments for thousands of years? How do new digital technologies change our interaction with strings and string instruments in general?"
    ]
  },
  buttons: [
    {
      url: "#symposium",
      label: "Symposium",
      theme: "dark_alt",
      target: "_self"
    },
    {
      url: "#concert",
      label: "Concert",
      theme: "dark_alt",
      target: "_self"
    },
    {
      url: "#mrp",
      label: "Magnetic Resonator Piano",
      theme: "dark_alt",
      target: "_self"
    }
  ]
};
var symposium = {
  info: {
    title: "Symposium",
    details: "Wednesday, Online - Zoom, Free",
    description: "The Intelligent Instruments Lab invites everyone interested in new musical instruments to come to an open symposium where practicing musicians and instrument inventors present and discuss their work. The presentations consist of short talks followed by Q&A. After the presentations we will have a panel discussing common themes, opening up for further interaction by the audience."
  },
  programme: {
    presentations: {
      starttime: "14:00",
      chair: "Jack Armitage",
      presenters: [
        {
          duration: "10",
          name: "Thor Magnusson (IS)",
          title: "Introduction",
          url: "https://thormagnusson.github.io/"
        },
        {
          duration: "15",
          name: "Andrew McPherson (US/UK)",
          title: "The Magnetic Resonator Piano so far",
          url: "http://andrewmcpherson.org"
        },
        {
          duration: "15",
          name: "Chris Kiefer (UK)",
          title: "Feedback Cellos",
          url: "https://luuma.net/"
        },
        {
          duration: "15",
          name: "Adam Pultz (DK/DE)",
          title: "The Feedback Actuated Augmented Double Bass",
          url: "http://adampultz.com/"
        },
        {
          duration: "15",
          name: "Tabita Cargnel (DE)",
          title: "Venus smiles in nature",
          url: "https://tabitacargnel.com/work"
        },
        {
          duration: "15",
          name: "",
          title: "Coffee Break -",
          url: "#"
        },
        {
          duration: "15",
          name: "Halld\xF3r and Gu\xF0mundur Steinn Gunnarsson (IS)",
          title: "Composing for halldorophone",
          url: "https://www.halldorophone.info/"
        },
        {
          duration: "15",
          name: "Dav\xED\xF0 Brynjar Franzson (IS/US)",
          title: "Drone Box: Autocoder",
          url: "http://franzson.com/"
        },
        {
          duration: "15",
          name: "Victor Shepardson (US/IS)",
          title: "No input mixer and Living Looper",
          url: "https://victor-shepardson.github.io/"
        },
        {
          duration: "15",
          name: "",
          title: "Coffee Break -",
          url: "#"
        }
      ]
    },
    panel: {
      chair: "Thor Magnusson",
      speakers: [
        {
          name: "Andrew McPherson (US/UK)",
          url: "http://andrewmcpherson.org"
        },
        {
          name: "Chris Kiefer (UK)",
          url: "https://luuma.net/"
        },
        {
          name: "Adam Pultz (DK/DE)",
          url: "http://adampultz.com/"
        },
        {
          name: "Tabita Cargnel (DE)",
          url: "https://tabitacargnel.com/work"
        },
        {
          name: "Dav\xED\xF0 Brynjar Franzson (IS)",
          url: "http://franzson.com/"
        }
      ]
    }
  },
  buttons: [
    {
      url: "https://www.facebook.com/events/584294452831227",
      label: "Event Page",
      theme: "dark_alt",
      target: "_blank"
    }
  ]
};
var concert = {
  info: {
    title: "Concert CANCELLED",
    details: "Thursday 9, Mengi, 2000 ISK",
    description: "Unfortunately, due to a COVID related incident, we must cancel the Moving Strings Concert. Some of our guests were scheduled to perform. The theme of the evening was meant to be feedback instruments and resonating strings. Performers: Tabita Cargnel (DE) with her singing tensegrity sculpture, Chris Kiefer (UK) with his new feedback instrument and Adam Pultz (DK) with his feedback-actuated bass. All are focusing on new ways of treating string instruments. This event is cancelled."
  },
  buttons: [
    {
      url: "https://www.facebook.com/events/1003688887028231",
      label: "Event Page",
      theme: "dark_alt",
      target: "_blank"
    },
    {
      url: "https://www.mengi.net/events",
      label: "Buy Tickets",
      theme: "dark_alt",
      target: "_blank"
    }
  ],
  performers: [
    {
      name: "Tabita Cargnel (DE)",
      image: "/images/events/moving-strings/tabita.jpg",
      links: {
        instagram: "singing_tensegrity",
        video: "https://www.youtube.com/watch?v=KIy9Hm1NsaU",
        website: "tabitacargnel.com/work"
      },
      description: "Venus Smiles is a sound sculpture for communal performance. Ringing copper tubes, suspended in an architectural tensegrity system, can be played as a musical instrument by using your hands, a bow or your voice. Every element of the Venus Smiles instrument is tuned to the tubes main resonance note. The highly resonant and reverby sound creates an intense, immersive experience."
    },
    {
      name: "Chris Kiefer (UK)",
      image: "/images/events/moving-strings/chris.jpg",
      links: {
        website: "luuma.net",
        scholar: "66uLtDEAAAAJ",
        twitter: "luuma"
      },
      description: "Chris Kiefer is an instrument designer and experimental musician from Brighton, UK. He will be playing an improvised piece with a new feedback string instrument, the Xiasri, The piece will explore two coupled feedback systems, one within the physical materials of the instrument, and one within software, using self-concatenative synthesis, where new sound is resynthesised from the instruments recent past."
    },
    {
      name: "Adam Pultz (DK/DE)",
      image: "/images/events/moving-strings/adam.jpg",
      links: {
        website: "adampultz.com",
        video: "https://vimeo.com/adampultz",
        twitter: "AdamPultz",
        scholar: "ZwIT6hgAAAAJ"
      },
      description: "Adam Pultz Melbye is a Berlin-based composer, musician and researcher He has released three double bass solo albums, appears on an additional 40+ releases and has toured Europe, the US, Australia and Japan. Adam has created fixed media pieces and sound installations for festivals, galleries and museums in Denmark, Australia, Germany and Austria. His writing has been published in international journals and conferences and he is currently guest editing an issue on feedback practices for the ECHO Journal at Orpheus Instituut, Gent."
    }
  ]
};
var mrp = {
  info: {
    title: "Magnetic Resonator Piano (MRP)",
    details: "Various dates, Fr\xE6\xF0astofa 1, Skipholt, Free",
    description: "The magnetic resonator piano (MRP) is an augmented piano which uses electromagnets to elicit new sounds from the strings of a grand piano. The MRP extends the sonic vocabulary of the piano to include infinite sustain, crescendos from silence, harmonics, pitch bends and new timbres, all produced acoustically without the use of speakers."
  },
  videos: [
    {
      url: "https://www.youtube.com/watch?list=PL0HKnypdS9i9DNlk-pOr7M1zrDX06o1Xg&v=f79d_oVqv4Y"
    },
    {
      url: "https://www.youtube.com/watch?v=GAb8RRKg8oo"
    }
  ],
  events: [
    {
      name: "Andrew McPherson Lecture",
      details: "Weds 8, 11:00-12:00, Online - Zoom",
      image: "/images/events/moving-strings/mrp_andrew.jpg",
      description: "In this online talk Andrew will present the functionality of the Magnetic Resonator Piano. He will talk about how the instrument has been received by composers, performers and the public, and how the innovation of the instrument has happened. Andrew will also discuss how composers have rethought their relationship with the piano when encountering the instrument, for example through new notational practices.",
      links: {
        event: "https://www.facebook.com/events/596517608339693",
        website: "andrewmcpherson.org",
        website2: "instrumentslab.org",
        scholar: "9Je-3c4AAAAJ",
        twitter: "instrumentslab"
      }
    },
    {
      name: "MRP Workshops",
      details: "Tue 7 - Thu 9, Fr\xE6\xF0astofa 1, Skipholt (Sign-up required)",
      image: "/images/events/moving-strings/mrp_workshops.jpg",
      description: "We are excited to invite people interested in the Magnetic Resonator Piano to a workshop with the instrument. This new instrument will be located at the Music Department for years to come, and there will be plenty of opportunities to compose and perform with the instrument. The workshop will be lead by Tinna \xDEorsteinsd\xF3ttir who will introduce you to the instrument and give support, but equally give you time to spend alone with the instrument. People can sign up for the workshop as individuals or groups (e.g. composer-performer duo).",
      links: {
        event: "https://www.facebook.com/events/459429968869963",
        signup: "https://forms.office.com/r/5kE6JXerJf"
      }
    },
    {
      name: "MRP Concert",
      details: "Fri 10, 17:00-18:30, Fr\xE6\xF0astofa 1, Skipholt",
      image: "/images/events/moving-strings/mrp_concert.jpg",
      description: "The Intelligent Instruments Lab is happy to present the results of the workshop in the Magnetic Resonator Piano. Here Tinna \xDEorsteinsd\xF3ttir has been leading sessions with composers and performers who have been getting to know the MRP for a short time. The concert is a showcase of work-in-progress pieces, and it should be interesting to anyone who is interested in new music and how the piano can be expanded into future sounds.",
      links: {
        event: "https://www.facebook.com/events/3007719246107553"
      }
    }
  ]
};
var copy = {
  top,
  symposium,
  concert,
  mrp
};
var copy$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  top,
  symposium,
  concert,
  mrp,
  "default": copy
});
async function get$1() {
  const imports = { "./davidbrynjar.md": () => Promise.resolve().then(function() {
    return davidbrynjar;
  }), "./enrike.md": () => Promise.resolve().then(function() {
    return enrike;
  }), "./esther.md": () => Promise.resolve().then(function() {
    return esther;
  }), "./ezra.md": () => Promise.resolve().then(function() {
    return ezra;
  }), "./halldor.md": () => Promise.resolve().then(function() {
    return halldor;
  }), "./jack.md": () => Promise.resolve().then(function() {
    return jack;
  }), "./jon.md": () => Promise.resolve().then(function() {
    return jon;
  }), "./karl.md": () => Promise.resolve().then(function() {
    return karl$1;
  }), "./kit.md": () => Promise.resolve().then(function() {
    return kit;
  }), "./marco.md": () => Promise.resolve().then(function() {
    return marco;
  }), "./robin.md": () => Promise.resolve().then(function() {
    return robin$1;
  }), "./sean.md": () => Promise.resolve().then(function() {
    return sean;
  }), "./sigga.md": () => Promise.resolve().then(function() {
    return sigga;
  }), "./steve.md": () => Promise.resolve().then(function() {
    return steve;
  }), "./thor.md": () => Promise.resolve().then(function() {
    return thor;
  }), "./victor.md": () => Promise.resolve().then(function() {
    return victor;
  }) };
  let body = [];
  for (const path in imports) {
    body.push(imports[path]().then(({ metadata: metadata2 }) => {
      return {
        metadata: metadata2,
        path
      };
    }));
  }
  const posts = await Promise.all(body);
  return {
    body: JSON.stringify(posts)
  };
}
var people_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$1
});
var members = [
  "thor",
  "jack",
  "victor",
  "halldor",
  "esther",
  "kit"
];
var associates = [
  "sigga",
  "davidbrynjar",
  "marco",
  "enrike",
  "ezra",
  "jon",
  "karl",
  "robin",
  "sean",
  "steve"
];
var order = {
  members,
  associates
};
var order$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  members,
  associates,
  "default": order
});
var pages = [
  {
    label: "About",
    url: "/about",
    style: "default"
  },
  {
    label: "People",
    url: "/people",
    style: "default"
  },
  {
    label: "News",
    url: "/news",
    style: "default"
  },
  {
    label: "Research",
    url: "/research",
    style: "default"
  },
  {
    label: "Outputs",
    url: "/outputs",
    style: "default"
  },
  {
    label: "Open Lab",
    url: "/openlab",
    style: "default"
  },
  {
    label: "Collaborate",
    url: "/collaborate",
    style: "default"
  }
];
var pages$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": pages
});
async function get() {
  const imports = { "./ICLC2021.md": () => Promise.resolve().then(function() {
    return ICLC2021$1;
  }), "./good-start.md": () => Promise.resolve().then(function() {
    return goodStart;
  }), "./google-summer-of-code.md": () => Promise.resolve().then(function() {
    return googleSummerOfCode;
  }), "./gsoc2022.md": () => Promise.resolve().then(function() {
    return gsoc2022;
  }), "./halldorophone-kastljos.md": () => Promise.resolve().then(function() {
    return halldorophoneKastljos;
  }), "./icelandic-news.md": () => Promise.resolve().then(function() {
    return icelandicNews;
  }), "./karl.md": () => Promise.resolve().then(function() {
    return karl;
  }), "./living-algorithms.md": () => Promise.resolve().then(function() {
    return livingAlgorithms;
  }), "./moving-strings.md": () => Promise.resolve().then(function() {
    return movingStrings;
  }), "./nime-2022-workshop.md": () => Promise.resolve().then(function() {
    return nime2022Workshop;
  }), "./nordic-popular-music-union.md": () => Promise.resolve().then(function() {
    return nordicPopularMusicUnion;
  }), "./on-the-fly-residency.md": () => Promise.resolve().then(function() {
    return onTheFlyResidency;
  }), "./phd2-deadline.md": () => Promise.resolve().then(function() {
    return phd2Deadline;
  }), "./phd2.md": () => Promise.resolve().then(function() {
    return phd2;
  }), "./robin.md": () => Promise.resolve().then(function() {
    return robin;
  }), "./root-workshop-2022.md": () => Promise.resolve().then(function() {
    return rootWorkshop2022;
  }), "./rusl2022.md": () => Promise.resolve().then(function() {
    return rusl2022;
  }), "./soundworks.md": () => Promise.resolve().then(function() {
    return soundworks;
  }), "./steve-residency.md": () => Promise.resolve().then(function() {
    return steveResidency;
  }), "./summer-interns.md": () => Promise.resolve().then(function() {
    return summerInterns;
  }), "./synthabaeli.md": () => Promise.resolve().then(function() {
    return synthabaeli;
  }), "./trash-workshop.md": () => Promise.resolve().then(function() {
    return trashWorkshop;
  }) };
  let body = [];
  for (const path in imports) {
    body.push(imports[path]().then(({ metadata: metadata2 }) => {
      return {
        metadata: metadata2,
        path
      };
    }));
  }
  const posts = await Promise.all(body);
  return {
    body: JSON.stringify(posts)
  };
}
var items_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get
});
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var layoutStore = () => {
  let state = {
    menu: false,
    page: "home"
  };
  const { subscribe: subscribe2, set, update } = writable(state);
  const methods = {
    init: () => {
    },
    reset: () => {
      return set(state);
    },
    menuToggle: () => {
      let m;
      update((s2) => {
        s2.menu = !s2.menu;
        m = s2.menu;
        return s2;
      });
      return m;
    }
  };
  return { subscribe: subscribe2, set, update, ...methods };
};
var Layout = layoutStore();
var seo = writable({
  title: "Intelligent Instruments Lab",
  description: "The Intelligent Instruments Lab designs instruments embedded with creative AI for musical performance. Our aim is to understand ourselves as users of intelligent technologies.",
  url: "/",
  image: "/seo/ogimage.jpg"
});
var SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape($seo.title)} | Intelligent Instruments Lab</title>`, ""}<meta name="${"description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"og:url"}"${add_attribute("content", "https://iil.is" + $seo.url, 0)} data-svelte="svelte-bspmah"><meta property="${"og:title"}"${add_attribute("content", $seo.title + " | Intelligent Instruments Lab", 0)} data-svelte="svelte-bspmah"><meta property="${"og:description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"og:image"}"${add_attribute("content", $seo.image, 0)} data-svelte="svelte-bspmah"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-bspmah"><meta name="${"twitter:site"}" content="${"@_iil_is"}" data-svelte="svelte-bspmah"><meta property="${"twitter:url"}"${add_attribute("content", "https://iil.is" + $seo.url, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:title"}"${add_attribute("content", $seo.title + " | Intelligent Instruments Lab", 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:image"}"${add_attribute("content", "https://iil.is" + $seo.image, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-bspmah">`, ""}`;
});
var wordmark = "/_app/assets/iil_wordmark-d35ec417.svg";
var wordmark_nologo = "/_app/assets/iil_wordmark_nologo-b022fff8.svg";
var menu = "/_app/assets/iil_menu-2f8e2158.svg";
var css$4 = {
  code: ".menuActive.svelte-2gqn6h{--tw-scale-y:1;--tw-rotate:180deg}.menuActive.svelte-2gqn6h,.menuInactive.svelte-2gqn6h{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;padding:1rem;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));width:4rem}.menuInactive.svelte-2gqn6h{--tw-scale-y:1;--tw-rotate:270deg}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n  import { Layout } from '../../stores/layout.js'\\n\\n  // Assets\\n  import wordmark from '../../assets/svg/iil_wordmark.svg?url'\\n  import wordmark_nologo from '../../assets/svg/iil_wordmark_nologo.svg?url'\\n  import menu from '../../assets/svg/iil_menu.svg?url'\\n\\n  import pages from \\"../../routes/pages.json\\"\\n\\n  const methods = {\\n    menuToggle: e => {\\n      let m = Layout.menuToggle()\\n      console.log('[Menu]', m)\\n    },\\n  }\\n<\/script>\\n\\n<style>.menuActive{--tw-scale-y:1;--tw-rotate:180deg}.menuActive,.menuInactive{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;padding:1rem;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));width:4rem}.menuInactive{--tw-scale-y:1;--tw-rotate:270deg}</style>\\n\\n<div class=\\"bg-secondary\\">\\n  <div class=\\"grid grid-cols-8 h-42\\">\\n    <div class=\\"col-span-5 md:col-span-7\\">\\n      <a href=\\"/\\">\\n        <img\\n          class=\\"w-96 hidden md:block\\"\\n          src={wordmark}\\n          alt=\\"Intelligent Instruments Lab\\"/>\\n        <img\\n          class=\\"w-72 block md:hidden\\"\\n          src={wordmark_nologo}\\n          alt=\\"Intelligent Instruments Lab\\"/>\\n      </a>\\n    </div>\\n    <div class=\\"col-span-1 justify-self-end self-center pr-10 hidden md:block\\">\\n      {#if $Layout.page !== 'home'}\\n        <img\\n          class=\\"{$Layout.menu ? 'menuActive' : 'menuInactive'}\\"\\n          src={menu}\\n          alt=\\"Menu\\"\\n          on:click|preventDefault={methods.menuToggle}/>\\n      {/if}\\n    </div>\\n    <div class=\\"col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10\\">\\n      <img\\n        class=\\"{$Layout.menu ? 'menuActive' : 'menuInactive'}\\"\\n        src={menu}\\n        alt=\\"Menu\\"\\n        on:click|preventDefault={methods.menuToggle}/>\\n    </div>\\n  </div>\\n</div>\\n"],"names":[],"mappings":"AAkBO,yBAAW,CAAC,aAAa,CAAC,CAAC,YAAY,MAAM,CAAC,yBAAW,CAAC,2BAAa,CAAC,iBAAiB,CAAC,CAAC,iBAAiB,CAAC,CAAC,YAAY,CAAC,CAAC,YAAY,CAAC,CAAC,YAAY,CAAC,CAAC,aAAa,CAAC,CAAC,QAAQ,IAAI,CAAC,UAAU,WAAW,IAAI,gBAAgB,CAAC,CAAC,CAAC,WAAW,IAAI,gBAAgB,CAAC,CAAC,CAAC,OAAO,IAAI,WAAW,CAAC,CAAC,CAAC,MAAM,IAAI,WAAW,CAAC,CAAC,CAAC,MAAM,IAAI,WAAW,CAAC,CAAC,CAAC,OAAO,IAAI,YAAY,CAAC,CAAC,CAAC,OAAO,IAAI,YAAY,CAAC,CAAC,CAAC,MAAM,IAAI,CAAC,2BAAa,CAAC,aAAa,CAAC,CAAC,YAAY,MAAM,CAAC"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$result.css.add(css$4);
  $$unsubscribe_Layout();
  return `<div class="${"bg-secondary"}"><div class="${"grid grid-cols-8 h-42"}"><div class="${"col-span-5 md:col-span-7"}"><a href="${"/"}"><img class="${"w-96 hidden md:block"}"${add_attribute("src", wordmark, 0)} alt="${"Intelligent Instruments Lab"}">
        <img class="${"w-72 block md:hidden"}"${add_attribute("src", wordmark_nologo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
    <div class="${"col-span-1 justify-self-end self-center pr-10 hidden md:block"}">${$Layout.page !== "home" ? `<img class="${escape(null_to_empty($Layout.menu ? "menuActive" : "menuInactive"), true) + " svelte-2gqn6h"}"${add_attribute("src", menu, 0)} alt="${"Menu"}">` : ``}</div>
    <div class="${"col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10"}"><img class="${escape(null_to_empty($Layout.menu ? "menuActive" : "menuInactive"), true) + " svelte-2gqn6h"}"${add_attribute("src", menu, 0)} alt="${"Menu"}"></div></div></div>`;
});
var ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  let { target } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<a class="${"text-white"}"${add_attribute("href", url, 0)}${add_attribute("target", target, 0)}>${escape(label)}</a>
<br>`;
});
var List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { list } = $$props;
  let { target } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<div><h1 class="${"font-hauser text-white text-lg"}">${escape(name)}</h1>
  <div class="${"px-2 py-3"}">${each(list, (item, index2) => {
    return `${validate_component(ListItem, "ListItem").$$render($$result, { url: item.url, label: item.label, target }, {}, {})}`;
  })}</div></div>`;
});
var logo = "/_app/assets/iil_logo_white_fit-610860e0.svg";
var eu_erc = "/_app/assets/eu_erc-603ae00c.svg";
var ERC = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"max-w-sm pr-8"}"><img class="${"w-96 md:h-32 lg:h-36 object-cover object-center mb-4"}"${add_attribute("src", eu_erc, 0)} alt="${"European Research Council"}">
  <p class="${"text-white text-xs"}">The Intelligent Instruments project (INTENT) is funded by the European Research Council (ERC) under the European Union\u2019s Horizon 2020 research and innovation programme (Grant agreement No. 101001848).
  </p></div>`;
});
var ERC_Mobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"mt-8"}"><img class="${"w-72 h-28 object-cover object-center mb-8"}"${add_attribute("src", eu_erc, 0)} alt="${"European Research Council"}">
  <p class="${"text-white text-xs pr-4 max-w-sm "}">The Intelligent Instruments project (INTENT) is funded by the European Research Council (ERC) under the European Union\u2019s Horizon 2020 research and innovation programme (Grant agreement No. 101001848).
  </p></div>`;
});
var css$3 = {
  code: ".menuActive.svelte-pm4qwz{--tw-border-opacity:1;border:4px dashed rgba(255,237,0,var(--tw-border-opacity))}.menuActive.svelte-pm4qwz,.menuInactive.svelte-pm4qwz{--tw-bg-opacity:1;background-color:rgba(78,91,88,var(--tw-bg-opacity))}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script>\\n\\n  import { Layout } from '../../stores/layout.js'\\n\\n  import List from './List.svelte'\\n  import logo from '../../assets/svg/iil_logo_white_fit.svg?url'\\n  import pages from \\"../../routes/pages.json\\"\\n  import contact from \\"../../routes/contact.json\\"\\n\\n  import ERC from './ERC.svelte'\\n  import ERC_Mobile from './ERC_Mobile.svelte'\\n\\n<\/script>\\n\\n<style>.menuActive{--tw-border-opacity:1;border:4px dashed rgba(255,237,0,var(--tw-border-opacity))}.menuActive,.menuInactive{--tw-bg-opacity:1;background-color:rgba(78,91,88,var(--tw-bg-opacity))}</style>\\n\\n<div class=\\"{($Layout.menu || $Layout.page === 'home') ? 'menuActive' : 'menuInactive'}\\">\\n  <div class=\\"pt-8 pl-6 max-w-screen-xl hidden md:block mb-4 lg:mb-10\\">\\n    <div class=\\"grid grid-cols-8\\">\\n      <div class=\\"col-span-2 m-4 lg:ml-12\\">\\n        <div class=\\"mt-8 mb-8\\">\\n          <a href=\\"/\\">\\n            <img\\n              class=\\"h-24 lg:h-36\\"\\n              src={logo}\\n              alt=\\"Intelligent Instruments Lab\\"/>\\n          </a>\\n        </div>\\n        <div class=\\"text-sm\\">\\n          <a href=\\"https://goo.gl/maps/jX1wteK9MjdMKsg28\\" target=\\"_blank\\">\\n            <div class=\\"text-white\\">Intelligent Instruments Lab</div>\\n            <div class=\\"text-white\\">\xDEverholt 11</div>\\n            <div class=\\"text-white\\">105 Reykjav\xEDk</div>\\n            <div class=\\"text-white\\">Iceland</div>\\n          </a>\\n        </div>\\n      </div>\\n      <div class=\\"col-span-6 py-12\\">\\n        <div class=\\"grid grid-cols-8\\">\\n          <div class=\\"col-span-2\\">\\n            <List list={pages} name=\\"Explore\\" target=\\"\\"/>\\n          </div>\\n          <div class=\\"col-span-2\\">\\n            <List list={contact} name=\\"Contact\\" target=\\"_blank\\"/>\\n          </div>\\n          <div class=\\"col-span-4\\">\\n            <ERC/>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n  <div class=\\"pt-8 pl-6 py-8 max-w-screen-xl md:hidden\\">\\n    <div class=\\"flex flex-col\\">\\n      <div class=\\"\\">\\n        <List list={contact} name=\\"Contact\\" target=\\"_blank\\"/>\\n      </div>\\n      <div class=\\"\\">\\n        <h1 class=\\"font-hauser text-white text-lg\\">Address</h1>\\n        <div class=\\"px-2 py-3\\">\\n          <a href=\\"https://goo.gl/maps/jX1wteK9MjdMKsg28\\" target=\\"_blank\\">\\n            <div class=\\"text-white\\">Intelligent Instruments Lab</div>\\n            <div class=\\"text-white\\">\xDEverholt 11</div>\\n            <div class=\\"text-white\\">105 Reykjav\xEDk</div>\\n            <div class=\\"text-white\\">Iceland</div>\\n          </a>\\n        </div>\\n      </div>\\n      <div>\\n        <ERC_Mobile/>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n"],"names":[],"mappings":"AAcO,yBAAW,CAAC,oBAAoB,CAAC,CAAC,OAAO,GAAG,CAAC,MAAM,CAAC,KAAK,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAAC,yBAAW,CAAC,2BAAa,CAAC,gBAAgB,CAAC,CAAC,iBAAiB,KAAK,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC"}`
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$result.css.add(css$3);
  $$unsubscribe_Layout();
  return `<div class="${escape(null_to_empty($Layout.menu || $Layout.page === "home" ? "menuActive" : "menuInactive"), true) + " svelte-pm4qwz"}"><div class="${"pt-8 pl-6 max-w-screen-xl hidden md:block mb-4 lg:mb-10"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2 m-4 lg:ml-12"}"><div class="${"mt-8 mb-8"}"><a href="${"/"}"><img class="${"h-24 lg:h-36"}"${add_attribute("src", logo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
        <div class="${"text-sm"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div>
      <div class="${"col-span-6 py-12"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2"}">${validate_component(List, "List").$$render($$result, { list: pages, name: "Explore", target: "" }, {}, {})}</div>
          <div class="${"col-span-2"}">${validate_component(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
          <div class="${"col-span-4"}">${validate_component(ERC, "ERC").$$render($$result, {}, {}, {})}</div></div></div></div></div>
  <div class="${"pt-8 pl-6 py-8 max-w-screen-xl md:hidden"}"><div class="${"flex flex-col"}"><div class="${""}">${validate_component(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
      <div class="${""}"><h1 class="${"font-hauser text-white text-lg"}">Address</h1>
        <div class="${"px-2 py-3"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div>
      <div>${validate_component(ERC_Mobile, "ERC_Mobile").$$render($$result, {}, {}, {})}</div></div></div></div>`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SEO, "Seo").$$render($$result, {}, {}, {})}
<div class="${""}"><div class="${"bg-secondary"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    ${slots.default ? slots.default({}) : ``}</div>
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$5({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$5
});
var css$2 = {
  code: ".default.svelte-d47nz{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.default.svelte-d47nz{font-size:1.25rem;line-height:1.75rem}}@media(min-width:1024px){.default.svelte-d47nz{font-size:1.875rem;line-height:2.25rem}}.special.svelte-d47nz{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.special.svelte-d47nz{font-size:1.25rem;line-height:1.75rem}}@media(min-width:1024px){.special.svelte-d47nz{font-size:1.875rem;line-height:2.25rem}}",
  map: `{"version":3,"file":"MenuItem.svelte","sources":["MenuItem.svelte"],"sourcesContent":["<script>\\n  import { Layout } from '../../stores/layout.js'\\n\\n  export let page\\n\\n  const onclick = e => {\\n    $Layout.menu = false\\n  }\\n\\n<\/script>\\n\\n<style>.default{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media (min-width:640px){.default{font-size:1.25rem;line-height:1.75rem}}@media (min-width:1024px){.default{font-size:1.875rem;line-height:2.25rem}}.special{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media (min-width:640px){.special{font-size:1.25rem;line-height:1.75rem}}@media (min-width:1024px){.special{font-size:1.875rem;line-height:2.25rem}}</style>\\n\\n{#if page.style === \\"default\\"}\\n  {#if page.url.slice(1) === $Layout.page}\\n    <a class=\\"default\\"\\n      href='#'\\n      on:click|preventDefault={onclick}>\\n      {page.label}\\n    </a>\\n  {:else}\\n    <a\\n      class=\\"default\\"\\n      href={page.url}>\\n      {page.label}\\n    </a>\\n  {/if}\\n{:else if page.style === \\"special\\"}\\n  {#if page.url.slice(1) === $Layout.page}\\n    <a class=\\"special\\"\\n      href='#'\\n      on:click|preventDefault={onclick}>\\n      {page.label}\\n    </a>\\n  {:else}\\n    <a\\n      class=\\"special\\"\\n      href={page.url}>\\n      {page.label}\\n    </a>\\n  {/if}  \\n{/if}\\n"],"names":[],"mappings":"AAWO,qBAAQ,CAAC,kBAAkB,CAAC,CAAC,MAAM,KAAK,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAAC,YAAY,WAAW,CAAC,UAAU,OAAO,CAAC,eAAe,KAAK,CAAC,YAAY,OAAO,CAAC,eAAe,KAAK,CAAC,YAAY,KAAK,CAAC,eAAe,SAAS,CAAC,MAAM,AAAC,WAAW,KAAK,CAAC,CAAC,qBAAQ,CAAC,UAAU,OAAO,CAAC,YAAY,OAAO,CAAC,CAAC,MAAM,AAAC,WAAW,MAAM,CAAC,CAAC,qBAAQ,CAAC,UAAU,QAAQ,CAAC,YAAY,OAAO,CAAC,CAAC,qBAAQ,CAAC,kBAAkB,CAAC,CAAC,MAAM,KAAK,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAAC,YAAY,WAAW,CAAC,UAAU,OAAO,CAAC,eAAe,KAAK,CAAC,YAAY,OAAO,CAAC,eAAe,KAAK,CAAC,YAAY,KAAK,CAAC,eAAe,SAAS,CAAC,MAAM,AAAC,WAAW,KAAK,CAAC,CAAC,qBAAQ,CAAC,UAAU,OAAO,CAAC,YAAY,OAAO,CAAC,CAAC,MAAM,AAAC,WAAW,MAAM,CAAC,CAAC,qBAAQ,CAAC,UAAU,QAAQ,CAAC,YAAY,OAAO,CAAC,CAAC"}`
};
var MenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  let { page } = $$props;
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  $$result.css.add(css$2);
  $$unsubscribe_Layout();
  return `${page.style === "default" ? `${page.url.slice(1) === $Layout.page ? `<a class="${"default svelte-d47nz"}" href="${"#"}">${escape(page.label)}</a>` : `<a class="${"default svelte-d47nz"}"${add_attribute("href", page.url, 0)}>${escape(page.label)}</a>`}` : `${page.style === "special" ? `${page.url.slice(1) === $Layout.page ? `<a class="${"special svelte-d47nz"}" href="${"#"}">${escape(page.label)}</a>` : `<a class="${"special svelte-d47nz"}"${add_attribute("href", page.url, 0)}>${escape(page.label)}</a>`}` : ``}`}`;
});
var Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"bg-secondary h-screen"}"><div class="${"flex flex-col md:py-6 md:mr-4 ml-8 sm:ml-12 md:ml-16"}">${each(pages, (page, index2) => {
    return `${validate_component(MenuItem, "MenuItem").$$render($$result, { page }, {}, {})}`;
  })}</div></div>`;
});
var PillDashed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { link } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  return `${link.theme === "dark" ? `<div class="${"border-dashed border-primary-500 border-2 hover:border-primary-600 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-primary-500 hover:bg-primary-600 h-9 flex items-center justify-center text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : `${link.theme === "light" ? `<div class="${"border-dashed border-primary-500 border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-400 text-primary-500 hover:text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : `${link.theme === "dark_alt" ? `<div class="${"border-dashed border-white border-2 hover:border-primary-500 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-white hover:bg-primary-500 h-9 flex items-center justify-center text-primary-700 hover:text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : `${link.theme === "light_alt" ? `<div class="${"border-dashed border-white border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-500 text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : ``}`}`}`}`;
});
var CTARow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-4 sm:gap-10"}">${each(links, (link) => {
    return `${validate_component(PillDashed, "PillDashed").$$render($$result, { link }, {}, {})}`;
  })}</div>`;
});
var css$1 = {
  code: ".videoWrapper.svelte-eym11.svelte-eym11{height:0;padding-bottom:56.25%;padding-top:25px;position:relative}.videoWrapper.svelte-eym11 iframe.svelte-eym11{height:100%;left:0;position:absolute;top:0;width:100%}",
  map: '{"version":3,"file":"EmbedYouTube.svelte","sources":["EmbedYouTube.svelte"],"sourcesContent":["<script>\\n  export let id\\n  export let scale\\n<\/script>\\n\\n<style>.videoWrapper{height:0;padding-bottom:56.25%;padding-top:25px;position:relative}.videoWrapper iframe{height:100%;left:0;position:absolute;top:0;width:100%}</style>\\n\\n<div class=\\"videoWrapper\\">\\n  <iframe\\n    width={scale ? scale * 560 : 560}\\n    height={scale ? scale * 315 : 315}\\n    src={\\"https://www.youtube.com/embed/\\"+id}\\n    title=\\"YouTube video player\\"\\n    frameborder=\\"0\\"\\n    allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\" \\n    allowfullscreen/>\\n</div>\\n"],"names":[],"mappings":"AAKO,uCAAa,CAAC,OAAO,CAAC,CAAC,eAAe,MAAM,CAAC,YAAY,IAAI,CAAC,SAAS,QAAQ,CAAC,0BAAa,CAAC,mBAAM,CAAC,OAAO,IAAI,CAAC,KAAK,CAAC,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,MAAM,IAAI,CAAC"}'
};
var EmbedYouTube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { scale } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  $$result.css.add(css$1);
  return `<div class="${"videoWrapper svelte-eym11"}"><iframe${add_attribute("width", scale ? scale * 560 : 560, 0)}${add_attribute("height", scale ? scale * 315 : 315, 0)}${add_attribute("src", "https://www.youtube.com/embed/" + id, 0)} title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-eym11"}"></iframe></div>`;
});
var Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { pitch } = $$props;
  let { layout } = $$props;
  let { hero_image } = $$props;
  let { hero_caption } = $$props;
  let { hero_slug } = $$props;
  let cta_links = [
    {
      url: "/news/nime-2022-workshop",
      label: "Learn More",
      theme: "dark",
      target: "_self"
    }
  ];
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.pitch === void 0 && $$bindings.pitch && pitch !== void 0)
    $$bindings.pitch(pitch);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.hero_image === void 0 && $$bindings.hero_image && hero_image !== void 0)
    $$bindings.hero_image(hero_image);
  if ($$props.hero_caption === void 0 && $$bindings.hero_caption && hero_caption !== void 0)
    $$bindings.hero_caption(hero_caption);
  if ($$props.hero_slug === void 0 && $$bindings.hero_slug && hero_slug !== void 0)
    $$bindings.hero_slug(hero_slug);
  $$unsubscribe_Layout();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-secondary h-screen"}"><div class="${"grid grid-cols-8 max-w-screen-xl"}"><div class="${"hidden md:block col-span-3"}">${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}</div>
    
    <div class="${"sm:ml-4 md:ml-12 max-w-xl col-span-8 md:col-span-5 px-12 md:px-0 py-0 md:py-6"}"><div class="${"text-md md:text-xl md:pr-16 text-primary-700"}"><p>${escape(pitch)}</p>
        <p>The call for abstracts is now live for our NIME 2022 workshop on <em>Embedded AI for NIME: Challenges and Opportunities</em>:
        </p></div>
      <div class="${"w-5/6 mt-8"}"><a${add_attribute("href", hero_slug, 0)}${add_attribute("title", hero_caption, 0)}><img class="${"shadow-sm"}"${add_attribute("src", "./images/" + hero_image, 0)}${add_attribute("alt", hero_caption, 0)}>
          <p class="${"text-sm text-primary-500 mt-4"}">${escape(hero_caption)}</p></a></div>
      <div class="${"mt-10"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: cta_links }, {}, {})}</div></div></div></div>`}`;
});
var metadata$13 = {
  "layout": "home",
  "title": "Intelligent Instruments Lab",
  "slug": "",
  "pitch": "We design instruments embedded with creative AI for musical performance. New instruments for new music! Our aim is to understand ourselves as users of intelligent technologies. ",
  "hero_image": "research/projects/protolangspil2.jpg",
  "hero_caption": "Working on Embedded AI for musical instruments? This is the workshop for you!",
  "hero_slug": "news/nime-2022-workshop"
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Home, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$13), {}, {})}`;
});
var index$6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  metadata: metadata$13
});
var Collaborate$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { layout } = $$props;
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div></div>`}`;
});
var metadata$12 = {
  "layout": "collaborate",
  "title": "Collaborate",
  "slug": "collaborate",
  "description": "Collaborate with us"
};
var Collaborate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Collaborate$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$12), {}, {
    default: () => {
      return `<p>The Intelligent Instruments Lab is open for collaborations with artists and scientists on experimental projects, equally as part of our work programme and as collaborations with other projects. We work with various research institutions around the world.</p>
<p>We also run a visiting researcher scheme. We welcome people to come and work with us in our wonderful Reykjavik lab over a specified period of time. The aim with this scheme is to enable artists, composers and musicians to develop technologies for their musical expression, but in turn the collaboration will help us answer our research questions. </p>
<p>Please get in touch with the Principal Investigator, Thor Magnusson, or the lab members you\u2019d like to work with - all the relevant contact information can be found in our <a href="${"/team"}">Team Page</a>.</p>
<p>We also have a <a href="${"https://discord.gg/Z5HZ5quk"}">public channel</a> on Discord for any questions or conversation. We also have an <a href="${"https://discord.gg/UTFPmHgA"}">Open Lab</a> Discord Channel. </p>`;
    }
  })}`;
});
var collaborate = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Collaborate,
  metadata: metadata$12
});
function paginate({ items, pageSize, currentPage }) {
  return items.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
}
var PREVIOUS_PAGE = "PREVIOUS_PAGE";
var NEXT_PAGE = "NEXT_PAGE";
var ELLIPSIS = "ELLIPSIS";
function generateNavigationOptions({ totalItems, pageSize, currentPage, limit = null, showStepOptions = false }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const limitThreshold = getLimitThreshold({ limit });
  const limited = limit && totalPages > limitThreshold;
  let options2 = limited ? generateLimitedOptions({ totalPages, limit, currentPage }) : generateUnlimitedOptions({ totalPages });
  return showStepOptions ? addStepOptions({ options: options2, currentPage, totalPages }) : options2;
}
function generateUnlimitedOptions({ totalPages }) {
  return new Array(totalPages).fill(null).map((value, index2) => ({
    type: "number",
    value: index2 + 1
  }));
}
function generateLimitedOptions({ totalPages, limit, currentPage }) {
  const boundarySize = limit * 2 + 2;
  const firstBoundary = 1 + boundarySize;
  const lastBoundary = totalPages - boundarySize;
  const totalShownPages = firstBoundary + 2;
  if (currentPage <= firstBoundary - limit) {
    return Array(totalShownPages).fill(null).map((value, index2) => {
      if (index2 === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index2 === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: firstBoundary + 1
        };
      }
      return {
        type: "number",
        value: index2 + 1
      };
    });
  } else if (currentPage >= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index2) => {
      if (index2 === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index2 === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: lastBoundary - 1
        };
      }
      return {
        type: "number",
        value: lastBoundary + index2 - 2
      };
    });
  } else if (currentPage >= firstBoundary - limit && currentPage <= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index2) => {
      if (index2 === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index2 === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage - limit + (index2 - 2)
        };
      } else if (index2 === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index2 === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage + limit + 1
        };
      }
      return {
        type: "number",
        value: currentPage - limit + (index2 - 2)
      };
    });
  }
}
function addStepOptions({ options: options2, currentPage, totalPages }) {
  return [
    {
      type: "symbol",
      symbol: PREVIOUS_PAGE,
      value: currentPage <= 1 ? 1 : currentPage - 1
    },
    ...options2,
    {
      type: "symbol",
      symbol: NEXT_PAGE,
      value: currentPage >= totalPages ? totalPages : currentPage + 1
    }
  ];
}
function getLimitThreshold({ limit }) {
  const maximumUnlimitedPages = 3;
  const numberOfBoundaryPages = 2;
  return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages;
}
var PaginationNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let options2;
  let totalPages;
  createEventDispatcher();
  let { totalItems = 0 } = $$props;
  let { pageSize = 1 } = $$props;
  let { currentPage = 1 } = $$props;
  let { limit = null } = $$props;
  let { showStepOptions = false } = $$props;
  if ($$props.totalItems === void 0 && $$bindings.totalItems && totalItems !== void 0)
    $$bindings.totalItems(totalItems);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0)
    $$bindings.pageSize(pageSize);
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0)
    $$bindings.limit(limit);
  if ($$props.showStepOptions === void 0 && $$bindings.showStepOptions && showStepOptions !== void 0)
    $$bindings.showStepOptions(showStepOptions);
  options2 = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions
  });
  totalPages = Math.ceil(totalItems / pageSize);
  return `<div class="${"pagination-nav"}">${each(options2, (option) => {
    return `<span class="${[
      "option",
      (option.type === "number" ? "number" : "") + " " + (option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? "prev" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE ? "next" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : "") + " " + (option.type === "symbol" && option.symbol === ELLIPSIS ? "ellipsis" : "") + " " + (option.type === "number" && option.value === currentPage ? "active" : "")
    ].join(" ").trim()}">${option.type === "number" ? `${slots.number ? slots.number({ value: option.value }) : `
          <span>${escape(option.value)}</span>
        `}` : `${option.type === "symbol" && option.symbol === ELLIPSIS ? `${slots.ellipsis ? slots.ellipsis({}) : `
          <span>...</span>
        `}` : `${option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? `${slots.prev ? slots.prev({}) : `
          <svg style="${"width:24px;height:24px"}" viewBox="${"0 0 24 24"}"><path fill="${"#000000"}" d="${"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"}"></path></svg>
        `}` : `${option.type === "symbol" && option.symbol === NEXT_PAGE ? `${slots.next ? slots.next({}) : `
          <svg style="${"width:24px;height:24px"}" viewBox="${"0 0 24 24"}"><path fill="${"#000000"}" d="${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}"></path></svg>
        `}` : ``}`}`}`}
    </span>`;
  })}</div>`;
});
var Research = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout = "research" } = $$props;
  let { title: title2 = "Research" } = $$props;
  let { description: description2 = "Research Projects from the Intelligent Instruments Lab." } = $$props;
  let { projects } = $$props;
  set_store_value(seo, $seo.title = title2, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/research", $seo);
  let items = projects;
  const methods = {
    authorString: (authors) => {
      if (authors.length === 1)
        return authors[0];
      else if (authors.length === 2)
        return authors[0] + " and " + authors[1];
      else {
        let s2 = "";
        for (var i = 0; i < authors.length; i++) {
          if (i < authors.length - 2)
            s2 = s2 + authors[i] + ", ";
          else
            s2 = s2 + " and " + authors[i];
        }
        return s2;
      }
    }
  };
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  featured = {
    size: 100,
    page: 1,
    items
  };
  all = { size: 4, page: 1, items };
  featuredPaginated = paginate({
    items: featured.items,
    pageSize: featured.size,
    currentPage: featured.page
  });
  paginate({
    items: all.items,
    pageSize: all.size,
    currentPage: all.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-6 sm:p-12 md:p-14 max-w-5xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find our research projects.</p></div>
        <div class="${"mt-2 sm:p-2"}">
          <div class="${"grid grid-flow-row grid-cols-1 md:grid-cols-2"}">${each(featuredPaginated, ({ metadata: { title: title3, date, description: description3, authors, highlight_image, highlight_caption }, path }) => {
    return `
              <div class="${"border-primary-100 hover:border-white shadow-sm hover:shadow-md rounded-sm w-64 sm:w-72 lg:w-96 h-64 sm:h-72 lg:h-96 mb-8 sm:mb-12 lg:mb-16"}"><div class="${"bg-primary-100"}"><a sveltekit:prefetch${add_attribute("href", "research/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"bg-cover bg-no-repeat bg-center h-64 sm:h-72 lg:h-96 flex flex-wrap content-end"}"${add_attribute("style", "background-image: url(images/" + highlight_image + ");", 0)}><div class="${"px-4 py-4 w-64 sm:w-72 lg:w-96 grid grid-rows-1 pb-8 bg-primary-900 bg-opacity-75 hover:bg-primary-800 hover:bg-opacity-50 "}"><div><h2 class="${"text-2xl mt-2 text-white"}">${escape(title3)}</h2>
                          <div class="${"text-sm font-hauser text-white uppercase mt-4"}">${escape(methods.authorString(authors))}</div>
                          <p class="${"text-sm mt-2 text-white"}">${escape(description3)}</p></div>
                        
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${featured.items.length > featured.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: featured.items.length,
    pageSize: featured.size,
    currentPage: featured.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        </article></main></div>`}`;
});
async function load$4({ fetch: fetch2 }) {
  const res = await fetch2(`/research/projects.json`);
  const projects = await res.json();
  return { props: { projects } };
}
var Research_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { projects } = $$props;
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  return `${validate_component(Research, "Research").$$render($$result, { projects }, {}, {})}`;
});
var index$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Research_1,
  load: load$4
});
var CaptionedImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { caption } = $$props;
  let { alt } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  return `<div class="${"py-2 my-4"}"><img class="${"max-h-96 object-cover object-center"}"${add_attribute("src", "/images/" + src2, 0)}${add_attribute("alt", alt, 0)}>
  <p class="${"text-primary-800 mt-2 text-sm"}">${escape(caption)}</p></div>`;
});
var ResearchProject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { layout } = $$props;
  let { date } = $$props;
  let { authors } = $$props;
  let { highlight_image } = $$props;
  let { highlight_caption } = $$props;
  set_store_value(seo, $seo.title = title2, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/research", $seo);
  const methods = {
    authorString: (authors2) => {
      if (authors2.length === 1)
        return authors2[0];
      else if (authors2.length === 2)
        return authors2[0] + " and " + authors2[1];
      else {
        let s2 = "";
        for (var i = 0; i < authors2.length; i++) {
          if (i < authors2.length - 2)
            s2 = s2 + authors2[i] + ", ";
          else
            s2 = s2 + " and " + authors2[i];
        }
        return s2;
      }
    }
  };
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.authors === void 0 && $$bindings.authors && authors !== void 0)
    $$bindings.authors(authors);
  if ($$props.highlight_image === void 0 && $$bindings.highlight_image && highlight_image !== void 0)
    $$bindings.highlight_image(highlight_image);
  if ($$props.highlight_caption === void 0 && $$bindings.highlight_caption && highlight_caption !== void 0)
    $$bindings.highlight_caption(highlight_caption);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${escape("<-")} Back to Research</a></div>
    <div class="${"px-4 md:px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title2)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 text-primary-700"}">${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
    src: highlight_image,
    alt: highlight_caption,
    caption: highlight_caption
  }, {}, {})}
        <div class="${"font-hauser uppercase"}"><div class="${"text-md sm:text-lg md:text-xl"}">${escape(description2)}<br></div>
          <div class="${"text-sm sm:text-md md:text-lg mt-2"}">By ${escape(methods.authorString(authors))}</div></div></div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${escape("<-")} Back to Research</a></div></div>`}`;
});
var metadata$11 = {
  "layout": "researchproject",
  "title": "Halldorophone",
  "description": "The Halldorophone is a musical instrument.",
  "featured": true,
  "authors": ["Halldor \xDAlfarsson"],
  "highlight_image": "research/projects/halldorophone.jpg",
  "highlight_caption": "The Halldorophone by Halldor \xDAlfarsson."
};
var Halldorophone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$11), {}, {
    default: () => {
      return `<p>The halldorophone (Icelandic: d\xF3r\xF3f\xF3nn) is a cello-like electronic instrument created by artist and designer Halld\xF3r \xDAlfarsson.
The halldorophone is designed specifically to feedback the strings and the instrument gained some recognition in early 2020 when composer Hildur Gu\xF0nad\xF3ttir won the Academy Award for her original soundtrack to the movie Joker, some of which was composed with a halldorophone.</p>`;
    }
  })}`;
});
var halldorophone = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Halldorophone,
  metadata: metadata$11
});
var metadata$10 = {
  "layout": "researchproject",
  "title": "Living Looper",
  "description": "The musical looper as a network of intelligent processes.",
  "featured": true,
  "authors": ["Victor Shepardson"],
  "highlight_image": "research/projects/supercollider.png",
  "highlight_caption": "Living Looper by Victor Shepardson."
};
var Livinglooper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$10), {}, {
    default: () => {
      return `<p>A looper records a short segment of audio and plays it back in a loop. This can be used to set up a background drone or texture, or allow one musician to perform multiple parts. A multi-channel looper can hold the layers of a rich texture or a complex composition.</p>
<p>An intelligent looper might do more than repeat verbatim. It might loop without disruption at the loop boundary, or continue as a never-precisely-repeating texture, or as what might have sounded next. It might control itself, unburdening but surprising the musician. Multiple loops might become sensitive to one another, entraining rhythmically or modulating timbres. One loop might reference to the events of an another loop as well as its own memory when it decides how to continue. The looper would be elevated from an effect or tool to an intelligent instrument in itself. The musician would not direct the looper to achieve a particular effect, but listen to it, garden it, negotiate with it. </p>
<p>My project, the \u201Cliving looper\u201D, will explore these ideas. Performing with a looper involves carefully choosing the sounds in a loop and aligning loops precisely. With the living looper, instead the processes and interconnections between loops will be carefully assembled into a performance. Within the IIL, the living looper will be a point of convergence for machine listening, generative models, instruments and musicians. It will compose with our other instruments, and its intelligent modules will find other lives in other instruments.</p>`;
    }
  })}`;
});
var livinglooper = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Livinglooper,
  metadata: metadata$10
});
var metadata$$ = {
  "layout": "researchproject",
  "title": "Threnoscope",
  "description": "The Threnoscope is a live coding environment for long durations.",
  "featured": true,
  "authors": ["Thor Magnusson"],
  "highlight_image": "research/projects/threnoscope.png",
  "highlight_caption": "The Threnoscope by Thor Magnusson."
};
var Threnoscope = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$$), {}, {
    default: () => {
      return `<p>The <a href="${"https://thormagnusson.github.io/threnoscope/"}" title="${"Threnoscope"}">Threnoscope</a> is a live coding system focusing on three key areas of music: spatial sound, timbre and texture, and tunings and scales. It has affordances that result in long durational notes that can move around in space, change timbre (through filtering, resonance frequencies and waveforms) and pitch according to implementation of numerous tunings and scales.</p>
<p>The Threnoscope was intitially intended to be a musical piece, but became an expressive system, an investigation into spatial sound, wave interferences and the relationship of harmonic ratios and tuning systems from the world\u2019s various musical systems.</p>
<p>Implementing the Scala tuning library standard, the Thrensocope has access over 5000 tuning systems and scales, and it contains an application for creating your own microtonal tunings and scales.</p>`;
    }
  })}`;
});
var threnoscope = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Threnoscope,
  metadata: metadata$$
});
var metadata$_ = {
  "layout": "researchproject",
  "title": "Stenophone",
  "description": "The Stenophone is a musical instrument for live coding.",
  "featured": true,
  "authors": ["Jack Armitage"],
  "highlight_image": "research/projects/stenophone.jpg",
  "highlight_caption": "The Stenophone by Jack Armitage."
};
var Stenophone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$_), {}, {
    default: () => {
      return `<p>The <a href="${"https://github.com/jarmitage/Stenophone"}" target="${"_blank"}" title="${"Stenophone"}">Stenophone</a> is a musical instrument combining stenotype and live coding.</p>
<p>Though laptop live coders are known to use other devices and instruments and play with other musicians, laptop live coding generally shares the common physical interface of the QWERTY keyboard. This project seeks to provide a means to explore alternatives to the QWERTY keyboard as a physical interface to laptop live coding. This project proposes a live coding keyboard which is also a digital musical instrument, called the Stenophone. </p>
<p>The Stenophone is an augmented stenotype or chorded keyboard, which permits continuous gestural control of keys and features an ergonomic design. These capabilities are exploited to enable the manipulation of algorithms and their parameterisation simultaneously.</p>`;
    }
  })}`;
});
var stenophone = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Stenophone,
  metadata: metadata$_
});
var metadata$Z = {
  "layout": "researchproject",
  "title": "Proto-Langspil",
  "description": "The Proto-Langspil is a feedback instrument with intelligent behaviour.",
  "featured": true,
  "authors": ["Thor Magnusson", "Jack Armitage", "Halldor Ulfarsson", "Victor Shepardson"],
  "highlight_image": "research/projects/protolangspil.jpg",
  "highlight_caption": "The ii lab Proto-Langspil"
};
var Langspil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$Z), {}, {
    default: () => {
      return `<p>The Proto-Langspil is our first prototype instrument, made in the first week of the lab, made out of plywood, cut out in the lasercutter in the LHI lab downstairs. We experimented with some versions and are in collaboration with performers who are interested in working with the instrument.</p>
<p>The Langspil is a traditional Icelandic instrument with an interesting, albeit vague history. We are interested in exploring the cultural connotations of the instrument, studying the cultural reception of it as it becomes used and played as part of musical practice. It also extends the millennia old practice - perhaps first documented in the work of Greek philosopher Pythagoras - of using a monochord to study acoustics and music theory.</p>
<p>The Proto-Langspil is an ongoing work in progress where we implement various types of adaptive behaviour in the instrument, ranging from feedback to user gestures, and where we investigate how performers interact with the instrument. A simple object that has triggered a lot of interesting conversations and ideas!</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "research/projects/protolangspil2.jpg",
        alt: "An image of the proto-langspil with the electronics drawer removed.",
        caption: "The proto-langspil."
      }, {}, {})}`;
    }
  })}`;
});
var langspil = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Langspil,
  metadata: metadata$Z
});
var OpenLab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let future;
  let past;
  let futurePaginated;
  let pastPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout = "openlab" } = $$props;
  let { title: title2 = "Open Lab" } = $$props;
  let { description: description2 = "The Intelligent Instruments Lab opens its doors on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits." } = $$props;
  let { openlabs } = $$props;
  set_store_value(seo, $seo.title = title2, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/openlab", $seo);
  let items = openlabs;
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
  const methods = {
    dayMonth: (d) => {
      d = new Date(d);
      const options2 = { month: "short", day: "numeric" };
      return d.toLocaleDateString("en-US", options2);
    },
    dateString: (d) => {
      return new Date(d).toDateString().slice(-11);
    }
  };
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.openlabs === void 0 && $$bindings.openlabs && openlabs !== void 0)
    $$bindings.openlabs(openlabs);
  future = {
    size: 100,
    page: 1,
    items: items.filter((i) => new Date(i.metadata.date) > new Date()).sort((fst, snd) => fst.metadata.edition - snd.metadata.edition)
  };
  past = {
    size: 4,
    page: 1,
    items: items.filter((i) => new Date(i.metadata.date) < new Date()).sort((fst, snd) => fst.metadata.edition - snd.metadata.edition).reverse()
  };
  futurePaginated = paginate({
    items: future.items,
    pageSize: future.size,
    currentPage: future.page
  });
  pastPaginated = paginate({
    items: past.items,
    pageSize: past.size,
    currentPage: past.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}">
          <p>Communicating and discussing our research is part of our research methodology. We are interested in a continuous informal conversation with people, in terms of ad-hoc visits to the lab that can result in conversations that become the seeds of new developments. For this reason, we open the doors to our lab on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits.</p>
          
          <p>We run a <a href="${"https://discord.gg/Z5HZ5quk"}">public channel</a> on Discord for questions and conversation. There you can find an <a href="${"https://discord.gg/UTFPmHgA"}">Open Lab</a> channel where we announce what is happening and perhaps continue the discussion.</p> 

          <p>Our lab is located in \xDEverholt 11 on the 4th floor. Please pop by at <b>3pm on Fridays</b>. We look forward to seeing you.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Upcoming</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(futurePaginated, ({ metadata: { edition, theme, date, description: description3, tags }, path }) => {
    return `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(theme)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description3)}</p></div>
                      <div class="${"self-end grid grid-cols-2 text-primary-500"}"><div class="${"text-sm font-hauser uppercase"}">Open Lab ${escape(edition)}</div>
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.dayMonth(date))}</div>
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${future.items.length > future.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: future.items.length,
    pageSize: future.size,
    currentPage: future.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        <div class="${"mt-4 sm:px-2 py-2 mb-12"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Past</h2>
          <hr class="${"border-primary-500 border-dashed border-1"}">
          <div class="${"article-list"}">${each(pastPaginated, ({ metadata: { edition, theme, date, description: description3, tags }, path }) => {
    return `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${escape(theme)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description3)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>Open Lab ${escape(edition)}</div>
                      <div>${escape(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`;
  })}</div>
          <div class="${"mx-auto"}">${past.items.length > past.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: past.items.length,
    pageSize: past.size,
    currentPage: past.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load$3({ fetch: fetch2 }) {
  const res = await fetch2(`/openlab/openlabs.json`);
  const openlabs = await res.json();
  return { props: { openlabs } };
}
var Openlab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { openlabs } = $$props;
  if ($$props.openlabs === void 0 && $$bindings.openlabs && openlabs !== void 0)
    $$bindings.openlabs(openlabs);
  return `${validate_component(OpenLab, "OpenLab").$$render($$result, { openlabs }, {}, {})}`;
});
var index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Openlab,
  load: load$3
});
var OpenLabEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { edition } = $$props;
  let { theme } = $$props;
  let { description: description2 } = $$props;
  let { layout } = $$props;
  let { date } = $$props;
  set_store_value(seo, $seo.title = theme, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/openlab", $seo);
  if ($$props.edition === void 0 && $$bindings.edition && edition !== void 0)
    $$bindings.edition(edition);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/openlab"}">${escape("<-")} Back to Open Labs</a></div>
    
    <div class="${"px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(theme)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-sm sm:text-md text-primary-700 "}">Open Lab ${escape(edition)}, ${escape(new Date(date).toDateString())}</div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/openlab"}">${escape("<-")} Back to Open Labs</a></div></div>`}`;
});
var metadata$Y = {
  "layout": "openlab",
  "edition": 10,
  "theme": "Genki Wave Ring and Hjalti",
  "description": "Genki and Hjalti Nor\xF0dal",
  "date": "2021-11-12"
};
var _10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$Y), {}, {
    default: () => {
      return `<p>In this lab Genki paid us a visit with a great demo of their technologies, and Hjalti showed us his three person sax.</p>`;
    }
  })}`;
});
var _10$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _10,
  metadata: metadata$Y
});
var metadata$X = {
  "layout": "openlab",
  "edition": 11,
  "theme": "Creative AI discussion",
  "description": "An open session discussing creative AI",
  "date": "2021-11-19"
};
var _11 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$X), {}, {
    default: () => {
      return `<p>In this lab we discussed the theories of Maggie Boden, looked at some works and had a generally good time.</p>`;
    }
  })}`;
});
var _11$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _11,
  metadata: metadata$X
});
var metadata$W = {
  "layout": "openlab",
  "edition": 12,
  "theme": "Gar\xF0ar Eyj\xF3lfsson and furniture music",
  "description": "Gar\xF0ar and social robots and we will explore our string furniture",
  "date": "2021-11-26"
};
var _12 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$W), {}, {
    default: () => {
      return `<p>In this lab Gar\xF0ar Eyj\xF3lfsson presented his social robots. We also presented and discussed our new furniture that can be turned into string instruments. A nice brain storm with our friendly visitors.</p>`;
    }
  })}`;
});
var _12$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _12,
  metadata: metadata$W
});
var metadata$V = {
  "layout": "openlab",
  "edition": 13,
  "theme": "Proto-Langspil Pilot Study 1",
  "description": "Soliciting feedback about the Proto-Langspil",
  "date": "2021-12-03"
};
var _13 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$V), {}, {
    default: () => {
      return `<p>Call for study participants during Open Lab tomorrow (Dec 3rd) 15:00-17:00.</p>
<ul><li>Spend time with the Proto-Langspil and answer a brief survey</li>
<li>4x 30 minute slots available between 15:00-17:00</li>
<li>Do not attend if you have had COVID symptoms in the past 2 weeks</li></ul>
<p>To book a session, contact <a href="${"mailto:jack@lhi.is"}">jack@lhi.is</a>.</p>`;
    }
  })}`;
});
var _13$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _13,
  metadata: metadata$V
});
var metadata$U = {
  "layout": "openlab",
  "edition": 14,
  "theme": "Moving Strings reflections",
  "description": "Open discussion and feedback about this week's events",
  "date": "2021-12-10"
};
var _14 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$U), {}, {
    default: () => {
      return `<p>This week we will discuss Moving Strings: <a href="${"https://iil.is/events/moving-strings"}" rel="${"nofollow"}">https://iil.is/events/moving-strings</a></p>
<p>Followed by a Magnetic Resonator Piano workshop in Skipholt.</p>`;
    }
  })}`;
});
var _14$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _14,
  metadata: metadata$U
});
var metadata$T = {
  "layout": "openlab",
  "edition": 15,
  "theme": "Halldorophone and Linnstrument",
  "description": "Open discussion about the Halldorophone and the Linnstrument",
  "date": "2021-12-17"
};
var _15 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$T), {}, {
    default: () => {
      return `<p>In this open lab, Halldor received guests and discussed the Halldorophone and Linnstrument developments. The rest of the team were en route to the US and in writing residencies. </p>`;
    }
  })}`;
});
var _15$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _15,
  metadata: metadata$T
});
var metadata$S = {
  "layout": "openlab",
  "edition": 16,
  "theme": "New year and new instruments",
  "description": "Discussion about future developments at the ii lab",
  "date": "2022-01-07"
};
var _16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$S), {}, {
    default: () => {
      return `<p>In this open lab we welcome people to discuss the work we will be doing in 2022, seeking input and conversation with people and brainstorming future developments.</p>`;
    }
  })}`;
});
var _16$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _16,
  metadata: metadata$S
});
var metadata$R = {
  "layout": "openlab",
  "edition": 17,
  "theme": "Omicron",
  "description": "The open lab is a closed lab this week",
  "date": "2022-01-14"
};
var _17 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$R), {}, {
    default: () => {
      return `<p>Unfortunately, because of the rise of the Covid Omicron variant in Iceland we are not running an open lab this week. Looking forward to start again soon. </p>
<p>If anyone wants to make an appointment with us on an individual basis on anything, please reach out to us. You might want to look into some of our instruments or you have your own idea.</p>`;
    }
  })}`;
});
var _17$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _17,
  metadata: metadata$R
});
var metadata$Q = {
  "layout": "openlab",
  "edition": 18,
  "theme": "Library of Technical Elements",
  "description": "We are planning a collection of parts for fast instrument prototyping",
  "date": "2022-04-22"
};
var _18 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$Q), {}, {
    default: () => {
      return `<p>Open lab is on for this coming Friday at 15.00. We are having a conversation with friends and collaborators about projects in the same vain as our Library of Technical Elements, a collection of ready-off-shelf, plug-and-play sensors and actuators we are starting to develop. These are intended to have at hand in the lab for fast, physical instrument experimentation and will eventually also include AI and ML tools for integrated systems.</p>
<p>Coffee will be hot, all are welcome.</p>`;
    }
  })}`;
});
var _18$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _18,
  metadata: metadata$Q
});
var metadata$P = {
  "layout": "openlab",
  "edition": 19,
  "theme": "Steve Symons presents his work.",
  "description": "Sound sculptures and art in the field of creative technology.",
  "date": "2022-05-13"
};
var _19 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$P), {}, {
    default: () => {
      return `<p>Steve Symons is a <a href="${"https://iil.is/news/steve-residency"}">current researcher in residence</a> at the lab and will be presenting his work at Open Lab this week.</p>`;
    }
  })}`;
});
var _19$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _19,
  metadata: metadata$P
});
var metadata$O = {
  "layout": "openlab",
  "edition": 20,
  "theme": "Living Algorithm x Raflost.",
  "description": "Outcomes of the first IIL 2022 concert series workshops.",
  "date": "2022-05-20"
};
var _20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$O), {}, {
    default: () => {
      return `<p>In this Open Lab, participants of the <a href="${"https://iil.is/news/living-algorithms"}">Living Algorithms</a> will reflect on their experiences of learning live coding, and we will have the organisers of Raflost festival visiting.</p>`;
    }
  })}`;
});
var _20$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _20,
  metadata: metadata$O
});
var metadata$N = {
  "layout": "openlab",
  "edition": 21,
  "theme": "Synth.is presentation",
  "description": "Bj\xF6rn \xDE\xF3r J\xF3nsson will present upcoming research.",
  "date": "2022-07-22"
};
var _21 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$N), {}, {
    default: () => {
      return `<p>In this Open Lab, Bj\xF6rn \xDE\xF3r J\xF3nsson will present his <a href="${"https://www.synth.is"}">Synth.is</a> project and the upcoming research he is about to conduct at the <a href="${"https://www.uio.no/ritmo/english/"}">RITMO Centre</a> in Oslo.</p>
<p>Bj\xF6rn has sent us this description:</p>
<p>New sounds can be discovered at <a href="${"https://www.synth.is"}">synth.is</a> by evolving populations of pattern producing neural networks (CPPNs) and combining their outputs with audio signal patches, either interactively or automatically.  The sounds discovered by this sound innovation engine can be used in electronic music, gaming experiences or other types of sound design.  Combining computational resources and curation skills to navigate the space of possible sounds, miners can publish their genes to be rendered to a phenotype in the form of sample based instruments.  Sounds can also be interacted with directly by using the embedded live coding support at <a href="${"https://www.synth.is"}">synth.is</a>.</p>`;
    }
  })}`;
});
var _21$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _21,
  metadata: metadata$N
});
var metadata$M = {
  "layout": "openlab",
  "edition": 1,
  "theme": "The Thranophone",
  "description": "\xDEr\xE1inn Hj\xE1lmarsson and Ingi Gar\xF0ar present the Thranophone.",
  "date": "2021-09-10"
};
var _1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$M), {}, {
    default: () => {
      return `<p>In our first open lab we had a visit from long time collaborators, \xDEr\xE1inn Hj\xE1lmarsson and Ingi Gar\xF0ar Erlendsson. They presented the Thranophone, a feedback tuba instrument. We got a performance by Ingi Gar\xF0ar leading to an interesting discussion. We also had a presentation by Hjalti, discussing his new metal collaborative sax sculpture/instrument. More about that later.</p>
<p>There is further info on Thranophones <a href="${"http://thrainnhjalmarsson.info/thranophones"}" rel="${"nofollow"}">here</a>.
A performance with Eirikur Orri at <a href="${"http://www.liveinterfaces.org/2016"}" rel="${"nofollow"}">2016 Live Interfaces</a> can be seen <a href="${"https://youtu.be/l5vDKEZsJjY?t=718"}" rel="${"nofollow"}">here</a>.</p>`;
    }
  })}`;
});
var _1$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _1,
  metadata: metadata$M
});
var metadata$L = {
  "layout": "openlab",
  "edition": 2,
  "theme": "Feedback Musicianship",
  "description": "Macine Learning and Feedback Musicianship Network live stream.",
  "date": "2021-09-17"
};
var _2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$L), {}, {
    default: () => {
      return `<p>In this session our own Victor Shepardson gave an introduction to techniques in machine learning in the are of music. We then participated in a streamed session organised by the <a href="${"https://feedback-musicianship.pubpub.org"}" rel="${"nofollow"}">Feedback Musicianship Network</a>.</p>
<p>Here is a recording of a live performance by <a href="${"https://feedback-musicianship.pubpub.org/pub/events/release/17"}" rel="${"nofollow"}">\xD8yvind Brandtsegg</a>.</p>`;
    }
  })}`;
});
var _2$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2,
  metadata: metadata$L
});
var metadata$K = {
  "layout": "openlab",
  "edition": 3,
  "theme": "Acoustic and Sonic Heritages",
  "description": "Barcelona Patrimoni Acoustic collective and Ragnar \xC1rni \xD3lafsson.",
  "date": "2021-09-24"
};
var _3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$K), {}, {
    default: () => {
      return `<p>We had a visit from the Barcelona Patrimoni Acoustic collective. They presented their interesting work. After that Ragnar Arni presented his machine learning work with Jennifer Walshe on her text scores.</p>
<p>Info:</p>
<p><a href="${"http://patrimoniacustic.cat"}" rel="${"nofollow"}">Patrimoni Acustic</a>
<a href="${"https://www.rncm.ac.uk/research/research-centres-rncm/prism/prism-blog/ai-text-scores/"}" rel="${"nofollow"}">Walshe\u2019s text scores</a></p>`;
    }
  })}`;
});
var _3$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _3,
  metadata: metadata$K
});
var metadata$J = {
  "layout": "openlab",
  "edition": 4,
  "theme": "Digital Control of Church Organs",
  "description": "\xC1ki \xC1sgeirsson presents on MIDI control of church organs.",
  "date": "2021-10-01"
};
var _4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$J), {}, {
    default: () => {
      return `<p>In this lab \xC1ki \xC1sgeirsson presented his work with church organs in both Hallgrimskirkja and Frikirkjan. How the MIDI protocol has been implemented in these old style instruments. </p>
<p>Aki\u2019s <a href="${"http://www.aki.is"}" rel="${"nofollow"}">website</a></p>`;
    }
  })}`;
});
var _4$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _4,
  metadata: metadata$J
});
var metadata$I = {
  "layout": "openlab",
  "edition": 5,
  "theme": "The gonzo guide to loudspeaker systems",
  "description": "Josh Wilkinson and Sean Patrick O'Brien talk speaker building.",
  "date": "2021-10-08"
};
var _5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$I), {}, {
    default: () => {
      return `<p>In this open lab we had two presentations by people building loudspeakers. </p>
<a href="${"http://joshuawilkinsonsd.com/"}" target="${"_blank"}">Josh Wilkinson</a> offered his &quot;gonzo guide&quot; to building efficient and portable sound systems ready for festivals in the middle of the desert.
<br>
<a href="${"http://instagram.com/foreverywhere"}" target="${"_blank"}">Sean Patrick O&#39;Brien</a> discussed experiments with building speakers in various sizes and materials.
<p>Josh and Sean also collaborated on building the sound system for <a href="${"https://www.facebook.com/the.post.house.venue/"}" target="${"_blank"}">P\xF3st-H\xFAsi\xF0</a>.</p>
<br>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/openlab_5_roundtable.jpeg",
        alt: "People sitting around a table. Young man holding a metalic prototype of an instrument. Linnstrument, computers, pedal, coffee mug and monochord prototype are among the things on the table.",
        caption: "Jack trying out a prototype by Hjalti Nordal Gunnarsson, a student of LH\xCD. Photo by Esther."
      }, {}, {})}`;
    }
  })}`;
});
var _5$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _5,
  metadata: metadata$I
});
var metadata$H = {
  "layout": "openlab",
  "edition": 6,
  "theme": "Electric Langspil and Sea weed instrument",
  "description": "Linus Orri and Design students presenting their new instruments.",
  "date": "2021-10-15"
};
var _6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$H), {}, {
    default: () => {
      return `<p>Folk music expert, Linus Orri presented his electric Langspil and LHI product design students, Arngr\xEDmur Gu\xF0mundsson, Birna S\xEDs\xED J\xF3hannsd\xF3ttir og J\xF3n S\xF6lvi Walderhaug Eir\xEDksson demonstrating their new instrument based on 3D scanning sea weed.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6a.jpg",
        alt: "A picture of Linus Orri talking about his electric langspil. The instrument is in front of him on the table.",
        caption: "Linus Orri talking about his electric langspil. Photo by Thor."
      }, {}, {})}
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6b.jpg",
        alt: "A picture of the langspil. A wooden block with three strings, a jack and two knobs.",
        caption: "The electric langspil. Photo by Thor."
      }, {}, {})}
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6c.jpg",
        alt: "A group of people discussing the instrument.",
        caption: "A group of people discussing the instrument. Photo by Thor."
      }, {}, {})}`;
    }
  })}`;
});
var _6$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _6,
  metadata: metadata$H
});
var metadata$G = {
  "layout": "openlab",
  "edition": 7,
  "theme": "Halla Steinunn and David Brynjar Franzson",
  "description": "Halla Steinunn presents her collaboration with David Brynjar Franzson`.",
  "date": "2021-10-22"
};
var _7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$G), {}, {
    default: () => {
      return `<p>Halla Steinunn presents her collaboration with David Brynjar Franzson. </p>
<p>Websites:</p>
<p><a href="${"https://www.hallasteinunn.com"}" rel="${"nofollow"}">Halla Steinunn</a></p>
<p><a href="${"http://franzson.com"}" rel="${"nofollow"}">David Brynjar</a></p>`;
    }
  })}`;
});
var _7$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _7,
  metadata: metadata$G
});
var metadata$F = {
  "layout": "openlab",
  "edition": 8,
  "theme": "Jack Armitage with coffee",
  "description": "Jack",
  "date": "2021-10-29"
};
var _8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$F), {}, {
    default: () => {
      return `<p>Jack discussing current work, his research, stuff and making coffee.</p>`;
    }
  })}`;
});
var _8$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _8,
  metadata: metadata$F
});
var metadata$E = {
  "layout": "openlab",
  "edition": 9,
  "theme": "Screen harp and hyper sax",
  "description": "Tom Manoury and \xC1ki \xC1sgeirsson",
  "date": "2021-11-05"
};
var _9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$E), {}, {
    default: () => {
      return `<p>In this open lab we will have Tom Manoury demonstrating his hyper sax and creative AI application and \xC1ki \xC1sgeirsson will bring his screen harp for discussion.</p>`;
    }
  })}`;
});
var _9$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _9,
  metadata: metadata$E
});
var Publication = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pub } = $$props;
  const field = (f) => bibtex.normalizeFieldValue(pub.getField(f));
  if ($$props.pub === void 0 && $$bindings.pub && pub !== void 0)
    $$bindings.pub(pub);
  return `<div><p>${pub.type === "inproceedings" ? `${escape(field("AUTHOR"))}. 
      <i>${escape(field("TITLE"))}.</i> 
      ${escape(field("BOOKTITLE"))}. 
      ${escape(field("YEAR"))}.` : `${pub.type === "article" ? `${escape(field("AUTHOR"))}. 
      <i>${escape(field("TITLE"))}.</i> 
      ${escape(field("JOURNAL"))}. 
      ${escape(field("YEAR"))}.` : `${pub.type === "book" ? `${escape(field("AUTHOR"))}. 
      <i>${escape(field("TITLE"))}.</i>
      ${escape(field("YEAR"))}.` : ``}`}`}</p></div>`;
});
var title$2 = "Outputs";
var description$2 = "This page contains outputs from the Intelligent Instruments Lab.";
var Outputs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout } = $$props;
  let { publications } = $$props;
  const bib = Object.values(bibtex.parseBibFile(publications).entries$);
  set_store_value(seo, $seo.title = title$2, $seo);
  set_store_value(seo, $seo.description = description$2, $seo);
  set_store_value(seo, $seo.url = "/outputs", $seo);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$$result.head += `${$$result.title = `<title>${escape(title$2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description$2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title$2)}</h1>
      <div class="${"p-2 sm:p-4"}"><p>${escape(description$2)}</p>
        
        <div class="${"h-6"}"></div>
        <h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-4"}">Publications
        </h2>
        ${each(bib, (entry) => {
    return `${validate_component(Publication, "Publication").$$render($$result, { pub: entry }, {}, {})}`;
  })}</div></div></div>`}`;
});
async function load$2({ fetch: fetch2 }) {
  const res = await fetch2(`/publications.bib`);
  const publications = await res.text();
  return { props: { publications } };
}
var Outputs_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { publications } = $$props;
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  return `${validate_component(Outputs, "Outputs").$$render($$result, { publications }, {}, {})}`;
});
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Outputs_1,
  load: load$2
});
var Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title: title2 } = $$props;
  let { details } = $$props;
  let { description: description2 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  return `<section><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title2)}</h1>
  <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-md sm:text-lg text-primary-700 "}">${escape(details)}<br></div>
  <div class="${"p-2 sm:p-4"}"><p>${escape(description2)}</p></div>
  ${slots.default ? slots.default({}) : ``}</section>`;
});
var Photo$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"hidden lg:block flex-none self-center sm:w-72 sm:h-72 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src2, 0)}${add_attribute("alt", name, 0)}></div>`;
});
var Thumbnail$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"lg:hidden self-start w-32 h-32 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src2, 0)}${add_attribute("alt", name, 0)}></div>`;
});
var Link$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `

<div class="${"border-dashed border-primary-700 border-2 rounded-lg"}"><a class="${"h-9 flex items-center justify-center bg-primary-700 p-3 text-white"}"${add_attribute("href", url, 0)} target="${"_blank"}">${escape(label)}</a></div>`;
});
var Links$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-2 mt-4 "}">${links.event ? `${validate_component(Link$1, "Link").$$render($$result, { url: links.event, label: "Event Page" }, {}, {})}` : ``}
  ${links.signup ? `${validate_component(Link$1, "Link").$$render($$result, { url: links.signup, label: "Sign-up Form" }, {}, {})}` : ``}
  ${links.website ? `${validate_component(Link$1, "Link").$$render($$result, {
    url: "http://" + links.website,
    label: "Website"
  }, {}, {})}` : ``}
  ${links.website2 ? `${validate_component(Link$1, "Link").$$render($$result, {
    url: "http://" + links.website2,
    label: links.website2
  }, {}, {})}` : ``}
  ${links.twitter ? `${validate_component(Link$1, "Link").$$render($$result, {
    url: "https://twitter.com/" + links.twitter,
    label: "Twitter"
  }, {}, {})}` : ``}
  ${links.instagram ? `${validate_component(Link$1, "Link").$$render($$result, {
    url: "https://instagram.com/" + links.instagram,
    label: "Instagram"
  }, {}, {})}` : ``}
  ${links.github ? `${validate_component(Link$1, "Link").$$render($$result, {
    url: "https://github.com/" + links.github,
    label: "GitHub"
  }, {}, {})}` : ``}
  ${links.scholar ? `${validate_component(Link$1, "Link").$$render($$result, {
    url: "https://scholar.google.com/citations?user=" + links.scholar,
    label: "Scholar"
  }, {}, {})}` : ``}
  ${links.video ? `${validate_component(Link$1, "Link").$$render($$result, { url: links.video, label: "Video" }, {}, {})}` : ``}</div>`;
});
var Module = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  return `<div class="${"flex"}"><div class="${"flex lg:space-x-10 space-y-8"}">${validate_component(Photo$1, "Photo").$$render($$result, { src: content.image, name: content.name }, {}, {})}
    <div><div class="${"flex flex-wrap"}">${validate_component(Thumbnail$1, "Thumb").$$render($$result, { src: content.image, name: content.name }, {}, {})}
        <div class="${"flex flex-col ml-4 lg:ml-0"}"><h1 class="${"font-hauser text-secondary text-3xl mt-4"}">${escape(content.name)}</h1>
          ${content.details ? `<h3 class="${"text-primary-900 text-1xl px-2 mt-4"}">${escape(content.details)}</h3>` : ``}</div></div>
      <div class="${"px-2"}"><p class="${"mt-2 sm:mt-4 mb-6 md:max-w-xl lg:max-w-1xl "}">${escape(content.description)}</p>
        ${validate_component(Links$1, "Links").$$render($$result, { links: content.links }, {}, {})}</div></div></div></div>`;
});
var css = {
  code: ".videoWrapper.svelte-eym11.svelte-eym11{height:0;padding-bottom:56.25%;padding-top:25px;position:relative}.videoWrapper.svelte-eym11 iframe.svelte-eym11{height:100%;left:0;position:absolute;top:0;width:100%}",
  map: '{"version":3,"file":"EmbedYouTubePlaylist.svelte","sources":["EmbedYouTubePlaylist.svelte"],"sourcesContent":["<script>\\n  export let id\\n  export let scale\\n<\/script>\\n\\n<style>.videoWrapper{height:0;padding-bottom:56.25%;padding-top:25px;position:relative}.videoWrapper iframe{height:100%;left:0;position:absolute;top:0;width:100%}</style>\\n\\n<div class=\\"videoWrapper\\">\\n  <iframe\\n    width={scale ? scale * 560 : 560}\\n    height={scale ? scale * 315 : 315}\\n    src={\\"https://www.youtube.com/embed/videoseries?list=\\"+id}\\n    title=\\"YouTube video player\\"\\n    frameborder=\\"0\\"\\n    allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\" \\n    allowfullscreen/>\\n</div>\\n"],"names":[],"mappings":"AAKO,uCAAa,CAAC,OAAO,CAAC,CAAC,eAAe,MAAM,CAAC,YAAY,IAAI,CAAC,SAAS,QAAQ,CAAC,0BAAa,CAAC,mBAAM,CAAC,OAAO,IAAI,CAAC,KAAK,CAAC,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,MAAM,IAAI,CAAC"}'
};
var EmbedYouTubePlaylist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { scale } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  $$result.css.add(css);
  return `<div class="${"videoWrapper svelte-eym11"}"><iframe${add_attribute("width", scale ? scale * 560 : 560, 0)}${add_attribute("height", scale ? scale * 315 : 315, 0)}${add_attribute("src", "https://www.youtube.com/embed/videoseries?list=" + id, 0)} title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-eym11"}"></iframe></div>`;
});
var title_graphic = "/_app/assets/moving_strings-c4776730.svg";
var MovingStrings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout } = $$props;
  let { date } = $$props;
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { featured } = $$props;
  let { dates_fromto } = $$props;
  set_store_value(seo, $seo.title = title2, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/events/moving-strings", $seo);
  const methods = {
    setPresenterTimes: (p) => {
      const { starttime, presenters } = p;
      let start = methods.parseTime(starttime);
      let elapsed = 0;
      for (var i = 0; i < presenters.length; i++) {
        let p2 = presenters;
        if (i > 0) {
          p2[i].starttime = methods.addMins(start, elapsed + parseInt(p2[i - 1].duration));
          elapsed += parseInt(p2[i - 1].duration);
        } else
          p2[i].starttime = starttime;
      }
      console.log();
    },
    parseTime: (t) => {
      var d = new Date();
      var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
      d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
      d.setMinutes(parseInt(time[2]) || 0);
      return d;
    },
    addMins: (original, add) => {
      return new Date(original.getTime() + add * 6e4).toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    }
  };
  methods.setPresenterTimes(copy.symposium.programme.presentations);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.featured === void 0 && $$bindings.featured && featured !== void 0)
    $$bindings.featured(featured);
  if ($$props.dates_fromto === void 0 && $$bindings.dates_fromto && dates_fromto !== void 0)
    $$bindings.dates_fromto(dates_fromto);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `
  <div class="${"bg-primary border-dashed border-secondary border-4 pt-4 pb-4"}">
    <div id="${"top"}"><div class="${"py-8 px-4 sm:p-12 md:p-14 max-w-6xl"}"><div class="${"mb-8"}"><img class="${""}"${add_attribute("src", title_graphic, 0)} alt="${"Moving Strings"}"></div>
        <div class="${"mb-8 px-4"}"><p class="${"font-hauser uppercase text-white text-xl"}">${escape(copy.top.info.details)}</p></div>
        <div class="${"grid grid-flow-row grid-cols-1 lg:grid-cols-2 px-2 sm:px-4 mt-4 mb-4"}">${validate_component(EmbedYouTube, "YT").$$render($$result, { scale: "1", id: "B0UIsDUzrD4" }, {}, {})}</div>
        <div class="${"max-w-6xl px-4"}"><p class="${"text-lg"}">${escape(copy.top.info.tagline)}</p>
          ${each(copy.top.info.description, (d) => {
    return `<p class="${"text-md"}">${escape(d)}</p>`;
  })}</div>
        <div class="${"mt-10 mb-10 px-4"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: copy.top.buttons }, {}, {})}</div></div></div>
    
    <div id="${"symposium"}"><div class="${"px-4 sm:p-12 md:p-14 max-w-6xl"}">${validate_component(Section, "Section").$$render($$result, {
    title: copy.symposium.info.title,
    details: copy.symposium.info.details,
    description: copy.symposium.info.description
  }, {}, {})}
        
        <div class="${"p-4 pt-0"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: copy.symposium.buttons }, {}, {})}</div>
        
        <div>
          <div><div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-md sm:text-lg text-primary-700 "}">Presentations (Chair: ${escape(copy.symposium.programme.presentations.chair)})</div>
            <ul class="${"p-2 sm:p-4 text-primary-900"}">${each(copy.symposium.programme.presentations.presenters, (p, i) => {
    return `<li>${escape(p.starttime)}: <a${add_attribute("href", p.url, 0)} target="${"_blank"}">${escape(p.name)}</a> - ${escape(p.title)}</li>`;
  })}</ul></div>
          
          <div><div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-md sm:text-lg text-primary-700 "}">Panel (Chair: ${escape(copy.symposium.programme.panel.chair)})</div>
            <div class="${"pl-2 sm:pl-4 text-primary-700"}">16:25-17:00</div>
            <ul class="${"p-2 sm:p-4"}">${each(copy.symposium.programme.panel.speakers, (s2) => {
    return `<li class="${"text-primary-700"}"><a${add_attribute("href", s2.url, 0)}>${escape(s2.name)}</a></li>`;
  })}</ul></div></div></div></div>
    
    <div id="${"concert"}"><div class="${"px-4 sm:p-12 md:p-14 max-w-6xl"}">${validate_component(Section, "Section").$$render($$result, {
    title: copy.concert.info.title,
    details: copy.concert.info.details,
    description: copy.concert.info.description
  }, {}, {})}
        
        <div class="${"px-4"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: copy.concert.buttons }, {}, {})}</div>
        <div class="${"p-2 sm:p-4 mt-8"}"><div>${each(copy.concert.performers, (performer, index2) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Module, "Module").$$render($$result, { content: performer }, {}, {})}
              </div>`;
  })}</div></div></div></div>  
    
    <div id="${"mrp"}"><div class="${"px-4 sm:p-12 md:p-14 max-w-6xl"}">${validate_component(Section, "Section").$$render($$result, {
    title: copy.mrp.info.title,
    details: copy.mrp.info.details,
    description: copy.mrp.info.description
  }, {}, {})}
        
        <div class="${"grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10 px-2 sm:px-4 mt-4 mb-4"}">${validate_component(EmbedYouTubePlaylist, "YTP").$$render($$result, {
    scale: "0.75",
    id: "PL0HKnypdS9i9DNlk-pOr7M1zrDX06o1Xg"
  }, {}, {})}
          ${validate_component(EmbedYouTube, "YT").$$render($$result, { scale: "0.75", id: "GAb8RRKg8oo" }, {}, {})}</div>
        <div class="${"p-2 sm:p-4"}"><div>${each(copy.mrp.events, (event, index2) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Module, "Module").$$render($$result, { content: event }, {}, {})}
              </div>`;
  })}</div></div></div></div></div>`}`;
});
var metadata$D = {
  "layout": "movingstrings",
  "date": "2021-12-06",
  "title": "Moving Strings",
  "description": "Moving Strings: A symposium on strings and feedback. Dec 6-10, Reykjav\xEDk, Iceland.",
  "featured": true
};
var Moving_strings$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MovingStrings, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$D), {}, {})}`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Moving_strings$1,
  metadata: metadata$D
});
var Photo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"hidden lg:block flex-none self-center sm:w-72 sm:h-72 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src2, 0)}${add_attribute("alt", name, 0)}></div>`;
});
var Thumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"lg:hidden self-start w-32 h-32 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src2, 0)}${add_attribute("alt", name, 0)}></div>`;
});
var Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `

<div class="${"border-dashed border-primary-700 border-2 rounded-lg"}"><a class="${"h-9 flex items-center justify-center bg-primary-700 p-3 text-white"}"${add_attribute("href", url, 0)} target="${"_blank"}">${escape(label)}</a></div>`;
});
var Links = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-2 mt-4 "}">${links.website ? `${validate_component(Link, "Link").$$render($$result, {
    url: "http://" + links.website,
    label: "Website"
  }, {}, {})}` : ``}
  ${links.twitter ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://twitter.com/" + links.twitter,
    label: "Twitter"
  }, {}, {})}` : ``}
  ${links.instagram ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://instagram.com/" + links.instagram,
    label: "Instagram"
  }, {}, {})}` : ``}
  ${links.github ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://github.com/" + links.github,
    label: "GitHub"
  }, {}, {})}` : ``}
  ${links.scholar ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://scholar.google.com/citations?user=" + links.scholar,
    label: "Scholar"
  }, {}, {})}` : ``}
  ${links.website2 ? `${validate_component(Link, "Link").$$render($$result, {
    url: "http://" + links.website2,
    label: links.website2
  }, {}, {})}` : ``}</div>`;
});
var Person = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { person } = $$props;
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  return `<div class="${"flex"}"><div class="${"flex lg:space-x-10"}">${validate_component(Photo, "Photo").$$render($$result, { src: person.image, name: person.name }, {}, {})}
    <div><div class="${"flex flex-wrap"}">${validate_component(Thumbnail, "Thumb").$$render($$result, { src: person.image, name: person.name }, {}, {})}
        <div class="${"flex flex-col sm:ml-4 lg:ml-0"}"><h1 class="${"font-hauser text-secondary text-3xl mt-4"}">${escape(person.name)}
            <span class="${"font-sans text-secondary-500 text-lg ml-1"}">(${escape(person.pronouns)})
            </span></h1>
          <h3 class="${"text-primary-900 text-1xl px-2 mt-2"}">${escape(person.role)}</h3>
          <p class="${"text-primary-700 text-sm px-2 mt-1"}"><a${add_attribute("href", "mailto:" + person.email, 0)}${add_attribute("title", "Email " + person.name, 0)}>${escape(person.email)}</a></p></div></div>
      <div class="${"px-2 mb-16 "}"><p class="${"mt-2 sm:mt-4 mb-6 md:max-w-xl lg:max-w-1xl "}">${escape(person.bio)}</p>
        ${validate_component(Links, "Links").$$render($$result, { links: person.links }, {}, {})}</div></div></div></div>`;
});
var title$1 = "People";
var description$1 = "Meet the Intelligent Instruments Lab members and associates!";
var People = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { people } = $$props;
  let members2 = [];
  let associates2 = [];
  set_store_value(seo, $seo.title = title$1, $seo);
  set_store_value(seo, $seo.description = description$1, $seo);
  set_store_value(seo, $seo.url = "/people", $seo);
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape(title$1)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description$1, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4 w"}"><div class="${"py-8 px-4 sm:p-12 md:p-14 max-w-6xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">Members
      </h1>
      <div class="${"p-2 sm:p-4"}"><div>${each(members2, (member, index2) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Person, "Person").$$render($$result, { person: member.metadata }, {}, {})}
            </div>`;
  })}</div></div>
      <h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">Associates
      </h1>
      <div class="${"p-2 sm:p-4"}"><div>${each(associates2, (associate, index2) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Person, "Person").$$render($$result, { person: associate.metadata }, {}, {})}
            </div>`;
  })}</div></div></div></div>`}`;
});
async function load$1({ fetch: fetch2 }) {
  const res = await fetch2(`/people/people.json`);
  const people = await res.json();
  return { props: { people } };
}
var People_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { people } = $$props;
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  return `${validate_component(People, "People").$$render($$result, { people }, {}, {})}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": People_1,
  load: load$1
});
var metadata$C = {
  "name": "Dav\xED\xF0 Brynjar Franzson",
  "type": "Associate",
  "role": "Associate",
  "email": "david.brynjar@gmail.com",
  "image": "images/people/davidbrynjar.JPG",
  "links": {
    "github": "franzson",
    "website": "franzson.com"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a freelancing composer based in Los Angeles. My work explores the overlap between the experience of performing and the experience of listening, attempting to break down the barriers between listener and performer, audience and artist. My work with machine learning is focused on the application of autoencoders as generative synthesis tools, and their use as a ghost-in-the-machine inside augmented and intelligent instruments and architectural spaces, altering and amplifying variation in how the instruments and spaces respond to the performer. On the side I co-run Carrier Records--a label for new and experimental music--with Sam Pluta, Katie Young, and Jeff Snyder."
};
var Davidbrynjar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$C), {}, {})}`;
});
var davidbrynjar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Davidbrynjar,
  metadata: metadata$C
});
var metadata$B = {
  "name": "Halldor \xDAlfarsson",
  "type": "Member",
  "role": "Fabricator",
  "email": "hau@lhi.is",
  "image": "images/people/halldor.jpg",
  "links": {
    "instagram": "halldorophone",
    "website": "halldorophone.info"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am the inventor of the halldorophone, an electro acoustic string instrument intended for working with string based feedback. For the past decade I have been seeking out and working with musicians to make music with halldorophones and noting their thoughts and feelings on the process to inform further development. I am currently working on a PhD documenting and expanding on this work under the supervision of Thor Magnusson and Chris Kiefer at the University of Sussex. Besides working on this project I am currently funded by an innovation grant from the Icelandic Technology Development Fund on further development of halldorophones. I enjoy using my skills as a fabricator to collaborate with musicians and instrument makers in the NIME context."
};
var Halldor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$B), {}, {})}`;
});
var halldor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Halldor,
  metadata: metadata$B
});
var metadata$A = {
  "name": "Enrique Hurtado",
  "type": "Associate",
  "role": "Associate",
  "email": "enrique.hurtado@ehu.eus",
  "image": "images/people/enrike_1500.jpg",
  "links": {
    "github": "enrike",
    "website": "enrike.ixi-audio.net"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I teach Fine Arts at the UPV/EHU University in Bilbao where I did my doctoral thesis on generative music and the txalaparta. I studied Art in Bilbao and MA Design for Interactive Media in London. I am part of www.ixi-audio.net since 2001 and I like developing software to make weird music. I am interested in that place where popular music, contemporary music, art and the creative use of technology meet."
};
var Enrike = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$A), {}, {})}`;
});
var enrike = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Enrike,
  metadata: metadata$A
});
var metadata$z = {
  "name": "Esther Thorvalds",
  "type": "Member",
  "role": "Project Manager",
  "email": "esther@lhi.is",
  "image": "images/people/esther.jpg",
  "links": {
    "instagram": "estherthorvalds",
    "twitter": "estherthorvalds"
  },
  "pronouns": "she/her",
  "bio": "I studied culture and communication, creative writing and comparative literature. I have been working in the music and culture industry for a decade; managing, planning and promoting all sorts of music projects, artists, festivals and conferences in Iceland as well as abroad. I'm passionate about connecting with and designing for all sorts of users and promoting equality and diversity."
};
var Esther = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$z), {}, {})}`;
});
var esther = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Esther,
  metadata: metadata$z
});
var metadata$y = {
  "name": "Victor Shepardson",
  "type": "Member",
  "role": "PhD Student",
  "email": "victor@lhi.is",
  "image": "images/people/victor.jpg",
  "links": {
    "instagram": "victorrileys",
    "twitter": "victorrileys",
    "website": "victor-shepardson.github.io"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a doctoral student in the Intelligent Instruments Lab at LHI. Previously I worked on neural models of speech as a machine learning engineer and data scientist. Before that I was an MA student in Digital Musics at Dartmouth College and and BA student in Computer Science at the University of Virginia. My interests include machine learning, artificial intelligence, generative art, audiovisual music and improvisation. My current project involves building an AI augmented looping instrument and asking what AI means to people, anyway."
};
var Victor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$y), {}, {})}`;
});
var victor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Victor,
  metadata: metadata$y
});
var metadata$x = {
  "name": "Marco Donnarumma",
  "type": "Associate",
  "role": "Associate",
  "email": "sad@flxer.net",
  "image": "images/people/marco_1500.jpg",
  "links": {
    "facebook": "marco.donnarumma.live",
    "twitter": "MarcoDonnarumma",
    "instagram": "body_sound_machine",
    "vimeo": "marcodonnarumma",
    "scholar": "MV5UIAAAAAJ",
    "website": "marcodonnarumma.com",
    "website2": "frontevacuo.com"
  },
  "projects": [""],
  "pronouns": "he/his ne/nim",
  "bio": "I am an artist, performer, stage director and scholar weaving together contemporary performance, new media art and interactive computer music since the early 2000s. My artistic and scholarly work is rooted in feminist theories, critical theory and critical disability studies. I manipulate bodies, create choreographies, engineer machines and compose sounds to create artworks and performances that can speak critically of ritual, power and technology. I have a Ph.D. in performing arts, computing and body theory from Goldsmiths, University of London. Recently, I held Research Fellowships at the Dortmund Academy for Theater and Digitality and at the Berlin University of the Arts - in collaboration with the Neurorobotics Research Laboratory, in Germany. I am a co-founder of the artist group Fronte Vacuo, based in Berlin. Photo cred: Dario J Lagana' | Norte.it"
};
var Marco = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$x), {}, {})}`;
});
var marco = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Marco,
  metadata: metadata$x
});
var metadata$w = {
  "name": "Robin Morabito",
  "type": "Associate",
  "role": "Research Intern",
  "email": "robin19@lhi.is",
  "image": "images/people/robin.jpg",
  "links": {
    "instagram": "bob.hermit",
    "website": "linktr.ee/bobhermit"
  },
  "projects": [""],
  "pronouns": "he/him, they/them",
  "bio": "I'm a graduating student in Composition - New Media at LHI. My interests involve sonification, sonic interaction design and DIY approaches to multimedia creation. Previously I studied Biotechnologies at La Sapienza University of Rome, and before then I studied guitar, violin, and sound engineering. I release music as Bob Hermit since 2016 and co-founded the transnational label BohReal? Records in 2020. In my work and in my music, I explore what it means to be a human and to be communicating in an information-overloaded world; I use abjections, discomfort and displacement to investigate human responses to aesthetic patterns. Currently I'm experimenting with sensors and Bela boards to create interactive sculptures and wearable music instruments. I'm going to work with IIL all summer, it's going to be great!"
};
var Robin$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$w), {}, {})}`;
});
var robin$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Robin$1,
  metadata: metadata$w
});
var metadata$v = {
  "name": "Sigr\xED\xF0ur Birna Matth\xEDasd\xF3ttir",
  "type": "Associate",
  "role": "Research Intern",
  "email": "sigridurbirna@lhi.is",
  "image": "images/people/sigga.jpg",
  "links": {
    "twitter": "DigitalSigga",
    "instagram": "digitalsigga",
    "website": "digitalsigga.com"
  },
  "projects": [""],
  "pronouns": "she/her",
  "bio": "I currently study vocal arts at S\xF6ngsk\xF3linn \xED Reykjav\xEDk and computer science at the University of Iceland. Previously I studied fashion design at Studio Ber\xE7ot in Paris, and MA Design at Iceland University of the Arts. In my work I am continuously interested in the relationship between the concept of identity and technology. My previous work addresses the ways in which we attempt to upload our physical selves into the virtual world, virtual and digital fashion, augmented reality experiments and machine learning experiments. In collaboration with IIL I am currently working on an AI Vocal Avatar, where I attempt to donate my voice to a machine learning algorithm, and therefore outsourcing my physical body for the process of singing."
};
var Sigga = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$v), {}, {})}`;
});
var sigga = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Sigga,
  metadata: metadata$v
});
var metadata$u = {
  "name": "Steve Symons",
  "type": "Associate",
  "role": "Associate",
  "email": "s.symons@sussex.ac.uk",
  "image": "images/people/steve_1500.jpg",
  "links": {
    "twitter": "stevemuio",
    "website": "http://muio.org",
    "website2": "owlproject.com"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I make interactive sound systems and instruments that I improvise with or exhibit for the public to play. I'm currently a music technology doctoral researcher at the Leverhulme Trust funded be.AI Centre (University of Sussex, Brighton, UK). My research explores enactive metaphors for collaborative musical instruments that enhance intra-dependant actions between human and non-human agents."
};
var Steve = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$u), {}, {})}`;
});
var steve = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Steve,
  metadata: metadata$u
});
var metadata$t = {
  "name": "Ezra Pierce",
  "type": "Associate",
  "role": "Google Summer of Code Contributor",
  "email": "ezrapierce@cmail.carleton.ca",
  "image": "images/people/ezra.jpeg",
  "links": { "": null },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a recent BEng graduate in the Computer Systems program at Carleton University. I have previously worked on various embedded software projects, working with microcontrollers, sensors, and electronics. Recently, I have been learning about the music technology space which led me to my project for the summer: developing software tools to aid in the exploration of embedded machine learning possibilities on the Bela computers. I will be working on this project with support from Google Summer of Code, the BeagleBoard foundation and IIL, hopefully ending with some tools, tips and tricks for others looking to use machine learning with the Bela platform."
};
var Ezra = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$t), {}, {})}`;
});
var ezra = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Ezra,
  metadata: metadata$t
});
var metadata$s = {
  "name": "Jack Armitage",
  "type": "Member",
  "role": "Postdoctoral Research Fellow",
  "email": "jack@lhi.is",
  "image": "images/people/jack.jpg",
  "links": {
    "twitter": "jdkarmitage",
    "github": "jarmitage",
    "scholar": "APvoBhUAAAAJ",
    "instagram": "jdkarmitage",
    "website": "jackarmitage.com"
  },
  "projects": [""],
  "pronouns": "he/him, they/them",
  "bio": "I have a doctorate in Media and Arts Technologies from Queen Mary University of London, where I studied in Prof. Andrew McPherson's Augmented Instruments Lab. During my PhD I was a Visiting Scholar at Georgia Tech under Prof. Jason Freeman. Before then, I was a Research Engineer at ROLI after graduating with a BSc in Music, Multimedia & Electronics from the University of Leeds. My research interests include embodied interaction, craft practice and design cognition. I also produce, perform and live code music as Lil Data, as part of the PC Music record label."
};
var Jack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$s), {}, {})}`;
});
var jack = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Jack,
  metadata: metadata$s
});
var metadata$r = {
  "name": "Karl J\xF3hann J\xF3hannsson",
  "type": "Associate",
  "role": "Research Intern",
  "email": "karljohann@gmail.com",
  "image": "images/people/karl.png",
  "links": {
    "twitter": "karljohann",
    "instagram": "karljohann"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a MSc student in Computer Science at Reykjav\xEDk University, as well as studying at the F\xCDH school of music. I have a BA degree in psychology and philosophy from the University of Iceland and, subsequently, worked in software development for 14 years, ranging from web design to app development. My main interests in life and work are music, AI, UX, and creativity. I am currently working on teaching a computer to play the txalaparta at the Intelligent Instruments Lab. I have been playing and creating music for as long as I remember and am in a death metal band, although I have been involved in various different musical projects, as well as composing more experimental music in darkened rooms."
};
var Karl$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$r), {}, {})}`;
});
var karl$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Karl$1,
  metadata: metadata$r
});
var metadata$q = {
  "name": "Sean Patrick O\u2019Brien",
  "type": "Associate",
  "role": "Research Intern",
  "email": "sean@seanob.com",
  "image": "images/people/sean.png",
  "links": {
    "instagram": "foreverywhere",
    "website": "seanob.com"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I have a BFA from the Studio of Interrelated Media from MassArt in Boston and recently received a Master's in Performing Arts from Listah\xE1sk\xF3li \xCDslands where I focused on bringing my background in interactive and kinetic sculpture into a performative and socially engaged practice. Inspired by the local Icelandic arts and music scene and I have worked with the Reykav\xEDk Dance Festival, Sequences Art Festival, Nylistasafni\xF0, Kling og Bang, Listah\xE1ti\xF0, Raflost, Rask, Mengi, Spectral Assault Records, and grassroots organizations Post-Dreifing, RUSL Fest, F\xFAsk, and King og Bong. My primary goal as an artist is to create an engaging experience that encourages interaction through the performative nature of objects and the sensation of experience."
};
var Sean = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$q), {}, {})}`;
});
var sean = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Sean,
  metadata: metadata$q
});
var metadata$p = {
  "name": "Thor Magnusson",
  "type": "Member",
  "role": "Principal Investigator",
  "email": "thor.magnusson@lhi.is",
  "image": "images/people/thor.jpg",
  "links": {
    "twitter": "thormagnusson",
    "github": "thormagnusson",
    "scholar": "cCgOZ_gAAAAJ",
    "website": "thormagnusson.github.io"
  },
  "projects": ["sonicwriting"],
  "pronouns": "he/him",
  "bio": "I\u2019m a professor of future music in the Music Department at the University of Sussex and a research professor at the Iceland University of the Arts. I\u2019ve recently served as an Edgard-Var\xE8se guest professor at the Technische Universit\xE4t Berlin. My research interests include musical performance, improvisation, new technologies for musical expression, live coding, musical notation, artificial intelligence and computational creativity."
};
var Thor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$p), {}, {})}`;
});
var thor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Thor,
  metadata: metadata$p
});
var metadata$o = {
  "name": "Jonathan Chaim Reus",
  "type": "Associate",
  "role": "Associate",
  "email": "j.reus@sussex.ac.uk",
  "image": "images/people/jonr.jpg",
  "links": {
    "twitter": "_jchaim",
    "instagram": "jchai.me",
    "website": "jchai.me"
  },
  "projects": [""],
  "pronouns": "he/she/it",
  "bio": "I am a homeostatic animal experimenting within a vibrant ecosystem of cultures and tools. I co-founded the instrumentinventorsinitiative (iii) and Platform for Thought in Motion in The Hague, and worked for many years on artist-led research at the former Studio for Electro-Instrumental Music (STEIM). I am currently exploring what it means to have a voice."
};
var Jon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$o), {}, {})}`;
});
var jon = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Jon,
  metadata: metadata$o
});
var metadata$n = {
  "name": "Kit Braybrooke",
  "type": "Member",
  "role": "Postdoctoral Research Fellow (2023-onwards)",
  "email": "k.braybrooke@tu-berlin.de",
  "image": "images/people/kit.jpg",
  "links": {
    "twitter": "codekat",
    "instagram": "codekiit",
    "website": "kitfox.org",
    "website2": "studiowe.net"
  },
  "projects": [""],
  "pronouns": "she/they",
  "bio": "I'm a digital anthropologist and artist-designer whose work explores how we navigate culture, identity and belonging across virtual and physical terrains. I am a Director of Studio We & Us, which helps civil society orgs foster sustainable development through creative participation, and a Senior Researcher with Habitat Unit at Technische Universit\xE4t Berlin. I have lead co-design programmes at organisations like Mozilla and the Open Knowledge Foundation, and conducted ethnographic fieldwork on commoning, open source cultures, creative spaces and multispecies ethics of care across Asia, Europe & Canada. I have a PhD in Media & Cultural Studies from University of Sussex for 'Hacking the Museum', a study of the UK's first museum makerspaces at Tate, British Museum and Wellcome Collection."
};
var Kit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$n), {}, {})}`;
});
var kit = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Kit,
  metadata: metadata$n
});
var About$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { layout } = $$props;
  set_store_value(seo, $seo.title = title2, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/about", $seo);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"pt-10 sm:pt-12 md:pt-14 pb-24 grid grid-cols-12"}"><div class="${"col-span-1 md:col-span-2 lg:col-span-3"}"></div>
      <div class="${"col-span-10 md:col-span-8 lg:col-span-6"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
        <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
      <div class="${"col-span-1 md:col-span-2 lg:col-span-3"}"></div></div></div>`}`;
});
var metadata$m = {
  "layout": "about",
  "title": "About",
  "slug": "about",
  "description": "About the Intelligent Instruments Lab"
};
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(About$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$m), {}, {
    default: () => {
      return `
<p>The Intelligent Instruments Lab is an interdisciplinary research lab that investigates the role of artificial intelligence in new musical instruments. Music is our research base, but the reach and impact is wider and we explore how musical interfaces can be applied as scientific instruments, for example through sonification.</p>
<p>We study creative AI from a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists in key international institutions. We explore the emerging language and discourse of creative AI, addressing how notions such as agency, autonomy, authenticity, authorship, creativity and originality change with these new technologies.</p>

<p>Our technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn and evolve in the hands of the performer. Our theoretical approach is to collaborate with researchers, artists and the public across in key studies of how creative AI alter our relationship with technology, social interaction and knowledge production.  </p>
<p>The ii Lab is located at the Iceland University of the Arts, where we work on designing, building and testing new instruments in collaboration with other researchers, music students and local artists. We have access to the advanced workshops and labs as well as the artistic infrastructure of the university. We seek to maintain a strong public engagement, for example through our Friday Open Labs, symposia and musical events.</p>
`;
    }
  })}`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About,
  metadata: metadata$m
});
var title = "News";
var description = "News about the Intelligent Instruments Lab";
var News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let allPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { items } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/news", $seo);
  const methods = {
    dayMonth: (d) => {
      d = new Date(d);
      const options2 = { month: "short", day: "numeric" };
      return d.toLocaleDateString("en-US", options2);
    },
    dateString: (d) => {
      return new Date(d).toDateString().slice(-11);
    }
  };
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  featured = {
    size: 2,
    page: 1,
    items: items.filter((i) => i.metadata.featured === true).sort((fst, snd) => new Date(fst.metadata.date) - new Date(snd.metadata.date)).reverse()
  };
  all = {
    size: 4,
    page: 1,
    items: items.sort((fst, snd) => new Date(fst.metadata.date) - new Date(snd.metadata.date)).reverse()
  };
  featuredPaginated = paginate({
    items: featured.items,
    pageSize: featured.size,
    currentPage: featured.page
  });
  allPaginated = paginate({
    items: all.items,
    pageSize: all.size,
    currentPage: all.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find the latest news about the lab.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Featured</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(featuredPaginated, ({ metadata: { title: title2, date, description: description2 }, path }) => {
    return `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "news/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(title2)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description2)}</p></div>
                      <div class="${"self-end grid grid-cols-1 text-primary-500"}">
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.dayMonth(date))}</div>
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${featured.items.length > featured.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: featured.items.length,
    pageSize: featured.size,
    currentPage: featured.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        <div class="${"mt-4 sm:px-2 py-2 mb-12"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">All News</h2>
          <hr class="${"border-primary-500 border-dashed border-1"}">
          <div class="${"article-list"}">${each(allPaginated, ({ metadata: { title: title2, date, description: description2, tags }, path }) => {
    return `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "news/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${escape(title2)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description2)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>${escape(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`;
  })}</div>
          <div class="${"mx-auto"}">${all.items.length > all.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: all.items.length,
    pageSize: all.size,
    currentPage: all.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load({ fetch: fetch2 }) {
  const res = await fetch2(`/news/items.json`);
  const items = await res.json();
  return { props: { items } };
}
var News_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  return `${validate_component(News, "News").$$render($$result, { items }, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": News_1,
  load
});
var NewsItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { layout } = $$props;
  let { date } = $$props;
  set_store_value(seo, $seo.title = title2, $seo);
  set_store_value(seo, $seo.description = description2, $seo);
  set_store_value(seo, $seo.url = "/news", $seo);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/news"}">${escape("<-")} Back to News</a></div>
    
    <div class="${"px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title2)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-sm sm:text-md text-primary-700 "}">${escape(description2)}<br>${escape(new Date(date).toDateString())}</div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/news"}">${escape("<-")} Back to News</a></div></div>`}`;
});
var metadata$l = {
  "layout": "news",
  "date": "2021-11-02",
  "title": "Nordic Popular Music Union",
  "description": "Talk: AI in pop music",
  "featured": false
};
var Nordic_popular_music_union = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$l), {}, {
    default: () => {
      return `<p>Thor Magnusson will give a talk on Creative AI in music for the Nordic Union of Popular Music. </p>
<p>This will take place in Reykjavik, in the Center Hotel, Laugarvegur, Nov 4th, 2021.</p>
<h2>Music and AI: an Auspicious Relationship?</h2>
<p>Musicians have always applied new technologies for music making. A quick look back in history shows how musical instruments have always incorporated progress in science and engineering. Today we are exploring how AI might be applied in music.</p>
<p>But, as technology, there seems to be something different with AI. It is not a passive technology like a drum stick, a guitar pedal or a digital audio workstation. AI proposes, recommends, directs, and its uses can be from a simple parameter control in mastering to a complete generated composed work. It has an agency beyond earlier technologies.</p>
<p>In this talk, I seek to demystify the role of AI in music, discuss the nature of creative AI, and introduce a grounded view that is far from the popular AI-hype or doomsday prophesies which we often read about. I will also introduce the Intelligent Instruments project, as an example of an approach to AI where we apply the latest technologies in machine learning as a technique in making more interesting and personal musical instruments.</p>`;
    }
  })}`;
});
var nordicPopularMusicUnion = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Nordic_popular_music_union,
  metadata: metadata$l
});
var metadata$k = {
  "layout": "news",
  "date": "2022-02-03",
  "title": "Iceland Univeristy of the Arts receives its very own halldorophone",
  "description": "Kastljos news segment about the halldorophone",
  "featured": false
};
var Halldorophone_kastljos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$k), {}, {
    default: () => {
      return `${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/halldor_kastljos.png",
        alt: "A man speaking to camera. Behind him another man is playing the halldorophone, an intelligent string instrument.",
        caption: "Halld\xF3r \xDAlfarsson, the creator of the halldorophone."
      }, {}, {})}
<p>On January 17th, news reporter Gu\xF0r\xFAn S\xF3ley and the good people of Kastlj\xF3s, one of Iceland\u2019s most prestigious news and culture comment programme, paid us a visit at the Intelligent Instruments Lab. The occasion was the gifting of a halldorophone (Icelandic: d\xF3r\xF3f\xF3nn) to the Iceland University of the Arts, with the support Design Fund Iceland. A ceremony was held at the IUA and rector Fr\xED\xF0a Bj\xF6rk Ingvarsd\xF3ttir received the instrument on behalf of the school. </p>
<p>In the news segment we take a look at the halldorophone, a built-to-feedback, electro-acoustic string instrument invented by Halld\xF3r \xDAlfarsson (our technician at the IIL). Halld\xF3r goes on to tell the story of how the project came to be, originally conceived of as a prop for performance art during his time as a visual arts student. Starting out as kind of a joke, he says, but in time developed into a functional string instrument for string players interested in working with feedback.</p>
<p>The halldorophone has recently received support from Technology Development Fund Iceland. In a project called \u201CEvolution of halldorophones\u201D select musical institutions will receive halldorophone on loan in for a period of two years, allowing musicians and students access to the instrument and collecting data for Halld\xF3r to further development of the project. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/halldorophone.jpeg",
        alt: "A wooden cello like instrument embedded with electronic parts.",
        caption: "The halldorophone that is now in the possession of IUA."
      }, {}, {})}
<p>Sigur\xF0ur Halld\xF3rsson, professor and head of musical department at Iceland University of the Arts, demonstrated the halldorophone for those present and told us about his feelings about the instrument. He said he had expected something familiar to a trained cellist, but coming to understand that this was a fundamentally different musical tool with a mind of its own. He expressed an understanding to have to put aside his training in order to be able embrace the new adventures this instrument offers.</p>
<p>The halldorophone has become somewhat known after composer Hildur Gu\xF0nad\xF3ttir was awarded the Academy Awards for her music in the film Joker, as she used the instrument to write and perform music in the film. Particularly in a scene called Bathroom Dance, where the main character transforms from a victim to perpetrator. Halld\xF3r is grateful for her contribution to the instrument\u2019s recognition, as she has regularly mentioned the halldorophone when interviewed about her work.</p>
<p>See Bathroom Dance:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/VdfgiEQeceM"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>Futhermore, Halld\xF3r adds how pleasing it is that the halldorophone will now be available to the staff and students of the Iceland Academy of the Arts, suggesting that a musical instrument doesn\u2019t really exist if no one makes music with it. </p>
<p>Gu\xF0r\xFAn S\xF3ley dropped by at the Yellow Lab after the ceremony and Thor Magnusson, our primary investigator, showed her some of the instruments we are studying, making and playing. He explained how this lab seeks to understand how artificial intelligence becomes a part of music. Among the instruments we saw were the Linnstrument, AI embedded traditional Icelandic Langspil and the Basque Txalaparta. Thor explains how instruments have a close relationship with the players and how embedding AI can allow the instrument to suggest new ways of playing and composing.</p>
<p>Watch the segment from R\xDAV here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/LFDXomBusRQ"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>`;
    }
  })}`;
});
var halldorophoneKastljos = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Halldorophone_kastljos,
  metadata: metadata$k
});
var metadata$j = {
  "layout": "news",
  "date": "2022-04-04",
  "title": "The Google Summer of Code",
  "description": "Mentorship opportunity for students",
  "featured": false
};
var Google_summer_of_code = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$j), {}, {
    default: () => {
      return `<p>Students, work with us this summer! We are offering Google Summer of Code mentorship in partnership with Bela Platform and Beagleboard. </p>
<p>In an exciting change to the policy in 2022, projects are now open to anyone who is new to open source and would like to gain experience of contributing code to an open source project.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/bela.png",
        alt: "A small Bela hardware surrounded by pieces of hardware.",
        caption: "A Bela Board."
      }, {}, {})}
<p>Our project is to do TinyML embedded machine learning on Bela using Pytorch to enable intelligent embedded musical instruments. </p>
<p>Deadline: April 19th</p>
<p>This is a great opportunity for learning and sharing knowledge. Don\u2019t let it pass you by!</p>
<p>Full details here: <a href="${"https://elinux.org/BeagleBoard/GSoC/Ideas-2022#Beagle_Bone_Audio_Applications"}" rel="${"nofollow"}">https://elinux.org/BeagleBoard/GSoC/Ideas-2022#Beagle_Bone_Audio_Applications</a></p>`;
    }
  })}`;
});
var googleSummerOfCode = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Google_summer_of_code,
  metadata: metadata$j
});
var metadata$i = {
  "layout": "news",
  "date": "2022-03-01",
  "title": "On-the-fly Residency in Barcelona",
  "description": "Dr. Jack Armitage spends one month with Hangar.org.",
  "featured": false
};
var On_the_fly_residency = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$i), {}, {
    default: () => {
      return `<p>Lab member Jack Armitage is spending this month in Barcelona taking part in a one month residency called <a href="${"https://onthefly.space/"}" target="${"_blank"}">On-the-Fly</a>, which promotes Live Coding practice by supporting knowledge exchange between communities, engaging with critical reflections, promoting free and open source tools and approaching live coding to new audiences.</p>
<p>As part of the residency, Jack will be performing at the <a href="${"https://aaassembly.org"}" target="${"_blank"}">Algorithmic Art Assembly</a> on Saturday 12th March. Full details including lineup, tickets and streaming links can be found here:</p>
<p><a href="${"https://hangar.org/es/residents/activitats-dels-residents/espanol-algorithmic-art-assembly-aaa/"}" rel="${"nofollow"}">https://hangar.org/es/residents/activitats-dels-residents/espanol-algorithmic-art-assembly-aaa/</a></p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/aaabcn.png",
        alt: "Flyer for the Algorithmic Art Assembly Barcelona node.",
        caption: "Flyer for AAA BCN."
      }, {}, {})}
<p>From March 24 to 27, Jack will be participating in the VIU Festival 2022. Full details about the festival programme can be found here:</p>
<p><a href="${"https://hangar.org/es/residents/activitats-dels-residents/espanol-viu-2022-encuentro-de-live-coding/"}" rel="${"nofollow"}">https://hangar.org/es/residents/activitats-dels-residents/espanol-viu-2022-encuentro-de-live-coding/</a></p>`;
    }
  })}`;
});
var onTheFlyResidency = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": On_the_fly_residency,
  metadata: metadata$i
});
var metadata$h = {
  "layout": "news",
  "date": "2022-05-03",
  "title": "Workshop on Embedded AI at NIME 2022",
  "description": "Call for Workshop Abstracts on Embedded AI for NIME: Challenges and Opportunities.",
  "featured": true
};
var Nime_2022_workshop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$h), {}, {
    default: () => {
      return `<p>We are welcoming submissions for the workshop Embedded AI for NIME: Challenges and Opportunities (<a href="${"https://embedded-ai-for-nime.github.io/"}" rel="${"nofollow"}">https://embedded-ai-for-nime.github.io/</a>) that will take place during the (online) NIME 2022 Conference (28th June - 1st July 2022).</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "research/projects/protolangspil2.jpg",
        alt: "The proto-langspil digital musical instrument with Bela hardware platform inside.",
        caption: "The Intelligent Instrument Lab's proto-langspil instrument with a Bela inside."
      }, {}, {})}
<h1 id="${"deadline"}"><a href="${"#deadline"}">Deadline</a></h1>
<p>3 June 2022 Anywhere on earth (AoE) UTC-12</p>
<h1 id="${"abstract"}"><a href="${"#abstract"}">Abstract</a></h1>
<p>Despite recent advancements in low-resource computing hardware, such as microcontrollers or single board computers, the deployment of machine learning or symbolic artificial intelligence (AI) techniques still presents several technical challenges and higher-level design constraints. With this workshop, we aim to: (1) bring together a body of research practitioners that face such challenges in the context of NIME, (2) articulate these challenges and identify the tools and strategies being currently used to overcome them, (3) forge a community of practitioners of embedded AI for NIME and (4) discuss critical approaches on the use of embedded AI for musical expression.</p>
<h1 id="${"embedded-ai-for-nime"}"><a href="${"#embedded-ai-for-nime"}">Embedded AI for NIME</a></h1>
<p>Cutting edge embedded systems have always been a part of NIME\u2019s practices. Low-resource computing hardware, such as microcontrollers or single-board computers, can be embedded into digital musical instruments or interfaces to perform specific functions such as real-time digital signal processing of sensor data and sound. Simultaneously, an interest in exploiting the creative potentials of artificial intelligence (AI) for instrument design and musical expression has been growing within the NIME community in the past years. Recent advancements in embedded computing have allowed for faster and more intensive computation capabilities. However, the deployment of machine learning or symbolic AI techniques still presents several technical challenges (e.g., data bandwidth, memory handling) and higher-level design constraints. Some of these challenges are general to embedded systems, while others are specific to musical interaction, particularly questions regarding real-time performance and latency. Deploying AI models on embedded systems is an emerging and fast-changing field. A workshop is an excellent opportunity for practitioners to present works in progress and collaboratively identify shared challenges. We expect this workshop to serve as the starting point for an embedded AI NIME community and as future reference to help researchers get started with embedded AI.</p>
<h1 id="${"submissions"}"><a href="${"#submissions"}">Submissions</a></h1>
<p>The workshop will run as part of the NIME 2022 conference, and participants will need to be registered in NIME (<a href="${"https://nime2022.org/registration.html"}" rel="${"nofollow"}">https://nime2022.org/registration.html</a>, scholarships are available here: <a href="${"https://auckland.au1.qualtrics.com/jfe/form/SV_efCpUL21iYGZFKC"}" rel="${"nofollow"}">https://auckland.au1.qualtrics.com/jfe/form/SV_efCpUL21iYGZFKC</a>). Presenters will give a 10-minute talk. After each set of 2-3 talks, we will have a panel discussion with presenters, organisers and attendees. We aim to accommodate participants in different time zones by running two sessions spaced 5-7 hours apart. We are welcoming proposal submissions in the form of extended abstracts. The extended abstract should describe the format of the talk, briefly summarise its contents, and explain its relevance to the workshop. Successful submissions\u2019 abstracts will be published in online proceeding (participants will have the opportunity to edit the abstract for the camera-ready version). The proposal can be for a demo, a poster presentation, a progress report, a short paper presentation\u2026 anything of relevance to the topic of Embedded AI for NIME that fits in 10 minutes. The proposal should have an extension of 400-600 words and can be submitted <a href="${"https://docs.google.com/forms/d/e/1FAIpQLSf45SRpbpJyWKkbibhp4UDZ1MwQW_NKTohkwAvAsaCB4tFx8g/viewform"}">here</a>.</p>
<h1 id="${"topics-include-but-are-not-limited-to"}"><a href="${"#topics-include-but-are-not-limited-to"}">Topics include, but are not limited to:</a></h1>
<ul><li>Any technical prototype or concrete implementation of resource-constrained systems using AI in the context of NIME</li>
<li>Design strategies and conceptual frameworks for embedded AI</li>
<li>Interaction paradigms for systems using embedded AI</li>
<li>Embedded and real-time neural audio synthesis methods (e.g., neural, artificial life, statistical methods, etc.)</li>
<li>AR/MR/VR systems using AI in the context of NIME</li>
<li>Mobile computing systems using AI in the context of NIME</li>
<li>Musical uses of AI in embedded platforms</li>
<li>Workflows for improving AI implementations between laptop, embedded/real-time and HPC platforms</li>
<li>Development environments for interactive machine learning in embedded context, particularly those targeting non-expert users</li>
<li>Values, biases, ethical and philosophical issues with embedded AI in musical performance</li>
<li>Inclusivity and diversity in emerging embedded AI communities</li></ul>
<h1 id="${"organisers"}"><a href="${"#organisers"}">Organisers</a></h1>
<p>Augmented Instruments Lab, Queen Mary University of London: Teresa Pelinski, Franco Santiago Caspe, Ad\xE1n L Benito Temprano, Andrew McPherson</p>
<p>Intelligent Instruments Lab, Iceland University of the Arts: Victor Shepardson, Jack Armitage, Thor Magnusson</p>
<p>Experimental Music Technologies Lab, University of Sussex: Steve Symons, Chris Kiefer</p>
<p>Creative Computing Institute, University of the Arts London: Rebecca Fiebrink</p>
<p>For additional information or questions, you can contact Teresa Pelinski (<a href="${"mailto:t.pelinskiramos@qmul.ac.uk"}">t.pelinskiramos@qmul.ac.uk</a>).</p>`;
    }
  })}`;
});
var nime2022Workshop = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Nime_2022_workshop,
  metadata: metadata$h
});
var metadata$g = {
  "layout": "news",
  "date": "2022-05-10",
  "title": "Presentation at CERN Workshop",
  "description": "On creative misuse of ROOT.",
  "featured": true
};
var Root_workshop_2022 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$g), {}, {
    default: () => {
      return `<p>On Tuesday May 10th 2022, lab member Jack Armitage will give a presentation at the European Organization for Nuclear Research (<a href="${"https://cern.ch"}" target="${"_blank"}">CERN</a>) ROOT Users Workshop. <a href="${"https://root.cern"}" target="${"_blank"}">ROOT</a> is the technology stack that powers scientific computing at CERN, and has been instrumental in all scientific practice there, including the <a href="${"https://root.cern/gallery/#higgs-plots"}" target="${"_blank"}">discovery of the Higgs boson</a>.</p>
<p>See below for the title and abstract of the talk.</p>
<h1 id="${"creative-misuse-of-root"}"><a href="${"#creative-misuse-of-root"}">Creative Misuse of ROOT</a></h1>
<p>From Steinway and Helmholtz, to Max Mathews and Bell Labs, to Google Magenta, scientists and musicians have long been natural collaborators, with innovations and inventions passing in both directions. Over the years, a select few creative coders have been quietly reappropriating ROOT technologies, particularly for musical applications. In one such example, Cling has been used as the basis for a C++ based live coding synthesiser [1]. In another example, Cling has been installed on a BeagleBoard to bring live coding to the Bela interactive audio platform [2]. More recently, embedded digital musical instrument designers are experimenting with machine learning for gesture recognition and audio synthesis with the SOFIE library [3]. What would happen if the ROOT community were to embrace and encourage creative misuse of Cling, SOFIE and other powerful CERN technologies? Could musical innovation and invention inspire and benefit scientific practice at CERN? This short talk proposes to review the examples and explore the questions above, with the aim of promoting discourse between ROOT technologists, CERN researchers, and creative technologists.</p>
<p>[1] tiny spectral synthesizer with livecoding support <a href="${"https://github.com/nwoeanhinnogaehr/tinyspec-cling"}" rel="${"nofollow"}">https://github.com/nwoeanhinnogaehr/tinyspec-cling</a></p>
<p>[2] Using the Cling C++ Interpreter on the Bela Platform
<a href="${"https://gist.github.com/jarmitage/6e411ae8746c04d6ecbee1cbc1ebdcd4"}" rel="${"nofollow"}">https://gist.github.com/jarmitage/6e411ae8746c04d6ecbee1cbc1ebdcd4</a></p>
<p>[3] Test running ONNX models on Bela via ROOT@CERN\u2019s SOFIE inference code generator
<a href="${"https://gist.github.com/jarmitage/0ac53dfecee8ed03e9f235d3e14ec9a2"}" rel="${"nofollow"}">https://gist.github.com/jarmitage/0ac53dfecee8ed03e9f235d3e14ec9a2</a></p>
<p>Full details: <a href="${"https://indico.fnal.gov/event/23628/contributions/240304/"}" rel="${"nofollow"}">https://indico.fnal.gov/event/23628/contributions/240304/</a></p>`;
    }
  })}`;
});
var rootWorkshop2022 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Root_workshop_2022,
  metadata: metadata$g
});
var metadata$f = {
  "layout": "news",
  "date": "2022-04-29",
  "title": "Living Algorithms at RAFLOST Festival",
  "description": "Living Algorithms at RAFLOST Festival",
  "featured": false
};
var Living_algorithms = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$f), {}, {
    default: () => {
      return `<p>The <a href="${"https://iil.is"}">Intelligent Instruments Lab</a> presents the first event in their 2022 concert series - <em>Living Algorithms</em> - in partnership with <a href="${"https://raflost.is"}" target="${"_blank"}">RAFLOST Festival</a>, and supported by <a href="${"https://rannis.is"}" target="${"_blank"}">Rann\xEDs</a> Music Fund.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "events/living-algorithms.jpg",
        alt: "Intelligent Instruments Lab and RAFLOST Festival logos.",
        caption: "Intelligent Instruments Lab are partnering with RAFLOST Festival for Living Algorithms."
      }, {}, {})}
<p><em>Living Algorithms</em> aims to celebrate and disseminate live coding - a practice involving the creation of art by writing and changing computer programs while they run.
For more information about the international live coding community, see <a href="${"https://toplap.org/"}" target="${"_blank"}">TOPLAP</a> and <a href="${"https://algorave.com/"}" target="${"_blank"}">Algorave</a>.</p>
<p>Free live coding workshops will take place at Listah\xE1sk\xF3li \xCDslands \xDEverholt throughout May 16-20th delivered by experts Professor Thor Magnusson (creator of the <a href="${"http://thormagnusson.github.io/threnoscope/"}" target="${"_blank"}">Threnoscope</a>), Dr Jack Armitage (<a href="${"https://www.youtube.com/c/LilData"}" target="${"_blank"}">Lil Data</a>) and PhD researcher Victor Shepardson.
We are also pleased to invite artists <a href="${"https://www.facebook.com/ida.s.juhl"}" target="${"_blank"}">Ida Schuften Juhl</a> and <a href="${"https://hdor.is/"}" target="${"_blank"}">Halld\xF3r Eldj\xE1rn</a> to provide additional creative and musical inspiration and encouragement.</p>
<p>Members of the public are welcome to drop in for a beginner friendly introduction, or to go deeper into advanced topics as the week goes on.
Those who wish to go all the way will have the opportunity to perform at the RAFLOST Closing Party on Saturday 21st May.</p>
<p>The full programme is as follows:</p>
<br>
<ul><li>Mon 16 May, 13:00-17:00: Introduction to live coding</li>
  <li>Tues 17 May, 13:00-17:00: Live coding with TidalCycles</li>
  <li>Weds 18 May, 13:00-17:00: Hybrid live coding with iipyper</li>
  <li>Thurs 19 May, 13:00-17:00: Practise and rehearsals for RAFLOST Closing Party</li>
  <li>Fri 20 May, 15:00-17:00: Open Lab x RAFLOST</li>
  <li>Sat 21 May: Live coding at RAFLOST Closing Party</li></ul>
<br>
<p>Sign-up is now live with a deadline of Friday 6th May: <a href="${"https://forms.office.com/r/pi6rTBKKgM"}" rel="${"nofollow"}">https://forms.office.com/r/pi6rTBKKgM</a>.</p>
<p>Event page on Facebook: <a href="${"https://www.facebook.com/events/1116271868942780"}" rel="${"nofollow"}">https://www.facebook.com/events/1116271868942780</a>.</p>
<p>Places are limited and will be allocated on a first-come first-serve basis.</p>
<p>Contact us for more information: <a href="${"mailto:iil@lhi.is"}">iil@lhi.is</a>.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "logos/rannis.png",
        alt: "Rannis logo",
        caption: "This work is supported by Rann\xEDs Music Fund."
      }, {}, {})}`;
    }
  })}`;
});
var livingAlgorithms = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Living_algorithms,
  metadata: metadata$f
});
var metadata$e = {
  "layout": "news",
  "date": "2022-04-26",
  "title": "Residency at the IIL: Steve Symons",
  "description": "Enactive metaphors for collaborative musical instruments",
  "featured": false
};
var Steve_residency = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$e), {}, {
    default: () => {
      return `<p>Last week, the Intelligent Instruments Lab welcomed visiting researcher Steve Symons! Over the years, Steve has been making sound sculptures and art in the field of creative technology. He is currently a music technology doctoral researcher at the Leverhulme Trust funded <a href="${"http://be.ai/"}" rel="${"nofollow"}">be.AI</a> Centre (University of Sussex, Brighton, UK). There he explores enactive metaphors for collaborative musical instruments that enhance intra-dependant actions between human and non-human agents.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/steve.jpg",
        alt: "A man using a Gametrak control system with strings tied to his hands. Standing in front of a yellow and blue shelving system. In the foreground, a large instrument.",
        caption: "Steve Symons using the Gametrak at the IIL."
      }, {}, {})}
<p>Steve is mostly known for his interactive sound systems and instruments that he improvises with or exhibits for the public to play. He has also gained recognition for his involvement in the Owl Project, a sculptural collective with sound art.</p>
<p>For his month long residency he will experiment with collaborative instruments using an old Gametrak control system, originally made for video games in the early 2000s, this interface has become quite popular among musicians. The device has a pair of joy sticks that are controlled by moving nylon strings.\xA0These strings are retractable and the Gametrak measures how far you pull them out.\xA0This makes a great movement sensor for tracking the positions of two hands.\xA0Steve gives two performers one sensor each and his instruments then respond as they move them in a coordinated way.</p>
<p>Furthermore, Steve is interested in doing research with another kind of collaborative music making using a volumetric camera which measures distance, like X-box\u2019s Connect. Six to eight people, for example, could stand around a table and make music using movement picked up by the camera.</p>
<p>When Steve is not in Iceland researching collaborative instruments or working on his doctoral thesis, he\u2019s busy running his consultation company on technology for artists, both visual artists and musicians. His project range from helping artists getting tidal waves in Bangladesh to control <a href="${"http://alisonneighbourdesign.com/work-in-progress/the-future-wales-coast-path/"}">a lighthouse in Wales</a> to leading people to secret locations using sounds in mysterious <a href="${"https://www.invisible-forces.com/projects/congregation/"}">silver spheres</a>.</p>`;
    }
  })}`;
});
var steveResidency = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Steve_residency,
  metadata: metadata$e
});
var metadata$d = {
  "layout": "news",
  "date": "2021-10-18",
  "title": "In the Icelandic Media",
  "description": "Introductions to the project in Icelandic",
  "featured": false
};
var Icelandic_news = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$d), {}, {
    default: () => {
      return `<p>Primary Investigator Thor Magnusson, has been asked on several occasions to present the Intelligent Instruments project in the Icelandic media. These are some of our favourite moments, note that all of the interviews are in Icelandic. </p>
<h2>An Article in \xDEr\xE6\xF0ir</h2>
<p>Atli Ing\xF3lfsson, an editor of \xDEr\xE6\xF0ir - the research journal of the Iceland University of the Arts Music Department - invited us to write an article on the Intelligent Instruments project.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/thraedir.png",
        alt: "A photo of graphics from Thraedir web page. At the top it says Listah\xE1sk\xF3li \xCDslands Iceland University of the Arts and at the bottom it says \xDEr\xE6\xF0ir. In the background, chaotic threads with motion blur.",
        caption: "A screen grab from the Thraedir website."
      }, {}, {})}
<p>The article discusses the baseline of the IIL research questions. The title in English is: Smart Instruments - Understanding 21st Century AI Through Creative Music Technologies. </p>
<p><a href="${"https://www.lhi.is/en/node/15311"}">Read full article here. </a></p>
<h2>An Interview in Hugarflug at the Start of the Project </h2>
<p>On February 12th 2021, Thor did a 60 minute live stream with the Hugarflug mini-conference hosted by the Iceland University of Arts. His aim was to answer the question of what meaning AI has for creative processes. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/hugarflug.png",
        alt: "Two men sitting in chairs by a table, having a discussion.",
        caption: "Thor being interviewed in the Hugarflug series."
      }, {}, {})}
<p><a href="${"https://hugarflug.lhi.is/Torhallur-Magnusson"}">Watch the Interview here. </a></p>
<h2>An Introduction in Fr\xE9ttabla\xF0i\xF0 </h2>
<p>On September 24th, mainstream media Fr\xE9ttabla\xF0i\xF0 published an interview with Thor about the project. There he explained the terms we\u2019re working with and answered questions such as \u201Cwhat is a smart-instrument\u201D, \u201Cdo composers use AI in their creations?\u201D and \u201Chow is the funding important for the topic?\u201D</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/frettabladid21.jpg",
        alt: "A man standing with a part of a speaker. Shelves in the background.",
        caption: "Photo by EY\xDE\xD3R/Fr\xE9ttabla\xF0i\xF0."
      }, {}, {})}
<p><a href="${"https://www.frettabladid.is/kynningar/nai-samband-vi-hljofri-me-gervigreind/"}">Read the full interview here. </a></p>
<h2>An Interview on the National Radio Broadcast Iceland </h2>
<p>Shortly after receiving the ERC grant, on December 10th 2020, Lestin, a cultural program of the National Radio Broadcast Services in Iceland (R\xDAV), interviewed Thor about what this means for the science behind AI and instruments. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/lestin2020.png",
        alt: "A screen grab from RUV\u2019s website. Man in the background on the left, on the right a silhouette of a man coding, a play button in the middle. Text at the bottom saying T\xEDmam\xF3tastyrkur til ranns\xF3knarverkefnis \xE1 velum LH\xCD.",
        caption: "A screenshot of R\xDAV\u2019s website."
      }, {}, {})}
<p><a href="${"https://www.ruv.is/frett/2020/12/10/timamotastyrkur-til-rannsoknarverkefnis-a-vegum-lhi"}">Listen and read the full interview here. </a></p>`;
    }
  })}`;
});
var icelandicNews = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Icelandic_news,
  metadata: metadata$d
});
var metadata$c = {
  "layout": "news",
  "date": "2021-12-18",
  "title": "Moving String Symposium",
  "description": "An International Symposium in Reykjavik on New ways of Moving Strings",
  "featured": false
};
var Moving_strings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$c), {}, {
    default: () => {
      return `<p>We ran the Moving String Symposium in Reykjavik in December 2021. The event included workshops in the Magnetic Resonator Piano, symposium with feedback musicians, and a keynote from Andrew McPherson. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "events/moving-strings/tabita.jpg",
        alt: "A photo of Tabita with her Tensegrity instrument. The picture is of the instrument with her in the centre performing on it."
      }, {}, {})}
<p>Tinna Thorsteinsdottir ran the MRP workshops, and we are pleased to present the result of those workshops here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/he4wBSFEl18"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>Andrew McPherson\u2019s talk is here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/8pfybzsT4tY"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>And our Symposium day can be found here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/FQpg06Imiao"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>`;
    }
  })}`;
});
var movingStrings = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Moving_strings,
  metadata: metadata$c
});
var metadata$b = {
  "layout": "news",
  "date": "2022-01-31",
  "title": "Summer Internships at the IIL",
  "description": "Opportunities for students to join the IIL",
  "featured": false
};
var Summer_interns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$b), {}, {
    default: () => {
      return `<p>-Icelandic text below-</p>
<p><strong>Summer Research Internship at the Intelligent Instruments Lab</strong></p>
<p>We are now seeking letters of interest from students based in Iceland who would like to work with us in the summer of 2022 in our Reykjavik lab. </p>
<p><strong>Who we are:</strong>
The Intelligent Instruments Lab is an interdisciplinary research lab that investigates the role of artificial intelligence in new musical instruments. Music is our research base, but the reach and impact is wider and we explore how musical interfaces can be applied as scientific instruments, for example through sonification. </p>
<p><strong>What we do:</strong></p>
<p>We work equally with actual instrument design and writing software, and musical performance is an important part of what we do. Our focus is to understand how AI changes the way we think, talk and reflect upon the role of new creative AI.</p>
<p><strong>Where do you come in?</strong>
We can offer two possible paths for working with us, in both cases we expect students to choose a topic for their research and discuss it with our team. </p>
<p>1) Our masters summer programme. Here, a master\u2019s student in any of the Icelandic universities can apply to work with us for a period of maximum two months. </p>
<p>2) The Icelandic Innovation Fund. Here students apply via Rannis, but in collaboration with us. Note the deadline is close!</p>
<p>Information: <a href="${"https://en.rannis.is/funding/research/icelandic-student-innovation-fund/nr/570"}" rel="${"nofollow"}">https://en.rannis.is/funding/research/icelandic-student-innovation-fund/nr/570</a></p>
<p><strong>How to apply:</strong></p>
<p>If you think your idea is a good fit for the IIL lab, don\u2019t hesitate to contact us! Please send us an email (<a href="${"mailto:thor.magnusson@lhi.is"}">thor.magnusson@lhi.is</a>) with a paragraph that includes the following information: university, course of studies, current degree, musical background and project idea. We look forward to hearing from you.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/student_IIL.jpeg",
        alt: "A young man sitting with an intelligent string instrument in front of blue and yellow shelves.",
        caption: "Doctoral student Victor studying the langspil at our lab in IUA \xDEverholt."
      }, {}, {})}
<p><strong>Sumarst\xF6rf fyrir nemendur vi\xF0 Intelligent Instruments Lab</strong></p>
<p>Vi\xF0 k\xF6llum eftir ums\xF3knum um samstarf vi\xF0 nemendur sem b\xFAsettir eru \xE1 \xCDslandi og hafa \xE1huga \xE1 a\xF0 starfa \xE1 ranns\xF3knarstofunni okkar \xED Reykjav\xEDk sumari\xF0 2022. </p>
<p><strong>Hver vi\xF0 erum:</strong></p>
<p>Intelligent Instruments ranns\xF3knarstofan er \xFEverfr\xE6\xF0ileg ranns\xF3knarstofa sem rannsakar hlutverk gervigreindar \xED n\xFDjum hlj\xF3\xF0f\xE6rum. T\xF3nlist er undirsta\xF0a ranns\xF3knarefna en umfang og \xE1hrif eru mun v\xED\xF0t\xE6kari og vi\xF0 sko\xF0um hvernig h\xE6gt er a\xF0 \xFAtf\xE6ra vi\xF0m\xF3t \xED t\xF3nlist sem v\xEDsindaleg t\xF3l, til d\xE6mis me\xF0 \xFEv\xED a\xF0 nota hlj\xF3\xF0ferla til a\xF0 vinna \xFAr annars konar g\xF6gnum.</p>
<p><strong>\xDEa\xF0 sem vi\xF0 gerum:</strong></p>
<p>Vi\xF0 vinnum jafnmiki\xF0 me\xF0 hlj\xF3\xF0f\xE6rah\xF6nnun og hugb\xFAna\xF0arger\xF0, einnig er t\xF3nlistarflutningur mikilv\xE6gur \xFE\xE1ttur \xED okkar starfi. Vi\xF0 viljum skilja hvernig gervigreind breytir \xFEv\xED hvernig vi\xF0 hugsum og t\xF6lum og hvernig vi\xF0 skynjum hlutverk hinnar n\xFDju skapandi gervigreindar. </p>
<p><strong>Hvar kemur \xFE\xFA inn \xED myndina?</strong></p>
<p>Vi\xF0 bj\xF3\xF0um upp \xE1 tv\xE6r lei\xF0ir fyrir nemendur a\xF0 starfa me\xF0 okkur, \xED b\xE1\xF0um tilfellum vinnur nemandinn a\xF0 eigin hugmynd sem er \xFEr\xF3u\xF0 me\xF0 teyminu okkar.</p>
<p>1) Sumarst\xF6rf meistaranema. Hva\xF0a meistaranemi sem er, sem stundar n\xE1m vi\xF0 \xEDslensku h\xE1sk\xF3lana, getur s\xF3tt um a\xF0 vinna me\xF0 okkur \xED tvo m\xE1nu\xF0i. </p>
<p>2) N\xFDsk\xF6punarsj\xF3\xF0ur n\xE1msmanna. \xCD samstarfi vi\xF0 okkur s\xE6kja nemendur milli anna um styrk hj\xE1 Rann\xEDs. Athugi\xF0 a\xF0 ums\xF3knarfrestur n\xE1lgast!</p>
<p>N\xE1nar: <a href="${"https://www.rannis.is/sjodir/menntun/nyskopunarsjodur-namsmanna/nr/19"}" rel="${"nofollow"}">https://www.rannis.is/sjodir/menntun/nyskopunarsjodur-namsmanna/nr/19</a></p>
<p>Hvernig \xE1 a\xF0 s\xE6kja um:</p>
<p>Ef \xFE\xFA heldur a\xF0 \xFE\xEDn hugmynd eigi heima \xE1 IIL ranns\xF3knarstofunni skaltu ekki hika vi\xF0 a\xF0 hafa samband! Vinsamlegast sendu okkur t\xF6lvup\xF3st (<a href="${"mailto:thor.magnusson@lhi.is"}">thor.magnusson@lhi.is</a>) me\xF0 stuttum texta sem inniheldur eftirfarandi atri\xF0i: h\xE1sk\xF3li, fag, n\xFAverandi gr\xE1\xF0a, t\xF3nlistarbakgrunn og hugmynd a\xF0 verkefni. Vi\xF0 hl\xF6kkum til a\xF0 heyra fr\xE1 ykkur!</p>`;
    }
  })}`;
});
var summerInterns = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Summer_interns,
  metadata: metadata$b
});
var metadata$a = {
  "layout": "news",
  "date": "2022-06-21",
  "title": "Trash Sounds",
  "description": "Everything you need to know about the workshop",
  "featured": false
};
var Trash_workshop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$a), {}, {
    default: () => {
      return `<p>RUSL FEST 2022 is just around the corner and we\u2019re working hard prepping our Trash Sounds workshop. Here you\u2019ll find all you need to know about the workshop and what is included in the ticket. </p>
<p>First off, the workshop is designed to support individual needs and interests. We welcome people who want to learn something new and also people who already have something in mind they want to build. </p>
<p>If you want to learn how to build your very own instrument, using \u201Ctrash\u201D, then this is the workshop for you. Everyone learns on their own pace and due to the vast experience of our workshop leaders, you can decide to learn new skills in the process. You don\u2019t have to learn everything, just find the thing that interests you the most and build from there!</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/trash-group.jpg",
        alt: "A group of workshop leaders sitting and smiling.",
        caption: "The workshop leaders: Robin, Karl, Sean, Sigga and Jack."
      }, {}, {})}
<p>Trash Sounds, a week-long workshop on designing and performing with intelligent musical instruments made from discarded materials.</p>
<p>Dates: 27.06. - 02.07. 2022</p>
<p>Age limit: 20</p>
<p>Location: F\xFAsk, Gufunes, 112 Reykjav\xEDk (Iceland) a.k.a. Grafarvogur</p>
<p>Language: Our instructors speak both Icelandic and English but we will mostly use English</p>
<p>Areas we will look at:
\xA0</p>
<ul><li>Musical instrument design</li>
<li>Techniques for real-time audio programming (from scratch)</li>
<li>Creative AI for gesture-sound mapping</li>
<li>Sonic interaction design</li>
<li>Physical instrument craft</li>
<li>Speculative design </li></ul>
<p>\xA0</p>
<p>Interested in any of these areas? </p>
<p>You don\u2019t have to learn all if it or use all your new skills for your musical instrument. Simply pick the fields you\u2019re most interested in. This is a relaxed setting where each participants can choose their own learning path. The instructors will be there with you, building their own stuff and helping others out with theirs. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/trash-stuff1.jpg",
        alt: "Various musical instruments and other things on a yellow surface.",
        caption: "Anything can be a musical instrument if you've got imagination."
      }, {}, {})}
<p>All participants will receive direct instruction in the topics above, using their new skills to rehabilitate waste materials into living musical objects</p>
<p>To show off your new skills, we will collectively improvise music daily at one of the many unique sites at F\xDASK Gufunes. Musical experimentation is encouraged and mistakes are welcomed! </p>
<p>Whether you\u2019re a beginner, a musician, maker or anything in between, you are very welcome to join the workshop. Together we will create a friendly environment where everyone listens to and learns from each other.</p>
<p>The schedule is as follows:</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/trash_schedule.png",
        alt: "MON 27, Welcome, Free Lunch!, Workshop, Lecture, Warm Up Party, TUE 28, Workshop, Free Lunch!, Workshop, Lecture, Movie Screening, WED 29 Workshop, Free Lunch!, Workshop, Lecture, , Exp. and Trash Music, THU 30, Workshop Free Lunch!, Workshop, Lecture, , Radio and Massage Party, FRI 01, Optional Workshop, Free Lunch!, Workshop, Dinner, F\xFAsk Folk Vibe, SAT 02, Presentaiton, Buxur Party.",
        caption: "The Schedule for the Festival"
      }, {}, {})}
<p>Included in the price of the ticket is not only the Trash Sounds workshop itself but also tickets to some of RUSL FEST\u2019s most popular events, such as parties and concerts like Massage and Buxur. </p>
<p>Furthermore, the festival provides vegan food for lunch and dinner each day of the workshop so you won\u2019t go hungry! </p>
<p>To bring discarded materials to life, participants will use a kit loaned by the Intelligent Instruments Lab for the duration of the workshop. Central to this kit is the Bela high performance interactive audio and sensor platform (<a href="${"http://bela.io/"}" rel="${"nofollow"}">http://bela.io/</a>). The kit also includes various sensors and actuators allowing participants\u2019 creations to perceive motion, vibration and light, and in turn vibrate and resonate objects and materials of choice.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/trash-stuff2.jpg",
        alt: "Various things on a yellow table, including boxes with electronics and string cases, a Moog theramin, drum sticks, an empty drinking bottle and electronic cables. In the background, a man holding an interesting wooeden instrument.",
        caption: ""
      }, {}, {})}
<p>Tickets are available at:
<a href="${"https://tix.is/is/event/13336/rusl-fest/"}" rel="${"nofollow"}">https://tix.is/is/event/13336/rusl-fest/</a></p>
<p>Full RUSL FEST program is available here. Note that all the lectures are free for all!
<a href="${"https://ruslfest.is/Home"}" rel="${"nofollow"}">https://ruslfest.is/Home</a></p>`;
    }
  })}`;
});
var trashWorkshop = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Trash_workshop,
  metadata: metadata$a
});
var metadata$9 = {
  "layout": "news",
  "date": "2022-04-07",
  "title": "PhD2 Still Open for Applications",
  "description": "A PhD scholarship deadline coming up",
  "featured": false
};
var Phd2_deadline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$9), {}, {
    default: () => {
      return `<p>With one month to go until the deadline (May 2nd to be precise) for applications for our second PhD scholarship, we wanted to take the time to elaborate further on why this position is so exciting to us, and how it will contribute to our project.</p>
<p>Our lab began work in September 2021 designing intelligent musical instruments, and by September 2022 when our second PhD researcher will start their research, we expect to have developed a good collection of instruments.</p>
<p>In addition to contributing to further development of these instruments and user test them, role of this second PhD researcher will be to take these instruments and insert them into real musical contexts: bands, ensembles, orchestras, studios, concerts, gigs, recording projects, exhibitions, workshops and more.</p>
<p>This PhD researcher will research the relationships that musicians and audiences create with intelligent instruments, investigating everything from how people initially encounter and perceive them, to how they eventually customise the instrumental intelligence through teaching them to adapt in different ways. The PhD researcher will also design their own instruments or systems, and make variations of the ones we have already.</p>
<p>The position will involve developing relationships across the musical culture of Iceland and beyond, and working with the most exciting venues in the country from Mengi to Harpa. It will also involve developing and curating outlets such as Intelligent Instrument Records to facilitate further musical interactions and discourses.</p>
<p>In short, this will be an extremely fun and unique position, that puts the researcher at the nexus of where new intelligent instruments meet musical culture.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/sigga-4884.jpg",
        alt: "A young woman with a fiddle stick sitting in front of four proto-langspil trichord instruments, some are connected with electrical wires. Behind her is a yellow shelving system with musical instruments and electronic parts.",
        caption: "Our research intern Sigga exploring the proto-langspil at the Intelligent Instruments Lab."
      }, {}, {})}
<p>The deadline is May 2nd. This position is for three years and it is expected that the candidate will start on September 1st, 2022.</p>
<p>If you have any questions about this position, please do reach out to us at <a href="${"mailto:iil@lhi.is"}">iil@lhi.is</a> - we are excited to hear from you!</p>
<p>Read our original announcement here: <a href="${"http://iil.is/news/phd2"}" rel="${"nofollow"}">http://iil.is/news/phd2</a></p>
<p>Further information on the\xA0Iceland University of Arts website: <a href="${"https://www.lhi.is/en/intent-phd-scholarship"}" rel="${"nofollow"}">https://www.lhi.is/en/intent-phd-scholarship</a></p>`;
    }
  })}`;
});
var phd2Deadline = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Phd2_deadline,
  metadata: metadata$9
});
var metadata$8 = {
  "layout": "news",
  "date": "2022-05-11",
  "title": "Celebrating International Synthesizer Day",
  "description": "See you down at Reykjavik City Library's Den of Synth!",
  "featured": false
};
var Synthabaeli = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$8), {}, {
    default: () => {
      return `<p>We are pleased to be participating in this years Synthab\xE6li | Hlj\xF3\xF0gervlamessa at Reykjav\xEDk City Library.
We will be bringing some things we\u2019ve been working on, and are looking forward to seeing you there!</p>
<p>More info on the event below:</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/synthabaeli.jpg",
        alt: "Promotional graphic for Synthab\xE6li | Hlj\xF3\xF0gervlamessa, 14 May, Reykjavik City Library..",
        caption: "Synthab\xE6li | Hlj\xF3\xF0gervlamessa, 14 May, Reykjavik City Library."
      }, {}, {})}
<p>International Synthesizer Day is celebrated each year around the birthday of Robert Moog (May 23rd 1934), the inventor of the first commercial synth. His beloved creation has had such a massive influence across all genres that it would be difficult to imagine modern music without the synthesizer.</p>
<p>In honor of the glorious synthesizer, the downtown Reykjavik City Library will transform its first floor into a fantastic Den of Synth! On Saturday, May 14th, visitors and the curious of all ages can wander among and play with all kinds of magical synthesizers and rare gear that musicians and other synth enthusiasts will have on display. An electronic music wonderland awaits you, and everyone is invited!</p>
<p><a href="${"https://www.facebook.com/events/3298760190383641"}" rel="${"nofollow"}">https://www.facebook.com/events/3298760190383641</a></p>`;
    }
  })}`;
});
var synthabaeli = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Synthabaeli,
  metadata: metadata$8
});
var metadata$7 = {
  "layout": "news",
  "date": "2021-10-07",
  "title": "Off to a good start...",
  "description": "What we have been up to in the first month.",
  "featured": false
};
var Good_start = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$7), {}, {
    default: () => {
      return `<p>On September 1st, our team met for the first time in real life. Thor, Halld\xF3r, Jack, Victor and Esther came together in the basement Iceland University of the Arts to plot the first steps of the five-year-long journey we have ahead of us now.
This marks the start of the project where we will study the impact of creative AI, conducted in the research domain of music, with a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists.
The university has generously provided us with two different spaces for labs. We call them the Blue Lab, which is in the basement and will serve as a recording studio, and the Yellow Lab, which is on 4th floor and is used as an office and a space for prototyping.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/empty_lab_yellow.jpg",
        alt: "A panorama photo of a large class room what only has one table and a few blue chairs scattered around in a disorganised way. In the middle, a young man sitting in a corner with a laptop.",
        caption: "The first picture taken at the Yellow Lab. In the middle you'll see Victor. Photo by Jack."
      }, {}, {})}
<p>Through a streamlined research collaboration protocol, we seek to explore the language and discourse of creative AI, addressing our changed notions of, for example, agency, autonomy, authenticity, authorship, creativity and originality.</p>
<p>In order to achieve this goal, the technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn, and evolve in the hands of the performer. The instruments become boundary objects, studied by collaborators from a range of sciences and the general public.</p>
<p>We used September to prototype a monochord (Icelandic <em>langspil</em>) \u2026 which by the end of the month had ended up with three chords. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/prototype_langspil_cardboard.jpg",
        alt: "A simple cardboard prototype of a long box-shaped instrument.",
        caption: "Our first prototype."
      }, {}, {})}
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/prototype_langspil_plywood_1.jpg",
        alt: "A plywood prototype of a long box-shaped instrument.",
        caption: "Our second prototype."
      }, {}, {})}
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/prototype_langspil_plywood_2_electrical_chords.jpg",
        alt: "A complex prototype of a long box-shaped instrument with audio and electric cables connected.",
        caption: "And our third prototype."
      }, {}, {})}
<p>Through technology development we will create the conditions to study higher level theoretical questions on the meaning of creative AI in contemporary culture. This project takes a pioneering leap in research about AI by answering how new creative AI transforms our relationships with technology and other people. Grounded equally in technology development and the humanities, the project will benefit diverse disciplines by developing a theoretical framework of creative AI, initiating a discourse around human-centred creative AI, and defining principles of human-AI relations in services and products.</p>
<p>Our next steps include summoning artists to experiment with the prototype and researchers from diverse disciplines to conduct frontier science on intelligent instruments as boundary objects. </p>
<p>So stay tuned!</p>`;
    }
  })}`;
});
var goodStart = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Good_start,
  metadata: metadata$7
});
var metadata$6 = {
  "layout": "news",
  "date": "2022-02-04",
  "title": "Sound Works: An Orpheus Institute Publication",
  "description": "A research article about the Threnoscope",
  "featured": false
};
var Soundworks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$6), {}, {
    default: () => {
      return `<p>Thor Magnusson\u2019s text <i>Designing the Threnoscope, or, How I Wrote One of My Pieces</i> has just been published in a new Orpheus Institute Publicaton called <a href="${"https://orpheusinstituut.be/en/publications/sound-work"}" target="${"_blank"}">Sound Work</a>. </p>
<p>Download the chapter here: <a href="${"http://users.sussex.ac.uk/~thm21/thor/pdfs/Magnusson_SoundWork.pdf"}" target="${"_blank"}">PDF</a></p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/soundwork.png",
        alt: "The front cover of the Sound Works book",
        caption: "A picture of medieval musicians"
      }, {}, {})}
<p>The Threnoscope live coding system started as a musical piece exploring ideas of microtonal music, surround sound, and long duration time frames. During its compositional design process the piece evolved into a live coding performance system, a hybrid of an instrument and a compositional system. The unfolding of the work took place in a context of live performances, audience feedback, user comments, and ideas that developed in concert with how the body of code grew and stabilised.</p>
<p>This chapter introduces the system, the research underpinning it, and describes how the bricoleur approach to programming served as a platform for asking questions that materialised in the engagement with the code, the physical properties of sound, and compositional ideas. The piece is a good example of a practice-based research, involving questions in the fields of music, human-computer interaction, programming language design, and user studies. </p>
<p>The chapter reflects on the nature of artistic research and how music software development goes hand in hand with music research. I demonstrate how the digital system\u2019s requirements for specifications and completeness inevitably forces a strong understanding of the source domain, namely the physical nature of sound. Such musical practice, when expressed through performance or composition, derives from a rigid research process, yet exists separately from it. </p>`;
    }
  })}`;
});
var soundworks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Soundworks,
  metadata: metadata$6
});
var metadata$5 = {
  "layout": "news",
  "date": "2021-12-21",
  "title": "ICLC 2021 Panel",
  "description": "Thor Magnusson presents work at a panel session at ICLC 2021",
  "featured": false
};
var ICLC2021 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$5), {}, {
    default: () => {
      return `<p>The International Conference on Live Coding took place in Chile this year, but was held primarily online. The programme was diverse and excting with participants around the globe and can be found <a href="${"https://iclc.toplap.org/2021/"}">here</a>.</p>
<p>The panel with Iris Saladino and Thor Magnusson</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/4GVMkly5QUk?start=10881"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>The ICLC conferences have been running since 2015, the first one being part of an AHRC network that was run by Alex McLean (Leeds) and Thor Magnusson (Sussex). It\u2019s been great to see the conference developing and maturing as the field of live coding does. More on this later, but the MIT Press will soon publish a book which Alex and Thor co-wrote with Emma Cocker, Alan Blackwell and Geoff Cox, on live coding. </p>
<p>At the Intelligent Instruments Lab, we don\u2019t focus on live coding, but it has become an integral part of everything we do. The philosophy of modularity, liveness, resistance to definitions, and redesinging things whilst they are in operation are part of our core thinking. There is no question how deeply live coding philosophy underpins this mindset, and indeed it perhaps supports the statement Thor wrote in his Herding Cats article:</p>
<quote>Considering that live coding as a performance method represents a propitious and natural way
of engaging with notation or instructions in real time, we might question whether the approach
of defining live coding as a specific category is necessary from a longer-term perspective. At least we might rethink in which contexts it might be beneficial to maintain the category, because when the novelty wears off and the naturalization process has fully taken place, we may find the method blends so effortlessly into the diverse art forms that we don\u2019t need to talk about live coding anymore. In this future scenario, live coding simply becomes one of the most pertinent approaches among avail- able performance techniques that allow for real-time composition and improvisation.</quote>
<p>REF: <a href="${"https://direct.mit.edu/comj/article/38/1/8/94447/Herding-Cats-Observing-Live-Coding-in-the-Wild"}" rel="${"nofollow"}">https://direct.mit.edu/comj/article/38/1/8/94447/Herding-Cats-Observing-Live-Coding-in-the-Wild</a></p>`;
    }
  })}`;
});
var ICLC2021$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ICLC2021,
  metadata: metadata$5
});
var metadata$4 = {
  "layout": "news",
  "date": "2022-05-20",
  "title": "Welcoming Ezra Pierce, GSOC 2022 contributor!",
  "description": "Ezra will work on ",
  "featured": true
};
var Gsoc2022 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$4), {}, {
    default: () => {
      return `<p>Congratulations to Ezra Pierce, our first ever <a href="${"https://summerofcode.withgoogle.com/"}" target="${"_blank"}">Google Summer of Code</a> contributor, who is joining us via the <a href="${"https://beagleboard.org/"}" target="${"_blank"}">BeagleBoard</a> foundation.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "images/people/ezra.jpeg",
        alt: "Ezra Pierce.",
        caption: "Ezra Pierce"
      }, {}, {})}
<p>Ezra\u2019s project will investigate \u201CRunning Machine Learning Models on <a href="${"https://bela.io/"}" target="${"_blank"}">Bela</a>\u201D to support intelligent instrument designers:</p>
<p>\u201CThe goal of this project is to improve the tooling surrounding embedded machine learning on the BeagleBone Black(BBB)/Bela to aid its community in experimenting with machine learning applications for their projects. The specific developer tools chosen for this project are an inference benchmarking tool as well as a perf-based profiler developed for the BBB/Bela platform.</p>
<p>Bela is a platform built upon the BeagleBone Black, consisting of an audio cape and a custom real-time Linux image using the Xenomai framework. This platform provides a low-latency computing environment ideal for use in audio applications. There already exists a large community surrounding the Bela, as it is an increasingly popular platform for use in educational settings as well as musical instrument design and maker communities. This project aims to extend the Bela platform to include tools and documentation for machine learning projects, with the goal of simplifying the process of integrating machine learning models into real-time embedded Bela projects. As the Bela platform has been adopted by a wide range of users, from artists to engineers, this project will aim to provide tooling that caters to this broad userbase.\u201D</p>
<p>Read Ezra\u2019s full project proposal here: <a href="${"https://elinux.org/BeagleBoard/GSoC/2022_Proposal/Running_Machine_Learning_Models_on_Bela"}" rel="${"nofollow"}">https://elinux.org/BeagleBoard/GSoC/2022_Proposal/Running_Machine_Learning_Models_on_Bela</a></p>`;
    }
  })}`;
});
var gsoc2022 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Gsoc2022,
  metadata: metadata$4
});
var metadata$3 = {
  "layout": "news",
  "date": "2022-05-23",
  "title": "Announcing Trash Sounds workshop at RUSL Festival 2022",
  "description": "",
  "featured": false
};
var Rusl2022 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$3), {}, {
    default: () => {
      return `<p>Presenting <a href="${"https://ruslfest.is/TRASH-SOUNDS"}" target="${"_blank"}">Trash Sounds</a>, a week-long intensive workshop from June 27 - July 2 on designing and performing with intelligent musical instruments made from discarded materials, as part of <a href="${"https://ruslfest.is"}" target="${"_blank"}">RUSL Festival 2022</a>.</p>

<p>In this workshop, you will gain hands-on experience with the cutting edge of musical instrument design, learning from scratch techniques for real-time audio programming, creative AI for gesture-sound mapping, sonic interaction design, physical instrument craft, and speculative design.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/ruslbanner.jpeg",
        alt: "A banner with graphic calligraphy saying RUSL: Sustainable Design Festival / Listah\xE1t\xED\xF0. June 27th to July 2nd 2022. Location Gufunes.",
        caption: "RUSL FEST is a sustainable design festival in Gufunes, Reykjav\xEDk."
      }, {}, {})}
<p>Each day you will receive direct instruction in one of the topics above, using your new skills to rehabilitate waste materials into living musical objects, and to collectively improvise music daily at one of the many unique sites at F\xDASK Gufunes.</p>
<p>We welcome beginners, musicians, makers and everyone in between, and especially those who are not well represented in music technology today. Together we will cultivate a friendly environment where everyone listens to and learns from each other.</p>
<a href="${"https://ruslfest.is"}" target="${"_blank"}">RUSL</a> is a sustainable design festival focusing on circular thinking and its application within art, design and culture. 
The festival is held within the new creative neighborhood of Gufunes. 
A week-long event with workshops, lectures, exhibitions, dinners and social gatherings. 
Included in your ticket is a workshop, daily lunch &amp; dinner, lectures, events over the week and access to the final party BUXUR.
 ${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/rusl-sigga.png",
        alt: "In the background, a woman sitting in front of four handmade instruments. Graphics say: Vinnustofur, TRASH SOUNDS, Jack Armitage, Sigga, Karl, Robin and Sean from the Intelligent Instruments Lab. RUSL logo. https://ruslfest.is.",
        caption: "Trash Sounds intructors are Jack Armitage, Sigga, Karl, Robin and Sean."
      }, {}, {})}
<p>More info and tickets at: <a href="${"https://ruslfest.is/"}" rel="${"nofollow"}">https://ruslfest.is/</a></p>
<p>Follow RUSL on Instagram: <a href="${"https://www.instagram.com/rusl.fest/"}" rel="${"nofollow"}">https://www.instagram.com/rusl.fest/</a></p>
<p>Contact RUSL festival: <a href="${"mailto:info@fusk.is"}">info@fusk.is</a></p>`;
    }
  })}`;
});
var rusl2022 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Rusl2022,
  metadata: metadata$3
});
var metadata$2 = {
  "layout": "news",
  "date": "2022-06-09",
  "title": "Robin joins the IIL, turning weather data into music",
  "description": "On Robin's project this summer",
  "featured": true
};
var Robin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$2), {}, {
    default: () => {
      return `<p>We\u2019re happy to have Robin Morabito join us this summer for an internship supported by the Student Innovation Fund. He\u2019ll be working on a very exciting project, transforming weather data into sound! Here you can read all about him and his project, in his own words\u2026</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/robin_device.jpeg",
        alt: "A young man holding an unusual device. Yellow shelving system in the background.",
        caption: "Robin Morabito designed an interactive sonification instrument."
      }, {}, {})}
<p>I\u2019m Robin, recently graduated from Composition - New Media at the Iceland University of the Arts. I\u2019ve played music since I was a kid, starting with guitar and slowly extending to violin, vocal studies, computer music and sound engineering. These last few years I got increasingly interested in sonification, which is an awesome way to make music out of raw data and learn what information those data contain. </p>
<p>I did some experiments with real-time Icelandic weather data during the past couple of years, culminating in two pieces: Ve\xF0urhorni\xF0 (an interactive performance using weather data and Facebook reactions in real-time to generate an extended French horn score) and Ve\xF0urg\xEDtarar (a Max patch using real-time weather data to produce generative music).
\xA0</p>
<p>Ve\xF0urhorni\xF0:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/B3oXS7LfJ2I"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<p>Ve\xF0urg\xEDtarar:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/vr4iij3tnBw"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<p>In my last piece, presented on May the 17th in Reykjav\xEDk (Dynjandi hall), I used a Bela sensor board to embed a generative Pure Data music patch inside of a sculpture suspended in the middle of the air; audience could interact with the object and the soundscape produced via 6 sensors placed on the body of the sculpture. This interactive sound installation, obscurely titled \u201CThe only object they could retrieve from Earth\u2019s lost civilization\u201D, anticipates the project I hope to keep developing at the Intelligent Instrument Lab: an interactive sonification instrument, capable of adapting to the person using it and to the kind of dataset chosen. </p>
<p>\xA0
The Only Object They Could Retrieve from Earth\u2019s Lost Civilization</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/nAro0fELOv8"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<p>Sonification is becoming more and more popular to portray large multidimensional datasets, which can be perfectly represented with music. While our technology becomes increasingly complex, we have to find instruments to relate to the data that we produce and study: that\u2019s why sonification is so exciting, and why I wanted to spend three months in the lab learning more about it while learning how to perfect this process, to ultimately provide the community of people interested with additional resources for augmented sonification and sonification tools.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/schermata2.png",
        alt: "A strange metalic instrument, a hand close to it.",
        caption: "Robin's instrument."
      }, {}, {})}`;
    }
  })}`;
});
var robin = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Robin,
  metadata: metadata$2
});
var metadata$1 = {
  "layout": "news",
  "date": "2022-07-04",
  "title": "Karl J\xF3hannsson joins IIL this summer",
  "description": "An intelligent txalaparta percussion instrument is born",
  "featured": true
};
var Karl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$1), {}, {
    default: () => {
      return `<p>A warm welcome to Karl J\xF3hannsson who is working with us this summer researching a percussion instrument called txalaparta. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/karl.jpeg",
        alt: "Man sitting in front of a wooden percussion instrument, holding large wooden sticks. Yellow and blue shelving system in the background.",
        caption: "Karl J\xF3hannsson with his work in progress."
      }, {}, {})}
<h1 id="${"about-karl"}"><a href="${"#about-karl"}">About Karl</a></h1>
<p>My name is Karl and I am a MSc student in Computer Science at Reykjav\xEDk University, as well as studying at the F\xCDH school of music. I have a BA degree in psychology and philosophy from the University of Iceland and, subsequently, worked in software development for 14 years, ranging from web design to app development.</p>
<h1 id="${"about-the-project"}"><a href="${"#about-the-project"}">About the project</a></h1>
<p>My main project this summer will be teaching a computer to play an ancient Basque percussion instrument named txalaparta. It is typically played simultaneously by two players improvising in a call-and-response fashion and the goal is to get a computer to play along with a human txalaparta player. The instrument consists of a few long wooden planks that are beaten by special batons, which we have placed sensors on to abstract the human playing into data. The data is then fed into a system that processes it, learns its patterns, and responds with a prediction of when the next hit should be and which player will perform it. If all goes well, the computer will play along with a human txalaparta player in a convincing manner.</p>
<h1 id="${"what-is-txalaparta"}"><a href="${"#what-is-txalaparta"}">What is txalaparta</a></h1>
<p>We\u2019re very excited to see how that turns out as we will continue working with this idiophone instrument this year, studying the planks and sticks as well as the system that Karl is now working on. For those of you who don\u2019t know the instruments, here are some cool videos we found on Youtube:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/XaSYiBaqLwA"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/qwnAnB57H2k?start=485"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
`;
    }
  })}`;
});
var karl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Karl,
  metadata: metadata$1
});
var metadata = {
  "layout": "news",
  "date": "2022-03-03",
  "title": "PhD Scholarship Opportunity",
  "description": "Open for applications",
  "featured": false
};
var Phd2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/phd2advert.jpeg",
        alt: "A smiling young woman sitting in front of a laptop and a midi-keyboard. In the background there are yellow and blue shelves with instruments and fabrication devices.",
        caption: "Want to join the team? Application details below."
      }, {}, {})}
<p>The Intelligent Instruments Lab at the Iceland University of the Arts, in collaboration with the Department of Comparative Cultural Studies at the University of Iceland, invites applications for a PhD scholarship as part an European Research Council funded project called \u201CIntelligent Instruments: Understanding 21st Century AI Through Creative Music Technologies.\u201D </p>
<p>We seek applications from highly qualified and motivated people to perform research on musical performance with intelligent instruments. The successful candidate will undertake a 3-year PhD programme working on individual research within the frame of the ERC project. The project explores how artificial intelligence is embedded in musical instruments and conducts a study in the phenomenology of such instruments, the psychology of performing, and how we can foster an understanding of the internals of new intelligent technologies. </p>
<p>The candidate will have a musical background (formal or not), experience in curating diverse musical events and collaborations, as well as an experience in the analysis and evaluation of musical performance.</p>
<p>The position is for three years and it is expected that the candidate will start on September 1st, 2022.</p>
<p>Director of Studies: Prof. Thor Magnusson.</p>
<p>Further information on the <a href="${"https://www.lhi.is/en/intent-phd-scholarship"}">Iceland University of Arts website</a>.</p>`;
    }
  })}`;
});
var phd2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Phd2,
  metadata
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const encoding = isBase64Encoded ? "base64" : headers["content-encoding"] || "utf-8";
  const rawBody = typeof body === "string" ? Buffer.from(body, encoding) : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      ...splitHeaders(rendered.headers),
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
function splitHeaders(headers) {
  const h = {};
  const m = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m : h;
    target[key] = value;
  }
  return {
    headers: h,
    multiValueHeaders: m
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
