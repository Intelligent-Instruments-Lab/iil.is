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
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
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
var escaped$2 = {
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
    } else if (char in escaped$2) {
      result += escaped$2[char];
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
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
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
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
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
      context: new Map(parent_component ? parent_component.$$.context : context || []),
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
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$3 = {
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
  $$result.css.add(css$3);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
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
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="/favicon.ico" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    ' + head + '\n  </head>\n  <body class="bg-primary-700">\n    <div id="svelte">' + body + "</div>\n  </body>\n</html>\n";
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
      file: assets + "/_app/start-73d8a9ca.js",
      css: [assets + "/_app/assets/start-464e9d0a.css", assets + "/_app/assets/vendor-8daff541.css"],
      js: [assets + "/_app/start-73d8a9ca.js", assets + "/_app/chunks/vendor-18fa7eb7.js"]
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
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": ".DS_Store", "size": 6148, "type": null }, { "file": "fonts/Friedrich-Book.eot", "size": 62527, "type": "application/vnd.ms-fontobject" }, { "file": "fonts/Friedrich-Book.woff", "size": 60232, "type": "font/woff" }, { "file": "fonts/Friedrich-Book.woff2", "size": 55112, "type": "font/woff2" }, { "file": "fonts/SMHauser-60.woff", "size": 21028, "type": "font/woff" }, { "file": "fonts/SMHauser-60.woff2", "size": 14532, "type": "font/woff2" }, { "file": "images/.DS_Store", "size": 6148, "type": null }, { "file": "images/research/.DS_Store", "size": 6148, "type": null }, { "file": "images/research/projects/halldorophone.jpg", "size": 265169, "type": "image/jpeg" }, { "file": "images/research/projects/threnoscope.png", "size": 547355, "type": "image/png" }, { "file": "images/stock/empty_lab_yellow.jpg", "size": 497742, "type": "image/jpeg" }, { "file": "images/stock/hlci_sq_1.jpg", "size": 1494161, "type": "image/jpeg" }, { "file": "images/stock/hlci_sq_2.jpg", "size": 1391308, "type": "image/jpeg" }, { "file": "images/stock/prototype_langspil_cardboard.jpg", "size": 150261, "type": "image/jpeg" }, { "file": "images/stock/prototype_langspil_plywood_1.jpg", "size": 151129, "type": "image/jpeg" }, { "file": "images/stock/prototype_langspil_plywood_2_electrical_chords.jpg", "size": 140377, "type": "image/jpeg" }, { "file": "images/team/esther.jpg", "size": 167801, "type": "image/jpeg" }, { "file": "images/team/halldor.jpg", "size": 299460, "type": "image/jpeg" }, { "file": "images/team/jack.jpg", "size": 175973, "type": "image/jpeg" }, { "file": "images/team/thor.jpg", "size": 230590, "type": "image/jpeg" }, { "file": "images/team/victor.jpg", "size": 160655, "type": "image/jpeg" }, { "file": "publications.bib", "size": 6618, "type": null }],
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
      pattern: /^\/publications\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/publications/index.svelte"],
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
      pattern: /^\/research\/secondproject\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/secondproject.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/research\/firstproject\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/research/firstproject.md"],
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
      pattern: /^\/events\/moving-strings\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/events/moving-strings.md"],
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
      pattern: /^\/news\/fourthitem\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/fourthitem.md"],
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
      pattern: /^\/news\/seconditem\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/seconditem.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/firstitem\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/firstitem.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/thirditem\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news/thirditem.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/team\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/team/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/team\/members\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return members_json;
      })
    },
    {
      type: "page",
      pattern: /^\/team\/halldor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/team/halldor.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/team\/esther\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/team/esther.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/team\/victor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/team/victor.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/team\/order\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return order$1;
      })
    },
    {
      type: "page",
      pattern: /^\/team\/jack\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/team/jack.md"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/team\/thor\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/team/thor.md"],
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
    return index$5;
  }),
  "src/routes/publications/index.svelte": () => Promise.resolve().then(function() {
    return index$4;
  }),
  "src/routes/collaborate.md": () => Promise.resolve().then(function() {
    return collaborate;
  }),
  "src/routes/research/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/research/halldorophone.md": () => Promise.resolve().then(function() {
    return halldorophone;
  }),
  "src/routes/research/secondproject.md": () => Promise.resolve().then(function() {
    return secondproject;
  }),
  "src/routes/research/firstproject.md": () => Promise.resolve().then(function() {
    return firstproject;
  }),
  "src/routes/openlab/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
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
  "src/routes/events/moving-strings.md": () => Promise.resolve().then(function() {
    return movingStrings;
  }),
  "src/routes/about.md": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/news/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/news/fourthitem.md": () => Promise.resolve().then(function() {
    return fourthitem;
  }),
  "src/routes/news/good-start.md": () => Promise.resolve().then(function() {
    return goodStart;
  }),
  "src/routes/news/seconditem.md": () => Promise.resolve().then(function() {
    return seconditem;
  }),
  "src/routes/news/firstitem.md": () => Promise.resolve().then(function() {
    return firstitem;
  }),
  "src/routes/news/thirditem.md": () => Promise.resolve().then(function() {
    return thirditem;
  }),
  "src/routes/team/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/team/halldor.md": () => Promise.resolve().then(function() {
    return halldor;
  }),
  "src/routes/team/esther.md": () => Promise.resolve().then(function() {
    return esther;
  }),
  "src/routes/team/victor.md": () => Promise.resolve().then(function() {
    return victor;
  }),
  "src/routes/team/jack.md": () => Promise.resolve().then(function() {
    return jack;
  }),
  "src/routes/team/thor.md": () => Promise.resolve().then(function() {
    return thor;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-098e0dc9.js", "css": ["assets/pages/__layout.svelte-f92e1cc3.css", "assets/vendor-8daff541.css"], "js": ["pages/__layout.svelte-098e0dc9.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-5b1f2da2.js", "css": ["assets/vendor-8daff541.css"], "js": ["error.svelte-5b1f2da2.js", "chunks/vendor-18fa7eb7.js"], "styles": [] }, "src/routes/index.md": { "entry": "pages/index.md-f79c7df5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/index.md-f79c7df5.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/publications/index.svelte": { "entry": "pages/publications/index.svelte-c5ea65c8.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/publications/index.svelte-c5ea65c8.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/collaborate.md": { "entry": "pages/collaborate.md-0594fc10.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/collaborate.md-0594fc10.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/research/index.svelte": { "entry": "pages/research/index.svelte-8a380a1a.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/research/index.svelte-8a380a1a.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/research/halldorophone.md": { "entry": "pages/research/halldorophone.md-1921513b.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/research/halldorophone.md-1921513b.js", "chunks/vendor-18fa7eb7.js", "chunks/ResearchProject-01ce947a.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/research/secondproject.md": { "entry": "pages/research/secondproject.md-01cf90d5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/research/secondproject.md-01cf90d5.js", "chunks/vendor-18fa7eb7.js", "chunks/ResearchProject-01ce947a.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/research/firstproject.md": { "entry": "pages/research/firstproject.md-b782358f.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/research/firstproject.md-b782358f.js", "chunks/vendor-18fa7eb7.js", "chunks/ResearchProject-01ce947a.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/index.svelte": { "entry": "pages/openlab/index.svelte-b2edd16e.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/index.svelte-b2edd16e.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/1.md": { "entry": "pages/openlab/1.md-feb9762c.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/1.md-feb9762c.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/2.md": { "entry": "pages/openlab/2.md-d1b70104.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/2.md-d1b70104.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/3.md": { "entry": "pages/openlab/3.md-85e667a6.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/3.md-85e667a6.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/4.md": { "entry": "pages/openlab/4.md-d42873af.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/4.md-d42873af.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/5.md": { "entry": "pages/openlab/5.md-dbd0f2d9.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/5.md-dbd0f2d9.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/6.md": { "entry": "pages/openlab/6.md-7949c2a5.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/6.md-7949c2a5.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/7.md": { "entry": "pages/openlab/7.md-e8f914cc.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/7.md-e8f914cc.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/openlab/8.md": { "entry": "pages/openlab/8.md-9026ca73.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/openlab/8.md-9026ca73.js", "chunks/vendor-18fa7eb7.js", "chunks/OpenLabEvent-f921ec37.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/events/moving-strings.md": { "entry": "pages/events/moving-strings.md-6fab047f.js", "css": ["assets/vendor-8daff541.css"], "js": ["pages/events/moving-strings.md-6fab047f.js", "chunks/vendor-18fa7eb7.js"], "styles": [] }, "src/routes/about.md": { "entry": "pages/about.md-deca944a.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/about.md-deca944a.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/news/index.svelte": { "entry": "pages/news/index.svelte-bbce0525.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/news/index.svelte-bbce0525.js", "chunks/vendor-18fa7eb7.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/news/fourthitem.md": { "entry": "pages/news/fourthitem.md-02710be2.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/news/fourthitem.md-02710be2.js", "chunks/vendor-18fa7eb7.js", "chunks/NewsItem-27d9fa1c.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/news/good-start.md": { "entry": "pages/news/good-start.md-fbffd9cf.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/news/good-start.md-fbffd9cf.js", "chunks/vendor-18fa7eb7.js", "chunks/NewsItem-27d9fa1c.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/news/seconditem.md": { "entry": "pages/news/seconditem.md-aa389b1d.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/news/seconditem.md-aa389b1d.js", "chunks/vendor-18fa7eb7.js", "chunks/NewsItem-27d9fa1c.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/news/firstitem.md": { "entry": "pages/news/firstitem.md-c165ff66.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/news/firstitem.md-c165ff66.js", "chunks/vendor-18fa7eb7.js", "chunks/NewsItem-27d9fa1c.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/news/thirditem.md": { "entry": "pages/news/thirditem.md-5bcf89cc.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/news/thirditem.md-5bcf89cc.js", "chunks/vendor-18fa7eb7.js", "chunks/NewsItem-27d9fa1c.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/team/index.svelte": { "entry": "pages/team/index.svelte-4594c6f2.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/team/index.svelte-4594c6f2.js", "chunks/vendor-18fa7eb7.js", "chunks/Team-c73d4560.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/team/halldor.md": { "entry": "pages/team/halldor.md-9fc94af9.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/team/halldor.md-9fc94af9.js", "chunks/vendor-18fa7eb7.js", "chunks/Team-c73d4560.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/team/esther.md": { "entry": "pages/team/esther.md-7bb5af9f.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/team/esther.md-7bb5af9f.js", "chunks/vendor-18fa7eb7.js", "chunks/Team-c73d4560.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/team/victor.md": { "entry": "pages/team/victor.md-61366223.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/team/victor.md-61366223.js", "chunks/vendor-18fa7eb7.js", "chunks/Team-c73d4560.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/team/jack.md": { "entry": "pages/team/jack.md-988b381f.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/team/jack.md-988b381f.js", "chunks/vendor-18fa7eb7.js", "chunks/Team-c73d4560.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] }, "src/routes/team/thor.md": { "entry": "pages/team/thor.md-a2cd498d.js", "css": ["assets/vendor-8daff541.css", "assets/Menu-8ed5bf27.css"], "js": ["pages/team/thor.md-a2cd498d.js", "chunks/vendor-18fa7eb7.js", "chunks/Team-c73d4560.js", "chunks/pages-94ef62d9.js", "chunks/Menu-ce3dd458.js"], "styles": [] } };
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
  const imports = { "./firstproject.md": () => Promise.resolve().then(function() {
    return firstproject;
  }), "./halldorophone.md": () => Promise.resolve().then(function() {
    return halldorophone;
  }), "./secondproject.md": () => Promise.resolve().then(function() {
    return secondproject;
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
    url: "https://mailto:thor.magnusson@lhi.is",
    label: "Email"
  },
  {
    url: "https://twitter.com/_iil_is",
    label: "Twitter"
  },
  {
    url: "https://facebook.com/_iil_is",
    label: "Facebook"
  },
  {
    url: "https://instagram.com/intelligentinstruments",
    label: "Instagram"
  },
  {
    url: "https://youtube.com/c/_iil_is",
    label: "YouTube"
  },
  {
    url: "https://github.com/intelligent-instruments-lab",
    label: "GitHub"
  },
  {
    url: "https://https://discord.gg/smyvqzKT",
    label: "Discord"
  },
  {
    url: "https://tiktok.com/intelligentinstruments",
    label: "TikTok"
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
  }), "./2.md": () => Promise.resolve().then(function() {
    return _2$1;
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
var pages = [
  {
    label: "About",
    url: "/about"
  },
  {
    label: "Team",
    url: "/team"
  },
  {
    label: "News",
    url: "/news"
  },
  {
    label: "Research",
    url: "/research"
  },
  {
    label: "Publications",
    url: "/publications"
  },
  {
    label: "Open Lab",
    url: "/openlab"
  },
  {
    label: "Collaborate",
    url: "/collaborate"
  }
];
var pages$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": pages
});
async function get$1() {
  const imports = { "./firstitem.md": () => Promise.resolve().then(function() {
    return firstitem;
  }), "./fourthitem.md": () => Promise.resolve().then(function() {
    return fourthitem;
  }), "./good-start.md": () => Promise.resolve().then(function() {
    return goodStart;
  }), "./seconditem.md": () => Promise.resolve().then(function() {
    return seconditem;
  }), "./thirditem.md": () => Promise.resolve().then(function() {
    return thirditem;
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
  get: get$1
});
async function get() {
  const imports = { "./esther.md": () => Promise.resolve().then(function() {
    return esther;
  }), "./halldor.md": () => Promise.resolve().then(function() {
    return halldor;
  }), "./jack.md": () => Promise.resolve().then(function() {
    return jack;
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
var members_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get
});
var order = [
  "thor",
  "jack",
  "victor",
  "halldor",
  "esther"
];
var order$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": order
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
  title: "Hagura - Light",
  description: "Hagura is a light-weight theme/template built for sveltekit."
});
var SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape($seo.title)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-1w5w2bj">`, ""}`;
});
var wordmark = "/_app/assets/iil_wordmark-d35ec417.svg";
var wordmark_nologo = "/_app/assets/iil_wordmark_nologo-b022fff8.svg";
var menu = "/_app/assets/iil_menu-2f8e2158.svg";
var css$2 = {
  code: ".menuActive.svelte-2gqn6h{--tw-scale-y:1;--tw-rotate:180deg}.menuActive.svelte-2gqn6h,.menuInactive.svelte-2gqn6h{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;padding:1rem;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));width:4rem}.menuInactive.svelte-2gqn6h{--tw-scale-y:1;--tw-rotate:270deg}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n  import { Layout } from '../../stores/layout.js'\\n\\n  // Assets\\n  import wordmark from '../../assets/svg/iil_wordmark.svg?url'\\n  import wordmark_nologo from '../../assets/svg/iil_wordmark_nologo.svg?url'\\n  import menu from '../../assets/svg/iil_menu.svg?url'\\n\\n  import pages from \\"../../routes/pages.json\\"\\n\\n  const methods = {\\n    menuToggle: e => {\\n      let m = Layout.menuToggle()\\n      console.log('[Menu]', m)\\n    },\\n  }\\n<\/script>\\n\\n<style>.menuActive{--tw-scale-y:1;--tw-rotate:180deg}.menuActive,.menuInactive{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;padding:1rem;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));width:4rem}.menuInactive{--tw-scale-y:1;--tw-rotate:270deg}</style>\\n\\n<div class=\\"bg-secondary\\">\\n  <div class=\\"grid grid-cols-8 h-42\\">\\n    <div class=\\"col-span-5 md:col-span-7\\">\\n      <a href=\\"/\\">\\n        <img\\n          class=\\"w-96 hidden md:block\\"\\n          src={wordmark}\\n          alt=\\"Intelligent Instruments Lab\\"/>\\n        <img\\n          class=\\"w-72 block md:hidden\\"\\n          src={wordmark_nologo}\\n          alt=\\"Intelligent Instruments Lab\\"/>\\n      </a>\\n    </div>\\n    <div class=\\"col-span-1 justify-self-end self-center pr-10 hidden md:block\\">\\n      {#if $Layout.page !== 'home'}\\n        <img\\n          class=\\"{$Layout.menu ? 'menuActive' : 'menuInactive'}\\"\\n          src={menu}\\n          alt=\\"Menu\\"\\n          on:click|preventDefault={methods.menuToggle}/>\\n      {/if}\\n    </div>\\n    <div class=\\"col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10\\">\\n      <img\\n        class=\\"{$Layout.menu ? 'menuActive' : 'menuInactive'}\\"\\n        src={menu}\\n        alt=\\"Menu\\"\\n        on:click|preventDefault={methods.menuToggle}/>\\n    </div>\\n  </div>\\n</div>\\n"],"names":[],"mappings":"AAkBO,yBAAW,CAAC,aAAa,CAAC,CAAC,YAAY,MAAM,CAAC,yBAAW,CAAC,2BAAa,CAAC,iBAAiB,CAAC,CAAC,iBAAiB,CAAC,CAAC,YAAY,CAAC,CAAC,YAAY,CAAC,CAAC,YAAY,CAAC,CAAC,aAAa,CAAC,CAAC,QAAQ,IAAI,CAAC,UAAU,WAAW,IAAI,gBAAgB,CAAC,CAAC,CAAC,WAAW,IAAI,gBAAgB,CAAC,CAAC,CAAC,OAAO,IAAI,WAAW,CAAC,CAAC,CAAC,MAAM,IAAI,WAAW,CAAC,CAAC,CAAC,MAAM,IAAI,WAAW,CAAC,CAAC,CAAC,OAAO,IAAI,YAAY,CAAC,CAAC,CAAC,OAAO,IAAI,YAAY,CAAC,CAAC,CAAC,MAAM,IAAI,CAAC,2BAAa,CAAC,aAAa,CAAC,CAAC,YAAY,MAAM,CAAC"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$result.css.add(css$2);
  $$unsubscribe_Layout();
  return `<div class="${"bg-secondary"}"><div class="${"grid grid-cols-8 h-42"}"><div class="${"col-span-5 md:col-span-7"}"><a href="${"/"}"><img class="${"w-96 hidden md:block"}"${add_attribute("src", wordmark, 0)} alt="${"Intelligent Instruments Lab"}">
        <img class="${"w-72 block md:hidden"}"${add_attribute("src", wordmark_nologo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
    <div class="${"col-span-1 justify-self-end self-center pr-10 hidden md:block"}">${$Layout.page !== "home" ? `<img class="${escape(null_to_empty($Layout.menu ? "menuActive" : "menuInactive")) + " svelte-2gqn6h"}"${add_attribute("src", menu, 0)} alt="${"Menu"}">` : ``}</div>
    <div class="${"col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10"}"><img class="${escape(null_to_empty($Layout.menu ? "menuActive" : "menuInactive")) + " svelte-2gqn6h"}"${add_attribute("src", menu, 0)} alt="${"Menu"}"></div></div></div>`;
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
  <div class="${"px-2 py-3"}">${each(list, (item, index2) => `${validate_component(ListItem, "ListItem").$$render($$result, { url: item.url, label: item.label, target }, {}, {})}`)}</div></div>`;
});
var logo = "/_app/assets/iil_logo_white-c88fc041.svg";
var css$1 = {
  code: ".menuActive.svelte-pm4qwz{--tw-border-opacity:1;border:4px dashed rgba(255,237,0,var(--tw-border-opacity))}.menuActive.svelte-pm4qwz,.menuInactive.svelte-pm4qwz{--tw-bg-opacity:1;background-color:rgba(78,91,88,var(--tw-bg-opacity))}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script>\\n\\n  import { Layout } from '../../stores/layout.js'\\n\\n  import List from './List.svelte'\\n  import logo from '../../assets/svg/iil_logo_white.svg?url'\\n  import pages from \\"../../routes/pages.json\\"\\n  import contact from \\"../../routes/contact.json\\"\\n\\n<\/script>\\n\\n<style>.menuActive{--tw-border-opacity:1;border:4px dashed rgba(255,237,0,var(--tw-border-opacity))}.menuActive,.menuInactive{--tw-bg-opacity:1;background-color:rgba(78,91,88,var(--tw-bg-opacity))}</style>\\n\\n<div class=\\"{($Layout.menu || $Layout.page === 'home') ? 'menuActive' : 'menuInactive'}\\">\\n  <div class=\\"pt-8 pl-6 max-w-screen-xl hidden md:block \\">\\n    <div class=\\"grid grid-cols-6\\">\\n      <div class=\\"col-span-2\\">\\n        <a href=\\"/\\">\\n          <img\\n            class=\\"h-72\\"\\n            src={logo}\\n            alt=\\"Intelligent Instruments Lab\\"/>\\n        </a>\\n      </div>\\n      <div class=\\"col-span-4 py-12\\">\\n        <div class=\\"grid grid-cols-8\\">\\n          <div class=\\"col-span-2\\">\\n            <List list={pages} name=\\"Explore\\" target=\\"\\"/>\\n          </div>\\n          <div class=\\"col-span-2\\">\\n            <List list={contact} name=\\"Contact\\" target=\\"_blank\\"/>\\n          </div>\\n          <div class=\\"col-span-4\\">\\n            <h1 class=\\"font-hauser text-white text-lg\\">Address</h1>\\n            <div class=\\"px-2 py-3\\">\\n              <a href=\\"https://goo.gl/maps/jX1wteK9MjdMKsg28\\" target=\\"_blank\\">\\n                <div class=\\"text-white\\">Intelligent Instruments Lab</div>\\n                <div class=\\"text-white\\">\xDEverholt 11</div>\\n                <div class=\\"text-white\\">105 Reykjav\xEDk</div>\\n                <div class=\\"text-white\\">Iceland</div>\\n              </a>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n  <div class=\\"pt-8 pl-6 py-8 max-w-screen-xl md:hidden\\">\\n    <div class=\\"flex flex-col\\">\\n      <div class=\\"\\">\\n        <List list={contact} name=\\"Contact\\" target=\\"_blank\\"/>\\n      </div>\\n      <div class=\\"\\">\\n        <h1 class=\\"font-hauser text-white text-lg\\">Address</h1>\\n        <div class=\\"px-2 py-3\\">\\n          <a href=\\"https://goo.gl/maps/jX1wteK9MjdMKsg28\\" target=\\"_blank\\">\\n            <div class=\\"text-white\\">Intelligent Instruments Lab</div>\\n            <div class=\\"text-white\\">\xDEverholt 11</div>\\n            <div class=\\"text-white\\">105 Reykjav\xEDk</div>\\n            <div class=\\"text-white\\">Iceland</div>\\n          </a>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n"],"names":[],"mappings":"AAWO,yBAAW,CAAC,oBAAoB,CAAC,CAAC,OAAO,GAAG,CAAC,MAAM,CAAC,KAAK,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAAC,yBAAW,CAAC,2BAAa,CAAC,gBAAgB,CAAC,CAAC,iBAAiB,KAAK,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC"}`
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$result.css.add(css$1);
  $$unsubscribe_Layout();
  return `<div class="${escape(null_to_empty($Layout.menu || $Layout.page === "home" ? "menuActive" : "menuInactive")) + " svelte-pm4qwz"}"><div class="${"pt-8 pl-6 max-w-screen-xl hidden md:block "}"><div class="${"grid grid-cols-6"}"><div class="${"col-span-2"}"><a href="${"/"}"><img class="${"h-72"}"${add_attribute("src", logo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
      <div class="${"col-span-4 py-12"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2"}">${validate_component(List, "List").$$render($$result, { list: pages, name: "Explore", target: "" }, {}, {})}</div>
          <div class="${"col-span-2"}">${validate_component(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
          <div class="${"col-span-4"}"><h1 class="${"font-hauser text-white text-lg"}">Address</h1>
            <div class="${"px-2 py-3"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
                <div class="${"text-white"}">\xDEverholt 11</div>
                <div class="${"text-white"}">105 Reykjav\xEDk</div>
                <div class="${"text-white"}">Iceland</div></a></div></div></div></div></div></div>
  <div class="${"pt-8 pl-6 py-8 max-w-screen-xl md:hidden"}"><div class="${"flex flex-col"}"><div class="${""}">${validate_component(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
      <div class="${""}"><h1 class="${"font-hauser text-white text-lg"}">Address</h1>
        <div class="${"px-2 py-3"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div></div></div></div>`;
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
var css = {
  code: ".link.svelte-155qc8o{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.link.svelte-155qc8o{font-size:1.5rem;line-height:2rem}}@media(min-width:1024px){.link.svelte-155qc8o{font-size:2.25rem;line-height:2.5rem}}",
  map: `{"version":3,"file":"MenuItem.svelte","sources":["MenuItem.svelte"],"sourcesContent":["<script>\\n  import { Layout } from '../../stores/layout.js'\\n\\n  export let url\\n  export let label\\n  export let active\\n\\n  const onclick = e => {\\n    $Layout.menu = false\\n  }\\n\\n<\/script>\\n\\n<style>.link{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media (min-width:640px){.link{font-size:1.5rem;line-height:2rem}}@media (min-width:1024px){.link{font-size:2.25rem;line-height:2.5rem}}</style>\\n\\n{#if active}\\n<a class=\\"link\\"\\n  href='#'\\n  on:click|preventDefault={onclick}>\\n  {label}\\n</a>\\n{:else}\\n<a\\n  class=\\"link\\"\\n  href={url}>\\n  {label}\\n</a>\\n{/if}\\n"],"names":[],"mappings":"AAaO,oBAAK,CAAC,kBAAkB,CAAC,CAAC,MAAM,KAAK,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAAC,YAAY,WAAW,CAAC,UAAU,OAAO,CAAC,eAAe,KAAK,CAAC,YAAY,OAAO,CAAC,eAAe,KAAK,CAAC,YAAY,KAAK,CAAC,eAAe,SAAS,CAAC,MAAM,AAAC,WAAW,KAAK,CAAC,CAAC,oBAAK,CAAC,UAAU,MAAM,CAAC,YAAY,IAAI,CAAC,CAAC,MAAM,AAAC,WAAW,MAAM,CAAC,CAAC,oBAAK,CAAC,UAAU,OAAO,CAAC,YAAY,MAAM,CAAC,CAAC"}`
};
var MenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => value);
  let { url } = $$props;
  let { label } = $$props;
  let { active } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css);
  $$unsubscribe_Layout();
  return `${active ? `<a class="${"link svelte-155qc8o"}" href="${"#"}">${escape(label)}</a>` : `<a class="${"link svelte-155qc8o"}"${add_attribute("href", url, 0)}>${escape(label)}</a>`}`;
});
var Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_Layout();
  return `<div class="${"bg-secondary h-screen"}"><div class="${"flex flex-col px-12 md:px-20 md:py-6 md:mr-4"}">${each(pages, (page, index2) => `${validate_component(MenuItem, "MenuItem").$$render($$result, {
    url: page.url,
    label: page.label,
    active: page.url.slice(1) === $Layout.page
  }, {}, {})}`)}</div></div>`;
});
var PillDashed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { link } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  return `${link.theme === "dark" ? `<div class="${"border-dashed border-primary-500 border-2 hover:border-primary-600 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-primary-500 hover:bg-primary-600 h-9 flex items-center justify-center text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)} target="${"_blank"}">${escape(link.label)}</a></div>` : `${link.theme === "light" ? `<div class="${"border-dashed border-primary-500 border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-400 text-primary-500 hover:text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)} target="${"_blank"}">${escape(link.label)}</a></div>` : ``}`}`;
});
var CTARow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-4 sm:gap-10"}">${each(links, (link) => `${validate_component(PillDashed, "PillDashed").$$render($$result, { link }, {}, {})}`)}</div>`;
});
var Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title: title2 } = $$props;
  let { description: description2 } = $$props;
  let { pitch } = $$props;
  let { layout } = $$props;
  let { hero_image } = $$props;
  let { hero_caption } = $$props;
  let cta_links = [
    {
      url: "/about",
      label: "Learn More",
      theme: "light"
    },
    {
      url: "/collaborate",
      label: "Contact Us",
      theme: "dark"
    }
  ];
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
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
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-secondary h-screen"}"><div class="${"grid grid-cols-8 max-w-screen-xl"}"><div class="${"hidden md:block col-span-3"}">${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}</div>
    <div class="${"sm:ml-4 md:ml-12 max-w-xl col-span-8 md:col-span-5 px-12 md:px-0 py-0 md:py-6"}"><p class="${"text-md md:text-xl md:pr-16 text-primary-700"}">${escape(pitch)}</p>
      <div class="${"w-5/6 mt-8"}"><img class="${"shadow-sm"}"${add_attribute("src", "./images/" + hero_image, 0)}${add_attribute("alt", hero_caption, 0)}>
        <p class="${"text-sm text-primary-500 mt-4"}">${escape(hero_caption)}</p></div>
      <div class="${"mt-10"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: cta_links }, {}, {})}</div></div></div></div>`}`;
});
var metadata$o = {
  "layout": "home",
  "title": "IIL",
  "slug": "",
  "description": "Intelligent Instruments Lab",
  "pitch": "We design musical instruments embedded with creative AI. We explore our instruments in musical performance and how we understand ourselves as users of intelligent technologies.",
  "hero_image": "research/projects/halldorophone.jpg",
  "hero_caption": "The Halldorophone by Halldor \xDAlfarsson."
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Home, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$o), {}, {
    default: () => `



