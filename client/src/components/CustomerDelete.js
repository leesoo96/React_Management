import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialongContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    // 팝업창 클릭 이벤트
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClickClose = () => {
        this.setState({ // state 값 초기화
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }
    
    deleteCustomer(id){
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        // 삭제 후 목록을 갱신하여 화면에 목록 출력
        this.props.stateRefresh();
    }
    
    render(){
        return (
            <div>
            <Button variant="contained" color="secondary"
                    onClick={this.handleClickOpen}>삭제하기</Button>
            <Dialog open={this.state.open} onClose={this.handleClickClose}>
               <DialogTitle onClose={this.handleClickClose}>
                삭제 경고
              </DialogTitle> 
              <DialongContent>
                    <Typography gutterBottom>
                        선택한 고객 정보를 삭제하시겠습니까?
                    </Typography>
              </DialongContent>
              <DialogActions>
                    <Button variant="contained"
                            color="primary"
                            onClick={(e) => {this.deleteCustomer(this.props.id)}}>
                     삭제
                    </Button>
                    <Button variant="outlined"
                            color="primary"
                            onClick={(e) => {this.handleClickClose(this.props.id)}}>
                     닫기
                    </Button>
              </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;