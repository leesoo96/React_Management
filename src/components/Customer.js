import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCeil from '@material-ui/core/TableCell';

class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCeil>{this.props.id}</TableCeil>
                <TableCeil><img src={this.props.image} alt="profile"/></TableCeil>
                <TableCeil>{this.props.name}</TableCeil>
                <TableCeil>{this.props.birthday}</TableCeil>
                <TableCeil>{this.props.gender}</TableCeil>
                <TableCeil>{this.props.job}</TableCeil>
            </TableRow>
        ) 
    }
}

export default Customer;