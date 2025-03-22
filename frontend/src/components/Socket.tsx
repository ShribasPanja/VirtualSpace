import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSetRecoilState } from "recoil";
import { usersState, mapState, itemsState, idState } from "../store/Atoms";

export const socket = io("http://localhost:8080");

export const SocketManager = () => {
  const setUsers = useSetRecoilState(usersState);
  const setMap = useSetRecoilState(mapState);
  const setItems = useSetRecoilState(itemsState);
  const setId = useSetRecoilState(idState);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("goodbye user");
    });
    socket.on("hello", (data) => {
      console.log(data);
      setMap(data.map);
      setUsers(data.users);
      setItems(data.items);
      setId(data.id);
      console.log("hello user");
    });
    socket.on("users", (users) => {
      setUsers(users);
      console.log(users);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("hello");
      socket.off("users");
    };
  }, []);
  return null;
};
