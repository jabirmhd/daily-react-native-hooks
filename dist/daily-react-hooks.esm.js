import DailyIframe from '@daily-co/react-native-daily-js';
import React, { createContext, useContext, useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { atom, selectorFamily, useRecoilCallback, RecoilRoot, useRecoilValue, atomFamily, selector } from 'recoil';
import throttle from 'lodash.throttle';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DailyContext = /*#__PURE__*/createContext(null);

var DailyEventContext = /*#__PURE__*/createContext({
  on: function on() {},
  off: function off() {}
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

/**
 * Returns callObject instance passed to or created by closest <DailyProvider>.
 */

var useDaily = function useDaily() {
  var daily = useContext(DailyContext);
  return daily;
};

var uniqueCounter = 0;
var getUnique = function getUnique() {
  return uniqueCounter++;
};
/**
 * Sets up a daily event listener using [on](https://docs.daily.co/reference/daily-js/instance-methods/on) method.
 * When this hook is unmounted the event listener is unregistered using [off](https://docs.daily.co/reference/daily-js/instance-methods/off).
 *
 * Warning: callback has to be a memoized reference (e.g. via [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)).
 * Otherwise a console error might be thrown indicating a re-render loop issue.
 *
 * @param ev The DailyEvent to register.
 * @param callback A memoized callback reference to run when the event is emitted.
 */

var useDailyEvent = function useDailyEvent(ev, callback) {
  var _useContext = useContext(DailyEventContext),
      on = _useContext.on,
      off = _useContext.off;

  var _useState = useState(false),
      isBlocked = _useState[0],
      setIsBlocked = _useState[1];

  var reassignCount = useRef(0);
  var eventId = useMemo(function () {
    return getUnique();
  }, []);
  useEffect(function () {
    if (!ev || isBlocked) return;
    /**
     * Check if callback has been reassigned often enough without hitting the 50ms timeout.
     */

    if (reassignCount.current > 100000) {
      console.error("useDailyEvent called with potentially non-memoized event callback or due to too many re-renders.\n        Memoize using useCallback to avoid re-render loop or reduce the amount of state transitions the callback depends on.\n        Passed callback for '" + ev + "' event is NOT registered.", callback);
      setIsBlocked(true);
      return;
    }

    reassignCount.current++;
    var timeout = setTimeout(function () {
      reassignCount.current = 0;
    }, 50);
    on(ev, callback, eventId);
    return function () {
      clearTimeout(timeout);
      off(ev, eventId);
    };
  }, [callback, ev, eventId, isBlocked, off, on]);
};

/**
 * Sets up a throttled daily event listener using [on](https://docs.daily.co/reference/daily-js/instance-methods/on) method.
 * When this hook is unmounted the event listener is unregistered using [off](https://docs.daily.co/reference/daily-js/instance-methods/off).
 *
 * In comparison to useDailyEvent the callback passed here will be called with an array of event objects.
 *
 * @param ev The DailyEvent to register.
 * @param callback A memoized callback reference to run when throttled events are emitted.
 * @param throttleTimeout The minimum waiting time until the callback is called again. Default: 100
 */

var useThrottledDailyEvent = function useThrottledDailyEvent(ev, callback, throttleTimeout) {
  if (throttleTimeout === void 0) {
    throttleTimeout = 100;
  }

  var _useContext = useContext(DailyEventContext),
      on = _useContext.on,
      off = _useContext.off;

  var eventId = useMemo(function () {
    return getUnique();
  }, []);
  var throttledEvents = useRef([]);
  var emitEvents = useMemo(function () {
    return throttle(function () {
      if (throttledEvents.current.length === 0) return;
      callback(throttledEvents.current);
      throttledEvents.current = [];
    }, throttleTimeout, {
      trailing: true
    });
  }, [callback, throttleTimeout]);
  useEffect(function () {
    if (!ev) return;

    var addEvent = function addEvent(ev) {
      throttledEvents.current.push(ev);
      /**
       * A 0ms timeout allows the event loop to process additional incoming events,
       * while the throttle is active. Otherwise every event would be delayed.
       */

      setTimeout(emitEvents, 0);
    };

    on(ev, addEvent, eventId);
    return function () {
      off(ev, eventId);
    };
  }, [emitEvents, ev, eventId, off, on]);
};

var participantsState = /*#__PURE__*/atom({
  key: 'participants-objects',
  "default": []
});
/**
 * Holds each inidividual participant's state object.
 */

var participantState = /*#__PURE__*/selectorFamily({
  key: 'participant',
  get: function get(id) {
    return function (_ref) {
      var _participants$find;

      var get = _ref.get;
      var participants = get(participantsState);
      return (_participants$find = participants.find(function (p) {
        return p.session_id === id;
      })) != null ? _participants$find : null;
    };
  }
});
var DailyParticipants = function DailyParticipants(_ref2) {
  var children = _ref2.children;
  var daily = useDaily();
  useDailyEvent('active-speaker-change', useRecoilCallback(function (_ref3) {
    var set = _ref3.set,
        snapshot = _ref3.snapshot;
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(ev) {
        var sessionId, participant;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionId = ev.activeSpeaker.peerId;
                _context.next = 3;
                return snapshot.getPromise(participantState(sessionId));

              case 3:
                participant = _context.sent;

                if (!participant && daily) {
                  participant = daily.participants()[sessionId];
                }

                if (participant) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return");

              case 7:
                set(participantsState, function (prev) {
                  return [].concat(prev).map(function (p) {
                    return p.session_id === sessionId ? _extends({}, p, {
                      last_active: new Date()
                    }) : p;
                  });
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }();
  }, [daily]));
  var initParticipants = useRecoilCallback(function (_ref5) {
    var set = _ref5.set;
    return /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(participants) {
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                set(participantsState, function (prev) {
                  return [].concat(prev, Object.values(participants)).filter(function (participant, idx, arr) {
                    return arr.findIndex(function (p) {
                      return p.session_id === participant.session_id;
                    }) == idx;
                  });
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }();
  }, []);
  useEffect(function () {
    if (!daily) return;
    var interval = setInterval(function () {
      var participants = daily.participants();
      if (!('local' in participants)) return;
      initParticipants(participants);
      clearInterval(interval);
    }, 100);
    return function () {
      clearInterval(interval);
    };
  }, [daily, initParticipants]);
  useDailyEvent('joined-meeting', useRecoilCallback(function (_ref7) {
    var set = _ref7.set;
    return function (ev) {
      set(participantsState, function (prev) {
        if (prev.some(function (p) {
          return p.local;
        })) return [].concat(prev).map(function (p) {
          return p.local ? ev.participants.local : p;
        });
        return [].concat(prev, [ev.participants.local]);
      });
    };
  }));
  useThrottledDailyEvent('participant-joined', useRecoilCallback(function (_ref8) {
    var set = _ref8.set;
    return /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(evts) {
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (evts.length) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                set(participantsState, function (prev) {
                  return [].concat(prev, evts.map(function (_ref10) {
                    var participant = _ref10.participant;
                    return participant;
                  })).filter(function (participant, idx, arr) {
                    return arr.findIndex(function (p) {
                      return p.session_id === participant.session_id;
                    }) == idx;
                  });
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref9.apply(this, arguments);
      };
    }();
  }, []));
  useThrottledDailyEvent('participant-updated', useRecoilCallback(function (_ref11) {
    var transact_UNSTABLE = _ref11.transact_UNSTABLE;
    return function (evts) {
      transact_UNSTABLE(function (_ref12) {
        var set = _ref12.set;
        evts.forEach(function (_ref13) {
          var participant = _ref13.participant;
          set(participantsState, function (prev) {
            return [].concat(prev).map(function (p) {
              return p.session_id === participant.session_id ? participant : p;
            });
          });
        });
      });
    };
  }, []));
  useThrottledDailyEvent('participant-left', useRecoilCallback(function (_ref14) {
    var set = _ref14.set;
    return function (evts) {
      set(participantsState, function (prev) {
        return [].concat(prev).filter(function (p) {
          return !evts.some(function (ev) {
            return ev.participant.session_id === p.session_id;
          });
        });
      });
    };
  }, []));
  return React.createElement(React.Fragment, null, children);
};

var roomState = /*#__PURE__*/atom({
  key: 'room',
  "default": null
});
var DailyRoom = function DailyRoom(_ref) {
  var children = _ref.children;
  var daily = useDaily();
  var updateRoom = useRecoilCallback(function (_ref2) {
    var set = _ref2.set;
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var room;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!daily || daily.meetingState() === 'left-meeting')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return daily.room();

            case 4:
              room = _context.sent;

              if (room && 'id' in room) {
                set(roomState, room);
              }

              return _context.abrupt("return", room);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }, [daily]);
  useDailyEvent('access-state-updated', updateRoom);
  return React.createElement(React.Fragment, null, children);
};

var _excluded = ["children"];
var DailyProvider = function DailyProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = useState('callObject' in props ? props.callObject : null),
      callObject = _useState[0],
      setCallObject = _useState[1];

  var eventsMap = useRef({});
  /**
   * Generic event handler to loop through registered event callbacks.
   */

  var handleEvent = useCallback(function (ev) {
    if (!('action' in ev)) return;
    var event = ev.action;

    for (var _iterator = _createForOfIteratorHelperLoose((_eventsMap$current$ev = (_eventsMap$current = eventsMap.current) == null ? void 0 : (_eventsMap$current$ev2 = _eventsMap$current[event]) == null ? void 0 : _eventsMap$current$ev2.values()) != null ? _eventsMap$current$ev : []), _step; !(_step = _iterator()).done;) {
      var _eventsMap$current$ev, _eventsMap$current, _eventsMap$current$ev2;

      var cb = _step.value;
      cb(ev);
    }
  }, []);
  /**
   * In case events are setup via useDailyEvent before a DailyCall instance is available,
   * we'll register the events whenever daily is set.
   */

  var initEventHandlers = useCallback(function (daily) {
    if (!daily) return;
    Object.keys(eventsMap.current).forEach(function (event) {
      daily.off(event, handleEvent).on(event, handleEvent);
    });
  }, [handleEvent]);
  useEffect(function () {
    if (callObject) return;

    if ('callObject' in props) {
      setCallObject(props.callObject);
      initEventHandlers(props.callObject);
      return;
    }

    var co = DailyIframe.createCallObject(props);
    setCallObject(co);
    initEventHandlers(co);
  }, [callObject, initEventHandlers, props]);
  /**
   * Registers event callback.
   */

  var on = useCallback(function (ev, cb, key) {
    var _eventsMap$current$ev3;

    if (!eventsMap.current[ev]) {
      eventsMap.current[ev] = new Map();

      if (callObject) {
        /**
         * Make sure only 1 event listener is registered at anytime for handleEvent.
         * Otherwise events sent from daily-js might be handled multiple times.
         */
        callObject.off(ev, handleEvent).on(ev, handleEvent);
      }
    }

    if (!((_eventsMap$current$ev3 = eventsMap.current[ev]) != null && _eventsMap$current$ev3.has(key))) {
      var _eventsMap$current$ev4;

      (_eventsMap$current$ev4 = eventsMap.current[ev]) == null ? void 0 : _eventsMap$current$ev4.set(key, cb);
    }
  }, [callObject, handleEvent]);
  /**
   * Unregisters event callback.
   */

  var off = useCallback(function (ev, key) {
    var _eventsMap$current$ev5, _eventsMap$current$ev6;

    (_eventsMap$current$ev5 = eventsMap.current[ev]) == null ? void 0 : _eventsMap$current$ev5["delete"](key);

    if (((_eventsMap$current$ev6 = eventsMap.current[ev]) == null ? void 0 : _eventsMap$current$ev6.size) === 0) {
      callObject == null ? void 0 : callObject.off(ev, handleEvent);
      delete eventsMap.current[ev];
    }
  }, [callObject, handleEvent]);
  return React.createElement(RecoilRoot, null, React.createElement(DailyContext.Provider, {
    value: callObject
  }, React.createElement(DailyEventContext.Provider, {
    value: {
      on: on,
      off: off
    }
  }, React.createElement(DailyRoom, null, React.createElement(DailyParticipants, null, children)))));
};

/**
 * Returns the participant identified by the given sessionId.
 * @param sessionId – The participant's session_id or "local".
 */

var useParticipant = function useParticipant(sessionId, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      onParticipantLeft = _ref.onParticipantLeft,
      onParticipantUpdated = _ref.onParticipantUpdated;

  var participant = useRecoilValue(participantState(sessionId));
  useThrottledDailyEvent('participant-updated', useCallback(function (evts) {
    var filteredEvts = evts.filter(function (ev) {
      return ev.participant.session_id === sessionId;
    });
    if (!filteredEvts.length) return;
    filteredEvts.forEach(function (ev) {
      setTimeout(function () {
        return onParticipantUpdated == null ? void 0 : onParticipantUpdated(ev);
      }, 0);
    });
  }, [onParticipantUpdated, sessionId]));
  useThrottledDailyEvent('participant-left', useCallback(function (evts) {
    var filteredEvts = evts.filter(function (ev) {
      return ev.participant.session_id === sessionId;
    });
    if (!filteredEvts.length) return; // Last event is sufficient to pass the information

    var ev = evts[evts.length - 1];
    setTimeout(function () {
      return onParticipantLeft == null ? void 0 : onParticipantLeft(ev);
    }, 0);
  }, [onParticipantLeft, sessionId]));
  return participant;
};

/**
 * Stores the most recent peerId as reported from [active-speaker-change](https://docs.daily.co/reference/daily-js/events/meeting-events#active-speaker-change) event.
 */

var activeIdState = /*#__PURE__*/atom({
  key: 'active-id',
  "default": ''
});
/**
 * Returns the most recent participant mentioned in an [active-speaker-change](https://docs.daily.co/reference/daily-js/events/meeting-events#active-speaker-change) event.
 */

var useActiveParticipant = function useActiveParticipant(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$ignoreLocal = _ref.ignoreLocal,
      ignoreLocal = _ref$ignoreLocal === void 0 ? false : _ref$ignoreLocal,
      onActiveSpeakerChange = _ref.onActiveSpeakerChange;

  var daily = useDaily();
  var recentActiveId = useRecoilValue(activeIdState);

  var _useState = useState(''),
      activeId = _useState[0],
      setActiveId = _useState[1];

  var activeParticipant = useParticipant(activeId);
  useEffect(function () {
    var _daily$participants;

    if (!daily) return;
    var local = daily == null ? void 0 : (_daily$participants = daily.participants()) == null ? void 0 : _daily$participants.local;
    if (ignoreLocal && recentActiveId === (local == null ? void 0 : local.session_id)) return;
    setActiveId(recentActiveId);
  }, [daily, ignoreLocal, recentActiveId]);
  useDailyEvent('active-speaker-change', useRecoilCallback(function (_ref2) {
    var set = _ref2.set;
    return function (ev) {
      set(activeIdState, ev.activeSpeaker.peerId);
      setTimeout(function () {
        return onActiveSpeakerChange == null ? void 0 : onActiveSpeakerChange(ev);
      }, 0);
    };
  }, [onActiveSpeakerChange]));
  return activeParticipant;
};

var mediaTrackState = /*#__PURE__*/atomFamily({
  key: 'media-track',
  "default": {
    state: 'loading',
    subscribed: false
  }
});
/**
 * Returns a participant's track and state, based on the given MediaType.
 *
 * Equivalent to daily.participants()[participantId].tracks[type].
 *
 * @param participantId The participant's session_id.
 * @param type The track type. Default: "video"
 */

var useMediaTrack = function useMediaTrack(participantId, type) {
  if (type === void 0) {
    type = 'video';
  }

  var daily = useDaily();
  var key = useMemo(function () {
    return participantId + "-" + type;
  }, [participantId, type]);
  var trackState = useRecoilValue(mediaTrackState(key));
  var handleNewParticipantState = useRecoilCallback(function (_ref) {
    var transact_UNSTABLE = _ref.transact_UNSTABLE;
    return function (evts) {
      var filteredEvts = evts.filter(function (ev) {
        return ev.participant.session_id === participantId;
      });
      if (!filteredEvts.length) return;
      transact_UNSTABLE(function (_ref2) {
        var set = _ref2.set,
            reset = _ref2.reset;
        filteredEvts.forEach(function (ev) {
          switch (ev.action) {
            case 'participant-joined':
            case 'participant-updated':
              set(mediaTrackState(key), ev.participant.tracks[type]);
              break;
            // @ts-ignore

            case 'participant-left':
              reset(mediaTrackState(key));
              break;
          }
        });
      });
    };
  }, [key, participantId, type]);
  useThrottledDailyEvent('participant-joined', handleNewParticipantState);
  useThrottledDailyEvent('participant-updated', handleNewParticipantState);
  useThrottledDailyEvent('participant-left', handleNewParticipantState);
  useDailyEvent('joined-meeting', useRecoilCallback(function (_ref3) {
    var set = _ref3.set;
    return function (ev) {
      set(mediaTrackState(key), ev.participants.local.tracks[type]);
    };
  }, [key, type]));
  var setInitialState = useRecoilCallback(function (_ref4) {
    var set = _ref4.set;
    return function (initialState) {
      if (!initialState) return;
      set(mediaTrackState(key), initialState);
    };
  }, [key]);
  useEffect(function () {
    if (!daily) return;
    var participants = daily == null ? void 0 : daily.participants();
    if (!participants) return;
    var participant = Object.values(participants).find(function (p) {
      return p.session_id === participantId;
    });
    if (!participant) return;
    setInitialState(participant.tracks[type]);
  }, [daily, participantId, setInitialState, type]);
  return _extends({}, trackState, {
    isOff: trackState.state === 'blocked' || trackState.state === 'off'
  });
};

/**
 * Returns a participant's audio track and state.
 * @param participantId The participant's session_id.
 */

var useAudioTrack = function useAudioTrack(participantId) {
  return useMediaTrack(participantId, 'audio');
};

var generalCameraState = /*#__PURE__*/atom({
  key: 'general-camera-state',
  "default": 'pending'
});
var generalMicrophoneState = /*#__PURE__*/atom({
  key: 'general-microphone-state',
  "default": 'pending'
});
var cameraDevicesState = /*#__PURE__*/atom({
  key: 'camera-devices',
  "default": []
});
var microphoneDevicesState = /*#__PURE__*/atom({
  key: 'microphone-devices',
  "default": []
});
var speakerDevicesState = /*#__PURE__*/atom({
  key: 'speaker-devices',
  "default": []
});
/**
 * This hook allows access to information about the user's devices and their state.
 */

var useDevices = function useDevices() {
  var daily = useDaily();
  var camState = useRecoilValue(generalCameraState);
  var micState = useRecoilValue(generalMicrophoneState);
  var camDevices = useRecoilValue(cameraDevicesState);
  var micDevices = useRecoilValue(microphoneDevicesState);
  var speakerDevices = useRecoilValue(speakerDevicesState);
  /**
   * Refreshes list of available devices using enumerateDevices.
   * Previous device states are kept in place, otherwise states are initialized as 'granted'.
   */

  var refreshDevices = useRecoilCallback(function (_ref) {
    var transact_UNSTABLE = _ref.transact_UNSTABLE;
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _navigator, _navigator$mediaDevic, _navigator2, _navigator2$mediaDevi;

      var _yield$daily$enumerat, devices, cams, mics, _yield$daily$getInput, camera, mic, mapDevice, sortDeviceByLabel;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof ((_navigator = navigator) == null ? void 0 : (_navigator$mediaDevic = _navigator.mediaDevices) == null ? void 0 : _navigator$mediaDevic.getUserMedia) === 'undefined' || typeof ((_navigator2 = navigator) == null ? void 0 : (_navigator2$mediaDevi = _navigator2.mediaDevices) == null ? void 0 : _navigator2$mediaDevi.enumerateDevices) === 'undefined')) {
                _context.next = 3;
                break;
              }

              transact_UNSTABLE(function (_ref3) {
                var set = _ref3.set;
                set(generalCameraState, 'not-supported');
                set(generalMicrophoneState, 'not-supported');
              });
              return _context.abrupt("return");

            case 3:
              if (daily) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              _context.prev = 5;
              _context.next = 8;
              return daily.enumerateDevices();

            case 8:
              _yield$daily$enumerat = _context.sent;
              devices = _yield$daily$enumerat.devices;

              /**
               * Filter out "empty" devices for when device access has not been granted (yet).
               */
              cams = devices.filter(function (d) {
                return d.kind === 'videoinput' && d.deviceId !== '';
              });
              mics = devices.filter(function (d) {
                return d.kind === 'audio' && d.deviceId !== '';
              }); // const speakers = devices.filter(
              //   d => d.kind === 'audiooutput' && d.deviceId !== ''
              // );

              _context.next = 14;
              return daily.getInputDevices();

            case 14:
              _yield$daily$getInput = _context.sent;
              camera = _yield$daily$getInput.camera;
              mic = _yield$daily$getInput.mic;

              mapDevice = function mapDevice(device, d, prevDevices) {
                var _prevDevices$find$sta, _prevDevices$find;

                return {
                  device: d,
                  selected: 'deviceId' in device && d.deviceId === device.deviceId,
                  state: (_prevDevices$find$sta = (_prevDevices$find = prevDevices.find(function (p) {
                    return p.device.deviceId === d.deviceId;
                  })) == null ? void 0 : _prevDevices$find.state) != null ? _prevDevices$find$sta : 'granted'
                };
              };

              sortDeviceByLabel = function sortDeviceByLabel(a, b) {
                if (a.device.deviceId === 'default') return -1;
                if (b.device.deviceId === 'default') return 1;
                if (a.device.label < b.device.label) return -1;
                if (a.device.label > b.device.label) return 1;
                return 0;
              };

              transact_UNSTABLE(function (_ref4) {
                var set = _ref4.set;
                set(cameraDevicesState, function (prevCams) {
                  return cams.filter(Boolean).map(function (d) {
                    return mapDevice(camera, d, prevCams);
                  }).sort(sortDeviceByLabel);
                });
                set(microphoneDevicesState, function (prevMics) {
                  return mics.filter(Boolean).map(function (d) {
                    return mapDevice(mic, d, prevMics);
                  }).sort(sortDeviceByLabel);
                }); // set(speakerDevicesState, prevSpeakers =>
                //   speakers
                //     .filter(Boolean)
                //     .map<StatefulDevice>(d => mapDevice(speaker, d, prevSpeakers))
                //     .sort(sortDeviceByLabel)
                // );
              });
              _context.next = 25;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](5);
              transact_UNSTABLE(function (_ref5) {
                var set = _ref5.set;
                set(generalCameraState, 'not-supported');
                set(generalMicrophoneState, 'not-supported');
              });

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 22]]);
    }));
  }, [daily]);
  /**
   * Updates general and specific device states, based on blocked status.
   */

  var updateDeviceStates = useRecoilCallback(function (_ref6) {
    var set = _ref6.set,
        snapshot = _ref6.snapshot,
        transact_UNSTABLE = _ref6.transact_UNSTABLE;
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var _tracks$audio, _tracks$audio$blocked, _tracks$audio2, _tracks$audio2$blocke, _tracks$audio3, _tracks$audio3$blocke, _tracks$video, _tracks$video$blocked, _tracks$video2, _tracks$video2$blocke, _tracks$video3, _tracks$video3$blocke;

      var currentCamState, currentMicState, tracks, awaitingCamAccess, awaitingMicAccess;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (daily) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _context2.next = 4;
              return snapshot.getPromise(generalCameraState);

            case 4:
              currentCamState = _context2.sent;
              _context2.next = 7;
              return snapshot.getPromise(generalMicrophoneState);

            case 7:
              currentMicState = _context2.sent;
              tracks = daily.participants().local.tracks;
              awaitingCamAccess = currentCamState === 'pending' && tracks.video.state === 'interrupted';
              awaitingMicAccess = currentMicState === 'pending' && tracks.audio.state === 'interrupted';

              if ((_tracks$audio = tracks.audio) != null && (_tracks$audio$blocked = _tracks$audio.blocked) != null && _tracks$audio$blocked.byDeviceInUse) {
                transact_UNSTABLE(function (_ref8) {
                  var set = _ref8.set;
                  set(generalMicrophoneState, 'in-use');
                  set(microphoneDevicesState, function (mics) {
                    return mics.map(function (m) {
                      return m.selected ? _extends({}, m, {
                        state: 'in-use'
                      }) : m;
                    });
                  });
                });
              } else if ((_tracks$audio2 = tracks.audio) != null && (_tracks$audio2$blocke = _tracks$audio2.blocked) != null && _tracks$audio2$blocke.byDeviceMissing) {
                set(generalMicrophoneState, 'not-found');
              } else if ((_tracks$audio3 = tracks.audio) != null && (_tracks$audio3$blocke = _tracks$audio3.blocked) != null && _tracks$audio3$blocke.byPermissions) {
                set(generalMicrophoneState, 'blocked');
              } else if (!awaitingMicAccess) {
                transact_UNSTABLE(function (_ref9) {
                  var set = _ref9.set;
                  set(generalMicrophoneState, 'granted');
                  set(microphoneDevicesState, function (mics) {
                    return mics.map(function (m) {
                      return m.selected ? _extends({}, m, {
                        state: 'granted'
                      }) : m;
                    });
                  });
                });
              }

              if ((_tracks$video = tracks.video) != null && (_tracks$video$blocked = _tracks$video.blocked) != null && _tracks$video$blocked.byDeviceInUse) {
                transact_UNSTABLE(function (_ref10) {
                  var set = _ref10.set;
                  set(generalCameraState, 'in-use');
                  set(cameraDevicesState, function (cams) {
                    return cams.map(function (m) {
                      return m.selected ? _extends({}, m, {
                        state: 'in-use'
                      }) : m;
                    });
                  });
                });
              } else if ((_tracks$video2 = tracks.video) != null && (_tracks$video2$blocke = _tracks$video2.blocked) != null && _tracks$video2$blocke.byDeviceMissing) {
                set(generalCameraState, 'not-found');
              } else if ((_tracks$video3 = tracks.video) != null && (_tracks$video3$blocke = _tracks$video3.blocked) != null && _tracks$video3$blocke.byPermissions) {
                set(generalCameraState, 'blocked');
              } else if (!awaitingCamAccess) {
                transact_UNSTABLE(function (_ref11) {
                  var set = _ref11.set;
                  set(generalCameraState, 'granted');
                  set(cameraDevicesState, function (cams) {
                    return cams.map(function (m) {
                      return m.selected ? _extends({}, m, {
                        state: 'granted'
                      }) : m;
                    });
                  });
                });
              }

              refreshDevices();

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }, [daily, refreshDevices]);
  useDailyEvent('participant-updated', useCallback(function (ev) {
    if (!ev.participant.local) return;
    updateDeviceStates();
  }, [updateDeviceStates]));
  useDailyEvent('available-devices-updated', refreshDevices); // useDailyEvent(
  //   'camera-error',
  //   useRecoilCallback(
  //     ({ set, transact_UNSTABLE }) => ({
  //       errorMsg: { errorMsg, audioOk, videoOk },
  //       error,
  //     }: DailyEventObjectCameraError) => {
  //       switch (error?.type) {
  //         case 'cam-in-use':
  //           set(generalCameraState, 'in-use');
  //           break;
  //         case 'mic-in-use':
  //           set(generalMicrophoneState, 'in-use');
  //           break;
  //         case 'cam-mic-in-use':
  //           transact_UNSTABLE(({ set }) => {
  //             set(generalCameraState, 'in-use');
  //             set(generalMicrophoneState, 'in-use');
  //           });
  //           break;
  //         default:
  //           switch (errorMsg) {
  //             case 'devices error':
  //               transact_UNSTABLE(({ set }) => {
  //                 if (!videoOk) set(generalCameraState, 'not-found');
  //                 if (!audioOk) set(generalMicrophoneState, 'not-found');
  //               });
  //               break;
  //             case 'not allowed': {
  //               transact_UNSTABLE(({ set }) => {
  //                 set(generalCameraState, 'blocked');
  //                 set(generalMicrophoneState, 'blocked');
  //               });
  //               updateDeviceStates();
  //               break;
  //             }
  //           }
  //           break;
  //       }
  //     },
  //     [updateDeviceStates]
  //   )
  // );

  useDailyEvent('error', useRecoilCallback(function (_ref12) {
    var transact_UNSTABLE = _ref12.transact_UNSTABLE;
    return function (_ref13) {
      var errorMsg = _ref13.errorMsg;

      switch (errorMsg) {
        case 'not allowed':
          {
            transact_UNSTABLE(function (_ref14) {
              var set = _ref14.set;
              set(generalCameraState, 'blocked');
              set(generalMicrophoneState, 'blocked');
            });
            updateDeviceStates();
            break;
          }
      }
    };
  }, [updateDeviceStates]));
  /**
   * Update all device state, when camera is started.
   */

  useDailyEvent('started-camera', useRecoilCallback(function (_ref15) {
    var transact_UNSTABLE = _ref15.transact_UNSTABLE;
    return function () {
      transact_UNSTABLE(function (_ref16) {
        var set = _ref16.set;
        set(generalCameraState, 'granted');
        set(generalMicrophoneState, 'granted');
      });
      updateDeviceStates();
    };
  }, [updateDeviceStates]));
  /**
   * Sets video input device to given deviceId.
   */

  var setCamera = useCallback( /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(deviceId) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return daily == null ? void 0 : daily.setCamera(deviceId);

            case 2:
              refreshDevices();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref17.apply(this, arguments);
    };
  }(), [daily, refreshDevices]);
  /**
   * Sets audio input device to given deviceId.
   */

  var setMicrophone = useCallback( /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(deviceId) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return daily == null ? void 0 : daily.setAudioDevice(deviceId);

            case 2:
              refreshDevices();

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x2) {
      return _ref18.apply(this, arguments);
    };
  }(), [daily, refreshDevices]);
  /**
   * Sets audio output device to given deviceId.
   */
  // TODO: selecting audio output device

  var setSpeaker = useCallback( /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(deviceId) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log('Will Implement', deviceId); // daily?.setOutputDevice({
              //   outputDeviceId: deviceId,
              // });

              refreshDevices();

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x3) {
      return _ref19.apply(this, arguments);
    };
  }(), [refreshDevices]);
  return {
    /**
     * A list of the user's camera (videoinput) devices. See [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) for more info.
     */
    cameras: camDevices,

    /**
     * The general state for camera access.
     */
    camState: camState,

    /**
     * Indicates that there's an issue with camera devices.
     */
    hasCamError: ['blocked', 'in-use', 'not-found'].includes(camState),

    /**
     * Indicates that there's an issue with microphone devices.
     */
    hasMicError: ['blocked', 'in-use', 'not-found'].includes(micState),

    /**
     * A list of the user's microphone (audioinput) devices. See [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) for more info.
     */
    microphones: micDevices,

    /**
     * The general state for microphone access.
     */
    micState: micState,

    /**
     * Refreshes the list of devices using [enumerateDevices](https://docs.daily.co/reference/daily-js/instance-methods/enumerate-devices).
     */
    refreshDevices: refreshDevices,

    /**
     * Allows to switch to the camera with the specified deviceId. Calls [setInputDevicesAsync](https://docs.daily.co/reference/daily-js/instance-methods/set-input-devices-async) internally.
     */
    setCamera: setCamera,

    /**
     * Allows to switch to the microphone with the specified deviceId. Calls [setInputDevicesAsync](https://docs.daily.co/reference/daily-js/instance-methods/set-input-devices-async) internally.
     */
    setMicrophone: setMicrophone,

    /**
     * Allows to switch to the speaker with the specified deviceId. Calls [setOutputDevice](https://docs.daily.co/reference/daily-js/instance-methods/set-output-device) internally.
     */
    setSpeaker: setSpeaker,

    /**
     * A list of the user's speaker (audiooutput) devices. See [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) for more info.
     */
    speakers: speakerDevices
  };
};

