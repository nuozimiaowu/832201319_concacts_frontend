# 联系人管理应用

## 简介

本项目是一个简单的联系人管理应用，允许用户添加、编辑和删除联系人信息。用户可以输入姓名、性别、电话号码和备注，并随机生成联系人头像。

## 功能

- **添加联系人**：用户可以通过点击右上角的添加按钮，输入相关信息，添加新联系人。
- **编辑联系人**：用户可以修改现有联系人的信息。
- **删除联系人**：用户可以删除不再需要的联系人。
- **联系人列表展示**：应用会展示所有联系人的信息，若无联系人则会提示用户。

## 技术栈

- HTML
- CSS
- JavaScript
- 使用 Fetch API 与后端进行数据交互

## 项目结构

```
bash复制代码/project-root
├── index.html          # 主页面
├── index.css           # 样式文件
├── index1.js           # JavaScript 逻辑文件
├── /img                # 存放图片资源
└── /avatar             # 存放头像图片
```

## 安装与运行

1. 确保已安装 Node.js 和 npm。

2. 克隆项目到本地：

   ```
   bash复制代码git clone <repository-url>
   cd <project-directory>
   ```

3. 启动后端服务（确保后端接口已运行）：

   - 项目中的 JavaScript 文件中，API_BASE_URL 指向后端服务地址（默认为 `http://localhost:8080/api/contacts`）。

4. 使用浏览器打开 `index.html` 文件。

## 使用方法

1. 打开应用后，点击右上角的添加按钮。
2. 填写联系人信息并保存。
3. 点击已添加联系人的“更多”按钮可展开查看详细信息。
4. 使用“修改”按钮编辑信息，使用“删除”按钮移除联系人。

## 注意事项

- 确保后端 API 正常工作，以便能与前端进行数据交互。
- 应用样式可以根据需要进行调整和美化。

## 贡献

欢迎提交 Issues 或 Pull Requests，共同改善此项目！

## 许可证

此项目未使用特定许可证，欢迎自由使用和修改。请在遵循社区规范的前提下进行贡献。
