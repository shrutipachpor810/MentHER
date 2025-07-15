export function setupSignaling(io) {
  io.on('connection', (socket) => {
    socket.on('joinCall', ({ roomId }) => {
      socket.join(roomId);
      socket.to(roomId).emit('userJoined', { socketId: socket.id });
    });

    socket.on('offer', (payload) => {
      io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', (payload) => {
      io.to(payload.target).emit('answer', payload);
    });

    socket.on('iceCandidate', (payload) => {
      io.to(payload.target).emit('iceCandidate', payload);
    });

    socket.on('leaveCall', ({ roomId }) => {
      socket.to(roomId).emit('userLeft', { socketId: socket.id });
      socket.leave(roomId);
    });
  });
}
