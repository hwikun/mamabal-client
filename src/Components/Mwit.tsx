import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import styled from "styled-components";
import dayjs from "dayjs";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const EditForm = styled.form``;
const EditCancel = styled.button``;
const EditInput = styled.input``;
const EditSubmit = styled.input``;

const MwitContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px,
    rgba(0, 0, 0, 0.024) 0px -6px 16px -6px;
  padding: 1em;
  border-radius: 20px;
`;

const WriterContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.span`
  font-size: 0.9em;
  font-weight: 700;
`;
const Time = styled.span`
  font-size: 0.9em;
  font-weight: 400;
  margin-left: 5px;
`;
const MwitContent = styled.div`
  width: 100%;
  font-size: 1.1em;
  display: flex;
  justify-content: space-between;
  font-family: "Kosugi";
`;

const MwitText = styled.span``;

const MwitButton = styled.span``;
const MwitImg = styled.img`
  margin-top: 10px;
  border-radius: 15px;
  align-self: center;
`;

const Button = styled.span`
  margin-right: 0.5em;
`;

export interface IMwitObj {
  text: string;
  createdAt: number;
  id: string;
  attachmentUrl: string;
  displayName: string;
}

interface IMwitProps {
  mwitObj: IMwitObj;
  isOwner: boolean;
}

const Mwit: React.FC<IMwitProps> = ({ mwitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMwit, setNewMwit] = useState(mwitObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("本当に取り消しますか？");
    if (ok) {
      await dbService.doc(`mwits/${mwitObj.id}`).delete();
      await storageService.refFromURL(mwitObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dbService.doc(`mwits/${mwitObj.id}`).update({
      text: newMwit,
    });
    setEditing(false);
  };
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewMwit(value);
  };
  return (
    <Container>
      {editing ? (
        <>
          <EditForm onSubmit={onSubmit}>
            <EditInput
              type="text"
              placeholder="更新内容"
              value={newMwit}
              required
              onChange={onChange}
            />
            <EditSubmit type="submit" value="編集" />
            <EditCancel onClick={toggleEditing}>キャンセル</EditCancel>
          </EditForm>
        </>
      ) : (
        <>
          <MwitContainer>
            <WriterContainer>
              <Name>
                {mwitObj.displayName}
                <Time>
                  {dayjs(mwitObj.createdAt)
                    .format()
                    .replace("T", " ")
                    .replace("+09:00", "")}
                </Time>
              </Name>
              <MwitButton>
                {isOwner && (
                  <>
                    <Button onClick={onDeleteClick}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </>
                )}
              </MwitButton>
            </WriterContainer>
            <MwitContent>
              <MwitText>{mwitObj.text}</MwitText>
            </MwitContent>
            {mwitObj.attachmentUrl && (
              <MwitImg src={mwitObj.attachmentUrl} width="80%" />
            )}
          </MwitContainer>
        </>
      )}
    </Container>
  );
};

export default Mwit;
