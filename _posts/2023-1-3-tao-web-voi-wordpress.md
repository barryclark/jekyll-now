---
layout: post
title: tạo wordpress với LEMP(linux,nginx,mariadb, php)
---

truy cấp link dưới và làm theo. tùy chỉnh 1 số cái theo bên dưới


permalink:https://vi.linuxcapable.com/c%C3%A1ch-c%C3%A0i-%C4%91%E1%BA%B7t-wordpress-v%E1%BB%9Bi-lemp-stack-tr%C3%AAn-ubuntu-20-04/#Install_PHP_LEMP_STACK



- sau khi cài đặt nginx xong nếu k restast được thì gõ lệnh
   sudo killall apache2  # bỏ qua phần cấu hình tường lửa
- bỏ qua phần đặt khóa bảo mật wordpress
- cấu hình nginx đổi tên
` sudo nano /etc/nginx/sites-available/localhost`
server_name ip public của máy
`sudo ln -s /etc/nginx/sites-available/localhost /etc/nginx/sites-enabled/`

xong phần này là có thể vào giao diện web dc r.
có thể option phần cấu hình php.ini





chi tiết

Cập nhật Ubuntu
Trước tiên, hãy bắt đầu bằng cách chạy lệnh cập nhật tiêu chuẩn để đảm bảo hệ thống của bạn được cập nhật nhằm tránh bất kỳ xung đột nào trong quá trình cài đặt. Hy vọng rằng, điều này là cần thiết, vì nó là một cài đặt lớn.
sudo apt update && sudo apt upgrade -y
Cài đặt các gói bắt buộc
Đối với hầu hết các phần, hầu hết các gói này có thể đã được cài đặt trên máy chủ của bạn; tuy nhiên, hãy chạy lại lệnh để an toàn. Các gói rất phổ biến; bạn không cài đặt bất cứ thứ gì không bình thường.
sudo apt install curl git wget unzip -y
Cài đặt Nginx mới nhất - (LEMP Stack)
Để bắt đầu cài đặt ngăn xếp LEMP, bạn sẽ cần cài đặt Nginx máy chủ web. Một phương pháp là cài đặt Nginx mainline mới nhất hoặc ổn định từ kho lưu trữ Ondřej Surý để có phần mềm cập nhật nhất.


Để sử dụng phiên bản mới nhất của Nginx mainline hoặc ổn định, trước tiên bạn cần nhập kho lưu trữ bằng cách thêm PPA.
sudo add-apt-repository ppa:ondrej/nginx-mainline -y
sudo add-apt-repository ppa:ondrej/nginx -y
Cập nhật kho lưu trữ của bạn để phản ánh thay đổi mới:
sudo apt update
Bây giờ bạn đã cài đặt  và cập nhật danh sách kho lưu trữ, cài đặt Nginx với những thứ sau:
sudo apt install nginx-core nginx-common nginx nginx-full
Bây giờ, hãy kiểm tra để đảm bảo rằng Nginx mới nhất từ ​​kho lưu trữ Ondřej Surý đã được cài đặt bằng cách sử dụng lệnh chính sách apt-cache.
apt-cache policy nginx

Kích hoạt tính năng  mô-đun bằng cách mở của bạn  tập tin cấu hình:
nano /etc/nginx/nginx.conf
Bây giờ hãy thêm các dòng bổ sung trước trong  phần: http{}
brotli on;
brotli_comp_level 6;
brotli_static on;
brotli_types application/atom+xml application/javascript application/json application/rss+xml
   application/vnd.ms-fontobject application/x-font-opentype application/x-font-truetype
   application/x-font-ttf applicati	on/x-javascript application/xhtml+xml application/xml
   font/eot font/opentype font/otf font/truetype image/svg+xml image/vnd.microsoft.icon
   image/x-icon image/x-win-bitmap text/css text/javascript text/plain text/xml;
