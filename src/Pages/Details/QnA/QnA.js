import { useState } from 'react';
import styled from 'styled-components';
import { PersonCircle, PlusCircle } from '@styled-icons/bootstrap';
import { PaperPlane } from '@styled-icons/ionicons-outline';

const QnA = props => {
  const [textArea, setTextArea] = useState(false);

  return (
    <Container>
      <Bar>
        <div>
          <Span size={1.25} bold>
            QnA{' '}
          </Span>
          <Span color={'lightgray'} size={0.8}>
            {' '}
            000개의 글
          </Span>
        </div>
        <Btn
          onClick={() => {
            setTextArea(!textArea);
          }}
        >
          글 작성하기
        </Btn>
      </Bar>
      {textArea && <TextArea placeholder="내용을 입력해 주세요." />}
      <Article>
        <Bar>
          <div>
            <Profile />
            <Span>{'   '}작성자</Span>
          </div>
        </Bar>
        안녕하십니까. 클래스101 메이트 여러분~ 코우지 키트의 일식칼 문의 사항에
        답변 드리고자 인사 드립니다. 칼은 탄소강과 알루미늄 재질로 나뉘는데
        코우지 키트의 사시미칼과 데바칼은 상대적으로 저렴하고 관리가 용이한
        알루미늄 재질로 만든 제품입니다. 일식은 사시미류 등의 손질로 특히
        칼관리가 중요한데 칼 사용전과 사용중에 반드시 수시로 손질을 해주셔야
        합니다. 육안으로 보이는 미세한 녹슨 자국들은 칼 관리시 대부분 연마되는
        수준이며 실제로 고가의 칼들도 처음 받았을때는 손질 후 사용하는 것을
        필수로 합니다.
        <Comments>
          <InputContainer>
            <Input placeholder="댓글을 입력해 주세요." />
            <Plus />
            <Plane />
          </InputContainer>
        </Comments>
      </Article>
      <Article>
        <Bar>
          <div>
            <Profile />
            <Span>{'   '}작성자</Span>
          </div>
        </Bar>
        수강신청하면 언제부터 수강가능한가요?
        <Comments>
          <InputContainer>
            <Input placeholder="댓글을 입력해 주세요." />
            <Plus />
            <Plane />
          </InputContainer>
        </Comments>
      </Article>
      <Article>
        <Bar>
          <div>
            <Profile />
            <Span>{'   '}작성자</Span>
          </div>
        </Bar>
        안녕하십니까. 클래스101 메이트 여러분~ 코우지 키트의 일식칼 문의 사항에
        답변 드리고자 인사 드립니다.
        <Comments>
          <InputContainer>
            <Input placeholder="댓글을 입력해 주세요." />
            <Plus />
            <Plane />
          </InputContainer>
        </Comments>
      </Article>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 30px 0;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  outline: none;
  resize: none;
`;

const Span = styled.span`
  ${props =>
    `color: ${props.color}; font-size: ${props.size}rem; font-weight: ${
      props.bold && 'bold'
    }`};
`;

const Btn = styled.button`
  width: 100px;
  height: 40px;
  color: white;
  background-color: black;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const Article = styled.article`
  padding-top: 30px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 0.9rem;
  line-height: normal;
  white-space: pre-wrap;
`;

const Profile = styled(PersonCircle)`
  width: 40px;
  color: lightgray;
`;

const Comments = styled.div``;

const InputContainer = styled.div`
  position: relative;
  margin: 30px 0;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 50px;
  color: gray;
  border: 1px solid lightgray;
  border-radius: 25px;
`;

const Plus = styled(PlusCircle)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  color: lightgray;
`;

const Plane = styled(PaperPlane)`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 30px;
  color: lightgray;
`;

export default QnA;
