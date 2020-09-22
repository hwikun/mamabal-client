import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";

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
    <form onSubmit={onSubmit}>
      <input
        value={mwit}
        onChange={onChange}
        type="text"
        placeholder="ここに内容を書いてください"
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Mwit" />
      {attachment && (
        <div>
          <img src={attachment} width="300px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default MwitCreator;