. Thông thường, hầu hết các máy chủ đều nằm ở giữa level 6, nhưng hãy đặt nó thành 11 và theo dõi mức độ sử dụng CPU nếu máy chủ của bạn là một con quái vật.
Tiếp theo, hãy kiểm tra để đảm bảo các thay đổi đang hoạt động chính xác trước khi đưa nó vào hoạt động:
sudo nginx -t
Nếu các thay đổi hoạt động chính xác, bạn sẽ thấy như sau:
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
Bây giờ, hãy thực hiện các thay đổi trực tiếp bằng cách khởi động lại máy chủ của bạn:

sudo killall apache2
sudo systemctl restart nginx
Tiếp theo, kích hoạt Nginx khi khởi động hệ thống:




sudo systemctl enable nginx --now
Cuối cùng, xác minh Nginx đang chạy chính xác bằng cách kiểm tra trạng thái.
systemctl status nginx

Cài đặt MariaDB mới nhất - (LEMP Stack)
Hướng dẫn sẽ khuyên bạn nên cài đặt MariaDB liên tục qua MySQL do hiệu suất hơn bất kỳ thứ gì khác.
Đầu tiên, nhập kho lưu trữ MariaDB chính thức 10.8
curl -LsS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version=10.8
Khi bạn đã chọn một phiên bản, hãy cập nhật kho lưu trữ APT của bạn.
sudo apt update
Cài đặt MariaDB
Để cài đặt MariaDB, bạn sẽ cần cài đặt các gói máy khách và máy chủ. Điều này có thể được thực hiện như sau:
sudo apt install mariadb-server mariadb-client -y
Xác nhận cài đặt MariaDB bằng cách kiểm tra phiên bản và bản dựng:
mariadb --version
Ví dụ đầu ra:
mariadb  Ver 15.1 Distrib 10.7.1-MariaDB, for debian-linux-gnu (x86_64) using readline EditLine wrapper
Bây giờ bạn đã cài đặt MariaDB và bạn có thể xác minh trạng thái của phần mềm cơ sở dữ liệu bằng cách sử dụng lệnh systemctl sau:
systemctl status mariadb
Theo mặc định, MariaDB sẽ được bật. Nếu không, hãy sử dụng lệnh sau để kích hoạt dịch vụ.
sudo systemctl enable mariadb --now
Bây giờ hãy kiểm tra lại trạng thái và bạn sẽ nhận được những điều sau:

Tiếp theo là một số lệnh systemd cơ bản để điều khiển và duy trì dịch vụ MariaDB.
Ngừng MariaDB:
sudo systemctl stop mariadb
Bật MariaDB khi khởi động hệ thống:
sudo systemctl enable mariadb
Tắt MariaDB khi khởi động hệ thống:
sudo systemctl disable mariadb
Khởi động lại dịch vụ MariaDB:
sudo systemctl restart mariadb
Bảo mật MariaDB bằng Tập lệnh bảo mật
Tiếp theo, bạn sẽ nhận được lời nhắc yêu cầu bạn nhập . Bây giờ, hãy nhấn  khóa vì mật khẩu gốc chưa được đặt như bên dưới:
sudo mysql_secure_installation

bấm enter all ngoài chỗ nhập password new

Cài đặt PHP (LEMP STACK)
Phần cuối cùng của hướng dẫn sẽ là cài đặt PHP, đây là phần phụ trợ giao tiếp giữa Nginx và MariaDB, người trung gian. PHP 8.0 đang trở nên tương đối ổn định và các phiên bản PHP 8.1 mới hơn hiện đã có sẵn.
Hướng dẫn này sẽ tập trung vào việc nhập phiên bản PHP mới nhất của Ondřej Surý, người bảo trì cho Debian PHP. Điều này luôn được cập nhật ngay cả khi các phiên bản PHP mới bị loại bỏ.
Nhập PPA PHP
Bước đầu tiên là nhập PPA.
sudo add-apt-repository ppa:ondrej/php -y
Lưu ý, bạn có thể cần cài đặt các phần phụ thuộc này nếu gặp sự cố:
sudo apt install apt-transport-https lsb-release ca-certificates software-properties-common -y
Tiếp theo, cập nhật danh sách kho lưu trữ vì kho lưu trữ mới sẽ yêu cầu nâng cấp một số gói hiện có và bạn nên làm trước khi cài đặt bất kỳ phiên bản PHP nào.
sudo apt update && sudo apt upgrade
Cài đặt PHP-FPM
Để cài đặt PHP-FPM, hãy nhập lệnh sau.


