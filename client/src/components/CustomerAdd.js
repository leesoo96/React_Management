import React from 'react';
// post 방식으로 데이터를 고객추가데이터를 서버로 보내도록 함
import { post } from 'axios'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialongContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles }  from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display : 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
// 사용자의 프로필이미지를 파일형태로 보내기위해 null값을 넣음
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false // 고객 추가 창 설정
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault(); // 데이터 전송 시 오류 발생 제어
        this.addCustomer()
            .then((response) => { // 서버로부터 응답이 왔을 때
                console.log(response.data);
                this.props.stateRefresh(); 
                // 서버 응답 후 새로고침이 되면서 고객이 추가된다
            })
        this.setState({ // state 값 초기화
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false // 고객 추가 후 창닫기
        })
        //window.location.reload(); 새로고침이 되면서 고객이 추가된다
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        // 사용자가 입력한 값을 name에 넣겠다는 의미
        nextState[e.target.name] = e.target.value;
        this.setState(nextState); // state 값 변경
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        // append -> 특정 데이터를 서버로 전송
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: { 
// 전송하고자하는 정보에 파일이 존재할 경우 multipart/form-data 설정을 꼭 해줘야한다
                'content-type' : 'multipart/form-data'
            }
        }
      return post(url, formData, config);
    /* post 라이브러리를 이용하여 해당 url에 formData을  
       환경설정(config)에 맞게 데이터를 전송한다 */
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary"
                        onClick={this.handleClickOpen}>
                    고객 추가
                </Button>
                <Dialog open={this.state.open}
                         onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialongContent>
                    <input type="file" className={classes.hidden}
                           accept="image/*"
                           id="raised-button-file"
                           file={this.state.file} 
                           value={this.state.fileName} 
                           onChange={this.handleFileChange} />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained"
                                color="primary"
                                component="span"
                                name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField type="text" label="이름" 
                               name="userName"
                               value={this.state.userName}
                               onChange={this.handleValueChange} /><br/>
                    <TextField type="text" label="생년월일" 
                               name="birthday"
                               value={this.state.birthday}
                               onChange={this.handleValueChange} /><br/>
                    <TextField type="text" label="성별" 
                               name="gender"
                               value={this.state.gender}
                               onChange={this.handleValueChange}/> <br/>
                    <TextField type="text" label="직업" 
                               name="job"
                               value={this.state.job}
                               onChange={this.handleValueChange}/>
                    </DialongContent>
                    <DialogActions>
                        <Button variant="contained"
                                color="primary"
                                onClick={this.handleFormSubmit}>
                            추가
                        </Button>
                        <Button variant="outlined"
                                color="primary"
                                onClick={this.handleClickClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);