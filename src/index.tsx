import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { RecoilRoot } from 'recoil';



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
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);