PHP 8.1:
sudo apt install php8.1-fpm php8.1-cli php8.1-common php8.1-mbstring php8.1-xmlrpc php8.1-soap php8.1-gd php8.1-xml php8.1-intl php8.1-mysql php8.1-cli php8.1-ldap php8.1-zip php8.1-mcrypt php8.1-curl php8.1-opcache php8.1-readline php8.1-xml php8.1-gd -y
Tiếp theo, xác nhận phiên bản đã cài đặt để kiểm tra xem cài đặt có thành công hay không bằng cách sử dụng lệnh sau.
php --version

Cuối cùng, hãy kiểm tra trạng thái của dịch vụ PHP-FPM để đảm bảo rằng nó đang chạy mà không có bất kỳ lỗi nào.
Ví dụ với PHP-FPM 8.1:
systemctl status php8.1-fpm

Theo mặc định, khi được cài đặt, dịch vụ sẽ được kích hoạt trên Ubuntu. Nếu dịch vụ chưa được kích hoạt vì lý do nào đó, hãy sử dụng lệnh sau bên dưới, sau đó kiểm tra lại trạng thái.
sudo systemctl php{version}-fpm enable --now
Cài đặt WordPress Backend
Tải về WordPress
Truy cập WordPress.org trang download và tìm mới nhất.zip" Liên kết tải xuống. Sau đó, sử dụng , Tải tập tin.
wget https://wordpress.org/latest.zip
Tạo cấu trúc thư mục cho WordPress
Bây giờ bạn đã tải xuống tệp lưu trữ, hãy tiến hành giải nén nó và chuyển nó vào 
Tạo thư mục cho WordPress:
sudo mkdir -p /var/www/html/wordpress
Giải nén WordPress vào thư mục www:
sudo unzip latest.zip -d /var/www/html/
Bạn phải đặt  hoặc gặp sự cố với quyền viết WordPress.
Đặt quyền chown (quan trọng):
sudo chown -R www-data:www-data /var/www/html/wordpress/
sudo find /var/www/html/wordpress -type d -exec chmod 755 {} \;
sudo find /var/www/html/wordpress -type f -exec chmod 644 {} \;
Tạo cơ sở dữ liệu cho WordPress
WordPress yêu cầu một cơ sở dữ liệu để chạy, do đó tại sao bạn phải cài đặt MariaDB. Trước khi tiếp tục, bạn cần tạo cơ sở dữ liệu cho WordPress bằng MariaDB. Đầu tiên, đưa bảng điều khiển đầu cuối lên và nhập nội dung sau.
Đưa lên vỏ MariaDB làm gốc:
sudo mariadb -u root
Tiếp theo, tạo cơ sở dữ liệu. Đây có thể là bất kỳ tên nào bạn muốn. Đối với hướng dẫn, bạn sẽ đặt tên cho nó 
Tạo cơ sở dữ liệu WordPress:
CREATE DATABASE WORDPRESSDB;
Sau khi cơ sở dữ liệu đã được tạo, bạn nên tạo một người dùng trang WordPress mới.

Điều này được thực hiện như một biện pháp bảo mật, vì vậy mỗi cơ sở dữ liệu có một người dùng khác nhau. Nếu một tên người dùng bị xâm phạm, kẻ tấn công sẽ không truy cập vào tất cả cơ sở dữ liệu của trang web khác.
Tạo người dùng cơ sở dữ liệu WordPress:
CREATE USER 'WPUSER'@localhost IDENTIFIED BY 'PASSWORD';
 với bất kỳ tên người dùng hoặc mật khẩu nào bạn muốn.
