<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div class="left">
        <img src="../assets/heima.png" title="电商后台" />
        <h3>电商后台管理系统</h3>
      </div>
      <el-button type="primary" @click="logout" class="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="flag?'64px':'200px'">
        <span @click="redioBtn" class="radioBtn">| | |</span>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="skyblue"
          unique-opened
          :collapse="flag"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu :index="item.id+''" v-for="item in list" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="savaNavState('/'+subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "home",
  created() {
    this.getMenuList();
    //页面刷新响应到页面
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  data() {
    return {
      list: [],
      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },
      //是否折叠
      flag: false,
      //被激活的链接地址
      activePath: ""
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) return this.$message.error("获取列表失败");
      this.list = res.data;
      // console.log(this.list);
    },
    redioBtn() {
      this.flag = !this.flag;
    },
    savaNavState(a) {
      //光这样写没有作用，因为页面一刷新就重置了
      this.activePath = a;
      //保存点击链接状态 持久存储
      sessionStorage.setItem("activePath", a);
    }
  }
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    img {
      margin-right: 10px;
    }
    h3 {
      font-weight: normal;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
  .iconfont {
    margin-right: 5px;
  }
  .radioBtn {
    display: block;
    background-color: #4a5064;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    cursor: pointer;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>