import { Link, useNavigate } from "react-router-dom";

/*
리엑트에서는 두가지 방법을 통해서 새로운 페이지로 이동할수 있는데 방법은 아래와 같다.
얼핏보면 둘다 결국은 다른페이지로 가기 위해서 주소값을 반환해주는 것이라고 생각할수 있지만, 
큰 차이점이 존재한다.

    # Link
        - 클릭 시 바로 이동하는 로직 구현 시에 사용 용이
        - react-router-dom 에서 제공하는 Link 컴포넌트는 DOM 에서 a 태그로 변환이 됩니다.
        - 이런 a 태그와 마찬가지로 Link 컴포넌트도 지정한 경로로 바로 이동을 시켜줍니다.
        -a 태그와 Link 차이
            - a : 외부 프로젝트로 이동하는 경우
            - Link : 프로젝트 내에서 페이지 전환하는 경우
    #useNavigate
        -어떠한 이벤트나 조건을 만족시 해당 으로 이동할수 있도록 조절할수 있는 방법이다.
        반환하는 함수를 navigate라는 변수에 저장 후 
        navigate의 인자로 설정한 path값을 넘겨주면 해당 경로로 이동할 수 있습니다.


요약 :

어떠한 조건을 만족했을 때, 이동을 할수 있도록 하는것이 useNavigate이다.

그게 아니고 그냥 누르면 가게 하는거는 a 태그처럼 사용하는것, 그게 Link이다.


두 가지 방법 활용법
1. Link
클릭 시 바로 이동하는 로직 구현 시에 사용
ex) 상품 리스트에서 상세 페이지 이동 시

2. useNavigate
페이지 전환 시 추가로 처리해야 하는 로직이 있을 경우 useNavigate 사용
ex) 로그인 버튼 클릭 시
회원가입 되어 있는 사용자 -> Main 페이지로 이동
회원가입이 되어 있지 않은 사용자 -> SignUp 페이지로 이동


*/


function Header() {
    //일반적으로 navigate 이훅보다는 loaders 또는 action에서 리다이랙트를 사용하는 것이 좋음.
    const navigate = useNavigate();
    const onAboutClick = () => {
        navigate("/about");
    };
    return ( 
        <header>
            <ul>
                <li>
                    <Link to={"/"}> - Home</Link>
                </li>
                <li>
                    <button onClick={onAboutClick}> - About</button>
                </li> 
            </ul>
        </header>
    );
  }
  
  export default Header;
  