//   key: 'input-settings',
//   default: null,
// });

var errorState = /*#__PURE__*/atom({
  key: 'input-settings-error',
  "default": null
}); // eslint-disable-next-line no-empty-pattern

var useInputSettings = function useInputSettings(_temp) {
  var _ref = _temp === void 0 ? // onError,
  {} : _temp;

  _objectDestructuringEmpty(_ref);

  // const inputSettings = useRecoilValue(inputSettingsState);
  var errorMsg = useRecoilValue(errorState); // const daily = useDaily();
  // const updateInputSettingsState = useRecoilCallback(
  //   ({ set }) => (inputSettings: DailyInputSettings) => {
  //     set(inputSettingsState, inputSettings);
  //   },
  //   []
  // );
  // useEffect(() => {
  //   if (!daily) return;
  //   daily.getInputSettings().then(updateInputSettingsState);
  // }, [daily, updateInputSettingsState]);

  /**
   * Handle 'input-settings-updated' events.
   */
  // useDailyEvent(
  //   'input-settings-updated',
  //   useCallback(
  //     (ev: DailyEventObjectInputSettingsUpdated) => {
  //       updateInputSettingsState(ev.inputSettings);
  //       setTimeout(() => onInputSettingsUpdated?.(ev), 0);
  //     },
  //     [onInputSettingsUpdated, updateInputSettingsState]
  //   )
  // );

  /**
   * Handle nonfatal errors of type 'input-settings-error'.
   */
  // useDailyEvent(
  //   'nonfatal-error',
  //   useRecoilCallback(
  //     ({ set }) => (ev: DailyEventObjectNonFatalError) => {
  //       if (ev.type !== 'input-settings-error') return;
  //       set(errorState, ev.errorMsg);
  //       setTimeout(() => onError?.(ev), 0);
  //     },
  //     [onError]
  //   )
  // );

  /**
   * Calls daily.updateInputSettings internally.
   */
  // const updateInputSettings = useCallback(
  //   (inputSettings: DailyInputSettings) => {
  //     daily?.updateInputSettings(inputSettings);
  //   },
  //   [daily]
  // );

  return {
    errorMsg: errorMsg
  };
};

