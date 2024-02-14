import { useState } from "react";
import styled from "styled-components"


/*


TypeScript

개발자가 할 수 있는 사소한 실수들을 코드 실행 전에 잡아주는 유용한 도구.
ex. const plus = (a + b) => a + b 라는 함수가 있을 때 number만 더하고 싶음
변수 자료형(type)을 자바스크립트만으로 체크 할 수 없음 ! 이때 타입 스크립트로 타입을 명시해줄 수 있음.
const plus = (a: number + b: number) => a + b (number) 
"코드 실행전" 잘못된 자료형이 들어가 있을 경우를 체크해 주어 잘못된 실행 결과를 내놓는 것을 방지할 수 있음. 

즉 타입 스크립트를 사용하는 이유는 "코드가 실행하기 전" 오류를 확인하고 싶어서

 */

interface ContainerProps {
    bgColor : string;
    borderColor?: string;
};

                        //스타일 컴포넌트 인터페이스 설정 
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props)=> props.bgColor};
    border-radius: 50%;
    border : 2px solid ${(props) => props.borderColor};
`;

//인터페이스? object shape(객체 모양)을 타입 스크립트에게 설명해주는 것
interface CircleProps {
    //인터페이스 내부에 객체 모양 설정
    bgColor : string;
    //필수가 아닌 옵션으로 설정해주고 싶을 때 '?' 
    borderColor?:string;
    text? : string;
};


/* 연습

interface PlayerProps {
    name : string;
    age: number;
}

const sayHello = (playerObj : PlayerProps) => 
    `Hello ${playerObj.name} you are ${playerObj.age} old`;

console.log(sayHello({name:"winter", age:2}));

console.log(sayHello({name:"winter", age:"12"}))
    ====> 오류 

*/


                                                                // bg타입의 인터페이스 설정  
function Circle ({bgColor, borderColor, text = "난 디폴트 텍스트다 으하하"} : CircleProps) {
                                        //프롭스에 디폴트값 설정

   /* const [counter, setCounter] = useState(1);
                        타입 스크립트는 디폴트 값으로 변수타입을 알아서 체크할 수 있음. */

    /*
    const [value, setValue] = useState<string|number>();
                //둘 중 하나의 타입이 될 수 있다고 설정  */
    return (
        <Container 
               //스타일 컴포넌트에게 프롭스 보내기
            bgColor={bgColor} 
            borderColor={borderColor ?? "white"}>
                 
        {text}
        </Container>
                         /* ?? Null 병합 연산자.
                            ?? 앞에 값이 null이거나 undefined면 오른쪽 값을, 그렇지 않으면 왼쪽
                            값을 반환하는 논리연산자
                            
                            null ?? "hello" -> hello 반환
                            undefined ?? "Hi" => Hi 반환
                            "hi" ?? "hello" => hi 반환
                        */
    );
}

export default Circle;