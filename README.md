### 剪映网页版后端

代码下载到服务器后，用pm2跑。

NGINX配一下转发规则：

```
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        
        location /api/ {
            proxy_pass http://localhost:4000; # 将请求转发到4000端口的Node.js服务
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        location /public/ {
            proxy_pass http://localhost:4000; # 转发到4000端口
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            rewrite ^/public(.*) $1 break;
        }

        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
        }
        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```

具体端口自己换



数据库备份流程：

```
1. 创建备份脚本backupmysql.sh
#!/bin/bash

# 数据库配置
DB_USER="数据库用户名"
DB_PASSWORD="对应的密码"
DB_NAME="aiData"
BACKUP_DIR="/root/mysqlbackup"
DATE=$(date +%Y%m%d%H%M%S)

# 创建备份
mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# 删除超过30天的备份
find $BACKUP_DIR -type f -name "backup_*.sql.gz" -mtime +30 -exec rm {} \;

2. 赋予脚本执行权限
chmod +x /root/mysqlbackup/backupmysql.sh

3. 编辑crontab文件
crontab -e

4. 添加以下行来设置定时任务，例如每天凌晨2点执行备份：
0 2 * * * /root/mysqlbackup/backupmysql.sh
```

数据恢复流程：

```
1. 登录数据库
mysql -u root -p
密码在腾讯文档有

2. 删除现有数据库
DROP DATABASE aiData;

3. 创建新数据库并退出
CREATE DATABASE aiData;
exit

4. 恢复备份
mysql -u root -p aiData < 备份文件路径.sql
```