var liveStreamingState = /*#__PURE__*/atom({
  key: 'live-streaming',
  "default": {
    errorMsg: undefined,
    isLiveStreaming: false,
    layout: undefined
  }
});
/**
 * This hook allows to setup [live streaming events](https://docs.daily.co/reference/daily-js/events/live-streaming-events),
 * as well as starting, stopping and updating live streams.
 *
 * Returns the current live streaming state, incl. the current layout and potential errorMsg.
 */

var useLiveStreaming = function useLiveStreaming(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      onLiveStreamingStarted = _ref.onLiveStreamingStarted,
      onLiveStreamingStopped = _ref.onLiveStreamingStopped,
      onLiveStreamingError = _ref.onLiveStreamingError;

  var daily = useDaily();
  var state = useRecoilValue(liveStreamingState);
  useDailyEvent('live-streaming-started', useRecoilCallback(function (_ref2) {
    var set = _ref2.set;
    return function (ev) {
      set(liveStreamingState, {
        isLiveStreaming: true,
        layout: ev == null ? void 0 : ev.layout
      });
      setTimeout(function () {
        return onLiveStreamingStarted == null ? void 0 : onLiveStreamingStarted(ev);
      }, 0);
    };
  }, [onLiveStreamingStarted]));
  useDailyEvent('live-streaming-stopped', useRecoilCallback(function (_ref3) {
    var set = _ref3.set;
    return function (ev) {
      set(liveStreamingState, function (prevState) {
        return _extends({}, prevState, {
          isLiveStreaming: false,
          layout: undefined
        });
      });
      setTimeout(function () {
        return onLiveStreamingStopped == null ? void 0 : onLiveStreamingStopped(ev);
      }, 0);
    };
  }, [onLiveStreamingStopped]));
  useDailyEvent('live-streaming-error', useRecoilCallback(function (_ref4) {
    var set = _ref4.set;
    return function (ev) {
      set(liveStreamingState, function (prevState) {
        return _extends({}, prevState, {
          errorMsg: ev.errorMsg
        });
      });
      setTimeout(function () {
        return onLiveStreamingError == null ? void 0 : onLiveStreamingError(ev);
      }, 0);
    };
  }, [onLiveStreamingError]));
  var startLiveStreaming = useCallback(function (options) {
    if (!daily) return;
    daily.startLiveStreaming(options);
  }, [daily]);
  var stopLiveStreaming = useCallback(function () {
    if (!daily) return;
    daily.stopLiveStreaming();
  }, [daily]);
  var updateLiveStreaming = useCallback(function (_ref5) {
    var layout = _ref5.layout;
    if (!daily) return;
    daily.updateLiveStreaming({
      layout: layout
    });
  }, [daily]);
  return _extends({}, state, {
    startLiveStreaming: startLiveStreaming,
    stopLiveStreaming: stopLiveStreaming,
    updateLiveStreaming: updateLiveStreaming
  });
};