Bây giờ chỉ định quyền truy cập của người dùng mới được tạo vào cơ sở dữ liệu trang web WordPress bên dưới.
GRANT ALL PRIVILEGES ON WORDPRESSDB.* TO WPUSER@localhost IDENTIFIED BY 'PASSWORD';
Với tất cả cài đặt cấu hình cơ sở dữ liệu hoàn tất, bạn cần xóa các đặc quyền để có hiệu lực và thoát
Đặc quyền tuôn ra:
FLUSH PRIVILEGES;
Thoát khỏi MariaDB:
EXIT;
Đặt tệp cấu hình WordPress
Bạn cần đặt một số cài đặt trong wp-config-sample.php" tập tin. Dưới đây, bạn sẽ thấy cách đổi tên tệp mẫu và nhập các thông tin cần thiết.
Đầu tiên, đổi tên tệp cấu hình.
Đi tới thư mục WordPress:
cd /var/www/html/wordpress/
Đổi tên tệp cấu hình:
sudo mv wp-config-sample.php wp-config.php
Sử dụng trình soạn thảo văn bản, hiển thị tệp wp-config.php mới được đổi tên. Trong ví dụ của chúng tôi, chúng tôi sẽ sử dụng nano.
sudo nano wp-config.php
Tiếp theo, bạn sẽ nhập tên cơ sở dữ liệu, tài khoản người dùng với mật khẩu và địa chỉ IP máy chủ lưu trữ nếu khác với localhost.
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */ 

define( 'DB_NAME', 'WORDPRESSDB' );                 <--------------- change this

/* MySQL database username */ 

define( 'DB_USER', 'WPUSER );                               <--------------- change this

/* MySQL database password */

define( 'DB_PASSWORD', 'PASSWORD' );             <--------------- change this

/* MySQL hostname, change the IP here if external DB set up */ 

define( 'DB_HOST', 'localhost' );

/* Database Charset to use in creating database tables. */

define( 'DB_CHARSET', 'utf8' );

/* The Database Collate type. Don't change this if in doubt. */

define( 'DB_COLLATE', '' );
Khi bạn đang ở trong tệp này, việc thêm các cài đặt bổ sung sẽ giúp WordPress của bạn dễ quản lý hơn, chẳng hạn như lưu tệp trực tiếp thay vì sử dụng FTP và tăng giới hạn kích thước bộ nhớ.


Cấu hình khối máy chủ Nginx
Bây giờ, bạn gần như đã sẵn sàng để cài đặt WordPress thông qua giao diện người dùng web. Tuy nhiên, bạn cần phải định cấu hình khối máy chủ Nginx của mình. Các cài đặt bên dưới là khá quan trọng. Cần lưu ý nhấn mạnh tầm quan trọng của  vì nó thường là một vấn đề với các hướng dẫn khác để lại phần kết  bị bỏ lại, khiến bạn gặp phải các vấn đề lớn về sức khỏe trang web đến với API REST của WordPress.
Đầu tiên, tạo tệp cấu hình máy chủ mới bằng lệnh sau thay thế ví dụ bằng tên miền của bạn,
sudo nano /etc/nginx/sites-available/localhost
Dưới đây là một ví dụ; bạn có thể chọn các bộ phận; tuy nhiên,  cần có trong tệp cấu hình Nginx.


server {

  listen 80;
  listen [::]:80;
  server_name IP local;

  root /var/www/html/wordpress;

  index index.php index.html index.htm index.nginx-debian.html;


  location / {
  try_files $uri $uri/ /index.php?$args;
 }

  location ~* /wp-sitemap.*\.xml {
    try_files $uri $uri/ /index.php$is_args$args;
  }

  client_max_body_size 100M;

  location ~ \.php$ {
    fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
    include snippets/fastcgi-php.conf;
    fastcgi_buffer_size 128k;
    fastcgi_buffers 4 128k;
    fastcgi_intercept_errors on;        
  }

 gzip on; 
 gzip_comp_level 6;
 gzip_min_length 1000;
 gzip_proxied any;
 gzip_disable "msie6";
 gzip_types
     application/atom+xml
     application/geo+json
     application/javascript
     application/x-javascript
     application/json
     application/ld+json
     application/manifest+json
     application/rdf+xml
     application/rss+xml
     application/xhtml+xml
     application/xml
     font/eot
     font/otf
     font/ttf
     image/svg+xml
     text/css
     text/javascript
     text/plain
     text/xml;

  # assets, media
  location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
      expires    90d;
      access_log off;
  }
  
  # svg, fonts
  location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
      add_header Access-Control-Allow-Origin "*";
      expires    90d;
      access_log off;
  }

  location ~ /\.ht {
      access_log off;
      log_not_found off;
      deny all;
  }
}
Lưu ý, tìm và thay thế dòng trên  đến  cho 8.0.
Tiếp theo, bạn sẽ cần kích hoạt tệp cấu hình Nginx từ  Để làm điều này, bạn sẽ tạo một liên kết biểu tượng để  như sau.
sudo ln -s /etc/nginx/sites-available/localhost /etc/nginx/sites-enabled/
Đảm bảo thay thế  với tên tệp cấu hình của bạn.
Bây giờ bạn có thể chạy khô và sau đó khởi động lại máy chủ Nginx của mình nếu mọi thứ đều ổn.
sudo nginx -t
Sau khi kiểm tra mọi thứ đều ổn với bài kiểm tra chạy khô Nginx của bạn, hãy khởi động lại dịch vụ Nginx.
sudo systemctl restart nginx



