### 一、react是什么？

react是一个js框架，可以用它来编写html页面，使用react后我们可以完全抛弃html（只需要一个主index文件），而用纯js来编写页面；

### 二、为什么要使用react

和直接用html编写页面相比，使用react有以下几点好处：

1. 便于代码的复用

用html编写页面时，如果多个页面拥有基本相同的模块，那么需要把相关模块在各个html文件中全部复制一遍。而使用react我们只需要把这些模块写成组件，在各个页面中调用这个组件即可；

2. 提高渲染效率

当信息发生改变时，需要重新渲染页面，如果用html编写，我们需要花很多精力考虑架构问题，保证渲染效率；而react把这些问题封装了起来，编写高性能页面会变得特别容易；

3. 容易管理

当网站页面变得复杂时，页面管理将变得非常重要，我们需要花很多精力在页面架构和代码维护上，而react让这一切变得简单；

### 三、react不能帮我们做什么

react的目的是让我们更好的管理和复用代码，若自己要编写react组件，那么基本的html标签的应用，css语法都是必须要掌握的；使用react后我们依然需要做以下两点：

1. 亲自编写所有要渲染的页面，虽然不用使用html，但需要用类似的 JSX语法。react只是帮我们提高了复用性；

2. 亲自写所有的css代码，页面呈现效果依然需要自己分析编写；

当然借助很多开源的react组件，可以取代一部分这些工作，不过做出的网站大都比较雷同，缺乏个性；

### 四、深入理解react究竟做了什么

对前端稍微有点基础的都知道，前端学习有3大块html+css+js，其中我们看到的所有web页面的显示效果只有两个因素决定 ，即html和css；只要页面发生了改变，无论是呈现的数据变了，图表变了，图片变了还是某个颜色变了，无论这种改变是如何导致的，比如鼠标点击，声音控制或者后台数据改变。那么必然意味着html或者css发生了改变；简而言之，页面的呈现和html+css有着一一对应的关系；而前端的主要工作，除了编写各种页面之外，就是使用js语言根据数据来不断地更新html和css，从而使页面发生变化；

1. 原生开发如何更新页面

当js以浏览器作为宿主环境时，浏览器为js提供了DOM作为js操作文档的唯一接口，当不使用任何框架时，要更新页面，我们必须亲自调用DOM提供的API来更改文档，效率极其低下；

2. react如何更新页面

在react中每个组件都有一个state对象，它存储了当前组件需要的所有可能发生变化的数据，渲染的html页面和state中的数据是一种一一对应的关系。只要我们通过setState方法改变了state中的数据，那么html也就跟着变化了，无需我们亲自动手修改dom；在使用react时，只要我们根据state构建了组件，接下来只需要考虑如何更新state即可。react为更新dom提供了非常高效的算法，这里不深入展开去讲了；

### 五、react的基本用法

react组件的编写需要两类信息，变化的和不变的。在组件编写时要花精力去分析哪些属性在组件的生命周期中是有可能发生变化的，哪些是不变的。不变的部分我们就可以写死在html中，针对变化的部分其信息来源有两种 ，即组件的状态和父组件的状态；

1.组件的状态

在编写组件时，要为组件编写一个state属性，存储了当前组件需要的数据；当需要改变状态时，调用当前组件的this.setState（）方法即可，浏览器会自动重新渲染当前组件，下面是官方demo的一个例子：
```
class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}
```

2.父组件的状态

当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中的状态数据就能够更方便地交流共享了。（官方文档），官方示例如下：
```
//父组件
 renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
  //子组件
  class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
```

#### 关键概念总结：

state——组件的状态属性<br>
setState——重新设置组件的状态（这里注意，需要设置一个新的对象而不是在原有组件对象上做修改，至于原因，官方文档上说的很清楚）<br>
props——子组件通过这个属性获得父组件的信息<br>

### 六、redux

1. 为什么要使用redux

redux是一个用来管理前端数据的一个架构，只有在应用程序非常复杂，数据来源复杂，交互频繁的情况下，应用redux才有明显的好处；比如，某个应用有上百个组件，并且组件之间信息交互频繁，如果不使用redux，那么数据将会分散在上百个组件当中，并且当多个组件需要同一个数据时，同样的数据在每个组件中将有一个副本，当数据改变时，维护起来会相当麻烦。这种情况下就需要考虑引入redux；

2. redux设计的三大原则

* 单一数据源

使用redux的程序，所有的state都存储在一个单一的数据源store内部，类似一个巨大的对象树。

* state是只读的

state是只读的，能改变state的唯一方式是通过触发action来修改

* 使用纯函数执行修改

为了描述 action 如何改变 state tree ， 你需要编写 reducers。
reducers是一些纯函数，接口是当前state和action。只需要根据action，返回对应的state。而且必须要有返回。

3. 主要API

store=createStare（reducer）——创建store<br>
state=store.getState（）<br>
store.dispatch（action）——触发action，这是改变state的唯一接口<br>
store.subscribe（listener）——一旦State发生变化，就自动执行这个函数，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。<br>

4. reducer的拆分
Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，就可以将它们合成一个大的 Reducer。

### 七、react-redux

为了方便使用，Redux 的作者封装了一个 React 专用的库 React-Redux；React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component），其中UI组件，是“纯组件”，只负责呈现，所有数据通过props获取；容器组件负责数据和逻辑。可以使用装饰器模式把纯组件转化为容器组价，这里主要用到了三个函数：

1. mapStateToProps（state,ownprops）

建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。

2. mapStateToProps（dispatch，ownProps）

用来建立store.dispatch方法到props对象的映射。

3.connect

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。它需要mapStateToProps和mapStateToProps作为参数。例如

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)（TodoList）

* <Provider> 组件

当组件嵌套比较深的时候，内层组件要获得state会非常麻烦，需要借助props属性一层一层传递。Proveder组件解决了这个问题，把Provider组件放在最外层，只要在Proveder上传入store，这样所有子组件都可以拿到state了

```
render（
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
）
```

### 八、react-router

一个应用程序往往不只一个页面，在多页面应用程序中我们需要在各个页面之间切换，react-route架构提供了在多个页面和组件之间进行切换的机制；react-router主要提供了以下组件：

<BrowserRouter>

<Link>

为你的应用提供声明式的、可访问的导航链接。
--属性 to
<Route>

最基本的职责是在其 path 属性与某个 location 匹配时呈现一些 UI。
--属性 path
--属性 component
--exact完全匹配

<Switch>

只渲染命中的第一个路由

<Redirect>

直接渲染路由
--属性 to