var localIdState = /*#__PURE__*/atom({
  key: 'local-id',
  "default": ''
});
/**
 * Returns the [participants() object](https://docs.daily.co/reference/daily-js/instance-methods/participants) for the local user.
 */

var useLocalParticipant = function useLocalParticipant() {
  var daily = useDaily();
  var localId = useRecoilValue(localIdState);
  var initState = useRecoilCallback(function (_ref) {
    var set = _ref.set;
    return function (session_id) {
      if (!session_id) return;
      set(localIdState, session_id);
    };
  }, []);
  useEffect(function () {
    var _daily$participants;

    if (!daily || localId) return;

    if ((_daily$participants = daily.participants()) != null && _daily$participants.local) {
      initState(daily.participants().local.session_id);
      return;
    }

    var handleParticipantUpdated = function handleParticipantUpdated(ev) {
      var _ev$participant, _ev$participant2;

      if (!(ev != null && (_ev$participant = ev.participant) != null && _ev$participant.local)) return;
      initState(ev == null ? void 0 : (_ev$participant2 = ev.participant) == null ? void 0 : _ev$participant2.session_id);
    };

    daily.on('participant-updated', handleParticipantUpdated);
    return function () {
      daily.off('participant-updated', handleParticipantUpdated);
    };
  }, [daily, initState, localId]);
  return useParticipant(localId);
};

