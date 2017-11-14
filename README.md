# React-STLLoader-Compnent
[![NPM](https://nodei.co/npm/react-stlloader-component.png)](https://nodei.co/npm/react-stlloader-component/)

把threejs的STLLoader封装成React组件

A React Compnent with using THREE.STLLoader 

# 初始化

## 依赖
确保已经安装 React, 再安装 Three.js

* Three.js installed via npm (`npm install three`)

## 安装

`npm install react-stlloader-component`

## 使用

```
import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-stlloader-component';

class Example extends React.Component {

    render() {
        return (
            <Loader url={你需要填写的 xxx.stl 文件URL}
                    width={500}
                    height={500}>
            </Loader>
        );
    }
}

ReactDOM.render(
    <Example/>, document.getElementById('root')
); 
```

载入新的STL文件,<Loader />将会刷新并且载入新的文件
```
<Loader url={this.state.url}
        width={500}
        height={500}>
</Loader>

handleChangeSTL() {
    this.setState(
        {url: // 新的 xxx.stl  URL}
    );
}
```

Good luck to you!