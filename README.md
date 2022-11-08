<div align="center"><img src="https://github.com/AnYiEE/nginx-wikimirror/blob/master/wikimirror.png" alt="nginx-wikimirror" style="width:50%"></div>
<p align="center">A Wikimedia Projects Reverse Proxy based on Nginx</p>

**使用方法**

1. 将文件夹`nginx-wikimirror`下载至本地，并保持目录结构
2. 将文件夹`nginx-wikimirror`重命名为`wikimirror`，并记录此时的绝对路径
3. 重编译Nginx以添加[ngx_http_substitutions_filter_module](https://github.com/yaoweibin/ngx_http_substitutions_filter_module)

**需要你自行修改的位置：**

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

  用你的域名替换`example.org`，注意以下行：L-70、L-77、L-88、L-132、L-320、L-456、L-458、L-510、L-512、L-558、L-626、L-671

* conf/wiki-location-api.conf、conf/wiki-location-main.conf、conf/wiki-location-static.conf

  用你的绝对路径替换`/path/to/wikimirror`

* conf/wiki-location-upload-fix.conf

  用你的域名替换`example.org`

* conf/wiki-site-ssl.conf

  用你存放SSL证书的路径替换`/path/to`

* conf/wiki-sub.conf

  用你的域名替换`example.org`，注意以下行：L-14、L-15、L-28

* static/wikimirror.js

  用你的域名替换以下行：L-12、L-34、L-35、L-456、L-625