`
  })}`;
});
var index$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  metadata: metadata$o
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
var title = "Publications";
var description = "Publications";
var Publications = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { publications } = $$props;
  const bib = Object.values(bibtex.parseBibFile(publications).entries$);
  let { layout } = $$props;
  set_store_value(seo, $seo = { title, description }, $seo);
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
      <div class="${"p-2 sm:p-4"}"><p>This page contains papers from the Intelligent Instruments Lab, organised by date. Also see the latest news and events and press articles.</p>
        
        <div class="${"h-6"}"></div>
        ${each(bib, (entry) => `${validate_component(Publication, "Publication").$$render($$result, { pub: entry }, {}, {})}`)}</div></div></div>`}`;
});
async function load$4({ fetch: fetch2 }) {
  const res = await fetch2(`/publications.bib`);
  const publications = await res.text();
  return { props: { publications } };
}
var Publications_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { publications } = $$props;
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  return `${validate_component(Publications, "Publications").$$render($$result, { publications }, {}, {})}`;
});
var index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Publications_1,
  load: load$4
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



${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div></div>`}`;
});
var metadata$n = {
  "layout": "collaborate",
  "title": "Collaborate with us",
  "slug": "collaborate",
  "description": "Collaborate with us"
};
var Collaborate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Collaborate$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$n), {}, {
    default: () => `<p>The Intelligent Instruments Lab is open for collaborations with artists and scientists on experimental projects, equally as part of our work programme and as collaborations with other projects. We have developed a Collaboration Interaction Protocol (CIP) that makes such collaborations streamlined, easy to set up and effective. It defines all roles, timescales, experimental setups and outcomes through a simple system and we would love to hear from you if you have a reason to believe that our interests might intersect.</p>
<p>We also have a visiting researcher scheme. We welcome people to come and work with us in our Reykjavik lab over a specified period of time. The aim with this scheme is to enable artists, composers and musicians to develop technologies for their musical expression, but in turn the collaboration will help us to answer our research questions. </p>
<p>Please get in touch with the Principal Investigator, prof Thor Magnusson, or the relevant lab members, and the relevant contact information can be found on his LHI profile.</p>
<p>We also have a public channel on Discord for any questions or conversation</p>`
  })}`;
});
var collaborate = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Collaborate,
  metadata: metadata$n
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
  return `<div class="${"pagination-nav"}">${each(options2, (option) => `<span class="${[
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
    </span>`)}</div>`;
});
var Research = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let allPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout = "research" } = $$props;
  let { title: title2 = "Research" } = $$props;
  let { description: description2 = "Research" } = $$props;
  let { projects } = $$props;
  let items = projects;
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
  const methods = {
    authorString: (authors) => {
      if (authors.length === 1)
        return authors[0];
      let s2 = "";
      for (var i = 0; i < authors.length - 1; i++) {
        if (i < authors.length - 2)
          s2 = s2 + authors[i] + ", ";
        else
          s2 = s2 + " and " + authors[i];
      }
      return s2;
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
    size: 2,
    page: 1,
    items: items.filter((i) => i.metadata.featured === true)
  };
  all = { size: 4, page: 1, items };
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
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find our research projects.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Featured</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(featuredPaginated, ({ metadata: { title: title3, date, description: description3, authors }, path }) => `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "research/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(title3)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description3)}</p></div>
                      <div class="${"self-end grid grid-cols-1 text-primary-500"}">
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.authorString(authors))}</div>
                      </div></div>
                  </a></div>
              </div>`)}</div>
          <div class="${"mx-auto"}">
            ${featured.items.length > featured.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: featured.items.length,
    pageSize: featured.size,
    currentPage: featured.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        <div class="${"mt-4 sm:px-2 py-2 mb-12"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">All Projects</h2>
          <hr class="${"border-primary-500 border-dashed border-1"}">
          <div class="${"article-list"}">${each(allPaginated, ({ metadata: { title: title3, date, description: description3, authors }, path }) => `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "research/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-10"}"><div class="${"text-xl text-primary-900"}">${escape(title3)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description3)}</div>
                      <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-2 text-xs sm:text-sm font-hauser uppercase text-primary-700"}">${escape(methods.authorString(authors))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`)}</div>
          <div class="${"mx-auto"}">${all.items.length > all.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: all.items.length,
    pageSize: all.size,
    currentPage: all.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load$3({ fetch: fetch2 }) {
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
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Research_1,
  load: load$3
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
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
  const methods = {
    authorString: (authors2) => {
      let s2 = "";
      if (authors2.length === 1)
        return authors2[0];
      for (var i = 0; i < authors2.length - 1; i++) {
        if (i < authors2.length - 2)
          s2 = s2 + authors2[i] + ", ";
        else
          s2 = s2 + " and " + authors2[i];
      }
      return s2;
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
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${escape("<-")} Back to Research</a></div>
    <div class="${"px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title2)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-sm sm:text-md text-primary-700 "}">${escape(description2)}<br>
        ${escape(methods.authorString(authors))}</div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${escape("<-")} Back to Research</a></div></div>`}`;
});
var metadata$m = {
  "layout": "researchproject",
  "title": "Halldorophone",
  "description": "The Halldorophone is a musical instrument.",
  "featured": true,
  "authors": ["Halldor \xDAlfarsson"]
};
var Halldorophone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$m), {}, {
    default: () => `<p>The halldorophone (Icelandic: d\xF3r\xF3f\xF3nn) is a cello-like electronic instrument created by artist and designer Halld\xF3r \xDAlfarsson.
