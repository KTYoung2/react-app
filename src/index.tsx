import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { darkTheme } from './Theme';



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



const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);

/*
  리액트 쿼리 생성
  리액트 어플리케이션에서 서버 state를 fetching, caching, synchronizing, updating 
  할 수 있도록 도와주는 라이브러리. 
  'global state'를 건드리지 않고 리액트 및 리액트 네이티브 어플리케이션에서 
  데이터를 가져오고, 캐시하고, 업데이트한다. 
*/
const queryClient = new QueryClient();

/*
    <ThemeProvider>는 스타일 컴포넌트에서 제공해주는
    컴포넌트라는 걸 잊지 말기 !

    라우터 훅
    <RouterProvider router={router}/>

*/


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkTheme}>
    <GlobalStyle />
        <App />
    </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);



