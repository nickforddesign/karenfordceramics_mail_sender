/**
 * Deferred promises
 *
 * @async
 * @returns {Deferred}
 */
function Deferred () {
  this.resolve = null
  this.reject = null
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  Object.freeze(this)
}

exports.Deferred = Deferred

/**
 * Wrap a node function that uses a callback
 *
 * @async
 * @param {Function} fn  the function to wrap
 * @param {any} args     any amount of args
 * @returns {any}        returns a promise with whatever fn returns
 */
function asyncCallback(fn, ...args) {
  const deferred = new Deferred()
  fn(...args, (error, data) => {
    error
      ? deferred.reject(error)
      : deferred.resolve(data)
  })
  return deferred.promise
}

exports.asyncCallback = asyncCallback
