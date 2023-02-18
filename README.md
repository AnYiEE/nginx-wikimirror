<div align="center"><img src="https://github.com/AnYiEE/nginx-wikimirror/blob/master/wikimirror.png" alt="nginx-wikimirror" style="width:50%"></div>
<p align="center">A Wikimedia Projects Reverse Proxy based on Nginx</p>

**使用方法**

1. 将文件夹`nginx-wikimirror`（[Release](https://github.com/AnYiEE/nginx-wikimirror/releases)）下载至本地，并保持目录结构，不要直接克隆仓库
2. 将文件夹`nginx-wikimirror`重命名为`wikimirror`，并记录此时的绝对路径
3. 重编译Nginx以添加[ngx_http_substitutions_filter_module](https://github.com/AnYiEE/ngx_http_substitutions_filter_module/releases)和[headers-more-nginx-module](https://github.com/openresty/headers-more-nginx-module/tags)

**需要你自行修改的位置**

> 在你配置完SSL证书、DNS解析和Nginx后，一级目录中，除`conf`和`static`之外的文件即无用，可自行处置

* DNS Name.txt

  假设你的域名为`example.org`——你SSL证书的DNS可选名称需要包含这些域名

* DNS.zone

  假设你的域名为`example.org`，你的IP为`127.0.0.1`——你域名的DNS解析需要包含这些记录

* nginx.conf

  修改L-27`/path/to/wikimirror`为你的绝对路径，补全`...`——这仅是一份包含必要配置项的Nginx配置文件

> 下文的“替换”，如无特殊强调，均为全局搜索并替换

* conf/wiki.conf

  用你的域名替换`example.org`

* conf/wiki.nginx

  用你的绝对路径替换`/path/to/wikimirror`

  用你的域名替换`example.org`

  假设你的域名为`test.com`，则用你的域名替换`example\.org`为`test\.com`；假设你的域名为`test.com.cn`，则用你的域名替换`example\.org`为`test\.com\.cn`

  用你存放SSL证书的路径替换L-33、L-34、L-35、L-75、L-76、L-77的`/path/to`

  在L-6\~L-11和L-15\~L-20中分别选择一个距离服务器所在地区最近的或从服务器访问速度最快的节点IP，删掉它所在那行最前面的`#`

* conf/wiki-location-api.conf、conf/wiki-location-main.conf、conf/wiki-location-static.conf

  用你的绝对路径替换`/path/to/wikimirror`

* conf/wiki-location-upload-fix.conf

  用你的域名替换`example.org`

* conf/wiki-site-ssl.conf

  用你存放SSL证书的路径替换`/path/to`

* conf/wiki-sub.conf

  用你的域名替换`example.org`，注意以下行：L-30

  假设你的域名为`test.com`，则用你的域名替换`example\.org`为`test\.com`；假设你的域名为`test.com.cn`，则用你的域名替换`example\.org`为`test\.com\.cn`

  在L-27和L-28的`url = url.match(/(.+?\.org)(.+)/)[1] + $fn(url.match(/(.+?\.org)(.+)/)[2])`中，总共四处`\.org`也需要根据实际情况修改（假设你的域名为`test.com`，则用你的域名替换`\.org`为`\.com`；假设你的域名为`test.com.cn`，则用你的域名替换`\.org`为`\.com\.cn`）

* static/wikimirror.js

  用你的域名替换`example.org`

**Q&A**

* 包括但不限于CDN、DNS、SSL、Nginx其他的配置等“额外的东西”怎么弄？

  不要问我，问[Google](https://www.google.com)

* 为什么路径、域名等“可变的东西”不用变量？

  因为Nginx在处理每一个请求前都需要对变量重新赋值，这会影响性能

  * 那怎么一堆`include`？

    因为Nginx的`include`只会在每次运行前载入一次，不会影响性能

* 支持的浏览器有哪些？

    - Chrome 85+
    - Edge 85+ (Chromium Version)
    - Firefox 79+
    - Safari 14+

  目前支持在2020年下半年后发行的浏览器

**Tips**

* MediaWiki有时会响应其特殊的mime-type类型`text/x-wiki`，如果你使用Brotil或Gzip压缩，可以适酌情调整`brotli_types`或`gzip_types`配置。