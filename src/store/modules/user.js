import {login} from '@/api/user'
import {Message}  from 'element-ui';
import router from '@/router'

export default {
  namespaced: true,
  state: {
    logg:{
      token: '',
      msg:'',
      success:''
    }
    
  },
  mutations: {
    setToken(state, payliad) {
      state.logg.token = payliad.token
      state.logg.msg = payliad.msg
      state.logg.success = payliad.success
    },
  },
  actions: {
   async getToken(context, payliad) {
      
      const res = await login(payliad)
      console.log(res);
      context.commit('setToken', res.data)
      if (res.data.success) {
        router.push("/");
        Message({message:res.data.msg,
        type: 'success'});
      }else{
        Message.error(res.data.msg);
      }
    },
  },
}
