import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

export interface IMwitObj {
  text: string;
  createdAt: number;
  id: string;
  attachmentUrl: string;
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="更新内容"
              value={newMwit}
              required
              onChange={onChange}
            />
            <input type="submit" value="編集" />
          </form>
          <button onClick={toggleEditing}>キャンセル</button>
        </>
      ) : (
        <>
          <h4>{mwitObj.text}</h4>
          {mwitObj.attachmentUrl && (
            <img src={mwitObj.attachmentUrl} width="300px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>消す</button>
              <button onClick={toggleEditing}>編集</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Mwit;
