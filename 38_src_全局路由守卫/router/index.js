//该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

//创建并暴露一个路由器
const router = new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About,
            meta:{title:'关于'}
        },
        {
            name:'zhuye',
            path:'/home',
            component:Home,
            meta:{title:'主页'},
            children:[
                {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    meta:{isAuth:true,title:'新闻'},
                },
                {
                    name:'xiaoxi',
                    path:'message',
                    component:Message,
                    meta:{isAuth:true,title:'消息'},
                    children:[
                        {
                            name:'xiangqing',
                            path:'detail/:id/:title',
                            component:Detail,
                            meta:{isAuth:true,title:'详情'},
                            //props的第一种写法，值为对象，该对象中所有的key-value都会以props的形式传给Deatil组件
                            // props:{a:1,b:'helo'}

                            //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Deatil组件
                            // props:true,

                            //props的第三种写法：值为函数
                            props($route){
                                return {id:$route.params.id,title:$route.params.title}
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

//全局前置路由守卫--初始化、每次路由切换之前被调用
router.beforeEach((to,from,next) => {
    console.log('前置路由守卫',to,from)
    if(to.meta.isAuth){ //判断是否需要鉴权
        if(localStorage.getItem('school') === 'atguigu'){
            next()
        }else{
            alert('学校名不对，无权查看页面')
        }
    }else{
        next()
    }
})

//全局后置路由守卫--
router.afterEach((to,from) => {
    console.log('后置路由守卫')
    document.title = to.meta.title || '测试系统'
})

export default router