var topologyState = /*#__PURE__*/atom({
  key: 'topology',
  "default": 'peer-to-peer'
});
var networkQualityState = /*#__PURE__*/atom({
  key: 'networkQuality',
  "default": 100
});
var networkThresholdState = /*#__PURE__*/atom({
  key: 'networkThreshold',
  "default": 'good'
});
/**
 * Returns current information about network quality and topology.
 * Allows to setup event listeners for daily's [network events](https://docs.daily.co/reference/daily-js/events/network-events).
 */

var useNetwork = function useNetwork(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      onNetworkConnection = _ref.onNetworkConnection,
      onNetworkQualityChange = _ref.onNetworkQualityChange;

  var daily = useDaily();
  var topology = useRecoilValue(topologyState);
  var quality = useRecoilValue(networkQualityState);
  var threshold = useRecoilValue(networkThresholdState);
  var handleNetworkConnection = useRecoilCallback(function (_ref2) {
    var transact_UNSTABLE = _ref2.transact_UNSTABLE;
    return function (ev) {
      transact_UNSTABLE(function (_ref3) {
        var set = _ref3.set;

        switch (ev.event) {
          case 'connected':
            if (ev.type === 'peer-to-peer') set(topologyState, 'peer-to-peer');
            if (ev.type === 'sfu') set(topologyState, 'sfu');
            break;
        }
      });
      setTimeout(function () {
        return onNetworkConnection == null ? void 0 : onNetworkConnection(ev);
      }, 0);
    };
  }, [onNetworkConnection]);
  var handleNetworkQualityChange = useRecoilCallback(function (_ref4) {
    var transact_UNSTABLE = _ref4.transact_UNSTABLE;
    return function (ev) {
      transact_UNSTABLE(function (_ref5) {
        var set = _ref5.set;
        set(networkQualityState, function (prevQuality) {
          return prevQuality !== ev.quality ? ev.quality : prevQuality;
        });
        set(networkThresholdState, function (prevThreshold) {
          return prevThreshold !== ev.threshold ? ev.threshold : prevThreshold;
        });
      });
      setTimeout(function () {
        return onNetworkQualityChange == null ? void 0 : onNetworkQualityChange(ev);
      }, 0);
    };
  }, [onNetworkQualityChange]);
  useDailyEvent('network-connection', handleNetworkConnection);
  useDailyEvent('network-quality-change', handleNetworkQualityChange);
  var getStats = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var newStats;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return daily == null ? void 0 : daily.getNetworkStats();

          case 2:
            newStats = _context.sent;
            return _context.abrupt("return", newStats == null ? void 0 : newStats.stats);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [daily]);
  return {
    getStats: getStats,
    quality: quality,
    threshold: threshold,
    topology: topology
  };
};

