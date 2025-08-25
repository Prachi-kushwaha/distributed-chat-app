import prisma from "./prisma.service.js";

export const createChatRoom = async function (name, userIds) {
  const members = userIds || [];
  try {
    const chatroom = await prisma.room.create({
      data: {
        name,
        users: {
          connect: members.map((id) => ({id})),
        },
      },
      include: {
        users: true,
      },
    });

    return chatroom;
  } catch (error) {
    console.log(error);
  }
};
