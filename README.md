# 임채승 코드 리뷰

### 파일 구조에 대해서

먼저 src에서 빼내서 진행한 것에 대해서 고민을 하신 것이 눈에 보입니다.  
약간 아쉬운 점이 한가지 있는데 사용자가 실행할 endpoint가 src안에 App.js에 있다는 것입니다.  
이 사항은 요구사항이기 때문에 src안에서 utils, constanst를 넣고, src안에 있는 요소들은 다른 이름을 가진(ex. Game, Dto)것으로 바꾸면 어떨지 제의를 해보고 싶습니다.
