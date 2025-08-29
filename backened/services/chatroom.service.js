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


export const addUserInChatRoom = async function(roomId,userIds){
   const addUser = await prisma.room.update({
    where:{id:roomId},
    data:{
      users:{
        connect:userIds.map((id)=>({id}))
      }

    },
    include: { users: true }
   })
   return addUser
}

export const removeUserInChatRoom = async function(roomId,userIds){
   const removeUser = await prisma.room.update({
    where:{id:roomId},
    data:{
      users:{
        disconnect:userIds.map((id)=>({id}))
      }

    },
    include: { users: true }
   })
   return removeUser
}
