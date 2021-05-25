import { useState } from 'react';
import styled from 'styled-components';
import { PersonCircle, PlusCircle } from '@styled-icons/bootstrap';
import { PaperPlane } from '@styled-icons/ionicons-outline';

function QnA(props) {
  const [textArea, setTextArea] = useState(false);

  const { questions, answers } = props;

  return (
    <Container>
      <Bar>
        <div>
          <Span right={20} size={1.25} bold>
            QnA
          </Span>
          <Span color={'lightgray'} size={0.8}>
            {questions.length}개의 글
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
      {questions.map(question => (
        <Article key={question.id}>
          <Bar>
            <div>
              <Profile />
              <Span>{question.user_id}</Span>
            </div>
          </Bar>
          {question.text}
          <Comments>
            {answers
              .filter(answer => answer.review_id === question.id)
              .map(answer => (
                <Comment key={answer.user_id}>
                  <Profile small />
                  <Span right={20} bold>
                    {answer.user_id}
                  </Span>
                  <Span>{answer.text}</Span>
                </Comment>
              ))}
            <InputContainer>
              <Input placeholder="댓글을 입력해 주세요." />
              <Plus />
              <Plane />
            </InputContainer>
          </Comments>
        </Article>
      ))}
    </Container>
  );
}

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
  margin-right: ${props => props.right}px;
  color: ${props => props.color};
  font-size: ${props => props.size}rem;
  font-weight: ${props => props.bold && 'bold'};
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
  flex-shrink: 0;
  width: ${props => (props.small ? '30px' : '40px')};
  margin-right: ${props => (props.small ? '10px' : '20px')};
  color: lightgray;
`;

const Comments = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 15px;
  margin: 5px;
  background-color: #f3f3f3;
  border-radius: 25px;
  font-size: 0.8rem;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 10px 0;
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
