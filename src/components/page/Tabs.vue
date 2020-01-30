<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> My Favor</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`Favored (${activeList.length})`" name="first">
					<el-table :data="data.filter(item => item.p_favor_active == true)" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
						<el-table-column type="expand">
							<template slot-scope="props">
								<el-row>
									<el-col :span="22">
										<el-form label-position="left" class="demo-table-expand"> 
											<el-form-item label="Owner Site">
												<span>{{ props.row.p_owner_site }}</span>
											</el-form-item>
											<el-form-item label="Desc">
												<span>{{ props.row.p_desc }}</span>
											</el-form-item>
											<el-form-item label="Overview">
												<span>{{ props.row.p_overview }}</span>
											</el-form-item>
											<el-form-item label="Documments"> <i class="el-icon-download" ><span @click="getReq" style="cursor:pointer;">&nbsp;Click to download</span></i>
											</el-form-item>
										</el-form>
									</el-col>
								</el-row>
							</template>
						</el-table-column>
						<el-table-column type="selection" width="55" align="center"></el-table-column>
						<el-table-column prop="p_owner" label="Project Owner" sortable width="150">
						</el-table-column>
						<el-table-column prop="p_end_dt" label="Project End Dt" width="120">
						</el-table-column>
						<el-table-column prop="p_name" label="Project Name" :formatter="formatter">
						</el-table-column>
						<el-table-column label="Operation" width="180" align="center">
							<template slot-scope="scope">
								<el-button size="small" @click="handleFavor(scope.$index)">Un-Favored</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="pagination">
						<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
						</el-pagination>
					</div>
                    <div class="handle-row">
                        <el-button type="primary" @click="handleFavorAll()">Un-Favored All</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`Recycle (${inactiveList.length})`" name="third">
                    <template v-if="message === 'third'">
						<el-table :data="data2.filter(item => item.p_favor_active == false)" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
							<el-table-column type="expand">
								<template slot-scope="props">
									<el-row>
										<el-col :span="22">
											<el-form label-position="left" class="demo-table-expand"> 
												<el-form-item label="Owner Site">
													<span>{{ props.row.p_owner_site }}</span>
												</el-form-item>
												<el-form-item label="Desc">
													<span>{{ props.row.p_desc }}</span>
												</el-form-item>
												<el-form-item label="Overview">
													<span>{{ props.row.p_overview }}</span>
												</el-form-item>
												<el-form-item label="Documments"> <i class="el-icon-download" ><span @click="getReq" style="cursor:pointer;">&nbsp;Click to download</span></i>
												</el-form-item>
											</el-form>
										</el-col>
									</el-row>
								</template>
							</el-table-column>
							<el-table-column type="selection" width="55" align="center"></el-table-column>
							<el-table-column prop="p_owner" label="Project Owner" sortable width="150">
							</el-table-column>
							<el-table-column prop="p_end_dt" label="Project End Dt" width="120">
							</el-table-column>
							<el-table-column prop="p_name" label="Project Name" :formatter="formatter">
							</el-table-column>
							<el-table-column label="Operation" width="180" align="center">
								<template slot-scope="scope">
									<el-button @click="handleRestore(scope.$index)">Move Back</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="pagination">
							<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
							</el-pagination>
						</div>
						<div class="handle-row">
						    <el-button type="danger" @click="handleEmpty()">Empty Recycles</el-button>
						</div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
				totalList: [],
                activeList: [],
				inactiveList: [],
				cur_page: 1,
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				del_list: [],
				is_search: false,
				favorVisible: '',
				fillVisible: 'none',
				form: {
					p_name: '',
					p_end_dt: '',
					p_owner: ''
				},
				idx: -1,
				delname:'',
				delmobile:''
            }
        },
		data2() {
		    return {
		        message: 'first',
		        showHeader: false,
				totalList: [],
		        activeList: [],
				inactiveList: [],
				cur_page: 1,
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				del_list: [],
				is_search: false,
				favorVisible: '',
				fillVisible: 'none',
				form: {
					p_name: '',
					p_end_dt: '',
					p_owner: ''
				},
				idx: -1,
				delname:'',
				delmobile:''
		    }
		},
		created() {
			this.getData();
			
		},
        methods: {
            handleFavor(index) {
				this.activeList[index].p_favor_active = false;
                const item = this.activeList.splice(index, 1);
                this.inactiveList = item.concat(this.inactiveList);
            },
			handleFavorAll() {
				this.activeList.forEach(function (item, index) {
					item.p_favor_active = false;
					
				});
				// this.$set(this.activeList,'p_favor_active',false);
				// this.inactiveList = item.concat(this.inactiveList)
 				this.inactiveList = this.inactiveList.concat(this.activeList);
 				this.activeList = [];
			},
            handleEmpty() {
                this.inactiveList = [];
            },
            handleRestore(index) {
				this.inactiveList[index].p_favor_active = true;
				const item = this.inactiveList.splice(index, 1);
				this.activeList = item.concat(this.activeList);
            },
			handleCurrentChange(val) {
							this.cur_page = val;
							this.getData();
						},
						// 获取 easy-mock 的模拟数据
			getData() {
				
// 				fetchData(this.query).then(res => {
// 				    console.log(res);
// 				    this.tableData = res.list;
// 				    this.pageTotal = res.pageTotal || 50;
// 					alert(this.tableData);
// 				});
				
				
				// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
				 if (process.env.NODE_ENV === 'development') {
					// this.url = '/ms/query/list';
					this.url = 'https://www.fastmock.site/mock/205ab70c496096f44bf5b49028e5040e/querytalent/favor';
				}; 
				//this.url='love/api/findCustomerAll'
				this.$axios.post(this.url, {
					page: this.cur_page
				}).then((res) => {
					console.log(res);
					if(res.data.success){
						//console.log(res.data.data);
						this.totalList = res.data.list;
						this.activeList = this.totalList.filter(item => item.p_favor_active == true);
						this.inactiveList = this.totalList.filter(item => item.p_favor_active == false);
// 						this.activeList = res.data.list.filter(function(p_favor_active)
// 						{
// 							p_favor_active = true
// 						}
// 						);
						alert(JSON.stringify(this.activeList));
					}else{
						//出错处理 你可以自己选择方式
						alert(res.data.erroMessage);
					}
				})
			}
        },
        computed: {
            inactiveNum(){
                return this.inactiveList.length;
            },
			data() {
				return this.activeList;
			},
			data2() {
				return this.inactiveList;
			}
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.demo-table-expand {
		font-size: 0;
	}

.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}

.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	padding-left: 60px;
	width: 50%;
}

.ai-search {
	display: block;
	margin-left: 1.125rem;
	margin-top: 3.75rem
}
</style>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
	display: inline-block;
}

.del-dialog-cnt {
	font-size: 16px;
	text-align: center
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #ff0000;
}

.mr10 {
	margin-right: 10px;
}
</style>
