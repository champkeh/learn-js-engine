# learn-js-engine
记录自己学习JavaScript引擎的一些知识总结

> 主要是关于v8的内容，后续可能会涉及到v8和其他引擎之间的对比

## 配置v8的调试工具d8
这里，由于国内不可描述的原因，从下载源码自己编译出一个`d8`比较困难，所以直接使用已经编译好的`d8`工具。

### 1. 获取当前最新的v8版本
```
https://storage.googleapis.com/chromium-v8/official/canary/v8-mac64-dbg-latest.json
==>
{"version": "8.4.144"}
```


### 2. 下载对应平台的`d8`
```
mac平台:
https://storage.googleapis.com/chromium-v8/official/canary/v8-mac64-dbg-${version}.zip

linux32平台:
https://storage.googleapis.com/chromium-v8/official/canary/v8-linux32-dbg-${version}.zip

linux64平台:
https://storage.googleapis.com/chromium-v8/official/canary/v8-linux64-dbg-${version}.zip

win32平台:
https://storage.googleapis.com/chromium-v8/official/canary/v8-win32-dbg-${version}.zip

win64平台:
https://storage.googleapis.com/chromium-v8/official/canary/v8-win64-dbg-${version}.zip
```

比如，我要下载`mac`平台的`d8`，直接浏览器访问`https://storage.googleapis.com/chromium-v8/official/canary/v8-mac64-dbg-8.4.144.zip`，
就可以下载到`v8.4.144`这个版本的`d8`了。
> storage.googleapis.com 这个域名在国内是可以直接访问的。

### 3. 使用d8输出一些信息
> 我已经下载好了一个v8.4.144的工具，放在了v8-dbg下面，里面有一个可执行文件d8。

```shell script
$ ./v8-dbg/d8 demo.js --print-bytecode
...
[generated bytecode for function: foo (0x2ada0824fe61 <SharedFunctionInfo foo>)]
Parameter count 3
Register count 0
Frame size 0
         0x2ada0825000e @    0 : 25 02             Ldar a1
         0x2ada08250010 @    2 : 34 03 00          Add a0, [0]
         0x2ada08250013 @    5 : aa                Return 
Constant pool (size = 0)
Handler Table (size = 0)
Source Position Table (size = 0)
```
可以看到我们的`foo`函数对应的字节码。

## 优质文章

1. [JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
2. [JavaScript engine fundamentals: optimizing prototypes](https://mathiasbynens.be/notes/prototypes)
3. [Javascript Hidden Classes and Inline Caching in V8](https://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html)
4. [Optimizing dynamic JavaScript with inline caches](https://github.com/sq/JSIL/wiki/Optimizing-dynamic-JavaScript-with-inline-caches)
5. [JavaScript Engines Hidden Classes](https://draft.li/blog/2016/12/22/javascript-engines-hidden-classes/)
6. [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
7. [Fast Property Access](https://chromium.googlesource.com/external/github.com/v8/v8.wiki/+/60dc23b22b18adc6a8902bd9693e386a3748040a/Design-Elements.md)
8. [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
9. [V8 hidden class and inline cache](https://www.slideshare.net/prodromouf/v8-hidden-class-and-inline-cache)
10. [V8 internals](https://v8.dev/blog/tags/internals)


## JavaScript的对象模型(Object Modal)
根据 `ECMAScript` 规范的定义，`JavaScript`中的对象定义为一个字典，通过字符串的属性名引用`Property Attribute`对象，如下图所示：
![object-modal](./assets/object-model.png)

> 要注意的点是，作为字典，对象内部只存储属性名，这些属性名映射到对应的`Property Arrtibutes`上，我们的属性值就存储在这些`Property Arrtibute`上面。<br/>
> 我们可以通过 `Object.getOwnPropertyDescriptor` 这个api访问到对应的`Property Attribute`对象

数组其实是一类特殊的对象，只不过数组会对索引进行特殊的处理。
![array-modal](./assets/array-1.png)

> 注意：数组的索引有一个最大限额，为`2**32 - 1`个，也就是说，数组的索引范围为`0 ~ 2**32-2`，如果超过这个范围，则多出来的索引退化为普通对象的存储模式。

![array-model](./assets/array-2.png)
