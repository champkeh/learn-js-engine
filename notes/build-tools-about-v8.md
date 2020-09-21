# v8的编译工具介绍

执行下面的命令查看gm.py的帮助文档：
```shell script
$ tools/dev/gm.py --help

Convenience wrapper for compiling V8 with gn/ninja and running tests.
Sets up build output directories if they don't exist.
Produces simulator builds for non-Intel target architectures.
Uses Goma by default if it is detected (at output directory setup time).
Expects to be run from the root of a V8 checkout.

Usage:
    gm.py [<arch>].[<mode>[-<suffix>]].[<target>] [testname...] [--flag]

<arch> can be any of: ia32 x64 arm arm64 mipsel mips64el ppc ppc64 s390 s390x android_arm android_arm64
<mode> can be any of: release debug optdebug
<target> can be any of:
 - d8, cctest, unittests, v8_fuzzers, wasm_api_tests, wee8, mkgrokdump, generate-bytecode-expectations, inspector-test (build respective binary)
 - all (build all binaries)
 - tests (build test binaries)
 - check (build test binaries, run most tests)
 - checkall (build all binaries, run more tests)
```

由此可知，v8采用gn/ninja这套构建系统进行编译，而gm.py是用python写的一个辅助工具，封装了一些常用的配置，比如`x64.release`，同时
还把构建、编译、测试命令整合在一起，你只需一条命令即可编译出一个v8出来。
  
你也可以直接使用gn/ninja进行编译，这样的话，你就可以更细粒度的控制编译选项了。
比如，
```shell script
gn gen out/foo --args='is_debug=false target_cpu="x64" v8_target_cpu="arm64" use_goma=true'
```
上面这条命令的意思是，在x64的计算机上编译出一个arm64版本的v8，模式为release，编译时采用Goma。  
由于要编译的v8的cpu架构和本地计算机架构不一致，因此最终编译出来的并不是真正的arm64版本，而是在x64机器上的arm64模拟版本。
Goma是google内部采用的分布式编译服务，非谷歌员工可以设置use_goma=false

其实上面说的并不完全正确，gn其实是一个元构建系统(类似于元编程这样的概念)，本身并不执行任何编译任务，而是为其他构建系统生成构建文件(build files)，
比如在v8项目中，真正的构建系统是ninja，gn只是生成ninja所需要的构建文件。

使用下面的命令查看gn所有的可用参数：
```shell script
gn args out/foo --list
```

## 参考
[v8官方文档](https://v8.dev/docs/build-gn)
