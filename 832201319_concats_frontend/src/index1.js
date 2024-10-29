// index1.js

document.addEventListener('DOMContentLoaded', function () {
    var DOM = {
        mask: document.getElementById('mask'),
        add: document.getElementById('add'),
        avatar: document.getElementById('avatar'),
        name: document.getElementById('name'),
        gender: document.getElementById('gender'),
        phoneNumber: document.getElementById('phoneNumber'),
        remarks: document.getElementById('remarks'),
        save: document.getElementById('save'),
        cancel: document.getElementById('cancel'),
        random: document.getElementById('random'),
        content: document.getElementById('content'),
        template: document.getElementById('template'),
        tip: document.getElementById('tip'),
    };

    var nowNode;
    const API_BASE_URL = 'http://localhost:8080/api/contacts';

    // 控制模态框的显示与隐藏
    function disableAddModal(show) {
        if (show) {
            DOM.mask.className = '';
            DOM.avatar.style.backgroundImage =
                "url('./avatar/" + Math.floor(Math.random() * 47) + ".jpg')";
            // 如果是编辑模式，保留原有信息
            if (!nowNode) {
                DOM.name.value = '';
                DOM.gender.value = '';
                DOM.phoneNumber.value = '';
                DOM.remarks.value = '';
            }
        } else {
            DOM.mask.className = 'disableAddModal';
        }
    }

    // 添加新联系人按钮事件
    DOM.add.addEventListener('click', function () {
        nowNode = undefined;
        disableAddModal(true);
    });

    // 关闭模态框
    DOM.cancel.addEventListener('click', function () {
        nowNode = undefined;
        disableAddModal(false);
    });

    // 随机生成头像
    DOM.random.addEventListener('click', function () {
        DOM.avatar.style.backgroundImage =
            "url('./avatar/" + Math.floor(Math.random() * 47) + ".jpg')";
    });

    // 切换卡片展开状态
    function expand(element) {
        element.parentNode.classList.toggle('card_expand');
    }

    // 编辑联系人
    function edit(node) {
        nowNode = node;
        disableAddModal(true);
        DOM.avatar.style.backgroundImage = node.querySelector('.avatar').style.backgroundImage;
        DOM.name.value = node.querySelector('.name').innerText;
        DOM.gender.value = node.querySelector('.gender').innerText;
        DOM.phoneNumber.value = node.querySelector('.phoneNumber').innerText;
        DOM.remarks.value = node.querySelector('.remarks').innerText;
    }

    // 删除联系人
    function remove(node) {
        const contactId = node.dataset.id;
        fetch(API_BASE_URL + '/delete/' + contactId, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    node.remove();
                    if (DOM.content.children.length === 1) {
                        DOM.tip.style.display = 'block';
                    }
                } else {
                    console.error('Failed to delete contact');
                }
            })
            .catch(error => {
                console.error('Error deleting contact:', error);
            });
    }

    // 保存联系人（添加或修改）
    DOM.save.addEventListener('click', function () {
        const contactData = {
            name: DOM.name.value,
            gender: DOM.gender.value,
            phoneNumber: DOM.phoneNumber.value,
            remarks: DOM.remarks.value
        };

        if (nowNode) {
            // 更新联系人
            const contactId = nowNode.dataset.id;
            fetch(API_BASE_URL + '/modify/' + contactId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            })
                .then(response => response.json())
                .then(updatedContact => {
                    // 更新界面
                    nowNode.querySelector('.name').innerText = updatedContact.name;
                    nowNode.querySelector('.gender').innerText = updatedContact.gender;
                    nowNode.querySelector('.phoneNumber').innerText = updatedContact.phoneNumber;
                    nowNode.querySelector('.remarks').innerText = updatedContact.remarks;
                    disableAddModal(false);
                    nowNode = undefined;
                })
                .catch(error => {
                    console.error('Error updating contact:', error);
                });
        } else {
            // 添加新联系人
            fetch(API_BASE_URL + '/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            })
                .then(response => response.json())
                .then(newContact => {
                    // 创建新节点并添加到界面
                    const node = DOM.template.cloneNode(true);
                    node.style.display = 'block';
                    node.removeAttribute('id');
                    node.dataset.id = newContact.id;
                    node.querySelector('.name').innerText = newContact.name;
                    node.querySelector('.gender').innerText = newContact.gender;
                    node.querySelector('.phoneNumber').innerText = newContact.phoneNumber;
                    node.querySelector('.remarks').innerText = newContact.remarks;
                    node.querySelector('.avatar').style.backgroundImage = DOM.avatar.style.backgroundImage;

                    // 添加事件监听器
                    node.querySelector('.more').addEventListener('click', function () {
                        expand(this);
                    });
                    node.querySelector('.edit').addEventListener('click', function () {
                        edit(node);
                    });
                    node.querySelector('.delete').addEventListener('click', function () {
                        remove(node);
                    });

                    DOM.content.appendChild(node);
                    disableAddModal(false);
                    if (DOM.content.children.length > 1) {
                        DOM.tip.style.display = 'none';
                    }
                })
                .catch(error => {
                    console.error('Error adding contact:', error);
                });
        }
    });

    // 从后端获取所有联系人并渲染
    function fetchContacts() {
        fetch(API_BASE_URL + '/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应失败，状态码：' + response.status);
                }
                return response.json();
            })
            .then(data => {
                renderContacts(data);
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
                alert('获取联系人列表失败：' + error.message);
            });
    }

    // 渲染联系人列表
    function renderContacts(contacts) {
        DOM.content.innerHTML = ''; // 清空内容
        if (contacts.length === 0) {
            DOM.tip.style.display = 'block';
        } else {
            DOM.tip.style.display = 'none';
        }
        contacts.forEach(contact => {
            const node = DOM.template.cloneNode(true);
            node.style.display = 'block';
            node.removeAttribute('id');
            node.dataset.id = contact.id;
            node.querySelector('.name').innerText = contact.name;
            node.querySelector('.gender').innerText = contact.gender;
            node.querySelector('.phoneNumber').innerText = contact.phoneNumber;
            node.querySelector('.remarks').innerText = contact.remarks;
            node.querySelector('.avatar').style.backgroundImage = `url('./avatar/${Math.floor(Math.random() * 47)}.jpg')`;

            // 添加事件监听器
            node.querySelector('.more').addEventListener('click', function () {
                expand(this);
            });
            node.querySelector('.edit').addEventListener('click', function () {
                edit(node);
            });
            node.querySelector('.delete').addEventListener('click', function () {
                remove(node);
            });

            DOM.content.appendChild(node);
        });
    }

    // 页面加载时获取联系人列表
    fetchContacts();
});
