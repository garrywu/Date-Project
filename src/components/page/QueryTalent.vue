<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-global"></i> Talent Pool</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
				<el-input v-model="select_word" placeholder="Type Talent Here" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="search" @click="search">Search</el-button>
			</div>
			<el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
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
							<el-col :span="1">
									<el-button class=ai-search size='small' icon="el-icon-message" type="success" @click="aiSearch">Mail</el-button>
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
						<i class="el-icon-star-off" v-if="scope.row.p_favor" style="font-size: 25px; color: #409eff;"  @click="addFavor(scope.$index, scope.row)"></i>
						<i class="el-icon-star-on" v-if="!scope.row.p_favor" style="font-size: 25px; color: #409eff;"></i><!-- @click="removeFavor(scope.$index, scope.row)" -->
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="40%">
			<div class="del-dialog-cnt">是否确定对目标用户信息进行修改</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="beginEdit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
			<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<style>
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

<script>
	export default {
		name: 'queryuser',
		data() {
			return {
				url: './vuetable.json',
				tableData: [],
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
		computed: {
			data() {
				return this.tableData.filter((d) => {
					let is_del = false;
					for (let i = 0; i < this.del_list.length; i++) {
						if (d.p_name === this.del_list[i].p_name) {
							is_del = true;
							break;
						}
					}
					if (!is_del) {
						if (d.p_name.indexOf(this.select_word) > -1 ||
							d.p_owner.indexOf(this.select_word) > -1 ||
							d.p_end_dt.indexOf(this.select_word) > -1) {
							return d;
						}
					}
				})
			}
		},
		methods: {
			// 分页导航
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
					this.url = 'https://www.fastmock.site/mock/205ab70c496096f44bf5b49028e5040e/querytalent/list';
				}; 
// 				this.url='love/api/findCustomerAll'
				this.$axios.post(this.url, {
					page: this.cur_page
				}).then((res) => {
					console.log(res);
					if(res.data.success){
						console.log(res.data.data);
						this.tableData = res.data.list;
					}else{
						//出错处理 你可以自己选择方式
						alert(res.data.erroMessage);
					}
				})
			},
			getReq(){
				alert("hhh");
			},
			search() {
				this.is_search = true;
			},
			formatter(row, column) {
				return row.p_name;
			},
			filterTag(value, row) {
				return row.tag === value;
			},
			addFavor(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				this.tableData[index].p_favor = false;
			},
			removeFavor(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				this.tableData[index].p_favor = true;
			},
// 			handleEdit(index, row) {
// 				this.idx = index;
// 				const item = this.tableData[index];
// 				this.form = {
// 					name: item.name,
// 					date: item.date,
// 					address: item.address
// 				}
// 				this.editVisible = true;
// 			},
// 			handleDelete(index, row) {
// 				this.idx = index;
// 				this.delVisible = true;
// 				this.delname = row.username;
// 				this.delmobile = row.mobile;
// 			},
			delAll() {
				const length = this.multipleSelection.length;
				let str = '';
				this.del_list = this.del_list.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error('删除了' + str);
				this.multipleSelection = [];
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 保存编辑
			beginEdit() {
				//alert(this.tableData[this.idx].customerId);
				this.editVisible = false;
				this.$router.push({
					name: 'ModifyUser',
					params: { customerId: this.tableData[this.idx].customerId }
				})
			},
			// 确定删除
			deleteRow() {
				this.tableData.splice(this.idx, 1);
				this.$message.success('删除成功');
				this.delVisible = false;
				axios.post('/user', {
						username:this.delname,
						mobile: this.delmobile
					})
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			aiSearch(){
				this.$router.push({
					name: 'QueryResult',
					params: { cal: 'ais' }
				})
			}
		}
	}
</script>

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
