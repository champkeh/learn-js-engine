# learn-js-engine
记录自己学习JavaScript引擎的一些知识总结

> 主要是关于v8的内容，后续可能会涉及到v8和其他引擎之间的对比

## 获取v8源码&编译
> 按照[v8官方文档](https://v8.dev/docs/build)的步骤即可

### 遇到的问题
1. 运行`gclient sync`时遇到下面的错误：

> NOTICE: You have PROXY values set in your environment, but gsutil in depot_tools does not (yet) obey them. Also, --no_auth prevents the normal BOTO_CONFIG environment variable from being used. To use a proxy in this situation, please supply those settings in a .boto file pointed to by the NO_AUTH_BOTO_CONFIG environment var.

这是因为`gclient`工具不识别环境变量设置的代理，所以按照提示配置.boto文件即可。
参照[这里](https://github.com/ChenYilong/WebRTC/blob/master/WebRTC%E5%9C%A8iOS%E7%AB%AF%E7%9A%84%E5%AE%9E%E7%8E%B0/WebRTC%E5%9C%A8iOS%E7%AB%AF%E7%9A%84%E5%AE%9E%E7%8E%B0.md)

### 编译
1. 进入v8源码目录
```shell script
cd /path/to/v8
```
2. 更新代码与依赖
```shell script
git pull && gclient sync
```
3. 编译
```shell script
tools/dev/gm.py x64.debug
```
[查看编译工具gm.py的更多介绍](notes/build-tools-about-v8.md)

## 优质文章
1. [JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
2. [JavaScript engine fundamentals: optimizing prototypes](https://mathiasbynens.be/notes/prototypes)
3. [Javascript Hidden Classes and Inline Caching in V8](https://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html)
4. [Optimizing dynamic JavaScript with inline caches](https://github.com/sq/JSIL/wiki/Optimizing-dynamic-JavaScript-with-inline-caches)
5. [JavaScript Engines Hidden Classes](https://draft.li/blog/2016/12/22/javascript-engines-hidden-classes/)
6. [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
7. [Fast Property Access](https://chromium.googlesource.com/external/github.com/v8/v8.wiki/+/60dc23b22b18adc6a8902bd9693e386a3748040a/Design-Elements.md)
8. [V8 hidden class and inline cache](https://www.slideshare.net/prodromouf/v8-hidden-class-and-inline-cache)
9. [V8 internals](https://v8.dev/blog/tags/internals)


## 个人总结
1. [Config d8 tools for debug javascript code](https://github.com/champkeh/learn-js-engine/blob/master/notes/config-d8.md)
2. [JavaScript engine fundamentals: Shapes and Inline Caches(翻译)](https://github.com/champkeh/learn-js-engine/blob/master/notes/shapes-ics.md)
