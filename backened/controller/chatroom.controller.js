import * as chatRoomService from "../services/chatroom.service.js";
// import * as authService from "../services/auth.service.js";
// import prisma from "../services/prisma.service.js";

export const createChatRoomController = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, userIds } = req.body;

    if (!name || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: "Name and userIds[] are required" });
    }

    const chatRoom = await chatRoomService.createChatRoom(name, userIds );
    res.status(201).json({ chatRoom });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



export const addUsersController = async (req, res) => {
  const { roomId, userIds } = req.body;

  try {
    const room = await chatRoomService.addUserInChatRoom(roomId, userIds);
    res.status(200).json({ room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeUsersController = async (req, res) => {
  const { roomId, userIds } = req.body;

  try {
    const room = await chatRoomService.removeUserInChatRoom(roomId, userIds);
    res.status(200).json({ room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


