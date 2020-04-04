export default {
    //保存
    saveData(key,data){ //获取key值(name值)和数据

        window.localStorage.setItem(key,JSON.stringify(data)) //将数据转换为json字符串形式
    },
    //读取
    readData(key){ //读取相应的key(name)

        return JSON.parse(window.localStorage.getItem(key)) //将json字符串转换为json对象
    },
    //删除相应用户的信息
    removeData(key){
        window.localStorage.removeItem(key)
    }

}
