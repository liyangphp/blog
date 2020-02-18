let ipUrl = 'http://borentang.net/api/v1/'


let servicePath = {
    getCategories: ipUrl + 'get/category', //获取菜单分类
    getArticles: ipUrl + 'article',   //获取搜索文章列表
    getNotifications: ipUrl + 'notifications', //获取通知
    getNotificationReaded: ipUrl + 'user/read/notifications', //点击编辑已读
    getNotificationStatus: ipUrl + 'notifications/stats', //获取未读通知数量
    getTags: ipUrl + 'get/labs', //获取分类标签
    getArticleList: ipUrl + 'article/list', //获取文章列表
    getRecommandList: ipUrl + 'get/article', //获取推荐文章
    getZhanInfo: ipUrl + 'users/zz', //获取站长信息
    getArticleDetail: ipUrl + 'article/', //获取文章详情
    goLogin: ipUrl + 'authorizations', //去登录
    goGithubLogin: ipUrl + 'oauth/github', //github去登录
    Logout: ipUrl + 'authorizations/current',   //推出登录
    getUserInfo: ipUrl + 'user',  //依据token获取用户信息
    addArticle: ipUrl +'article/add', //添加文章
    uploadImage: ipUrl + 'upload_image', //上传图片
    getLabs: ipUrl + 'get/labs',  //获取标签
    uploadArticleImage: ipUrl + 'upload/image', //上传文章图片
    getUser: ipUrl + 'users/', //依据编号获取用户信息
    getThird: ipUrl + 'third/user', //获取用户第三方信息
    getUserArticle: ipUrl + 'user/article', //获取用户文章列表
    getAddressName: ipUrl + 'get/name', //获取地址名称
    giveLike: ipUrl + 'user/like', //点赞
    hasLike: ipUrl + 'user/haslike', //判断是否点赞
    getProvinces: ipUrl + 'get/provinces', //获取省
    getCity: ipUrl + 'get/city', //获取城市
    saveThird: ipUrl + 'user/third_save', //保存第三方资料
    getNotifications: ipUrl + 'notifications', //获取通知消息
    getUserArticleList: ipUrl + 'user/article', //获取用户文章列表
    registerUser: ipUrl + 'users', //注册用户
    RepairPassword: ipUrl + 'user/repair', //修改用户密码
}

export default servicePath;