import React from 'react'
import Map from './map'
import Routers from './router'
class Rindex extends React.Component{
    render(){
        const {routers}=this.props;
        return <Map routers={routers===undefined?Routers:routers}></Map>
    
    }
}
export default Rindex;