The halldorophone is designed specifically to feedback the strings and the instrument gained some recognition in early 2020 when composer Hildur Gu\xF0nad\xF3ttir won the Academy Award for her original soundtrack to the movie Joker, some of which was composed with a halldorophone.</p>`
  })}`;
});
var halldorophone = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Halldorophone,
  metadata: metadata$m
});
var metadata$l = {
  "layout": "researchproject",
  "title": "Another project",
  "description": "Another project called another project.",
  "featured": false,
  "authors": ["Thor Magnusson", "Victor Shepardson"]
};
var Secondproject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$l), {}, {
    default: () => `<p>This is another cool project!</p>`
  })}`;
});
var secondproject = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Secondproject,
  metadata: metadata$l
});
var metadata$k = {
  "layout": "researchproject",
  "title": "A project",
  "description": "A project called first project.",
  "featured": true,
  "authors": ["Thor Magnusson", "Victor Shepardson", "Jack Armitage", "Halldor \xDAlfarsson"]
};
var Firstproject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$k), {}, {
    default: () => `<p>This is a cool project!</p>`
  })}`;
});
var firstproject = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Firstproject,
  metadata: metadata$k
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
  let { description: description2 = "Open Lab" } = $$props;
  let { openlabs } = $$props;
  let items = openlabs;
  set_store_value(seo, $seo = {
    title: "Open Labs",
    description: "Open Labs"
  }, $seo);
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
    size: 2,
    page: 1,
    items: items.filter((i) => new Date(i.metadata.date) > new Date())
  };
  past = {
    size: 4,
    page: 1,
    items: items.filter((i) => new Date(i.metadata.date) < new Date()).reverse()
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
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}">
          <p>Communicating and discussing our research is part of our research methodology: we are interested in how people perceive instruments that inhibit intelligence of some sort.</p>
          <p class="${"hidden sm:block"}">We are interested in a continuous informal conversation with people, in terms of ad-hoc visits to the lab that can result in conversations that become the seeds of new developments. For this reason, we open the doors to our lab on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits.</p>
          <p>Our lab is located in \xDEverholt 11 on the 4th floor. Please pop by at 2pm on Fridays. We look forward to seeing you.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Upcoming</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(futurePaginated, ({ metadata: { edition, theme, date, description: description3, tags }, path }) => `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(theme)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description3)}</p></div>
                      <div class="${"self-end grid grid-cols-2 text-primary-500"}"><div class="${"text-sm font-hauser uppercase"}">Open Lab ${escape(edition)}</div>
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.dayMonth(date))}</div>
                      </div></div>
                  </a></div>
              </div>`)}</div>
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
          <div class="${"article-list"}">${each(pastPaginated, ({ metadata: { edition, theme, date, description: description3, tags }, path }) => `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${escape(theme)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description3)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>Open Lab ${escape(edition)}</div>
                      <div>${escape(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`)}</div>
          <div class="${"mx-auto"}">${past.items.length > past.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: past.items.length,
    pageSize: past.size,
    currentPage: past.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load$2({ fetch: fetch2 }) {
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
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Openlab,
  load: load$2
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
  let title2 = theme;
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
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
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/openlab"}">${escape("<-")} Back to Open Labs</a></div>
    
    <div class="${"px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(theme)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-sm sm:text-md text-primary-700 "}">Open Lab ${escape(edition)}, ${escape(new Date(date).toDateString())}</div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/openlab"}">${escape("<-")} Back to Open Labs</a></div></div>`}`;
});
var metadata$j = {
  "layout": "openlab",
  "edition": 1,
  "theme": "The Thranophone",
  "description": "\xDEr\xE1inn Hj\xE1lmarsson and Ingi Gar\xF0ar present the Thranophone.",
  "date": "2021-09-10"
};
var _1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$j), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 1.</p>`
  })}`;
});
var _1$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _1,
  metadata: metadata$j
});
var metadata$i = {
  "layout": "openlab",
  "edition": 2,
  "theme": "Feedback Musicianship",
  "description": "Feedback Musicianship Network live stream.",
  "date": "2021-09-17"
};
var _2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$i), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 2.</p>`
  })}`;
});
var _2$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2,
  metadata: metadata$i
});
var metadata$h = {
  "layout": "openlab",
  "edition": 3,
  "theme": "Acoustic and Sonic Heritages",
  "description": "Barcelona Patrimoni Acoustic collective and Ragnar \xC1rni \xD3lafsson.",
  "date": "2021-09-24"
};
var _3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$h), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 3.</p>`
  })}`;
});
var _3$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _3,
  metadata: metadata$h
});
var metadata$g = {
  "layout": "openlab",
  "edition": 4,
  "theme": "Digital Control of Church Organs",
  "description": "\xC1ki \xC1sgeirsson presents on MIDI control of church organs.",
  "date": "2021-10-01"
};
var _4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$g), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 4.</p>`
  })}`;
});
var _4$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _4,
  metadata: metadata$g
});
var metadata$f = {
  "layout": "openlab",
  "edition": 5,
  "theme": "Speaking Loudly",
  "description": "Discussion on loudspeakers.",
  "date": "2021-10-08"
};
var _5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$f), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. </p>
<p>This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. </p>
<p>This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. This is what is going to happen in Open Lab 5. </p>`
  })}`;
});
var _5$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _5,
  metadata: metadata$f
});
var metadata$e = {
  "layout": "openlab",
  "edition": 6,
  "theme": "Unusual Instruments and Usual Suspects",
  "description": "Thor Magnusson and Halldor Ulfarsson present something cool.",
  "date": "2021-10-15"
};
var _6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$e), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 6.</p>`
  })}`;
});
var _6$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _6,
  metadata: metadata$e
});
var metadata$d = {
  "layout": "openlab",
  "edition": 7,
  "theme": "Unusual Instruments and Usual Suspects",
  "description": "Thor Magnusson and Halldor Ulfarsson present something cool.",
  "date": "2021-10-22"
};
var _7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$d), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 7.</p>`
  })}`;
});
var _7$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _7,
  metadata: metadata$d
});
var metadata$c = {
  "layout": "openlab",
  "edition": 8,
  "theme": "Unusual Instruments and Usual Suspects",
  "description": "Thor Magnusson and Halldor Ulfarsson present something cool.",
  "date": "2021-10-29"
};
var _8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$c), {}, {
    default: () => `<p>This is what is going to happen in Open Lab 8.</p>`
  })}`;
});
var _8$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _8,
  metadata: metadata$c
});
var MovingStrings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Moving Strings</h1>`;
});
var metadata$b = {
  "layout": "movingstrings",
  "date": "2021-12-06",
  "title": "Moving Strings",
  "description": "A symposium on strings and feedback.",
  "featured": true
};
var Moving_strings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MovingStrings, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$b), {}, {
    default: () => `<p>A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. </p>
<p>A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. </p>
<p>A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. A symposium on strings and feedback. </p>`
  })}`;
});
var movingStrings = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Moving_strings,
  metadata: metadata$b
});
var About$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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



${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div></div>`}`;
});
var metadata$a = {
  "layout": "about",
  "title": "About",
  "slug": "about",
  "description": "About the Intelligent Instruments Lab"
};
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(About$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$a), {}, {
    default: () => `
