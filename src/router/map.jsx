import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {getSession} from '@/utils/index.js'
class Map extends React.Component{
    render(){
        const {routers}=this.props;
        const defaultRoute = <Route path='/' component={()=>{
            return <Redirect to="/login" />
        }} key={"redirect"} exact/>
        return <Switch>
                {
                      routers.length && routers.map((itm, ind) => {
                        const Children = itm.children === undefined ? [] : itm.children;
                        const ChildrenRoutes=<Route key={ind} path={itm.path} render={(api) => {
                                document.title=itm.title || "默认title"
                                return <itm.component routers={Children} {...api}></itm.component>
                            }}></Route>
                        if(itm.component){
                        return !itm.auth ? ChildrenRoutes 
                         :(getSession('token')
                         ? ChildrenRoutes
                        : <Redirect  from='/home' to="/login" key={'1111'}/>)
                        }
                    }).concat(defaultRoute)
                }
            </Switch>
            
        
    }
}
export default Map;