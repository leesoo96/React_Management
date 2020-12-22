import React from 'react';
// post 방식으로 데이터를 고객추가데이터를 서버로 보내도록 함
import { post } from 'axios'; 

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
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault(); // 데이터 전송 시 오류 발생 제어
        this.addCustomer()
            .then((response) => { // 서버로부터 응답이 왔을 때
                console.log(response.data);
            })
        this.setState({ // state 값 초기화
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload(); // 새로고침이 되면서 고객이 추가된다
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

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h2>고객 추가</h2>
                프로필 이미지 : <input type="file" 
                                name="file" 
                                file={this.state.file} 
                                value={this.state.fileName} 
                                onChange={this.handleFileChange} /><br/>
                이름 : <input type="text" 
                              name="userName"
                              value={this.state.userName}
                              onChange={this.handleValueChange} /><br/>
                생년월일 : <input type="text" 
                                  name="birthday"
                                  value={this.state.birthday}
                                  onChange={this.handleValueChange} /><br/>
                성별 : <input type="text" 
                              name="gender"
                              value={this.state.gender}
                              onChange={this.handleValueChange}/> <br/>
                직업 :  <input type="text" 
                               name="job"
                               value={this.state.job}
                               onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;