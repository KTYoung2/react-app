import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
    //리액트 쿼리의 모든 내부 작동을 시각화하는데 도움이 되며 오류발생시 디버깅 시간 절약가능 ! 
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { darkTheme, lightTheme } from "./Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Sans+KR&family=Poppins:wght@300&display=swap');
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: ${(props)=> props.theme.bgColor};
  color: ${(props)=> props.theme.textColor};

}

a {
  text-decoration: none;
  color:inherit;
}

`;

const DarkBtn = styled.button`
    position: fixed;  
    bottom: 40px; 
    right: 140px;
    font-size: 40px;
    border: none;
    cursor: pointer;
    background-color: ${(props)=> props.theme.bgColor};
`;

const Footer = styled.div`
  position: relative;
  padding: 30px;
  background-color: ${(props)=> props.theme.bgColor};
`;

const TopBtn = styled.button`
    position: fixed;  
    bottom: 40px; 
    right: 65px;
    font-size: 40px;
    border: none;
    background-color: ${(props)=> props.theme.bgColor};
    cursor: pointer;
`;



function App() {
  //아톰 값 불러오기. useRecoilValue(불러올 아톰 함수)
  const isDark = useRecoilValue(isDarkAtom);
  //atom value  Set(설정)수정하는 함수
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDark = () => setDarkAtom(((prev)=> !prev));
 
  const onClick = () => {
    window.scroll ({
        top : 0,
        behavior : "smooth"
    });
};
  return ( 
    <>
    <ThemeProvider theme={ isDark ? darkTheme : lightTheme}>
    <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
      <Footer>
            <TopBtn onClick={onClick}>
             <FontAwesomeIcon icon={faCircleUp} color={"#ffa502"} />
            </TopBtn>
            <DarkBtn onClick={toggleDark}>{ isDark === false ? "🌛" : "🌞"}</DarkBtn>
      </Footer>
    </>
  );
}

export default App;
