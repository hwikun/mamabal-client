import React, { useEffect, useState } from "react";
import Clock from "../Components/Clock";
import { Helmet } from "react-helmet";
import { dbService, storageService } from "../firebase";
import Mwit from "../Components/Mwit";
import { v4 as uuidv4 } from "uuid";

interface IUserObjProps {
  userObj: any | null;
}

interface IMwitArray {
  id: string;
}

const Home: React.FC<IUserObjProps> = ({ userObj }) => {
  const [mwit, setMwit] = useState("");
  const [mwits, setMwits] = useState<IMwitArray[]>([]);
  const [attachment, setAttachment] = useState<any | null>("");
  useEffect(() => {
    dbService
      .collection("mwits")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const mwitArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMwits(mwitArray);
      });
  }, []);
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
    <>
      <Helmet>
        <title>Home | Mamabal</title>
      </Helmet>
      <Clock />
      <div>
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
        <div>
          {mwits.map((mwit: any) => (
            <Mwit
              key={mwit.id}
              mwitObj={mwit}
              isOwner={mwit.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