<p>The Intelligent Instruments Lab is an interdisciplinary research lab that investigates the role of artificial intelligence in new musical instruments. Music is our research base, but the reach and impact is wider and we explore how musical interfaces can be applied as scientific instruments, for example through sonification.</p>
<p>We study creative AI from a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists in key international institutions. We explore the emerging language and discourse of creative AI, addressing our changed notions, such as agency, autonomy, authenticity, authorship, creativity and originality.</p>

<p>Our technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn, and evolve in the hands of the performer. Our theoretical approach is to collaborate with researchers, artists and the public through planned studies of AI in our relationship with technology, social interaction and knowledge production.  </p>
<p>The lab is located at the Iceland University of the Arts, where we work on designing, building and testing new instruments in collaboration with other researchers, music students and local artists. We have access to the advanced workshops and labs as well as the artistic infrastructure of the university. We seek to maintain a strong public engagement, for example through our Friday Open Labs.</p>
`
  })}`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About,
  metadata: metadata$a
});
var News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let allPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout = "news" } = $$props;
  let { title: title2 = "News" } = $$props;
  let { description: description2 = "News" } = $$props;
  let { items } = $$props;
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
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  featured = {
    size: 2,
    page: 1,
    items: items.filter((i) => i.metadata.featured === true)
  };
  all = { size: 4, page: 1, items };
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
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find the latest news about the lab.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Featured</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(featuredPaginated, ({ metadata: { title: title3, date, description: description3 }, path }) => `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "news/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(title3)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description3)}</p></div>
                      <div class="${"self-end grid grid-cols-1 text-primary-500"}">
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.dayMonth(date))}</div>
                      </div></div>
                  </a></div>
              </div>`)}</div>
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
          <div class="${"article-list"}">${each(allPaginated, ({ metadata: { title: title3, date, description: description3, tags }, path }) => `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "news/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${escape(title3)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description3)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>${escape(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`)}</div>
          <div class="${"mx-auto"}">${all.items.length > all.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: all.items.length,
    pageSize: all.size,
    currentPage: all.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load$1({ fetch: fetch2 }) {
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
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": News_1,
  load: load$1
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
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
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
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/news"}">${escape("<-")} Back to News</a></div>
    
    <div class="${"px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title2)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-sm sm:text-md text-primary-700 "}">${escape(description2)}<br>${escape(new Date(date).toDateString())}</div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/news"}">${escape("<-")} Back to News</a></div></div>`}`;
});
var metadata$9 = {
  "layout": "news",
  "date": "2021-10-01",
  "title": "Anotherother news item",
  "description": "Anotherother news item",
  "featured": false
};
var Fourthitem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$9), {}, {
    default: () => `<p>This is anotherother news item.</p>`
  })}`;
});
var fourthitem = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Fourthitem,
  metadata: metadata$9
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
  return `<div class="${"py-2 my-4"}"><img class="${"h-64 object-cover object-center"}"${add_attribute("src", src2, 0)}${add_attribute("alt", alt, 0)}>
  <p class="${"text-primary-800 mt-2 text-sm"}">${escape(caption)}</p></div>`;
});
var metadata$8 = {
  "layout": "news",
  "date": "2021-10-07",
  "title": "Off to a good start...",
  "description": "What we have been up to in the first month.",
  "featured": true
};
var Good_start = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$8), {}, {
    default: () => `<p>On September 1st, our team met for the first time in real life. Thor, Halld\xF3r, Jack, Victor and Esther came together in the basement Iceland University of the Arts to plot the first steps of the five-year-long journey we have ahead of us now.
