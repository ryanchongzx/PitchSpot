export default {
  showMore({LocalState}, id) {
    let current = LocalState.get('COMMENTS_' + id);
    LocalState.set('COMMENTS_' + id, current + 10);
  },
  clearSettings({LocalState}, id) {
    LocalState.set('COMMENTS_' + id, 10);
  }
};
