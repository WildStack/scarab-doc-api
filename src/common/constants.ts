export const consts = {
  socketEvents: {
    userRemoved: 'user_removed',
    userAdded: 'user_added',
    notifyUpdate: 'notify_update',
    notifyUpdateCaret: 'notify_update_caret',
  },
};

export const uuidRegex = new RegExp(
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
);
