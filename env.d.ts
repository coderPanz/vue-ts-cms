/// <reference types="vite/client" />

// .vue文件的类型声明

// DefineComponent 是一个类型别名，用于定义 Vue 3 组件的类型。在 Vue 3 中，我们可以使用 defineComponent 函数来创建组件，并通过类型别名 DefineComponent 来指定组件的类型。
// 我们可以这样定义一个基本的 Vue 3 组件


// import { defineComponent } from 'vue'

// export default defineComponent({
//   name: 'MyComponent',
//   props: {},
//   data() { return {} },
//   methods: {}
// })


// 我们使用 defineComponent 函数创建了一个名为 MyComponent 的组件，并指定了该组件的 props、data、method属性。注意到我们并没有显式地指定组件的类型，而是直接将 defineComponent 函数的返回值作为默认类型。

// 插件vloar 使用时可以不需要声明.vue文件
// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent
//   export default component
// }

declare module '*.mjs'