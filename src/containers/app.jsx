import React from 'react'
import Rindex from 'router'
import {HashRouter as Router} from 'react-router-dom'
import 'common/css/index.css'
class App extends React.Component{
    render(){
        const {routes}=this.props
        return <div className='wrap'>
            <Router>
               <Rindex></Rindex>
            </Router>
        </div>
    }
}
export default App;