This marks the start of the project where we will study the impact of creative AI, conducted in the research domain of music, with a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists.
The university has generously provided us with two different spaces for labs. We call them the Blue Lab, which is in the basement and will serve as a recording studio, and the Yellow Lab, which is on 4th floor and is used as an office and a space for prototyping.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
      src: "./images/stock/empty_lab_yellow.jpg",
      alt: "A panorama photo of a large class room what only has one table and a few blue chairs scattered around in a disorganised way. In the middle, a young man sitting in a corner with a laptop.",
      caption: "The first picture taken at the Yellow Lab. In the middle you'll see Victor. Photo by Jack."
    }, {}, {})}
<p>Through a streamlined research collaboration protocol, we seek to explore the language and discourse of creative AI, addressing our changed notions of, for example, agency, autonomy, authenticity, authorship, creativity and originality.</p>
<p>In order to achieve this goal, the technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn, and evolve in the hands of the performer. The instruments become boundary objects, studied by collaborators from a range of sciences and the general public.</p>
<p>We used September to prototype a monochord (Icelandic <em>langspil</em>) \u2026 which by the end of the month had ended up with three chords. </p>
<p><strong>PHOTOS OF PROTOTYPES</strong></p>
<p>Alt 1: A simple cardboard prototype of a long box-shaped instrument.</p>
<p>Alt 2: A plywood prototype of a long box-shaped instrument.</p>
<p>Alt 3: A complex prototype of a long box-shaped instrument with audio and electric cables connected.</p>
<p>Through technology development we will create the conditions to study higher level theoretical questions on the meaning of creative AI in contemporary culture. This project takes a pioneering leap in research about AI by answering how new creative AI transforms our relationships with technology and other people. Grounded equally in technology development and the humanities, the project will benefit diverse disciplines by developing a theoretical framework of creative AI, initiating a discourse around human-centred creative AI, and defining principles of human-AI relations in services and products.</p>
<p>Our next steps include summoning artists to experiment with the prototype and researchers from diverse disciplines to conduct frontier science on intelligent instruments as boundary objects. </p>
<p>So stay tuned!</p>`
  })}`;
});
var goodStart = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Good_start,
  metadata: metadata$8
});
var metadata$7 = {
  "layout": "news",
  "date": "2021-10-01",
  "title": "Another news item",
  "description": "Another news item",
  "featured": true
};
var Seconditem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$7), {}, {
    default: () => `<p>This is another news item.</p>`
  })}`;
});
var seconditem = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Seconditem,
  metadata: metadata$7
});
var metadata$6 = {
  "layout": "news",
  "date": "2021-10-01",
  "title": "A news item",
  "description": "A news item",
  "featured": true
};
var Firstitem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$6), {}, {
    default: () => `<p>This is a news item.</p>`
  })}`;
});
var firstitem = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Firstitem,
  metadata: metadata$6
});
var metadata$5 = {
  "layout": "news",
  "date": "2021-10-01",
  "title": "Anotherother news item",
  "description": "Anotherother news item",
  "featured": false
};
var Thirditem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$5), {}, {
    default: () => `<p>This is anotherother news item.</p>`
  })}`;
});
var thirditem = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Thirditem,
  metadata: metadata$5
});
var Photo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"hidden lg:block flex-none self-center sm:w-72 sm:h-72 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", "images/team/" + src2, 0)}${add_attribute("alt", name, 0)}></div>`;
});
var Thumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"lg:hidden self-start w-32 h-32 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", "images/team/" + src2, 0)}${add_attribute("alt", name, 0)}></div>`;
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
  }, {}, {})}` : ``}</div>`;
});
var Member = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { member } = $$props;
  if ($$props.member === void 0 && $$bindings.member && member !== void 0)
    $$bindings.member(member);
  return `<div class="${"flex"}"><div class="${"flex lg:space-x-10"}">${validate_component(Photo, "Photo").$$render($$result, { src: member.image, name: member.name }, {}, {})}
    <div><div class="${"flex flex-wrap"}">${validate_component(Thumbnail, "Thumb").$$render($$result, { src: member.image, name: member.name }, {}, {})}
        <div class="${"flex flex-col sm:ml-4 lg:ml-0"}"><h1 class="${"font-hauser text-secondary text-3xl mt-4"}">${escape(member.name)}
            <span class="${"font-sans text-secondary-500 text-lg ml-1"}">(${escape(member.pronouns)})
            </span></h1>
          <h3 class="${"text-primary-900 text-1xl px-2 mt-2"}">${escape(member.role)}</h3>
          <p class="${"text-primary-700 text-sm px-2 mt-1"}"><a${add_attribute("href", "mailto:" + member.email, 0)}${add_attribute("title", "Email " + member.name, 0)}>${escape(member.email)}</a></p></div></div>
      <div class="${"px-2 mb-16 "}"><p class="${"mt-2 sm:mt-4 mb-6 md:max-w-xl lg:max-w-1xl "}">${escape(member.bio)}</p>
        ${validate_component(Links, "Links").$$render($$result, { links: member.links }, {}, {})}</div></div></div></div>`;
});
var Team = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { members } = $$props;
  members = order.map((i) => members.filter((m) => m.path.slice(2, -3) === i)[0]);
  let { title: title2 = "Team" } = $$props;
  let { description: description2 = "Team" } = $$props;
  let { layout = "team" } = $$props;
  set_store_value(seo, $seo = { title: title2, description: description2 }, $seo);
  if ($$props.members === void 0 && $$bindings.members && members !== void 0)
    $$bindings.members(members);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape(title2)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description2, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4 w"}"><div class="${"py-8 px-4 sm:p-12 md:p-14 max-w-6xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title2)}</h1>
      <div class="${"p-2 sm:p-4"}"><div>${each(members, (member, index2) => `<div class="${"md:py-6 md:px-2"}">${validate_component(Member, "Member").$$render($$result, { member: member.metadata }, {}, {})}
            </div>`)}</div></div></div></div>`}`;
});
async function load({ fetch: fetch2 }) {
  const res = await fetch2(`/team/members.json`);
  const members = await res.json();
  return { props: { members } };
}
var Team_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { members } = $$props;
  if ($$props.members === void 0 && $$bindings.members && members !== void 0)
    $$bindings.members(members);
  return `${validate_component(Team, "Team").$$render($$result, { members }, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Team_1,
  load
});
var metadata$4 = {
  "name": "Halldor \xDAlfarsson",
  "role": "Fabricator",
  "email": "hau@lhi.is",
  "image": "halldor.jpg",
  "links": {
    "instagram": "halldorophone",
    "website": "halldorophone.info"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am the inventor of the halldorophone, an electro acoustic string instrument intended for working with string based feedback. For the past decade I have been seeking out and working with musicians to make music with halldorophones and noting their thoughts and feelings on the process to inform further development. I am currently working on a PhD documenting and expanding on this work under the supervision of Thor Magnusson and Chris Kiefer at the University of Sussex. Besides working on this project I am currently funded by an innovation grant from the Icelandic Technology Development Fund on further development of halldorophones. I enjoy using my skills as a fabricator to collaborate with musicians and instrument makers in the NIME context."
};
var Halldor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Team, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$4), {}, {})}`;
});
var halldor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Halldor,
  metadata: metadata$4
});
var metadata$3 = {
  "name": "Esther Thorvalds",
  "role": "Project Manager",
  "email": "esther@lhi.is",
  "image": "esther.jpg",
  "links": {
    "instagram": "estherthorvalds",
    "twitter": "estherthorvalds"
  },
  "pronouns": "she/her",
  "bio": "I\u2019m a long-term Uni. Iceland student with degrees in culture and communication, creative writing and comparative literature. I have been working in the music and culture industry for a decade; managing, planning and promoting all sorts of music projects, artists, festivals and conferences in Iceland as well as abroad. I'm passionate about connecting with and designing for all sorts of users and promoting equality and diversity."
};
var Esther = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Team, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$3), {}, {})}`;
});
var esther = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Esther,
  metadata: metadata$3
});
var metadata$2 = {
  "name": "Victor Shepardson",
  "role": "PhD Student",
  "email": "victor@lhi.is",
  "image": "victor.jpg",
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
  return `${validate_component(Team, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$2), {}, {})}`;
});
var victor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Victor,
  metadata: metadata$2
});
var metadata$1 = {
  "name": "Jack Armitage",
  "role": "Postdoctoral Research Fellow",
  "email": "jack@lhi.is",
  "image": "jack.jpg",
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
  return `${validate_component(Team, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$1), {}, {})}`;
});
var jack = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Jack,
  metadata: metadata$1
});
var metadata = {
  "name": "Thor Magnusson",
  "role": "Principal Investigator",
  "email": "thor.magnusson@lhi.is",
  "image": "thor.jpg",
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
  return `${validate_component(Team, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
var thor = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Thor,
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
