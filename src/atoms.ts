import { atom } from "recoil";

/*

recoil

글로벌 state => 어플리케이션이 특정 value에 접근해야 할 때 쓰는 것. 
(컴포넌트가 어디에 있던, 누가 접근하고자 하던 상관 없이)
즉 어플리케이션 전체에 공유되는 state

( 다크모드 ) 함수가
상위 컴포넌트에서 하위 컴포넌트로 계속 해서 전달
App  ( 다크모드 )=> Router => Coin => Chart

=======> Recoil 사용 =========

     ( 다크모드 ) 
함수를 전역 STATE로 만들어 => " atom "
=> APP        => CHART
그 value가 필요한, 어디든 바로 접근할 수 있게   ( 다크모드 ) 함수Value를 전달

-atom을 형성하고 ,그 value가 필요한 컴포넌트가 직접 atom에 연결 
==> 위에 모든 컴포넌트를 거칠필요가 없이 ! 


*/




// 아톰을 생성하기 위해선 고유key ,  default value 설정 필요 
export const isDarkAtom = atom({
    key : "isDark",
    default : false,
});