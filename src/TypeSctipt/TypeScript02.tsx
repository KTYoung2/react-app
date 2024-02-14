import { useState } from "react";




function Form() {
  const [value, setValue] = useState("");
                      /* 이벤트 타입 명시하기(이밴트 보호)
                      리액트는 js의 실제 이벤트를 넘겨주는 게 아니라 SyntheticEvent를 주는 것
                      SyntheticEvent은 기본적으로 리액트 버전의 이벤트임. 
                      리액트가 다른 방식으로(js와는 다른) 이벤트를 최적화 할 수 있기 때문. 
                      https://abangpa1ace.tistory.com/entry/Reactjs-SyntheticEvent%ED%95%A9%EC%84%B1-%EC%9D%B4%EB%B2%A4%ED%8A%B8
                      참고 ^^,,,,,,,,
                      */
  const onChange = (event : React.FormEvent<HTMLInputElement>) =>{
    console.log(event.currentTarget.value);
              //리액트 + 타입스크립트 조합으로 사용할땐 target -> currentTarget으로 사용
    const {
      currentTarget : {value},
    }= event;
    setValue(value);
  };

  const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return ( 
      <div>
        <form onSubmit={onSubmit}>
          <input 
            value={value}
            onChange={onChange}
            type="text" 
            placeholder="username" />
          <button>Login</button>
        </form>
      </div>
  );
}

export default Form;
