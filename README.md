# API 管理方式
1.swagger 文档 (个人感觉不大好用,太丑了)
2.eoLinker (个人推荐 还不错的第三方)
测试接口主要用postman


# 配置路径别名
在根目录下创建next.config.js文件，添加以下代码

const path = require("path");
  module.exports = {
    webpack: (config) => {
      config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

在根目录下创建jsconfig.json文件，添加以下代码
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [ "src/*"]
    }
  }
}

# 参数被转换成string
管道

# 用户注册 加密
npm install bcryptjs
/**
 * 加密处理 - 同步方法
 * bcryptjs.hashSync(data, salt)
 *    data  要加密的数据
 *    slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */
const hashPassword = bcryptjs.hashSync(password, 10)


/**
 * 校验 - 使用同步方法
 * bcryptjs.compareSync(data, encrypted)
 *    data        要比较的数据, 使用登录时传递过来的密码
 *    encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
const isOk = bcryptjs.compareSync(password, encryptPassword)

# 用户登录 Passport.js中间件

# local 本地认证
npm install @nestjs/passport passport passport-local
npm install @types/passport @types/passport-local //代码提示


# jwt 生成token
npm install @nestjs/jwt

# 获取用户信息接口实现
npm install passport-jwt @types/passport-jwt



# 开发功能
统计文章游览次数吗，评论次数
文章评论
留言



文章