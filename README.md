[demo](dist/index.html)

```bash
npm i -S m-pull-to-refresh
```

module format: umd

# Get Start

**html**

```html
<div id="p-wrap">
  <div id='p-loader'></div>
  <div id='p-content'>
    <b>title</b>
    <p>text</p>
  </div>
</div>
```

**js**

```js
import PullToRefresh from 'm-pull-to-refresh'
const p = new PullToRefresh({
  wrapEl: '#p-wrap',
  contentEl: '#p-content',
  loaderEl: '#p-loader',
  pullDownText: '下拉刷新',
  loadingText: '正在加载...',
  releaseText: '释放立即刷新',
})
p.onPull(done => setTimeout(() => done(), 1000))
```

# Configuration

new PullToRefresh(opts)

opts:

**contentEl**  
**loaderEl**  
**wrapEl**  
**[distanceLimit]**  
max pull distance, default 500  
**[distanceLoad]**  
distance to load, default 60  
**[pullDownText]**  
default 'pull down'  
**[releaseText]**  
default 'release'  
**[loadingText]**  
default 'loading'  
**[pullSpeed]**  
touchmove speed, default 0.6  
**[touchArea]**  
default contentEl  
**[releaseStayDistance]**  
margin top when release, default 40  
**[loaderHeight]**  
default 40  
**[loaderBg]**  
default '#eee'  
**[loaderColor]**  
default '#333'  
