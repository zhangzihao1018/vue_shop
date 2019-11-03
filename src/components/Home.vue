<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div class="left">
        <img src="../assets/heima.png" title="电商后台" />
        <h3>电商后台管理系统</h3>
      </div>
      <el-button type="info" @click="logout" class="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="200px">
          
        <el-menu background-color="#333744" text-color="#fff" active-text-color="skyblue">
          <el-submenu :index="item.id+''" v-for="item in list" :key="item.id">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "home",
  created() {
    this.getMenuList();
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) return this.$message.error("获取列表失败");
      this.list = res.data;
      console.log(this.list);
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
  .el-menu{
      width: 100%;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>