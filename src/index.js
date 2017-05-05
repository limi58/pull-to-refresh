function PullToRefresh(opts) {
  this.distanceLimit = opts.distanceLimit || 500
  this.distanceLoad = opts.distanceLoad || 60
  this.contentEl = $(opts.contentEl)
  this.loaderEl = $(opts.loaderEl)
  this.wrapEl = $(opts.wrapEl)
  this.pullDownText = opts.pullDownText || 'pull down'
  this.releaseText = opts.releaseText || 'release'
  this.loadingText = opts.loadingText || 'loading'
  this.pullSpeed = opts.pullSpeed || 0.6
  this.touchArea = opts.touchArea || this.contentEl
  this.releaseStayDistance = opts.releaseStayDistance || 40
  this.loaderHeight = opts.loaderHeight || 40
  this.loaderBg = opts.loaderBg || '#f5f5f5'
  this.loaderColor = opts.loaderColor || '#999'

  this.isOverRelease = false
  this.startY = 0
  this.isAtTop = false
  this.loaderEl.innerHTML = this.pullDownText
  this.wrapEl.style.overflow = 'hidden'
}

PullToRefresh.prototype = {
  onPull(cb) {
    const loaderHeight = this.loaderHeight
    this.loaderEl.setAttribute('style', `
      margin-top: -${loaderHeight}px;height: ${loaderHeight}px;color: ${this.loaderColor};
      line-height: ${loaderHeight}px;text-align: center;background: ${this.loaderBg};
    `)
    this.touchArea.addEventListener('touchstart', this._handleContentTouchstart.bind(this))
    this.touchArea.addEventListener('touchmove', this._handleContentTouchmove.bind(this))
    this.touchArea.addEventListener('touchend', this._handleContentTouchend.bind(this))
    this.loadFn = cb
  },
  _handleContentTouchstart(e) {
    if (getScrollTop() > 0) {
      this.isAtTop = false
    } else {
      this.isAtTop = true
    }
    removeTransition(this.contentEl)
    removeTransition(this.loaderEl)
    this.startY = e.touches[0].pageY
  },
  _handleContentTouchmove(e) {
    const distance = e.touches[0].pageY - this.startY
    if (!this.isAtTop || distance <= 0) return
    e.preventDefault()
    if (distance < this.distanceLimit) {
      setTranslateY(this.contentEl, distance * this.pullSpeed)
      setTranslateY(this.loaderEl, distance * this.pullSpeed)
    }
    if (distance > this.distanceLoad) {
      this.isOverRelease = true
      this.loaderEl.innerHTML = this.releaseText
    } else {
      this.isOverRelease = false
      this.loaderEl.innerHTML = this.pullDownText
    }
  },
  _handleContentTouchend() {
    if (!this.isAtTop) return
    setTransition(this.contentEl)
    setTransition(this.loaderEl)
    if (this.isOverRelease) {
      setTranslateY(this.contentEl, this.releaseStayDistance)
      setTranslateY(this.loaderEl, this.releaseStayDistance)
      this.loaderEl.innerHTML = this.loadingText
      this.loadFn(() => {
        this._handleLoaded()
      })
    } else {
      setTranslateY(this.contentEl, 0)
      setTranslateY(this.loaderEl, '-100%', true)
      this.loaderEl.innerHTML = this.pullDownText
    }
    this.isOverRelease = false
  },
  _handleLoaded() {
    setTranslateY(this.contentEl, 0)
    setTranslateY(this.loaderEl, '-100%', true)
    this.loaderEl.innerHTML = this.pullDownText
  },
}

function setTranslateY(dom, y, isCover) {
  if (!isCover) {
    dom.style.transform = dom.style.webkitTransform = `translate3d(0, ${y}px, 0)`
  } else {
    dom.style.transform = dom.style.webkitTransform = `translate3d(0, ${y}, 0)`
  }
}

function setTransition(dom) {
  dom.style.transition = dom.style.webkitTransition = 'all 0.3s'
}

function removeTransition(dom) {
  dom.style.transition = dom.style.webkitTransition = 'none'
}

function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}

function $(seletor) {
  return document.querySelector(seletor)
}

export default PullToRefresh
