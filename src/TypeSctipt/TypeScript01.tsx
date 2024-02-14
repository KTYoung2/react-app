import { useState } from "react";
import styled from "styled-components"


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