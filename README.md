# SereinApp

## 一款轻量级视频播放app

## 技术栈 : expo go + React Native + React Navigation

``` bash
# 由于开发原生App在windows或者mac中配置过于麻烦，因此选择了真机模拟的expo go进行开发

# 安装expo go，应用商店直接搜索expo go下载安装后注册

# 项目搭建

# yarn create expo-app expo-demo //项目名

# 进入项目中
cd expo-demo

npx expo start

运行与调试
可以使用模拟器、真机来运行、调试 App，这里最推荐的是使用Expo Go来运行。

运行方法
使用Expo Go(推荐)，首先确保手机与电脑处于同一 Wifi 网络中

iOS 使用系统自带的Code Scanner应用扫码
Android 使用Expo Go应用内的扫码按钮
命令行命令
按键	说明
a	打开Android 模拟器或连接到电脑上的真机设备
i	打开iOS模拟器
shift + i	可以选择指定的iOS模拟器设备
w	打开Web浏览器
j	打开调试工具
r	重载（刷新）App
m	打开、关闭开发工具菜单
?	显示所有可用命令
```
## 快速开始

   克隆项目：

   ```bash
   
   git clone https://github.com/jiangfan01/NewSereinApp.git

   # 进入项目   cd SereinApp

   # 安装依赖 yarn

   # 启动项目 yarn start

  在终端中使用 expo go软件扫码进入真机模拟

 # ！！！注意 由于服务器过期，接口是本地接口因此需要在

 src/utils/request.js 中的baseURL的Ip地址换成你网络中环境的Ip地址，否则无法进行读取接口数据

  ```
