import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div>Homepage</div>
                <Link to = '/intakeform'>Form</Link>
            </div>
            
        );
    }
}
 
export default HomePage;