var defaultFilter = Boolean;

var defaultSort = function defaultSort() {
  return 0;
};
/**
 * Returns a list of participant ids (= session_id).
 * The list can optionally be filtered and sorted, using the filter and sort options.
 */


var useParticipantIds = function useParticipantIds(_temp) {
  var _ref = _temp === void 0 ? {
    filter: defaultFilter,
    sort: defaultSort
  } : _temp,
      _ref$filter = _ref.filter,
      filter = _ref$filter === void 0 ? defaultFilter : _ref$filter,
      onActiveSpeakerChange = _ref.onActiveSpeakerChange,
      onParticipantJoined = _ref.onParticipantJoined,
      onParticipantLeft = _ref.onParticipantLeft,
      onParticipantUpdated = _ref.onParticipantUpdated,
      _ref$sort = _ref.sort,
      sort = _ref$sort === void 0 ? defaultSort : _ref$sort;

  var allParticipants = useRecoilValue(participantsState);
  var sortedIds = useMemo(function () {
    var filterFn = defaultFilter;

    switch (filter) {
      case 'local':
        filterFn = function filterFn(p) {
          return p.local;
        };

        break;

      case 'owner':
        filterFn = function filterFn(p) {
          return p.owner;
        };

        break;

      case 'record':
        filterFn = function filterFn(p) {
          return p.record;
        };

        break;

      case 'remote':
        filterFn = function filterFn(p) {
          return !p.local;
        };

        break;

      case 'screen':
        filterFn = function filterFn(p) {
          return p.screen;
        };

        break;

      default:
        filterFn = filter;
    }

    var sortFn;

    switch (sort) {
      case 'joined_at':
      case 'session_id':
      case 'user_id':
      case 'user_name':
        sortFn = function sortFn(a, b) {
          // @ts-ignore
          if (a[sort] < b[sort]) return -1; // @ts-ignore

          if (a[sort] > b[sort]) return 1;
          return 0;
        };

        break;

      default:
        sortFn = sort;
        break;
    }

    return allParticipants.filter(filterFn).sort(sortFn).map(function (p) {
      return p.session_id;
    }).filter(Boolean);
  }, [allParticipants, filter, sort]);
  useThrottledDailyEvent('participant-joined', useCallback(function (evts) {
    if (!evts.length) return;
    evts.forEach(function (ev) {
      return setTimeout(function () {
        return onParticipantJoined == null ? void 0 : onParticipantJoined(ev);
      }, 0);
    });
  }, [onParticipantJoined]));
  useThrottledDailyEvent('participant-updated', useCallback(function (evts) {
    if (!evts.length) return;
    evts.forEach(function (ev) {
      return setTimeout(function () {
        return onParticipantUpdated == null ? void 0 : onParticipantUpdated(ev);
      }, 0);
    });
  }, [onParticipantUpdated]));
  useThrottledDailyEvent('active-speaker-change', useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(evts) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (evts.length) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              evts.forEach(function (ev) {
                return setTimeout(function () {
                  return onActiveSpeakerChange == null ? void 0 : onActiveSpeakerChange(ev);
                }, 0);
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [onActiveSpeakerChange]));
  useThrottledDailyEvent('participant-left', useCallback(function (evts) {
    if (!evts.length) return;
    evts.forEach(function (ev) {
      return setTimeout(function () {
        return onParticipantLeft == null ? void 0 : onParticipantLeft(ev);
      }, 0);
    });
  }, [onParticipantLeft]));
  return sortedIds;
};

var participantReceiveSettingsState = /*#__PURE__*/atomFamily({
  key: 'participant-receive-settings',
  "default": {}
});
/**
 * Allows to read and set receiveSettings.
 * In case receiveSettings for participant specified by id are empty, not set or 'inherit',
 * base receiveSettings will be returned.
 * In case meeting is not in joined state, calls to updateReceiveSettings will be silently ignored.
 */

var useReceiveSettings = function useReceiveSettings(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? 'base' : _ref$id,
      onReceiveSettingsUpdated = _ref.onReceiveSettingsUpdated;

  var baseSettings = useRecoilValue(participantReceiveSettingsState('base'));
  var receiveSettings = useRecoilValue(participantReceiveSettingsState(id));
  var daily = useDaily();
  useDailyEvent('receive-settings-updated', useRecoilCallback(function (_ref2) {
    var transact_UNSTABLE = _ref2.transact_UNSTABLE;
    return function (ev) {
      transact_UNSTABLE(function (_ref3) {
        var set = _ref3.set,
            reset = _ref3.reset;

        var ids = _extends({}, ev.receiveSettings);

        for (var _i = 0, _Object$entries = Object.entries(ids); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _Object$entries[_i],
              _id = _Object$entries$_i[0],
              settings = _Object$entries$_i[1];
          set(participantReceiveSettingsState(_id), settings);
        }

        if (!(id in ids)) {
          reset(participantReceiveSettingsState(id));
        }
      });
      setTimeout(function () {
        return onReceiveSettingsUpdated == null ? void 0 : onReceiveSettingsUpdated(ev);
      }, 0);
    };
  }, [id, onReceiveSettingsUpdated]));
  var updateReceiveSettings = useCallback(function (receiveSettings) {
    if (!(daily && daily.meetingState() === 'joined-meeting')) {
      return;
    }

    daily == null ? void 0 : daily.updateReceiveSettings == null ? void 0 : daily.updateReceiveSettings(receiveSettings);
  }, [daily]);
  return {
    receiveSettings: id === 'base' || Object.keys(receiveSettings).length === 0 ? baseSettings : receiveSettings,
    updateReceiveSettings: updateReceiveSettings
  };
};

/**
 * Stateful hook to work with room, domain and token configuration for a daily room.
 * Includes room default values.
 */

var useRoom = function useRoom() {
  var room = useRecoilValue(roomState);
  return room;
};

/**
 * Returns a participant's screenAudio track and state.
 * @param participantId The participant's session_id.
 */

var useScreenAudioTrack = function useScreenAudioTrack(participantId) {
  return useMediaTrack(participantId, 'screenAudio');
};

/**
 * Returns a participant's screenVideo track and state.
 * @param participantId The participant's session_id.
 */

var useScreenVideoTrack = function useScreenVideoTrack(participantId) {
  return useMediaTrack(participantId, 'screenVideo');
};

/**
 * Returns a participant's video track and state.
 * @param participantId The participant's session_id.
 */

var useVideoTrack = function useVideoTrack(participantId) {
  return useMediaTrack(participantId, 'video');
};

var waitingParticipantsState = /*#__PURE__*/atom({
  key: 'waiting-participants',
  "default": []
});
var waitingParticipantState = /*#__PURE__*/atomFamily({
  key: 'waiting-participant',
  "default": {
    awaitingAccess: {
      level: 'full'
    },
    id: '',
    name: ''
  }
});
var allWaitingParticipantsSelector = /*#__PURE__*/selector({
  key: 'waitingParticipantsSelector',
  get: function get(_ref) {
    var _get = _ref.get;

    var ids = _get(waitingParticipantsState);

    return ids.map(function (id) {
      return _get(waitingParticipantState(id));
    });
  }
});
/**
 * Hook to access and manage waiting participants.
 */

var useWaitingParticipants = function useWaitingParticipants(_temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      onWaitingParticipantAdded = _ref2.onWaitingParticipantAdded,
      onWaitingParticipantRemoved = _ref2.onWaitingParticipantRemoved,
      onWaitingParticipantUpdated = _ref2.onWaitingParticipantUpdated;

  var daily = useDaily();
  var waitingParticipants = useRecoilValue(allWaitingParticipantsSelector);
  var handleAdded = useRecoilCallback(function (_ref3) {
    var transact_UNSTABLE = _ref3.transact_UNSTABLE;
    return function (ev) {
      transact_UNSTABLE(function (_ref4) {
        var set = _ref4.set;
        set(waitingParticipantsState, function (wps) {
          if (!wps.includes(ev.participant.id)) {
            return [].concat(wps, [ev.participant.id]);
          }

          return wps;
        });
        set(waitingParticipantState(ev.participant.id), ev.participant);
      });
      setTimeout(function () {
        return onWaitingParticipantAdded == null ? void 0 : onWaitingParticipantAdded(ev);
      }, 0);
    };
  }, [onWaitingParticipantAdded]);
  var handleRemoved = useRecoilCallback(function (_ref5) {
    var transact_UNSTABLE = _ref5.transact_UNSTABLE;
    return function (ev) {
      transact_UNSTABLE(function (_ref6) {
        var set = _ref6.set,
            reset = _ref6.reset;
        set(waitingParticipantsState, function (wps) {
          return wps.filter(function (wp) {
            return wp !== ev.participant.id;
          });
        });
        reset(waitingParticipantState(ev.participant.id));
      });
      setTimeout(function () {
        return onWaitingParticipantRemoved == null ? void 0 : onWaitingParticipantRemoved(ev);
      }, 0);
    };
  }, [onWaitingParticipantRemoved]);
  var handleUpdated = useRecoilCallback(function (_ref7) {
    var set = _ref7.set;
    return function (ev) {
      set(waitingParticipantState(ev.participant.id), ev.participant);
      setTimeout(function () {
        return onWaitingParticipantUpdated == null ? void 0 : onWaitingParticipantUpdated(ev);
      }, 0);
    };
  }, [onWaitingParticipantUpdated]);
  useDailyEvent('waiting-participant-added', handleAdded);
  useDailyEvent('waiting-participant-removed', handleRemoved);
  useDailyEvent('waiting-participant-updated', handleUpdated);
  var updateWaitingParticipantAccess = useCallback(function (id, grantRequestedAccess) {
    if (id === '*') {
      daily == null ? void 0 : daily.updateWaitingParticipants({
        '*': {
          grantRequestedAccess: grantRequestedAccess
        }
      });
      return;
    }

    daily == null ? void 0 : daily.updateWaitingParticipant(id, {
      grantRequestedAccess: grantRequestedAccess
    });
  }, [daily]);
  var grantAccess = useCallback(function (id) {
    updateWaitingParticipantAccess(id, true);
  }, [updateWaitingParticipantAccess]);
  var denyAccess = useCallback(function (id) {
    updateWaitingParticipantAccess(id, false);
  }, [updateWaitingParticipantAccess]);
  return {
    waitingParticipants: waitingParticipants,
    grantAccess: grantAccess,
    denyAccess: denyAccess
  };
};

export { DailyProvider, useActiveParticipant, useAudioTrack, useDaily, useDailyEvent, useDevices, useInputSettings, useLiveStreaming, useLocalParticipant, useMediaTrack, useNetwork, useParticipant, useParticipantIds, useReceiveSettings, useRoom, useScreenAudioTrack, useScreenVideoTrack, useThrottledDailyEvent, useVideoTrack, useWaitingParticipants };
//# sourceMappingURL=daily-react-hooks.esm.js.map
