export const storage = {
  get(key){
    const val = window.localStorage.getItem(key);
    if(!val) {
      return null;
    }
    return (key === 'authUser') ? JSON.parse(val) : val;
  },
  set(key, val){
    window.localStorage.setItem(key, val);
  },
  remove(key){
    window.localStorage.removeItem(key);
  },
  clear(){
    window.localStorage.clear();
  }
}
export default storage;