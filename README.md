# 青葵有声书

这是一个适合手机扫码访问的儿童有声阅读网站。每一页书对应一个独立网址，页面只展示一个简洁的音频播放器，用来播放对应的 MP3 文件。

## 项目结构

```
QINGKUI/
├── index.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   └── player.js
├── audio/
│   ├── page01.mp3
│   ├── page02.mp3
│   └── ...
└── pages/
    ├── page01.html
    ├── page02.html
    └── ...
```

## 访问方式

推荐把项目部署到 GitHub Pages，并使用自定义域名 `qzqingkui.com`。

页面地址建议保持为：

- `https://qzqingkui.com/page01`
- `https://qzqingkui.com/page02`
- `https://qzqingkui.com/page03`

## 音频文件规则

所有 MP3 文件统一放在 `audio/` 文件夹中，文件名与页面编号一一对应：

- `page01.html` 对应 `audio/page01.mp3`
- `page02.html` 对应 `audio/page02.mp3`
- `page03.html` 对应 `audio/page03.mp3`

## 新增页面

以后增加新页时，只需要两步：

1. 新增 `audio/page04.mp3`
2. 新增 `pages/page04.html`

然后把 `pages/page04.html` 里的音频路径写成：

```html
<audio id="audio" preload="metadata" src="../audio/page04.mp3"></audio>
```

页面样式无需修改。

## GitHub Pages 注意事项

GitHub Pages 适合部署这种纯静态网站，但它没有后端路由重写功能。为了让扫描二维码后仍能访问对应页面，建议你直接把二维码指向页面文件本身，例如：

- `https://qzqingkui.com/pages/page01.html`
- `https://qzqingkui.com/pages/page02.html`

如果你后续一定要使用 `https://qzqingkui.com/page01` 这种干净地址，需要额外使用前端路由方案或第三方重写层；当前项目先按最稳妥的静态方式组织。

## 本地测试

你可以在项目根目录启动本地服务器测试：

```bash
python -m http.server 8000
```

然后访问：

- `http://localhost:8000/pages/page01.html`

## 说明

- 页面本身只显示播放器
- 音频通过相对路径加载，适合 GitHub Pages
- 未来扩展时只需添加新音频和新页面即可
