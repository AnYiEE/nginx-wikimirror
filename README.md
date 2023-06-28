<div align="center"><img src="/wikimirror.png" alt="nginx-wikimirror" style="width:50%"></div>
<p align="center">A Wikimedia Projects Reverse Proxy based on Nginx</p>

**使用方法 | Instructions for Use**

1. 将文件夹`nginx-wikimirror`（[Release](https://github.com/AnYiEE/nginx-wikimirror/releases)）下载至本地，并保持目录结构，不要直接克隆仓库<br>Download the [release](https://github.com/AnYiEE/nginx-wikimirror/releases) of `nginx-wikimirror`, maintaining the directory structure, and DO NOT clone the repository directly
2. 将文件夹`nginx-wikimirror`重命名为`wikimirror`，并记录此时的绝对路径<br>Rename the folder `nginx-wikimirror` to `wikimirror` and record the absolute path
3. 重编译Nginx以添加[ngx_http_substitutions_filter_module](https://github.com/AnYiEE/ngx_http_substitutions_filter_module/releases)和[headers-more-nginx-module](https://github.com/openresty/headers-more-nginx-module/tags)<br>Rebuild Nginx to add [ngx_http_substitutions_filter_module](https://github.com/AnYiEE/ngx_http_substitutions_filter_module/releases) and [headers-more-nginx-module](https://github.com/openresty/headers-more-nginx-module/tags)

**需要你自行修改的位置 | Locations that need to be modified manually**

> 在你配置完SSL证书、DNS解析和Nginx后，一级目录中，除`conf`和`static`之外的文件即无用，可自行处置<br>After configuring the SSL certificate, DNS resolution, and Nginx, any files in the top-level directory except for `conf` and `static` are no longer needed and can be disposed of at your discretion

* DNS Name.txt

  假设你的域名为`example.org`——你SSL证书的DNS可选名称需要包含这些域名<br>Assuming your domain is `example.org`, your SSL certificate's DNS alternative name should include these domains

* DNS.zone

  假设你的域名为`example.org`，你的IP为`127.0.0.1`——你域名的DNS解析需要包含这些记录<br>Assuming your domain is `example.org` and your IP is `127.0.0.1`, your DNS resolution needs to include these records

* nginx.conf

  修改L-27`/path/to/wikimirror`为你的绝对路径，补全`...`——这仅是一份包含必要配置项的Nginx配置文件<br>Modify L-27 `/path/to/wikimirror` to your absolute path and complete `...`, this is just an Nginx configuration file containing necessary configuration options

> 下文的“替换”，如无特殊强调，均为全局搜索并替换<br>The "replace" used in the following text refers to a global search and replace, unless otherwise specified

* conf/wiki.conf

  用你的域名替换`example.org`<br>Replace `example.org` with your domain

* conf/wiki.nginx

  用你的绝对路径替换`/path/to/wikimirror`<br>Replace `/path/to/wikimirror` with your absolute path

  用你的域名替换`example.org`<br>Replace `example.org` with your domain

  假设你的域名为`test.com`，则用你的域名替换`example\.org`为`test\.com`；假设你的域名为`test.com.cn`，则用你的域名替换`example\.org`为`test\.com\.cn`<br>Assuming your domain is `test.com`, replace `example\.org` with `test\.com`. Assuming your domain is `test.com.cn`, replace `example\.org` with `test\.com\.cn`

  用你存放SSL证书的路径替换L-33、L-34、L-35、L-75、L-76、L-77的`/path/to`<br>Replace `/path/to` with the path where your SSL certificate files are stored in the following lines: L-33, L-34, L-35, L-75, L-76, L-77

  在L-6\~L-11和L-15\~L-20中分别选择一个距离服务器所在地区最近的或从服务器访问速度最快的节点IP，删掉它所在那行最前面的`#`<br>In L-6\~L-11 and L-15\~L-20, choose an IP address of a node that is closest to the location of your server or has the fastest access speed from the server, and delete the `#` at the beginning of the corresponding line

* conf/wiki-location-api.conf、conf/wiki-location-main.conf、conf/wiki-location-static.conf

  用你的绝对路径替换`/path/to/wikimirror`<br>Replace `/path/to/wikimirror` with your absolute path

* conf/wiki-location-upload-fix.conf

  用你的域名替换`example.org`<br>Replace `example.org` with your domain

* conf/wiki-site-ssl.conf

  用你存放SSL证书的路径替换`/path/to`<br>Replace `/path/to` with the path where your SSL certificate files are stored

* conf/wiki-sub.conf

  用你的域名替换`example.org`，注意以下行：L-30<br>Replace example.org with your domain. Note the following line: L-30

  假设你的域名为`test.com`，则用你的域名替换`example\.org`为`test\.com`；假设你的域名为`test.com.cn`，则用你的域名替换`example\.org`为`test\.com\.cn`<br>Assuming your domain is `test.com`, replace `example\.org` with `test\.com`. Assuming your domain is `test.com.cn`, replace `example\.org` with `test\.com\.cn`

  在L-27和L-28的`url = url.match(/(.+?\.org)(.+)/)[1] + $fn(url.match(/(.+?\.org)(.+)/)[2])`中，总共四处`\.org`也需要根据实际情况修改（假设你的域名为`test.com`，则用你的域名替换`\.org`为`\.com`；假设你的域名为`test.com.cn`，则用你的域名替换`\.org`为`\.com\.cn`）<br>`url = url.match(/(.+?\.org)(.+)/)[1] + $fn(url.match(/(.+?\.org)(.+)/)[2])` in L-27 and L-28, replace all instances of `\.org` according to your actual situation. Assuming your domain name is `test.com`, replace `\.org` with `\.com`. Assuming your domain name is `test.com.cn`, replace `\.org` with `\.com\.cn`.

* static/wikimirror.js

  用你的域名替换`example.org`<br>Replace `example.org` with your domain

**问答 | Q&A**

* 包括但不限于CDN、DNS、SSL、Nginx其他的配置等“额外的东西”怎么弄？<br>How to configure "extra things" such as CDN, DNS, SSL, other Nginx configurations, etc.?

  不要问我，问[Google](https://www.google.com)<br>Don't ask me, ask [Google](https://www.google.com)

* 为什么路径、域名等“可变的东西”不用变量？<br>Why not use variables for the "variable things" like path and domain?

  因为Nginx在处理每一个请求前都需要对变量重新赋值，这会影响性能<br>Because Nginx needs to reassign variables for each request it processes, which can affect performance

  * 那怎么一堆`include`？<br>Why so many `include`?

    因为Nginx的`include`只会在每次运行前载入一次，不会影响性能<br>Because Nginx's `include` only loads files once before each run, it does not affect performance

* 支持的浏览器有哪些？<br>Supported Browsers

  参见[MediaWiki浏览器兼容性表格](https://www.mediawiki.org/wiki/Compatibility#Browser_support_matrix)的Grade A行<br>See MediaWiki browser support matrix - Grade A

**提示 | Tips**

* MediaWiki有时会响应其特殊的mime-type类型`text/x-wiki`，如果你使用Brotil或Gzip压缩，可以酌情调整`brotli_types`或`gzip_types`配置项<br>MediaWiki sometimes responds with its special mime-type `text/x-wiki`. If you use Brotil or Gzip compression, you can adjust the `brotli_types` or `gzip_types` configuration options accordingly
* [TypeScript version of wikimirror.js](https://github.com/AnYiEE/nginx-wikimirror/discussions/2)

[![Star History Chart](https://api.star-history.com/svg?repos=AnYiEE/nginx-wikimirror&type=Date)](https://star-history.com/#AnYiEE/nginx-wikimirror&Date)