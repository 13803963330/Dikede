import { login, getuserInfo } from "@/api/user";
import { Message } from "element-ui";
import {setTokeTime} from '@/utils/auth'
import router from "@/router";

export default {
  namespaced: true,
  state: {
    token: "",
    logg: {},
    userInfo: {},
  },
  mutations: {
    setToken(state, payliad) {
      state.token = payliad.token;
      state.logg = payliad;
    },
    // 用户信息
    setuserInfo(state, payliad) {
      state.userInfo = payliad;
    },
  },
  actions: {
    // 拿取token
    async getToken(context, payliad) {
      const res = await login(payliad);
      console.log(res);
      context.commit("setToken", res.data);
      if (res.data.success) {
        router.push("/");
        setTokeTime() //拿取tokenTime
        Message({ message: res.data.msg, type: "success" });
      } else {
        Message.error(res.data.msg);
      }
    },
    // 拿取用户信息
    async getuserInfo(context) {
      console.log(context);
      const res = await getuserInfo(context.state.logg.userId);
      console.log(res);
      context.commit("setuserInfo", res.data);
    },
    logout(context){
      context.commit('setToken','')
      context.commit('setuserInfo',{})
    }
  },
};
