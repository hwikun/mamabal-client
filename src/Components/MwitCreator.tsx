import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FaPlus, FaTelegramPlane } from "react-icons/fa";

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  background-color: #fd79a8;
  width: 100vw;
  padding: 1em;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form``;

const MwitInput = styled.input`
  border: none;
  width: 100%;
  border-radius: 0px;
  margin-bottom: 10px;
`;

const FileInput = styled.input``;

const SubmitInput = styled.input``;

const Preview = styled.div``;

const ClearButton = styled.button``;

interface IUserObjProps {
  userObj: any | null;
}

const MwitCreator: React.FC<IUserObjProps> = ({ userObj }) => {
  const [mwit, setMwit] = useState("");
  const [attachment, setAttachment] = useState<any | null>("");
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const mwitObj = {
      text: mwit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      displayName: userObj.displayName,
    };
    await dbService.collection("mwits").add(mwitObj);
    setMwit("");
    setAttachment("");
  };
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMwit(value);
  };
  const onFileChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;
    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = finishedEvent.target?.result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormContainer>
          <MwitInput
            value={mwit}
            onChange={onChange}
            type="text"
            placeholder="ここに内容を書いてください"
          />
          <SubmitInput type="submit" />
        </FormContainer>
        <SubmitInput type="file" accept="image/*" onChange={onFileChange} />
        {attachment && (
          <Preview>
            <img src={attachment} width="300px" />
            <ClearButton onClick={onClearAttachment}>Clear</ClearButton>
          </Preview>
        )}
      </Form>
    </Container>
  );
};

export default MwitCreator;
