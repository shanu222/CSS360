let ioInstance = null;

export const setIO = (io) => {
  ioInstance = io;
};

export const getIO = () => ioInstance;

export const emitGlobalEvent = (eventName, payload) => {
  if (!ioInstance) return;
  ioInstance.emit(eventName, payload);
};