đến đây là có thể vào WEB với IP được rồi 



Cấu hình PHP.ini
Trước khi chuyển sang phần cài đặt giao diện người dùng web, bạn nên điều chỉnh PHP của mình để sử dụng tối ưu cho WordPress. Các cài đặt này mang tính hướng dẫn nhiều hơn và bạn có thể tăng hoặc giảm chúng khi thấy phù hợp.
Đầu tiên, hãy đưa ra . Lưu ý rằng vị trí của bạn có thể khác nhau tùy thuộc vào số phiên bản PHP của bạn.
Ví dụ về PHP 8.1:
sudo nano /etc/php/8.1/fpm/php.ini
Các tệp phương tiện WordPress có thể khá lớn và giá trị mặc định có thể quá thấp. Bạn có thể tăng điều này lên gần bằng những gì bạn nghĩ rằng kích thước tệp lớn nhất của bạn sẽ là.
Vui lòng tìm các dòng sau đây và điều chỉnh chúng theo nhu cầu của bạn.
##increase upload max size recommend 50 to 100mb## 
 upload_max_filesize = 100MB

##increase post max size recommend 50 to 100mb##
 post_max_size = 100MB

## increase max execution time recommend 150 to 300##
 max_execution_time = 300

## increase GET/POST/COOKIE input variables recommend 5000 to 10000##
max_input_vars = 5000

## increase memory limit recommend 256mb or 512mb## MAKE SURE THIS MATCHES THE MB SETTING IN YOUR WP-CONFIG.CONF / ENSURE YOUR SYSTEM HAS ENOUGH RAM BEFORE RAISING!!!!
memory_limit = 256M
Bây giờ khởi động lại máy chủ PHP-FPM của bạn.


Ví dụ về PHP 8.1:
sudo systemctl restart php8.1-fpm
Các cài đặt PHP bạn đã điều chỉnh là dành cho phần phụ trợ PHP. Bạn cũng sẽ cần thay đổi khối máy chủ Nginx để cho phép kích thước cơ thể lớn. Điều này được thực hiện bằng cách mở lại khối máy chủ của bạn và thêm dòng sau.
Mở khối máy chủ của bạn.
sudo nano /etc/nginx/sites-available/example.com
Điều chỉnh dòng này để tăng kích thước cơ thể.
client_max_body_size 100M;
Hãy nhớ, giữ cho kích thước tối đa của khách hàng giống như .
Tiếp theo, hãy kiểm tra các thay đổi, sau đó khởi động lại máy chủ Nginx của bạn nếu mọi thứ đều ổn.
sudo nginx -t
Sau khi kiểm tra mọi thứ đều ổn với bài kiểm tra chạy khô Nginx của bạn, hãy khởi động lại dịch vụ Nginx.
sudo systemctl restart nginx
